Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  api_version(module: 'API/V1', path: { value: '/api/v1' }) do
    resources :users
    resources :confirmations, only: [:index] do
      member do
        get 'confirm' => 'confirmations#confirm_email'
      end
    end
    resources :reset_passwords, only: [:create, :update] do
      member do
        get 'resetPassword' => 'reset_passwords#resetPassword'
      end
    end
  end
end
