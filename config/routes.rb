ActionController::Routing::Routes.draw do |map|
  map.connect ':action/:id', :controller => 'logged_exceptions'
end
