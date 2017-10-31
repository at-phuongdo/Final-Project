class ItemsCategoriesController < ApplicationController
  before_action :set_items_category, only: [:show, :edit, :update, :destroy]
  before_action :logged

  # GET /items_categories
  # GET /items_categories.json
  def index
    @items_categories = ItemsCategory.all
  end

  # GET /items_categories/1
  # GET /items_categories/1.json
  def show
  end

  # GET /items_categories/new
  def new
    @items_category = ItemsCategory.new
  end

  # GET /items_categories/1/edit
  def edit
  end

  # POST /items_categories
  # POST /items_categories.json
  def create
    @items_category = ItemsCategory.new(items_category_params)

    respond_to do |format|
      if @items_category.save
        format.html { redirect_to @items_category, notice: 'Items category was successfully created.' }
        format.json { render :show, status: :created, location: @items_category }
      else
        format.html { render :new }
        format.json { render json: @items_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /items_categories/1
  # PATCH/PUT /items_categories/1.json
  def update
    respond_to do |format|
      if @items_category.update(items_category_params)
        format.html { redirect_to @items_category, notice: 'Items category was successfully updated.' }
        format.json { render :show, status: :ok, location: @items_category }
      else
        format.html { render :edit }
        format.json { render json: @items_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items_categories/1
  # DELETE /items_categories/1.json
  def destroy
    @items_category.destroy
    respond_to do |format|
      format.html { redirect_to items_categories_url, notice: 'Items category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_items_category
      @items_category = ItemsCategory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def items_category_params
      params.require(:items_category).permit(:item_id, :category_id)
    end
end
