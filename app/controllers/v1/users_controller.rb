class V1::UsersController < ApplicationController
  before_action :require_same_user, only: %i[destroy update show]

  def create
    user = User.new(user_params)
    user.password = params[:password]
    if user.save
      session[:user_id] = user.id
      online_session = Session.create(user_id: user.id)
      if online_session.save
        ActionCable.server.broadcast('session_channel', { action: 'create', 'valid' => true,
                                                          online_session: { 'email' =>
                                                            user.email, 'username' =>
                                                             user.username } })
        render json: { 'valid' => true,
                       'userInfo' => { 'userID' => user.id, 'username' => user.username, 'email' => user.email } }
      end
    else
      render json: { 'valid' => false }
    end
  end

  def show
    user = User.find(params[:id])
    if session[:user_id] == params[:id]
      render json: { 'valid' => true,
                     'userInfo' => { 'userID' => user.id, 'username' => user.username, 'email' => user.email } }
    elsif logged_in?
      render json: { 'valid' => true, 'userInfo' => { 'username' => user.username, 'email' => user.email } }
    else
      render { 'valid' => false }
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: { 'valid' => true }
    else
      render json: { 'valid' => false }
    end
  end

  def destroy
    User.find(params[:id]).destroy
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
