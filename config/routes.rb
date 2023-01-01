Rails.application.routes.draw do
  root 'main#show'
  resources :boards, only: %i[index show edit update new create destroy] do
    member do
      get :details
    end
    resources :notes, only: %i[index]
  end
end
