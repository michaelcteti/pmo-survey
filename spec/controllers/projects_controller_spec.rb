require 'spec_helper'

RSpec.describe Api::ProjectsController, :type => :controller do

  describe "GET index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST create" do
    it 'correctly saves a new project' do
      post :create,
           pid:444,
           name: 'test project',
           format: :json

      expect(Project.last.pid).to eq 444
      expect(Project.last.name).to eq 'test project'
    end
  end
end
