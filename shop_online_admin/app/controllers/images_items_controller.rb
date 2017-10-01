class ImagesItemsController < ApplicationController
  before_action :set_images_item, only: [:show, :edit, :update, :destroy]
  before_action :logged

  # GET /images_items
  # GET /images_items.json
  def index
    @images_items = ImagesItem.all
  end

  # GET /images_items/1
  # GET /images_items/1.json
  def show
  end

  # GET /images_items/new
  def new
    @images_item = ImagesItem.new
  end

  # GET /images_items/1/edit
  def edit
  end

  # POST /images_items
  # POST /images_items.json
  def create
    @images_item = ImagesItem.new(images_item_params)

    respond_to do |format|
      if @images_item.save
        format.html { redirect_to @images_item, notice: 'Images item was successfully created.' }
        format.json { render :show, status: :created, location: @images_item }
      else
        format.html { render :new }
        format.json { render json: @images_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /images_items/1
  # PATCH/PUT /images_items/1.json
  def update
    respond_to do |format|
      if @images_item.update(images_item_params)
        format.html { redirect_to @images_item, notice: 'Images item was successfully updated.' }
        format.json { render :show, status: :ok, location: @images_item }
      else
        format.html { render :edit }
        format.json { render json: @images_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /images_items/1
  # DELETE /images_items/1.json
  def destroy
    @images_item.destroy
    respond_to do |format|
      format.html { redirect_to images_items_url, notice: 'Images item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_images_item
      @images_item = ImagesItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def images_item_params
      params.require(:images_item).permit(:image, :item_id)
    end
end
