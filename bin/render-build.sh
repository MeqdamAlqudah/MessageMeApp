set -o errexit

bundle install
rails webpacker:install
rails webpacker:install:react 
rails generate react
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate