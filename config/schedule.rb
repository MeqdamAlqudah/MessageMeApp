every 1.day, at: '4:00 AM' do
    Session.all.each do |session|
        session.destroy
    end
  end