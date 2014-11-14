require 'spec_helper'

RSpec.describe Project, :type => :model do
  it { should validate_presence_of :pid }
  it { should validate_presence_of :name }
end
