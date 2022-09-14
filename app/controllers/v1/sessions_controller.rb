class V1::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { 'userInfo' => { 'userID' => user.id, 'username' => user.username, 'email' => user.email },
                     'valid' => true }
    else
      render json: { 'valid' => false }
    end
  end
end
