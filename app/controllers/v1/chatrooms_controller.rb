class V1::ChatroomsController < ApplicationController
  before_action :authenticate, only: %i[index create show]
end
