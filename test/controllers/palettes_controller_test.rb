require "test_helper"

class PalettesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get palettes_index_url
    assert_response :success
  end

  test "should get new" do
    get palettes_new_url
    assert_response :success
  end

  test "should get create" do
    get palettes_create_url
    assert_response :success
  end

  test "should get show" do
    get palettes_show_url
    assert_response :success
  end

  test "should get edit" do
    get palettes_edit_url
    assert_response :success
  end

  test "should get update" do
    get palettes_update_url
    assert_response :success
  end

  test "should get destroy" do
    get palettes_destroy_url
    assert_response :success
  end
end
