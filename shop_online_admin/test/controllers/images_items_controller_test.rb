require 'test_helper'

class ImagesItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @images_item = images_items(:one)
  end

  test "should get index" do
    get images_items_url
    assert_response :success
  end

  test "should get new" do
    get new_images_item_url
    assert_response :success
  end

  test "should create images_item" do
    assert_difference('ImagesItem.count') do
      post images_items_url, params: { images_item: { image: @images_item.image, item_id: @images_item.item_id } }
    end

    assert_redirected_to images_item_url(ImagesItem.last)
  end

  test "should show images_item" do
    get images_item_url(@images_item)
    assert_response :success
  end

  test "should get edit" do
    get edit_images_item_url(@images_item)
    assert_response :success
  end

  test "should update images_item" do
    patch images_item_url(@images_item), params: { images_item: { image: @images_item.image, item_id: @images_item.item_id } }
    assert_redirected_to images_item_url(@images_item)
  end

  test "should destroy images_item" do
    assert_difference('ImagesItem.count', -1) do
      delete images_item_url(@images_item)
    end

    assert_redirected_to images_items_url
  end
end
