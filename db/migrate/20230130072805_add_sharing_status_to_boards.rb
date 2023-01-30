class AddSharingStatusToBoards < ActiveRecord::Migration[7.0]
  def change
    add_column :boards, :sharing_status, :integer, null: false, default: 0
  end
end
