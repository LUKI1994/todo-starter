require_relative "item"
require 'colorize'
require 'fileutils'

class List
  attr_reader :lines
  attr_accessor :items, :name, :id
  
  def initialize(id)
    @id = id
    @lines = []
    @items = []
  end

  def load_from_file
    @lines = File.read(filename).split("\n")
    @name = @lines.shift # get the first line to be the List name
    @items = @lines.map.with_index {|line, index| Item.new_from_line(line, index)}
  end

  def filename
    "data/#{id}.md"
  end

  def toggle_item(name)
    puts "Finding |#{name}|"
    item = items.find{|e| e.name == name}
    if item
      item.toggle!
    else
      puts "item not found: #{name}"
    end
  end

  def add(name)
    self.items << Item.new(name)
  end

  def save!
    lines = [name] + @items.map(&:display_line)
    File.write(filename, lines.join("\n"))
  end

  def self.load_all
    files = Dir["data/*.md"]
    files.map do |f|
      list = List.new(f[5])
      list.load_from_file
      list
    end
  end

  def self.reorder(sequence)
    Dir.mkdir 'data_temp'
    original = []    
    Dir["data/*.md"].each { |file| original << file[5] }
    p sequence

    sequence.each_with_index do |new_name, new_index|
      File.open("data/#{new_index}.md", "r") do |old_file|      
        File.open("data_temp/#{new_name}.md", "w") do |f| 
          old_file.each_line do |line|
            f.write line
          end
        end
      end
    end

    FileUtils.rm_rf("data")
    FileUtils.mv "data_temp", "data"
  # Closing reorder
  end

# Closing class List
end