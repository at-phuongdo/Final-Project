Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  resources :users do
    member do
      post :reset_password
      get :profile
    end
    collection do
      get :search
    end
  end
  resources :units
  resources :supliers
  resources :shops
  resources :payments
  resources :orders
  resources :order_items
  resources :items_categories
  resources :items do
    collection do
      get :search
    end
  end
  resources :images_items
  resources :comments
  resources :categories
  get    'login'   => 'sessions#new'
  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
