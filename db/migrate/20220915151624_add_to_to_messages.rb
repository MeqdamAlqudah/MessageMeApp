class AddToToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :to, :string, default: 'EveryOne'
    # Ex:- change_column("admin_users", "email", :string, :limit =>25)
    # Ex:- :default =>''
    # Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
