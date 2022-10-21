const MongoClient = require("mongodb").MongoClient;
const UserInterests = require("../models/Interests")
const Getinterests = (req, res) => {
	try {
		MongoClient.connect(process.env.APP_MONGO_URL, (err, db)=> {
			if (err) throw err;
			const  collection = db.db("tinder").collection("interests")
      const result = collection.find().toArray((err, docs) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          console.log(docs);
          res.status(200).json(docs);
          db.close();
        }
      })
		});
	} catch (err) {
		res.status(500).json(err);
	}
};
const sendInterests =async (req, res) => {
  try {
    const newInterests = new UserInterests({
      user_id: req.body.user_id,
      hobby : req.body.hobby
    })
    const user = await newInterests.save()
    res.status(200).json(user)
    
  } catch (err) {
    console.log(err);
  }
}
module.exports = { Getinterests, sendInterests };
