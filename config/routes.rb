ActionController::Routing::Routes.draw do |map|
  map.connect 'logged_exceptions/:action/:id', :controller => 'logged_exceptions'
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
