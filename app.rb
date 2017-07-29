require 'bundler/setup'
require 'colorize'
require 'fileutils'

Bundler.require

require_relative "list"

def debug_params
  puts "\n"
  puts "PARAMS: #{params}".colorize(:light_red)
end

get "/" do
  @title = "My Todo List!"
  lists = List.load_all
  erb :"index.html", locals: {lists: lists}, layout: :"layout.html"
end

# UPDATE a list with id from params["id"]
post "/lists/update" do
  list = List.new(params["id"])
  list.name = params["name"]
  # no need to load from file. we will save new contents to file

  items = params["items"].map do |item_hash|
    puts "creating Item from item_hash: #{item_hash}".colorize(:green)
    Item.new(item_hash["name"], item_hash["status"])
  end

  list.items = items

  debug_params
  if params["toggle"]
    puts "Toggle: #{params["toggle"]}"
    list.toggle_item(params["toggle"])
  end

  list.save!
  redirect back
end

post "/lists/:id/items/add" do
  list = List.new(params["id"])
  list.load_from_file
  puts "Creating item #{params['name']} for list #{params['id']}"
  if params["name"]
    list.add(params["name"])
    list.save!
  end
  redirect back
end

post "/lists" do
  file = File.open("./data/#{params["new-file"]}.md", "w") {|f| f.write("#{params["list-name"]}") }  
  redirect back
end

post "/lists/:id/rename" do
  debug_params
  lists = List.load_all
  lists.each do |l|
    if params[:id] == l.id
      l.load_from_file
      l.name = params["new_name"]
      l.save!
    end
  end
  redirect back
end

post "/lists/reorder" do 
  List.reorder(params["new_order"])
  redirect back
end