# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# 10.times do |i|

#   # item = Item.new(name: "phuong", unit_id: 1, shop_id: 1)
#   item = Item.new(name: "item#{i + 1}",unit_id: 1, shop_id: 1, price: rand(10000), avatar: 'https://vcdn.tikicdn.com/assets/media/tuyen-tap-dien-thoai.jpg', status: 'Còn hàng', quantity: rand(100))
#   # binding.pry
#   item = Item.new(name: "item#{i + 1}", price: rand(10000), avatar: 'https://vcdn.tikicdn.com/assets/media/tuyen-tap-dien-thoai.jpg',
#     status: 'Còn hàng', quantity: rand(100), shop_id: rand(9), unit_id: rand(9))

#   item.save
# end

# 10.times do |i|
#   unit = Unit.new(name: "DVT#{i}", syntax: "DVT#{i}")
#   unit.save
# end

# 10.times do |i|
#   shop = Shop.new(name: "shop #{i}", email: "shop#{i}@gmail.com")
#   shop.save
# end


# 10.times do 
#   images_items = ImagesItem.create(image: 'https://vcdn.tikicdn.com/assets/media/tuyen-tap-dien-thoai.jpg', item_id: rand(10)+1)
# end

# 10.times do |i|
#   orderItem = OrderItem.new(price: 123456, item_id: rand(9), quantity:rand(5), order_id: 1)
#   orderItem.save
# end

# 10.times do 
#   ItemsCategory.create(item_id: rand(10), category_id: rand(3))
# end

# 5.times do 
#   Category.create(name: 'notebook', description: 'aaa', parent_id: 1)
# end