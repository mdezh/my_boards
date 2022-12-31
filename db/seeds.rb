# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

100.times do
  name = (1..rand(1..5)).map { Faker::Hobby.activity }.join(' ')
  description = Faker::Lorem.sentence(word_count: 1, supplemental: true, random_words_to_add: 30)
  Board.create(name:, description:)
end

board = Board.last

10.times do
  content = Faker::Lorem.sentence(word_count: 10, supplemental: true, random_words_to_add: 50)
  board.notes.create(content:)
end
