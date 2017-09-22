class SupliersController < ApplicationController
  before_action :set_suplier, only: [:show, :edit, :update, :destroy]

  # GET /supliers
  # GET /supliers.json
  def index
    @supliers = Suplier.all
  end

  # GET /supliers/1
  # GET /supliers/1.json
  def show
  end

  # GET /supliers/new
  def new
    @suplier = Suplier.new
  end

  # GET /supliers/1/edit
  def edit
  end

  # POST /supliers
  # POST /supliers.json
  def create
    @suplier = Suplier.new(suplier_params)

    respond_to do |format|
      if @suplier.save
        format.html { redirect_to @suplier, notice: 'Suplier was successfully created.' }
        format.json { render :show, status: :created, location: @suplier }
      else
        format.html { render :new }
        format.json { render json: @suplier.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /supliers/1
  # PATCH/PUT /supliers/1.json
  def update
    respond_to do |format|
      if @suplier.update(suplier_params)
        format.html { redirect_to @suplier, notice: 'Suplier was successfully updated.' }
        format.json { render :show, status: :ok, location: @suplier }
      else
        format.html { render :edit }
        format.json { render json: @suplier.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /supliers/1
  # DELETE /supliers/1.json
  def destroy
    @suplier.destroy
    respond_to do |format|
      format.html { redirect_to supliers_url, notice: 'Suplier was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_suplier
      @suplier = Suplier.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def suplier_params
      params.require(:suplier).permit(:username, :password, :email, :parent_id, :shop_id)
    end
end
