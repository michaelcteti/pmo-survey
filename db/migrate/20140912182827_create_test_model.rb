class CreateTestModel < ActiveRecord::Migration
  def change
    create_table :tests do |t|
      t.string :value
    end
  end
end
