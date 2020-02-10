Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :user, only: [:show, :create]
    resource :session, only: [:create, :destroy]
  end
end
