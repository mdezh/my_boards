Rails.application.routes.draw do
  root 'rooms#index'
  resources :rooms, only: %i[edit update create destroy]
end
