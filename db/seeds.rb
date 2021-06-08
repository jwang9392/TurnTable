# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Venue.destroy_all
Reservation.destroy_all

User.create!({
    fname: 'Guest',
    lname: 'User',
    email: 'hello@world.com',
    password: 'helloworld',
    username: 'hello world',
    phone_number: '123-456-7890'
})

100.times do
    location = Venue::CITIES.sample
    price_range = Venue::PRICE_RANGES.sample
    genre = Venue::GENRES.sample
    
    Venue.create!({
        name: Faker::Beer.hop,
        phone_number: Faker::PhoneNumber.cell_phone,
        address: Faker::Address.street_address,
        city: location.first,
        state: location.last,
        zipcode: Faker::Address.zip,
        capacity: (rand(2..20) * 10),
        price: price_range,
        genre: genre
    })
end

Reservation.create!({
  time: "9:00PM",
  date: Date.today,
  occasion: nil,
  special_request: nil,
  party_size: 4,
  user_id: User.first.id,
  venue_id: Venue.first.id
})