Rails.application.routes.draw do
  root 'rooms#index'
  resources :rooms, only: %i[index show edit update new create destroy] do
    member do
      get :details
    end
  end
end
