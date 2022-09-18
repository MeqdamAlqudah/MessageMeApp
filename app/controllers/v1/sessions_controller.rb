class V1::SessionsController < ApplicationController
  before_action :require_same_user, only: %i[destroy]
  def index
    sessions = Session.all
    render json: { 'valid' => true, 'sessions' => sessions }
  end

  def create
    user = User.find_by(username: params[:username])

    if user&.authenticate(params[:password])
      onlineSession = Session.create(user_id: user.id)
      if onlineSession.save
        session[:user_id] = user.id
        ActionCable.server.broadcast('session_channel', { action: 'create', 'valid' => true,
                                                          onlineSession: { 'username' => user.username, 'email' => user.email } })
        render json: { 'userInfo' => { 'userID' => user.id, 'username' => user.username, 'email' => user.email },
                       'valid' => true }
      else
        render json: { 'valid' => false, 'errorMessage' => 'You are already logged in!!' }
      end
    else
      render json: { 'valid' => false }
    end
  end

  def destroy
    if Session.find_by(user_id: params[:id]).destroy
      session[:user_id] = nil
      ActionCable.server.broadcast('session_channel', { action: 'destroy', 'valid' => true,
                                                        onlineSession: User.find(params[:id]).username })
      render json: { 'valid' => true }
    end
  end
end
