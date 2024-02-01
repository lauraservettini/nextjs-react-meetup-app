import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "@/components/meetups/MeetupList";

const DUMMY_MEETUPS =[
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Florenz_mit_Palazzo_Vecchio_und_Dom.jpg/375px-Florenz_mit_Palazzo_Vecchio_und_Dom.jpg',
        address: 'Chiesa S.Maria Novella, Firenze',
        description: 'some description'
     },
     {
        id: 'm2',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Florenz_mit_Palazzo_Vecchio_und_Dom.jpg/375px-Florenz_mit_Palazzo_Vecchio_und_Dom.jpg',
        address: 'Chiesa S.Maria Novella, Firenze',
        description: 'some description'
     }
]
export default function HomePage(props){
    return (<>
        <Head>
            <title>React Meetups</title>
            <meta name="description" content="See and create a list of meetups where you could encounter new friends"/>
        </Head>
        <MeetupList meetups={props.meetups}/>
    </>);
}

export async function getServerSideProps(context) {
    // const req = context.req;
    // const res = context.res;
    try {
        // MongoClient.connect('connect string su cloud online');
        const client = await MongoClient.connect('mongodb://localhost:27017');

        const db = client.db('meetup');
        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find().toArray();
        console.log(meetups);

        client.close();

        return {
                    props: {
                        meetups: meetups.map(meetup =>
                            ({
                                title: meetup.title,
                                address: meetup.address,
                                image: meetup.image,
                                id: meetup._id.toString()
                            }))
                    }
                }
    } catch (error) {
        console.log(error);
    }
}
// export async function getStaticProps() {
//     // fetch data

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//         revalidate: 10
//     }
// }