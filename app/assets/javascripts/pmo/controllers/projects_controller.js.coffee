pmo.controller 'ProjectsCtrl', ($scope, Projects) ->

  Projects.query().then (projects) ->
    $scope.projects = projects
