class ImagesItem < ApplicationRecord
  belongs_to :item, optional: true
end
