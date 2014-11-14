class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.integer :pid null:false
      t.text :name null:false
      t.timestamps
    end
  end
end
