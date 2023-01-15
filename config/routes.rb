Rails.application.routes.draw do
  root 'main#show'
  devise_for :users
  get 'about', to: 'pages#about'
  resources :boards do
    resources :notes, shallow: true, only: %i[index create destroy edit update show]
    member do
      get :details
    end
  end
  get 'cancel_new_board', to: 'boards#cancel', as: :cancel_new_board
end
