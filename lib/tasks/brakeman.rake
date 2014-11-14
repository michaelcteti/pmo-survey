task :brakeman do
  require 'brakeman'

  report = Brakeman.run(app_path: '.', print_report: true)

  if report.filtered_warnings.present?
    abort
  end
end
