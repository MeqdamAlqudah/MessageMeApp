set -o errexit

bundle install
bundle exec rails webpacker:install
bundle exec rails webpacker:install:react 
bundle exec rails generate react
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate