class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def paginate page_numbers
    if page_numbers <= 10
      @start_page = 1
      @end_page = page_numbers
    elsif page <= 6
      @start_page = 1
      @end_page = 10
    elsif page + 4 >= page_numbers
      @start_page = page_numbers - 9
      @end_page = page_numbers
    else
      @start_page = page - 5
      @end_page = page + 4
    end
  end
end
