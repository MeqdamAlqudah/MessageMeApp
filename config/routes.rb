Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")

  namespace :v1, defaults: { format: 'json' } do
    get 'things', to: 'things#index'
    post 'login', to: 'sessions#create'
    delete '/logout/:id', to: 'sessions#destroy'
    resources :messages, only: %i[create update index destroy]
    resources :users, only: %i[create update destroy show]
    resources :sessions, only: [:index]
  end
  get '*page', to: 'static#index', constraints: lambda { |req|
    !req.xhr? && req.format.html?
  }
  root 'static#index'

  mount ActionCable.server => '/cable'
end
