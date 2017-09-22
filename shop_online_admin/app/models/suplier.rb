class Suplier < ApplicationRecord
  belongs_to :parent
  belongs_to :shop
end
