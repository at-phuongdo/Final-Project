class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy]
  before_action :set_itemscategory, only: [:update]

  # GET /items
  # GET /items.json
  def index
    @items = Item.all
    @page = (Item.all.count - 1) / 10 + 1
      if params[:page].present? == false
        redirect_to items_path(page: 1)
      else
        @items = Item.all.limit(10).offset((params[:page].to_i - 1) * 10)
      end
  end

  # GET /items/1
  # GET /items/1.json
  def show
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
    @item = Item.new(item_params)
    respond_to do |format|
      if @item.save
        id = @item.id
        @item_category = ItemsCategory.new(category_id: params[:item][:category_id], item_id: id)
        @item_category.save
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
    respond_to do |format|
      binding.pry
      if @item.update(item_params)
        @items_category.update(category_id: params[:item][:category_id])
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
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
      @items_category = ItemsCategory.find_by(item_id: @item.id)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def item_params
      params.require(:item).permit(:name, :price, :avatar, :status, :quantity, :description, :unit_id, :shop_id)
    end
end
