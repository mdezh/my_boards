class CreateRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :relations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :board, null: false, foreign_key: true
      t.integer :role, null: false, default: 0

      t.timestamps

      t.index %i[user_id board_id], unique: true
      t.index %i[board_id user_id], unique: true
    end
  end
end
