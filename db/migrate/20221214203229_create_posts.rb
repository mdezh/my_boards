class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.references :room, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
