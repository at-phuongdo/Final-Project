class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy]
  before_action :set_itemscategory, only: [:update, :show]
  before_action :set_image_item, only: :update
  before_action :logged

  # GET /items
  # GET /items.json
  def index
    @page_numbers = (Item.all.count / 10).ceil + 1
    page = params[:page].to_i > 0 ? params[:page].to_i : 1
    @items = Item.all.limit(10).offset((page - 1) * 10)
    paginate(@page_numbers, page)
  end

  # GET /items/1
  # GET /items/1.json
  def show
    unit = Unit.find_by(id: @item.unit_id)
    @unit_name = unit ? unit.name : 'NULL'
    ids = @items_category.map(&:category_id)
    @category_name = Category.where(id: ids)
    shop = Shop.find_by(id: @item.shop_id)
    @shop_name = shop ? shop.name : 'NULL'
  end

  # GET /items/new
  def new
    @item = Item.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  # POST /items.json
  def create
    if params[:item][:avatar]
      image = Cloudinary::Uploader.upload(params[:item][:avatar])
      params[:item][:avatar] = image['url']
    end
    @item = Item.new(item_params)
    respond_to do |format|
      if @item.save
        id = @item.id
        params[:category_id].each do |id_item|
          ItemsCategory.create(category_id: id_item, item_id: id)
        end
        if params[:item][:image_id]
          params[:item][:image_id].each do |image|
            img = Cloudinary::Uploader.upload(image)
            url = img['url']
            ImagesItem.create(image: url, item_id: id)
          end
        end
        format.html { redirect_to @item, notice: 'Item was successfully created.' }
        format.json { render :show, status: :created, location: @item }
      else
        format.html { render :new }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
    binding.pry
    if params[:item][:avatar]
      image = Cloudinary::Uploader.upload(params[:item][:avatar])
      params[:item][:avatar] = image['url']
    end
    respond_to do |format|
      if @item.update(item_params)
        Item.update_item(params[:id], @items_category, params[:category_id]) if params[:category_id]
        Item.update_image_items(params[:id], @image_item, params[:item][:image_id]) if params[:item][:image_id]
        format.html { redirect_to @item, notice: 'Item was successfully updated'}
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item.destroy
    ItemsCategory.where(id: params[:id]).destroy_all
    respond_to do |format|
      format.html { redirect_to items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    def set_itemscategory
      @items_category = ItemsCategory.where(item_id: @item.id)
    end

    def set_image_item
      @image_item = ImagesItem.where(item_id: @item.id)
    end

  # Never trust parameters from the scary internet, only allow the white list through.
  def item_params
    params.require(:item).permit(:name, :price, :avatar, :status, :quantity, :description, :unit_id, :shop_id, :image_id)
  end
end
