class V1::ThingsController < ApplicationController
  def index
    render json: {
      things: [
        {
          name: 'some-thing',
          guid: '0415674d-a0e8-4748-af68-a5f53a05c453'
        }
      ]
    }.to_json
  end
end
