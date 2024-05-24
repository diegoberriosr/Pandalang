import React, { useState, useEffect } from 'react'

import Trophy from '../../assets/elements/trophy.png';
import GeneralView from '../../views/GeneralView.tsx';
import ViewListElement from '../../views/ViewListElement.tsx';
import {Button} from '../general/ButtonCVA.tsx';

type LeaderboardUser = {
    username : string,
    pfp : string,
    xp : number
};

const TEST_WEEK_USERS : [LeaderboardUser] = [
    {
        username : 'Diego',
        pfp : 'https://picsum.photos/200',
        xp : 20
    },
    {
        username : 'Paddington',
        pfp : 'https://picsum.photos/200',
        xp : 10
    },
    {
        username : 'Limundi',
        pfp : 'https://picsum.photos/200',
        xp : 10
    },
    {
        username : 'Lemondo',
        pfp : 'https://picsum.photos/200',
        xp : 10
    }
];

const TEST_GLOBAL_USERS : [LeaderboardUser] = [
    {
        username : 'Paco',
        pfp : 'https://picsum.photos/200',
        xp : 1000000
    },
    {
        username : 'Resorte',
        pfp : 'https://picsum.photos/200',
        xp : 999999
    }
];

const Leaderboard = () => {
  
  const [profiles, setProfiles] = useState<[LeaderboardUser]>(TEST_WEEK_USERS); // List ranking users by earned xp.
  const [weeklyFilter, setWeeklyFilter] = useState<boolean>(true); // Set a filter for weekly and global rankings (default is weekly).
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false); // Indicates if information is being fetched (loading state).

  useEffect( () => {
    setProfiles(weeklyFilter ? TEST_WEEK_USERS : TEST_GLOBAL_USERS);
  }, [weeklyFilter]);

  return (
    <GeneralView header='Leaderboards' subheader='Compare yourself to other language nerds'  icon={Trophy} >
        <Button onClick={() => setWeeklyFilter(!weeklyFilter)}>
            { weeklyFilter ? 'This week' : 'All time'}
        </Button>
        <ul className='w-10/12 flex flex-col items-center'>
            { profiles.map( (profile, index) => 
                <ViewListElement key={index} styling={`
                    ${ index === 0 ? 'bg-yellow-500 rounded-xl rounded-b border-none' : ''}
                    ${ index === 1 ? 'bg-gray-400' : ''}
                    ${ index === 2 ? 'bg-amber-800' : ''}
                    ${ index === profiles.length - 1 ? 'rounded-xl rounded-t border-b-2 border-r-2 border-l-2' : ''}
                    bg-opacity-20
                `}>
                    <div className='flex items-center space-x-2 text-lg text-slate-800'>
                        <span>{index + 1}.</span>
                        <figure className='h-14 w-14 rounded-full'>
                            <img src={profile.pfp} alt='profile pfp' className='w-full h-full rounded-full object-fit'/>
                        </figure>
                        <span className='font-bold'>{profile.username}</span>
                    </div>
                    <span className='text-lg font-semibold'>{profile.xp}</span>
                </ViewListElement>
            )}
        </ul>
    </GeneralView>
  )
}

export default Leaderboard
