exports.sendChat = function(userId, message, time,touserid,photos,connection, callback) {
    photos = JSON.stringify(photos);
    connection.query(`INSERT INTO chats (userId, messages, time, touserid, photos)  VALUES (${userId}, "${message}", ${time}, ${touserid}, ${photos})`, function (err, result, fields){
        callback(err, result, fields);
    });
}

exports.getAllChats = function(connection, callback) {
    connection.query(`SELECT * FROM chats`, function (err, result, fields){
        callback(err, result, fields);
    });
}

