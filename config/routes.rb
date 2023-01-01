Rails.application.routes.draw do
  root 'main#show'
  resources :boards do
    resources :notes, shallow: true, only: %i[index create]
    member do
      get :details
    end
  end
end
