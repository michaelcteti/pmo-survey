# This file is used by Rack-based servers to start the application.
require ::File.expand_path('../config/environment',  __FILE__)
if ENV['HOST']
  use Rack::CanonicalHost, ENV['HOST']
end
run Rails.application
