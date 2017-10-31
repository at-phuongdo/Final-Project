class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy, :reset_password]
  before_action :logged

  # GET /users
  # GET /users.json
  def index
    if current_user.role == 'root_admin'
      @page_numbers = (User.where.not(role: ['root_admin']).count / 10).ceil + 1
      page = params[:page].to_i > 0 ? params[:page].to_i : 1
      @users = User.where.not(role: ['root_admin']).order(created_at: :DESC).limit(10).offset((page - 1) * 10)
    else
      @page_numbers = (User.where.not(role: ['root_admin', 'admin']).count / 10).ceil + 1
      page = params[:page].to_i > 0 ? params[:page].to_i : 1
      @users = User.where.not(role: ['root_admin', 'admin']).order(created_at: :DESC).limit(10).offset((page - 1) * 10)
    end
    paginate(@page_numbers, page)
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    if params[:user][:avatar]
      image = Cloudinary::Uploader.upload(params[:user][:avatar])
      params[:user][:avatar] = image['url']
    end
    @user = User.new(user_params)
    respond_to do |format|
      if @user.save
        @user.update(confirm_at: Time.now)
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    if params[:user][:avatar]
      image = Cloudinary::Uploader.upload(params[:user][:avatar])
      params[:user][:avatar] = image['url']
    end
    respond_to do |format|
      if params[:user][:avatar]
        res = Cloudinary::Uploader.upload(params[:user][:avatar])
        params[:user][:avatar] = res['url']
      end
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def reset_password
    @user.update(password: '12345')
  end

  def profile
  end

  def search
    q = params[:q]
    @users_search = User.search(firstname_or_lastname_or_email_cont: q).result
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:email, :password, :firstname, :lastname, :phone, :address, :gender, :birthday, :avatar, :role, :password_confirmation)
    end
  end
