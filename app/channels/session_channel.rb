class SessionChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'session_channel'
    if current_user
      onlineSession = Session.create(user_id: current_user.id)
      onlineSession.save
    end
    ActionCable.server.broadcast('session_channel', { action: 'all', 'valid' => true,
                                                      onlineUsers: SessionChannel.get_users(Session.all).map do |user|
                                                                     { 'username' => user.username,
                                                                       'email' => user.email }
                                                                   end })
  end

  def unsubscribed
    if current_user
      Session.find_by(user_id: current_user.id).destroy
      ActionCable.server.broadcast('session_channel', { action: 'destroy', 'valid' => true,
                                                        online_session: current_user.username })
    end
  end

  def self.get_users(sessions)
    sessions.map { |session| User.find(session.user_id) }
  end
end
