require 'test_helper'

class ItemsCategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @items_category = items_categories(:one)
  end

  test "should get index" do
    get items_categories_url
    assert_response :success
  end

  test "should get new" do
    get new_items_category_url
    assert_response :success
  end

  test "should create items_category" do
    assert_difference('ItemsCategory.count') do
      post items_categories_url, params: { items_category: { category_id: @items_category.category_id, item_id: @items_category.item_id } }
    end

    assert_redirected_to items_category_url(ItemsCategory.last)
  end

  test "should show items_category" do
    get items_category_url(@items_category)
    assert_response :success
  end

  test "should get edit" do
    get edit_items_category_url(@items_category)
    assert_response :success
  end

  test "should update items_category" do
    patch items_category_url(@items_category), params: { items_category: { category_id: @items_category.category_id, item_id: @items_category.item_id } }
    assert_redirected_to items_category_url(@items_category)
  end

  test "should destroy items_category" do
    assert_difference('ItemsCategory.count', -1) do
      delete items_category_url(@items_category)
    end

    assert_redirected_to items_categories_url
  end
end
