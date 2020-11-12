import React from 'react';
import { ApolloProvider } from '@apollo/client';
import './App.css';

import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
});

const LAUNCHES = gql`
    {
        launches(limit: 5) {
            details
            launch_date_utc
            launch_success
            links {
                video_link
            }
            rocket {
                rocket_name
            }
        }
    }
`

type VideoLink = {
    video_link: String
}

type Rocket = {
    rocket_name: String
}

type Launch = {
    details: String
    launch_date_utc: String
    launch_success: Boolean
    links: VideoLink
    rocket: Rocket
}

function GetLaunches() {
    const { loading, error, data } = useQuery(LAUNCHES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>

    return data.launches.map(({ details, launch_date_utc, launch_success, links, rocket }: Launch) => (
            <article>
                <h2>{ rocket.rocket_name }</h2>
                <em>{ launch_date_utc }</em>
                <p>Success : { launch_success ? 'Yes' : 'No' }</p>
                <blockquote>{ details }</blockquote>
                <p>YT Link : { links.video_link }</p>
            </article>
        )
    )
}


function App() {
    return (
        <ApolloProvider client={client}>
            <div>
                <GetLaunches />
            </div>
        </ApolloProvider>
    );
}

export default App;
