class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :item

  def self.paging page, per_page
    limit(per_page).offset((page - 1) * per_page)
  end
end
