class Project < ActiveRecord::Base
  validates :pid, presence: true
  validates :name, presence: true
end
