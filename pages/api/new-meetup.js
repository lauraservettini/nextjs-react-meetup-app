// /api/new-meetup
import { MongoClient } from "mongodb";
export default async function handler(req, res) {
    if(req.method === 'POST' ) {
        const data = req.body;

        // const { title, image, address, description} = data;

        try {
            // MongoClient.connect('connect string su cloud online');
            const client = await MongoClient.connect('mongodb://localhost:27017');
    
            const db = client.db('meetup');
            const meetupsCollection = db.collection('meetups');
    
            const result = await meetupsCollection.insertOne({...data});
            console.log(result);
            client.close();
        } catch (error) {
            console.log(error);
        }



        res.status(201).json({
            message: "Meetup inserted"
        })
    }
}