class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user.authenticate(params[:password])
      render json: { 'userInfo' => user, 'valid' => true }
    else
      render json: { 'valid' => false }
    end
  end
end
