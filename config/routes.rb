Rails.application.routes.draw do
  root 'rooms#index'
  resources :rooms, only: %i[edit update new create destroy]
end
