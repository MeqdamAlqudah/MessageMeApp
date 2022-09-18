class SessionChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'session_channel'
    ActionCable.server.broadcast('session_channel', { action: 'all', 'valid' => true,
                                                      onlineUsers: SessionChannel.get_users(Session.all).map do |user|
                                                                     { 'username' => user.username,
                                                                       'email' => user.email }
                                                                   end })
  end

  def unsubscribed; end

  def self.get_users(sessions)
    sessions.map { |session| User.find(session.user_id) }
  end
end
