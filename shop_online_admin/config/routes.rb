Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  resources :users
  resources :units
  resources :supliers
  resources :shops
  resources :payments
  resources :orders
  resources :order_items
  resources :items_categories
  resources :items
  resources :images_items
  resources :comments
  resources :categories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
