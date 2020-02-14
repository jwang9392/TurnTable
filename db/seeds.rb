# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Venue.destroy_all

User.create!({
    fname: 'Guest',
    lname: 'User',
    email: 'hello@world.com',
    password: 'helloworld',
    username: 'hello world'
})

250.times do
    location = Venue::CITIES.sample
    
    Venue.create!({
        name: Faker::Beer.hop,
        phone_number: Faker::PhoneNumber.cell_phone,
        address: Faker::Address.street_address,
        city: location.first,
        state: location.last,
        zipcode: Faker::Address.zip,
        capacity: (rand(2..20) * 10)
    })
end