var mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://dh2643-db:cbNUpkCX10rUY2FZ30qEBflWHhQJtt6itDCmHz8W8gbiai2bupYV4ZrqWOvhmdBbyP3rAAVrb3xSACDbjZ015Q%3D%3D@dh2643-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@dh2643-db@", function (err, client) {
    if (err) {
        console.error("Failed to connect to the database", err);
        return;
    }

    const adminDb = client.db().admin(); // Get the admin database

    // List all databases
    adminDb.listDatabases(function (err, result) {
        if (err) {
            console.error("Failed to list databases", err);
            client.close();
            return;
        }

        console.log("Databases:");
        result.databases.forEach(db => {
            console.log(` - ${db.name}`);
        });

        client.close(); // Close the connection after fetching data
    });
});