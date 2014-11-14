pmo.config ($routeProvider) ->
  $routeProvider.when('/tests',
      controller: 'TestCtrl'
      templateUrl: 'test.html'
    ).when('/projects',
      controller: 'ProjectsCtrl'
      templateUrl: 'projects.html'
    ).when('/',
      controller: 'HomeCtrl',
      templateUrl: 'home.html'
    )
