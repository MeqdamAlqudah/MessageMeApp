class V1::MessagesController < ApplicationController
  before_action :require_same_user, only: %i[destroy update]
  before_action :require_user
  def index
    render json: { 'valid' => true, 'messages' => get_messages(Message.all) }
  end

  def create
    message = Message.create(message_param)
    user = User.find(params[:user_id])
    if message.save
      ActionCable.server.broadcast('chatroom_channel',
                                   { action: 'create', valid: true,
                                     message: { id: message.id, text: message.body, sentBy: user.username,
                                                user_id: user.id } })

    else
      render json: { 'valid' => false }
    end
  end

  def destroy
    message = Message.find(params[:id])
    if message.destroy
      ActionCable.server.broadcast('chatroom_channel', { valid: true,
                                                         messageID: params[:id].to_i, action: 'delete' })
      render json: { 'valid' => true }
    else
      render json: { 'valid' => false }
    end
  end

  private

  def message_param
    params.require(:message).permit(:body, :user_id)
  end

  def get_messages(messages)
    messages.map do |message|
      { 'user_id' => get_message_user(message).id, 'id' => message.id,
        'sentBy' => get_message_user(message).username, 'text' => message.body }
    end
  end

  def get_message_user(message)
    User.find(message.user_id)
  end
end
