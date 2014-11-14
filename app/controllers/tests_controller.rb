class TestsController < ApplicationController
  def index
    @value = Test.first.value
    render json: @value
  end
end
