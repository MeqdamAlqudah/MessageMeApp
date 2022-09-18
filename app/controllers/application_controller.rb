class ApplicationController < ActionController::API
  include ActionController::Cookies
  helper_method :current_user, :logged_in?, :require_user

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def require_same_user
    { json: { 'valid' => false } } unless current_user === params[:id]
  end

  def require_user
    render json: { 'valid' => false } unless logged_in?
  end
end
