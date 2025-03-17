FactoryBot.define do
  factory :colour_stop do
    position { 0 }
    percentage { 0 }
    hex { "#FF0000" }
    association :palette  
  end
end
