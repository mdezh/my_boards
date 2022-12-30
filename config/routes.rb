Rails.application.routes.draw do
  root 'boards#index'
  resources :boards, only: %i[index show edit update new create destroy] do
    member do
      get :details
    end
  end
end
