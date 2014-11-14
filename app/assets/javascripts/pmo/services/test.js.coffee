pmo.service 'Test', ($http) ->
  urlBase = "/test"

  get: ->
    $http.post(urlBase).then (response) ->
      response.data
