# MyApplication::Application.config.session_store :redis_store,
#   servers: ["redis://localhost:3000/0/session"],
#   expire_after: 90.minutes,
#   key: "_#{Rails.application.class.parent_name.downcase}_session",
#   threadsafe: true,
#   secure: true