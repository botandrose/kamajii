ActionController::Routing::Routes.draw do |map|
  map.connect ':controller/:action/:id', :defaults => { :controller => 'logged_exceptions' }
  map.connect ':controller/:action/:id.:format'
end
