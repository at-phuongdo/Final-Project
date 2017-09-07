Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  api_version(module: 'API/V1', path: { value: '/api/v1' }) do
    resources :items do
      resources :images_items, only: :index
    end

    #login $ logout
    post 'login' => 'sessions#create'

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

    resources :details, only: [:show]

    resources :orders

    resources :categories, only: [:index, :show]

    resources :searches, only: [:index]
  end
end
