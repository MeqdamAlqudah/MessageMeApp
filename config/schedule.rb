every 1.day, at: '4:00 AM' do
    Session.all.each do |session|
        session.destroy
    end
    
  end

every 5.day, at:'4:00 AM' do 
    Message.all.each do |message|
        message.destroy
    end
end