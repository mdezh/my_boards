# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

test_user = User.create!(nickname: 'test', password: '111111')
test2_user = User.create!(nickname: 'test2', password: '111111')

100.times do
  name = Faker::Hobby.unique.activity
  description = Faker::Books::Lovecraft.sentence(word_count: 1, random_words_to_add: 30)
  test_user.boards.create!(name:, description:)
end

5.times do
  name = Faker::Hobby.unique.activity
  description = Faker::Books::Lovecraft.sentence(word_count: 1, random_words_to_add: 30)
  test2_user.boards.create!(name:, description:)
end

test_user.boards.order(id: :desc).take(2).each do |board|
  100.times do |_n|
    content = Faker::Lorem.sentence(word_count: 10, supplemental: true, random_words_to_add: 50)
    board.notes.create!(content:)
  end
end

test2_user.boards.order(id: :desc).each do |board|
  5.times do |_n|
    content = Faker::Lorem.sentence(word_count: 10, supplemental: true, random_words_to_add: 50)
    board.notes.create!(content:)
  end
end
