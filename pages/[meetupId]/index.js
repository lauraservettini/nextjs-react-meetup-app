import { MongoClient, ObjectId } from "mongodb";

import MeetupDetails from "@/components/meetups/MeetupDetails";
import Head from "next/head";

export default function MeetupDetailsPage({meetup}) {
    console.log('dentro il component')
    return <>
        <Head>
            <title>React Meetups - See Meetup Details for "{meetup.title}"</title>
            <meta name="description" content={meetup.description}/>
        </Head>
        <MeetupDetails 
            id={meetup.id}
            title={meetup.title}
            image={meetup.image}
            address={meetup.address}
            description={meetup.description}
        />
    </>
}

export async function getStaticPaths() {
    try {
        // MongoClient.connect('connect string su cloud online');
        const client = await MongoClient.connect('mongodb://localhost:27017');

        const db = client.db('meetup');
        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
        console.log('console log meetups ' +  meetups);

        client.close();

        return {
            // con fallback true accetta la creazione dinamica degli meetupId
            fallback: false,
            paths: meetups.map(meetup => ({
                params: {
                    meetupId: meetup._id.toString(),
                } 
            }))
        }
    } catch (error) {
       
}
}
export async function getStaticProps(context) {
    const id = context.params.meetupId;

    const objId = new ObjectId(id);

    try {
        // MongoClient.connect('connect string su cloud online');
        const client = await MongoClient.connect('mongodb://localhost:27017');

        const db = client.db('meetup');
        const meetupsCollection = db.collection('meetups');

        const meetup = await meetupsCollection.findOne({_id: objId});
        console.log(meetup);

        client.close();

        return {
                    props: {
                        meetup: {
                                title: meetup.title,
                                address: meetup.address,
                                image: meetup.image,
                                id: meetup._id.toString(),
                                description: meetup.description
                            }
                    }
                }
    } catch (error) {
       
}
}