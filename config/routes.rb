Rails.application.routes.draw do
  devise_for :users
  root 'main#show'
  resources :boards do
    resources :notes, shallow: true, only: %i[index create destroy edit update show]
    member do
      get :details
    end
  end
end
