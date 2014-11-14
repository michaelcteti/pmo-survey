class Api::ProjectsController < ApplicationController
  def index
    render json: Project.all
  end

  def create
    project = Project.new(project_params)
    if project.save
      render json: project
    end
  end

  private

  def project_params
    params.permit(
      :pid,
      :name
    )
  end
end
