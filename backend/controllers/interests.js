const MongoClient = require("mongodb").MongoClient;
const Getinterests = (req, res) => {
	try {
		MongoClient.connect(process.env.APP_MONGO_URL, (err, db)=> {
			if (err) throw err;
			const  collection = db.db("tinder").collection("interests")
      const result = collection.find().toArray((err, docs) => {
        if (err) {
          res.status(500).json(err);
        } else {
          // console.log(docs);
          res.status(200).json(docs);
          db.close();
        }
      })
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = { Getinterests };
