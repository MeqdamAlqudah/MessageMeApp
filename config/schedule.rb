
every 1.day, at:'1:00 AM' do 
    Message.all.each do |message|
        message.destroy
    end
end