Rails.application.routes.draw do
  resources :palettes do
    member do
      post 'move/:stop_id/:direction', to: 'palettes#move', as: 'move'
    end
  end
  
  root "palettes#index"
end
