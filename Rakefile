# Add your own tasks in files placed in lib/tasks ending in .rake, for example
# lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

AngularRailsApp::Application.load_tasks

if Rails.env.development? || Rails.env.test?
  require 'rubocop/rake_task'
  RuboCop::RakeTask.new
end

task checks: [:rubocop, :coffeelint]
task(:default).clear
task default: [:spec, :checks]

if defined?(RSpec)
  RSpec::Core::RakeTask.new(:ci_spec) do |t|
    t.rspec_opts = '-fd --no-color --tag ~exclude_from_ci'
  end

  task ci: [:ci_spec, :checks]
end
