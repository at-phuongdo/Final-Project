class SuplierSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :email
  belongs_to :shop
  has_many :child, class_name: 'Suplier', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'Suplier', optional: true
end
