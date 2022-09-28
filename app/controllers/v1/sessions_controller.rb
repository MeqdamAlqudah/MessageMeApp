class V1::SessionsController < ApplicationController
  before_action :require_same_user, only: %i[destroy]
  def index
    sessions = Session.all
    ActionCable.server.broadcast('session_channel', { action: 'all', 'valid' => true,
                                                      onlineUsers: SessionChannel.get_users(sessions).map do |user|
                                                                     { 'username' => user.username,
                                                                       'email' => user.email }
                                                                   end })
    render json: { 'valid' => true, 'sessions' => sessions }
  end

  def create
    user = User.find_by(username: params[:username])

    if user&.authenticate(params[:password])
      online_session = Session.create(user_id: user.id)
      if online_session.save
        session[:user_id] = user.id
        ActionCable.server.broadcast('session_channel', { action: 'create', 'valid' => true,
                                                          online_session: { 'username' => user.username, 'email' =>
                                                            user.email } })
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
    current_session = Session.find_by(user_id: params[:id])
    if current_session && current_session.destroy
      session[:user_id] = nil
      ActionCable.server.broadcast('session_channel', { action: 'destroy', 'valid' => true,
                                                        online_session: User.find(params[:id]).username })
      render json: { 'valid' => true ,'action'=>'destroy'}
    else
      render json: { 'valid' => false }
    end
  end

  private

  def get_users(sessions)
    sessions.map { |session| User.find(session.user_id) }
  end
end
