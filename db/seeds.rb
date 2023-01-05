# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

100.times do
  name = Faker::Hobby.unique.activity
  description = Faker::Books::Lovecraft.sentence(word_count: 1, random_words_to_add: 30)
  Board.create(name:, description:)
end

boards = Board.order(id: :desc).take(2)

boards.each do |board|
  100.times do |n|
    content = n.to_s + ' '
    content << Faker::Lorem.sentence(word_count: 10, supplemental: true, random_words_to_add: 50)
    board.notes.create(content:)
  end
end
