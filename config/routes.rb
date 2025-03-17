Rails.application.routes.draw do
  resources :palettes 
  root "palettes#index"
end
