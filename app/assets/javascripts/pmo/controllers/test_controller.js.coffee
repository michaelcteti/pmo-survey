pmo.controller 'TestCtrl', ($scope, Test) ->

  $scope.testVariable = "Hello World!"
  Test.get().then (test) ->
    $scope.testReturn = test
