# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Current.user = User.create!(nickname: 'test', password: '111111')

100.times do
  name = Faker::Hobby.unique.activity
  description = Faker::Books::Lovecraft.sentence(word_count: 1, random_words_to_add: 30)
  Current.user.boards.create!(name:, description:, sharing_status: Board.sharing_statuses[:public_ro])
end

Current.user.boards.order(id: :desc).take(2).each do |board|
  100.times do |_n|
    content = Faker::Lorem.sentence(word_count: 10, supplemental: true, random_words_to_add: 50)
    board.notes.create!(content:)
  end
end

Current.user = User.create!(nickname: 'test2', password: '111111')

5.times do
  name = Faker::Hobby.unique.activity
  description = Faker::Books::Lovecraft.sentence(word_count: 1, random_words_to_add: 30)
  Current.user.boards.create!(name:, description:, sharing_status: Board.sharing_statuses[:public_rw])
end

Current.user.boards.order(id: :desc).each do |board|
  5.times do |_n|
    content = Faker::Lorem.sentence(word_count: 10, supplemental: true, random_words_to_add: 50)
    board.notes.create!(content:)
  end
end
