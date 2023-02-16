# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Current.user = test_user = User.create!(nickname: 'test', password: '111111')

100.times do |i|
  name = Faker::Hobby.unique.activity
  description = Faker::Books::Lovecraft.sentence(word_count: 1, random_words_to_add: 30)
  Current.user.boards.create!(name:, description:,
                              sharing_status: if i.even?
                                                Board.sharing_statuses[:public_rw]
                                              else
                                                Board.sharing_statuses[:public_ro]
                                              end)
end

Current.user.boards.order(id: :desc).each.with_index do |board, i|
  (i < 5 ? 100 : rand(1..5)).times do |_n|
    content = Faker::Lorem.sentence(word_count: 10, supplemental: true, random_words_to_add: 50)
    board.notes.create!(content:)
  end
end

Current.user = test2_user = User.create!(nickname: 'test2', password: '111111')

5.times do |i|
  name = Faker::Hobby.unique.activity
  description = Faker::Books::Lovecraft.sentence(word_count: 1, random_words_to_add: 30)
  Current.user.boards.create!(name:, description:,
                              sharing_status: if i.even?
                                                Board.sharing_statuses[:public_rw]
                                              else
                                                Board.sharing_statuses[:public_ro]
                                              end)
end

Current.user.boards.order(id: :desc).each do |board|
  5.times do
    content = Faker::Lorem.sentence(word_count: 10, supplemental: true, random_words_to_add: 50)
    board.notes.create!(content:)
  end
end

Board.where(owner: test_user).order(id: :desc).take(3).each do |board|
  Relation.create!(board:, user: test2_user, role: Relation.roles[:subscriber])
end

Board.where(owner: test2_user).order(id: :desc).take(3).each do |board|
  Relation.create!(board:, user: test_user, role: Relation.roles[:subscriber])
end
