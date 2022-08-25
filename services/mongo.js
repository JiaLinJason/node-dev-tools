function mongoService(url) {
    const { MongoClient, ObjectId } = require('mongodb')
    const assert = require('assert');
    if (!url) {
        throw new Error("must have url to connect Mongo")
    }
    return function initMongo(dbName, cb) {
        if (cb) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
                assert.equal(null, err);
                console.log('Connected successfully to mongodb');
                let db = client.db(dbName);
                function closeConnection() {
                    client.close();
                }
                cb({ db, close: closeConnection, ObjectId });
            })
        } else {
            return new Promise((resolve, reject) => {
                MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
                    assert.equal(null, err);
                    console.log('Connected successfully to mongodb');
                    let db = client.db(dbName);
                    function closeConnection() {
                        client.close();
                    }
                    resolve({ db, close: closeConnection, ObjectId });
                })
            })
        }
    }
}

module.exports = {
    mongoService
}