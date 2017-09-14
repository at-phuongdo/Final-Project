# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
avatar = ['https://vn-live-02.slatic.net/p/2/apple-iphone-7-plus-128gb-do-hang-nhap-khau-1490340009-6570105-d74e5537cdd98f6a4e47bc5ad8045bca-webp-product.jpg',
          'https://vn-live-01.slatic.net/p/2/image-4483584-7895262331b1b1fe447781f0637282e4-catalog_233.jpg',
          'https://vn-live-01.slatic.net/p/2/image-4043672-333a3a442f18d22163d2aabde4760bb9-catalog_233.jpg',
          'http://vn-live-01.slatic.net/p/2/apple-ipad-2017-97-4g-32gb-vang-hang-nhap-khau-1495519218-2851995-5c0f7c4ea27524d709ad9998c0e712f0-webp-catalog_233.jpg',
          'http://vn-live-01.slatic.net/p/2/apple-macbook-air-mmgf2-133-inch-128gb-bac-hang-nhap-khau-1472557222-0899862-367f8bcb3fd168f816408b1501c37aa9-webp-catalog_233.jpg',
          'http://vn-live-02.slatic.net/p/8/dong-ho-nam-day-thep-the-thao-temeite-ch400-bk-1502510522-37867301-5aa1f68de15f5ecb096240b5ebda7538-webp-catalog_233.jpg',
          'https://vn-live-01.slatic.net/p/8/image-6087082-ec3f9fb85222243d395f1fe76f80d72c-catalog_233.jpg',
          'https://vn-live.slatic.net/cms/sub-chuot-choi-game.jpg',
          'http://vn-live-01.slatic.net/p/2/ban-phim-co-aula-f2009-led-7-mau-vang-trang-khuyen-mai-ban-diaula-1495017098-9025585-de6c2041cee2ca36c346e8c38e50eb6d-webp-catalog_233.jpg',
          'http://vn-live-03.slatic.net/p/2/ban-phim-co-cao-cap-chuyen-game-langtu-x5000-1500291110-5535428-e56d69fb9a34055a85de828f4a30ab04-webp-catalog_233.jpg'
]
# 10.times do |i|
#   item = Item.new(name: "Product#{i + 1}", price: (rand(100)+1)*1000, avatar: avatar[i],
#     status: 'Còn hàng', quantity: rand(100)+10, shop_id: rand(4)+1, unit_id: rand(9))

#   item.save
# end
# dv = ['chai', 'kilogam', 'gam', 'cái', 'lit', 'mililit', 'hộp']
# syntax = ['chai', 'kg', 'g', 'cái', 'l', 'ml', 'hộp']

#   item = Item.new(name: "item#{i + 1}", price: rand(10000), avatar: 'https://vcdn.tikicdn.com/assets/media/tuyen-tap-dien-thoai.jpg',
#     status: 'Còn hàng', quantity: rand(100), shop_id: rand(9), unit_id: rand(9))
#   item.save
# end
# 10.times do |i|
#   unit = Unit.new(name: dv[i], syntax: syntax[i])
#   unit.save
# end

# 10.times do |i|
#   shop = Shop.new(name: "shop #{i}", email: "shop#{i}@gmail.com")
#   shop.save
# end


# 15.times do 
#   images_items = ImagesItem.create(image: avatar[rand(9)], item_id: rand(8)+8)
# end

# 10.times do |i|
#   orderItem = OrderItem.new(price: 123456, item_id: rand(9), quantity:rand(5), order_id: 1)
#   orderItem.save
# end

# 10.times do 
#   ItemsCategory.create(item_id: rand(14)+8, category_id: rand(2)+1)
# end

# name = ['Laptop', 'Phone', 'Headphone', 'Book', 'Milk']
# 5.times do |i|
#   Category.create(name: name[i], description: "description#{i+1}", parent_id: 1)
# end