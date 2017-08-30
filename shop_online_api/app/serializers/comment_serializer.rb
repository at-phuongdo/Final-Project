class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :item_id, :user_id
end
