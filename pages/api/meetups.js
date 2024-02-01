// /api/new-meetup
import { MongoClient } from "mongodb";
export default async function handler(req, res) {
    if(req.method == 'GET' ) {
        try {
            // MongoClient.connect('connect string su cloud online');
            const client = await MongoClient.connect('mongodb://localhost:27017');
    
            const db = client.db('meetup');
            const meetupsCollection = db.collection('meetups');
    
            const meetups = await meetupsCollection.find().toArray();
            console.log(meetups);

            client.close();

            res.status(201).json({
                meetups: meetups.map(meetup =>
                    ({
                        title: meetup.title,
                        address: meetup.address,
                        image: meetup.image,
                        id: meetup._id.toString()
                    }))
            })
        } catch (error) {
            console.log(error);
        }
    }
}