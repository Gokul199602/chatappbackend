exports.callLogin = function(Email, Password,connection, callback) {
    connection.query(`SELECT * FROM users WHERE email ="${Email}" AND password = "${Password}"`, function (err, result, fields){
        callback(err, result, fields);
    });
}

exports.checkEmail = function(email,connection, callback) {
    connection.query(`SELECT email FROM users WHERE email ="${email}"`,function (err, result, fields){
        callback(err, result, fields);
    })
}

exports.registerForm = function(firstName,lastName,email,password,connection, callback) {
    connection.query(`INSERT INTO users (FirstName,LastName,email,password) VALUES ("${firstName}","${lastName}","${email}","${password}")`, function (err, result, fields){
        callback(err, result, fields);
    })
}

exports.register = function(Email, Password,connection, callback) {
    connection.query(`SELECT * FROM users WHERE email ="${Email}" AND password = "${Password}"`, function (err, result, fields){
        callback(err, result, fields);
    });
}