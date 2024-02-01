import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";

export default function NewMeetupPage(){
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    }
    return( <>
        <Head>
            <title>React Meetups - Add a New Meetup</title>
            <meta name="description" content="Create a new meetup where you could encounter new friends"/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </>);
}