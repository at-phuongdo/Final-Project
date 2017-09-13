class Api::V1::CommentsController < ApplicationController
  def index
    item_id = params[:item].to_i
    page = params[:page].to_i || Common::Com::Comment::PAGE_DEFAULT
    per_page = Common::Com::Comment::PER_PAGE
    comments = Comment.where(item_id: item_id).order('id DESC')
    total = (comments.length - 1) / per_page + 1
    if comments
      render json: comments.paging(page, per_page), adapter: :json, meta: { total: total, status: :ok}
    else
      render json: { status: :no_content }
    end
  end
  def create
    confirm_token = request.headers['Access-token']
    user = User.find_by(confirm_token: confirm_token)
    if user
      order = Order.where(user_id: user.id)
      ids = Order.get_all_product_in_order(order).map(&:id)
      if ids.include?(params[:item_id].to_i)
        comment = Comment.new(user_id: user.id, item_id: params[:item_id], content: params[:comment][:content])
        if comment.save
          render json: comment, status: :ok
        else
          render json: { status: :unprocessable_entity }
        end
      else
        render json: { status: :no_content }
      end
    else
      render json: { status: :unprocessable_entity }
    end
  end
end
