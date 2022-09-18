class DropMessageFromMessages < ActiveRecord::Migration[7.0]
  def change
    remove_column :messages, :message
    add_column :messages, :body, :string
    # Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
