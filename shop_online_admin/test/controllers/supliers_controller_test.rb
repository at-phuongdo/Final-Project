require 'test_helper'

class SupliersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @suplier = supliers(:one)
  end

  test "should get index" do
    get supliers_url
    assert_response :success
  end

  test "should get new" do
    get new_suplier_url
    assert_response :success
  end

  test "should create suplier" do
    assert_difference('Suplier.count') do
      post supliers_url, params: { suplier: { email: @suplier.email, parent_id: @suplier.parent_id, password: @suplier.password, shop_id: @suplier.shop_id, username: @suplier.username } }
    end

    assert_redirected_to suplier_url(Suplier.last)
  end

  test "should show suplier" do
    get suplier_url(@suplier)
    assert_response :success
  end

  test "should get edit" do
    get edit_suplier_url(@suplier)
    assert_response :success
  end

  test "should update suplier" do
    patch suplier_url(@suplier), params: { suplier: { email: @suplier.email, parent_id: @suplier.parent_id, password: @suplier.password, shop_id: @suplier.shop_id, username: @suplier.username } }
    assert_redirected_to suplier_url(@suplier)
  end

  test "should destroy suplier" do
    assert_difference('Suplier.count', -1) do
      delete suplier_url(@suplier)
    end

    assert_redirected_to supliers_url
  end
end
