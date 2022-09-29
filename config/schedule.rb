
every 5.day, at:'4:00 AM' do 
    Message.all.each do |message|
        message.destroy
    end
end