@pmo = angular.module('pmo', [
  'localytics.directives',
  'ng-rails-csrf',
  'ngAnimate',
  'ngResource',
  'ngRoute',
  'templates',
])

pmo.config ($locationProvider) ->
  $locationProvider.html5Mode(true)
