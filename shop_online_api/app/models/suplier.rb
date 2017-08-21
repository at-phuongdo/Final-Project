class Suplier < ApplicationRecord
  has_and_belongs_to_many :shops
  has_many :child, class_name: 'Suplier', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'Suplier', optional: true
end
