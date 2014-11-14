# Add your own tasks in files placed in lib/tasks ending in .rake, for example
# lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

AngularRailsApp::Application.load_tasks

if Rails.env.development? || Rails.env.test?
  require 'rubocop/rake_task'
  RuboCop::RakeTask.new
  task(:default).clear
  task default: [:coffeelint, :rubocop, :brakeman, 'bundle:audit', :spec]
end
