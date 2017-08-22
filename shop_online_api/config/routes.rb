Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  api_version(module: 'API/V1', path: { value: '/api/v1' }) do
    resources :items
    resources :users
    resources :confirmations do
      member do
        get 'confirm' => 'confirmations#confirm_email'
      end
    end
  end
end
