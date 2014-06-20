class CreateRecipesTable < ActiveRecord::Migration
  def change

    create_table :recipes do |t|
      t.belongs_to :user
      t.string :recipe_url
      t.string :dish_name
      t.string :notes
      t.string :cookdate
      t.timestamps
    end
  end
end
