Rails.application.routes.draw do
  root to: 'pmo#show'

  namespace :api do
    resources :projects, only: [:index, :create]
  end

  # post 'test', to: 'tests#index'
  # get '*path' => 'pmo#show'
  get 'projects' => 'pmo#show'
end
