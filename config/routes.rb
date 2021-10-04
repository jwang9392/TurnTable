Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :create, :update] do
      resources :reservations, only: [:index]
    end
    resources :venues, only: [:index, :show] do
      resources :reservations, only: [:create]
      resources :reviews, only: [:index, :create]
    end 
    resources :reservations, only: [:show, :update, :destroy]
    resource :session, only: [:create, :destroy]

    get '/search', to: 'venues#search'
  end

  root "static_pages#root"  
end
