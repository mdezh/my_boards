Rails.application.routes.draw do
  root 'pages#home'
  devise_for :users
  get 'about', to: 'pages#about'
  get 'boards/cancel', to: 'boards#cancel_new', as: :cancel_new_board
  resources :boards do
    resources :notes, shallow: true, only: %i[index create destroy edit update show]
    member do
      get :details
      put :join
      put :leave
    end
  end
end
