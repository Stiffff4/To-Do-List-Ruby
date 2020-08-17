require 'sinatra'

class Todolistfront < Sinatra::Base
  get '/' do
    erb :index
  end
end