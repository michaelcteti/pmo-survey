source 'https://rubygems.org'

ruby '2.1.2'

gem 'angularjs-rails'
gem 'angular-rails-templates'
gem 'compass-rails'
gem 'chosen-rails'
gem 'coffee-rails'
gem 'dotenv-rails'
gem 'jquery-rails'
gem 'ng-rails-csrf'
gem 'pg'
gem 'rabl'
gem 'rack-timeout'
gem 'rails', '4.1.5'
gem 'sass-rails'
gem 'uglifier', '>= 1.3.0'
gem 'underscore-rails'
gem 'unicorn'

group :development do
  gem 'foreman'
  gem 'spring-commands-rspec'
end

group :development, :test do
  gem 'brakeman', require: false
  gem 'bundler-audit', require: false
  gem 'coffeelint'
  gem 'pry'
  gem 'rspec-rails'
  gem 'rubocop'
  gem 'therubyracer'
end

group :development, :test, :staging, :demo, :production do
  gem 'factory_girl_rails'
  gem 'faker'
end

group :production do
  gem 'rack-canonical-host'
  gem 'rails_12factor'
end

group :test do
  gem 'capybara'
  gem 'capybara-angular'
  gem 'capybara-screenshot'
  gem 'database_cleaner'
  gem 'i18n-missing_translations'
  gem 'json_spec'
  gem 'minitest'
  gem 'poltergeist'
  gem 'rspec-instafail'
  gem 'selenium-webdriver'
  gem 'should_not'
  gem 'shoulda-matchers', '2.5.0'
end
