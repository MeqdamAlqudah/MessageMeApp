redis = { db: 4, url: 'redis://localhost:6379/0' }

Sidekiq.configure_client do |config|
  config.redis = redis
end

Sidekiq.configure_server do |config|
  config.redis = redis
end