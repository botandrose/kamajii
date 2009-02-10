# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_kamajii_session',
  :secret      => '1b9f7800e3a9a7431ff0aa28c610e642b91c1627bdfb406a7b9e8784e0606059d7e9850576741ab1678636601a7b7fcf968b22a1aefcf2e92fa511f4486d1faf'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
