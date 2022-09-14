class V1::UsersController < ApplicationController
  def create
    user = User.new(user_param)
    if user.save
      render json: { 'valid' => true, 'userInfo' => user }
    else
      render json: { 'valid' => false }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
