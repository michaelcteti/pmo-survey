# https://devcenter.heroku.com/articles/rails-unicorn

preload_app true
timeout 30
worker_processes Integer(ENV['UNICORN_WORKER_PROCESSES'] || 3)

before_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn master intercepting TERM and sending QUIT'
    Process.kill 'QUIT', Process.pid
  end

  ActiveRecord::Base.connection.disconnect!
end

after_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn worker intercepting TERM and waiting for master to send QUIT'
  end

  ActiveRecord::Base.establish_connection
end
