pmo.service 'Projects', ($http) ->
  urlBase = "/projects"

  query: ->
    $http.get(urlBase).then (response) ->
      response
