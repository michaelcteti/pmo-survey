namespace :git do
  namespace :diff do
    task :check do
      unless system('git --no-pager diff --check origin/master')
        abort
      end
    end
  end
end
