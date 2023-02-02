# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_02_154655) do
  create_table "boards", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sharing_status", default: 0, null: false
    t.integer "owner_id", null: false
    t.index ["name"], name: "index_boards_on_name"
    t.index ["owner_id"], name: "index_boards_on_owner_id"
  end

  create_table "notes", force: :cascade do |t|
    t.integer "board_id", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["board_id"], name: "index_notes_on_board_id"
    t.index ["user_id"], name: "index_notes_on_user_id"
  end

  create_table "relations", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "board_id", null: false
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id", "user_id"], name: "index_relations_on_board_id_and_user_id", unique: true
    t.index ["board_id"], name: "index_relations_on_board_id"
    t.index ["user_id", "board_id"], name: "index_relations_on_user_id_and_board_id", unique: true
    t.index ["user_id"], name: "index_relations_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "nickname", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["nickname"], name: "index_users_on_nickname", unique: true
  end

  add_foreign_key "boards", "users", column: "owner_id"
  add_foreign_key "notes", "boards"
  add_foreign_key "notes", "users"
  add_foreign_key "relations", "boards"
  add_foreign_key "relations", "users"
end
