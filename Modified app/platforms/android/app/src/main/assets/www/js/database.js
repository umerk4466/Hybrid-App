

var dbName = "MOTDatabase";
var db = null;

// -1 for nothing
// 0 for went well
// 1 for misc error - not harmfull
// 2 for database error
var res = -1;
var resultArr = [];

function _connect() {
	if (db == null) {
		console.debug("Connecting to db");
		try {
			if (window.cordova.platformId === 'browser') {
				console.debug("Connecting to db as browser");
				db = window.openDatabase(dbName, '1.0', 'MOTDatabase', 2 * 1024 * 1024);
			}
			else {
				console.debug("Connecting to as IOS/Android");
				db = window.sqlitePlugin.openDatabase({
					name: dbName + ".db",
					location: 'default'
				});
			}
			return true;
		}
		catch (e) {
			console.debug("Error connecting to database - " + e);
			return false;
		}
	}
}

function _disconnect() {
	db.close();
	db = null;
	console.debug("Disconnected");
}

function addUser(vehicleNum, username, password) {
	if (!_connect()) {
		res = 2;
		return;
	}
	db.transaction(function (tx) {
		//tx.executeSql('DROP TABLE customerAccounts');
		//tx.executeSql('DROP TABLE customerAccounts');

		// Make sure table exists
		tx.executeSql('CREATE TABLE IF NOT EXISTS customerAccounts (vehicleNum VARCHAR NOT NULL,username VARCHAR NOT NULL,password VARCHAR NOT NULL,PRIMARY KEY(username))');

		// Try to add new user
		tx.executeSql('INSERT INTO customerAccounts(vehicleNum, username, password) VALUES(?,?,?)', [vehicleNum, username, password],
			function (tx, resultSet) {
				// If goes well
				res = 0;

				// log that change has happened
				console.debug('resultSet.insertId: ' + resultSet.insertId);
				//console.debug('resultSet.rowsAffected: ' + resultSet.rowsAffected);
			}, function (tx, resultSet) {
				// If errors username exists
				if (resultSet.message.indexOf("UNIQUE constraint failed") !== -1) {
					res = 1;
					console.debug("Signup failed due to username existing");
				}
				// If different error
				else {
					_dbSqlError(tx, error);
				}
			});
	}, _dbError, _dbSucess);
}

function login(username, password) {
	if (!_connect()) {
		res = 2;
		return;
	}
	db.transaction(function (tx) {
		// Execute command
		tx.executeSql("SELECT password FROM customerAccounts WHERE username=(?)", [username],
			function (tx, resultSet) {
				// Compare passwords
				if (resultSet.rows.item(0).password.localeCompare(password) != -1) {
					res = 0;
				}
			},
			// If error occurs
			function (tx, resultSet) {
				res = 1;
				// If the table doesnt exist
				if (resultSet.message.indexOf("no such table") !== -1) {
					_dbSqlError();
				}
			});
	}, _dbError, _dbSucess);
}

function addVehicle(username, manufacturer, millage, condition, registrationYear, registrationNumber, lastMotDate, motDue, insuranceDue, vehicleNotes, repairNeededNote, imgUrl) {
	if (!_connect()) {
		res = 2;
		return;
	}
	db.transaction(function (tx) {
		// Make sure table exists
		tx.executeSql('CREATE TABLE IF NOT EXISTS vehicles (username VARCHAR NOT NULL,\
vehicle_id INTEGER PRIMARY KEY AUTOINCREMENT,\
manufacturer VARCHAR NOT NULL,\
millage INT NOT NULL,\
condition VARCHAR NOT NULL,\
registration_year INT NOT NULL,\
registration_number VARCHAR NOT NULL,\
last_mot_date VARCHAR NOT NULL,\
mot_due VARCHAR NOT NULL,\
insurance_due VARCHAR  NOT NULL,\
vehicle_notes VARCHAR,\
repair_needed_note VARCHAR,\
img_url VARCHAR)');
		// Try to add new vehicle
		tx.executeSql('INSERT INTO vehicles(\
			username, manufacturer, millage, condition, registration_year, registration_number, last_mot_date, mot_due, insurance_due, vehicle_notes, repair_needed_note, img_url) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
			[username, manufacturer, millage, condition, registrationYear, registrationNumber, lastMotDate, motDue, insuranceDue, vehicleNotes, repairNeededNote, imgUrl],
			function (tx, resultSet) {
				// If goes well
				res = 0;
				// log that change has happened
				console.debug('resultSet.insertId: ' + resultSet.insertId);
				//console.debug('resultSet.rowsAffected: ' + resultSet.rowsAffected);
			}, _dbSqlError);
	}, _dbError, _dbSucess);
}

function getVehicles(username) {
	if (!_connect()) {
		res = 2;
		return;
	}
	db.transaction(function (tx) {
		// Try to add new vehicle
		tx.executeSql('SELECT * FROM vehicles WHERE username = (?)', [username],
			function (tx, resultSet) {
				for (var i = 0; i < resultSet.rows.length; i++) {
					resultArr.push(resultSet.rows.item(i));
					console.debug("vehicle info - " + JSON.stringify(resultSet.rows.item(i)));
				}
				res = 0;
			},
			// If error occurs
			function (tx, resultSet) {
				res = 1;
				// If the table doesnt exist
				if (resultSet.message.indexOf("no such table") !== -1) {
					_dbSqlError(resultSet);
				}
			});
	}, _dbError, _dbSucess);
}

function fullInfo(vehicleId) {
	if (!_connect()) {
		res = 2;
		return;
	}
	console.debug("Getting vehicle info Properly");
	db.transaction(function (tx) {
		// Try to add new vehicle
		tx.executeSql('SELECT * FROM vehicles WHERE vehicle_id = (?)', [vehicleId],
			function (tx, resultSet) {
				resultArr = resultSet.rows.item(0);
				res = 0;
			},
			// If error occurs
			function (tx, resultSet) {
				res = 1;
				// If the table doesnt exist
				if (resultSet.message.indexOf("no such table") !== -1) {
					_dbSqlError(resultSet);
				}
			});
	}, _dbError, _dbSucess);
}

function deleteVehicle(vehicleId) {
	if (!_connect()) {
		res = 2;
		return;
	}
	db.transaction(function (tx) {
		// Try to add new vehicle
		tx.executeSql('DELETE FROM vehicles WHERE vehicle_id = (?)', [vehicleId],
			function (tx, resultSet) {
				res = 0;
			},
			// If error occurs
			function (tx, resultSet) {
				res = 1;
				// If the table doesnt exist
				if (resultSet.message.indexOf("no such table") !== -1) {
					_dbSqlError(resultSet);
				}
			});
	}, _dbError, _dbSucess);
}

function _viewAllUsers() {
	_connect();
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM customerAccounts', [],
			function (tx, resultSet) {
				console.log(resultSet.rows.item(0).username);
				for (var i = 0; i < resultSet.rows.length; i++) {
					row = resultSet.rows.item(i);
					console.log("row is " + JSON.stringify(row));
				}
			}, _dbSqlError);
	}, _dbError, _dbSucess);
}

function _dbSqlError(tx, error) {
	//var result = [];
	//for (error; error !== null; error = Object.getPrototypeOf(error)) {
	//result = result.concat(Object.getOwnPropertyNames(error));
	//}
	console.debug('SQL error: ' + error.message);
}
function _dbSqlOk() {
	console.debug("SQL ran okay");
}
function _dbError(error) {
	console.debug('Transaction error: ' + error.message);
	res = 1;
	_disconnect();
}
function _dbSucess() {
	console.debug("Transaction fine");
	_disconnect();
}
