class Payment < ApplicationRecord
  belongs_to :order, optional: true
end
