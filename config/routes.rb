Rails.application.routes.draw do
  root to: 'angular#index'

  post 'test', to: 'tests#index'

  get '*path' => 'angular#index'
end
