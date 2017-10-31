class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update, :destroy]
  before_action :logged

  # GET /categories
  # GET /categories.json
  def index
    list_cate = Category.where(parent_id: 0).order(created_at: :DESC)
    @page_numbers = ((list_cate.count - 1) / 5).ceil + 1
    page = params[:page].to_i > 0 ? params[:page].to_i : 1
    @parent_cate = list_cate.limit(5).offset((page - 1) * 5)
    paginate(@page_numbers, page)
    @parent_cate = Category.where(parent_id: 0).order(created_at: :DESC)
  end

  # GET /categories/1
  # GET /categories/1.json
  def show
    parent = Category.find_by(id: @category.parent_id)
    @parent_name = parent ? Category.find_by(id: @category.parent_id).name : 'This is parent category'
    items_category = @category.items
    @page_numbers = (items_category.order(created_at: :DESC).count / 10).ceil + 1
    page = params[:page].to_i > 0 ? params[:page].to_i : 1
    @items_category = items_category.order(created_at: :DESC).limit(10).offset((page - 1) * 10)
    paginate(@page_numbers, page)
  end

  # GET /categories/new
  def new
    @category = Category.new
  end

  # GET /categories/1/edit
  def edit
  end

  # POST /categories
  # POST /categories.json
  def create
    @category = Category.new(category_params)
    respond_to do |format|
      if @category.save
        format.html { redirect_to @category, notice: 'Category was successfully created.' }
        format.json { render :show, status: :created, location: @category }
      else
        format.html { render :new }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /categories/1
  # PATCH/PUT /categories/1.json
  def update
    respond_to do |format|
      if @category.update(category_params)
        format.html { redirect_to @category, notice: 'Category was successfully updated.' }
        format.json { render :show, status: :ok, location: @category }
      else
        format.html { render :edit }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /categories/1
  # DELETE /categories/1.json
  def destroy
    if @category.parent_id == 0
      sub_cate = Category.where(parent_id: @category.id)
      if sub_cate
        sub_cate.each do |sub_cat|
          list_items = sub_cat.items
          if list_items[0]
            list_items.each do |item|
              count_item = ItemsCategory.where(item_id: item.id).count
              item.destroy if count_item == 1
              ItemsCategory.where('category_id = ? AND item_id = ?', sub_cat.id, item.id).destroy_all
            end
          end
        end
      end
      sub_cate.destroy_all
    end
    @category.destroy
    respond_to do |format|
      format.html { redirect_to categories_url, notice: 'Category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def category_params
      params.require(:category).permit(:name, :description, :parent_id)
    end
  end
