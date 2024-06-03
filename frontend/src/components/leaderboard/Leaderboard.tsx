import React, { useState, useEffect } from 'react'
import defaultInstance from '../../axios/defaultInstance.js';

import Trophy from '../../assets/elements/trophy.png';
import GeneralView from '../../views/GeneralView.tsx';
import ViewListElement from '../../views/ViewListElement.tsx';
import { MoonLoader } from 'react-spinners';
import {Button} from '../general/ButtonCVA.tsx';

type LeaderboardUser = {
    username : string,
    pfp : string,
    total_xp : number
};

const Leaderboard = () => {
  
  const [profiles, setProfiles] = useState<[LeaderboardUser]>([]); // List ranking users by earned xp.
  const [weeklyFilter, setWeeklyFilter] = useState<boolean>(true); // Set a filter for weekly and global rankings (default is weekly).
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false); // Indicates if information is being fetched (loading state).

  useEffect( () => {
    setLoading(true)
    defaultInstance.get(`leaderboard${ weeklyFilter ? '' : '?filter=global'}`)
    .then( res => {
        setProfiles(res.data);
        setLoading(false);
    })
    .catch( err => {
        console.log(err);
        setLoading(false);
    })
  }, [weeklyFilter]);

  return (
    <GeneralView header='Leaderboards' subheader='Compare yourself to other language nerds'  icon={Trophy} >
        <Button onClick={() => setWeeklyFilter(!weeklyFilter)}>
            { weeklyFilter ? 'This week' : 'All time'}
        </Button>
        { loading ?
        <MoonLoader loading={loading} size={window.innerHeight/2} color='#22c55e'/>
        :
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
                    <span className='text-lg font-semibold'>{profile.total_xp}</span>
                </ViewListElement>
            )}
        </ul>
        }
    </GeneralView>
  )
}

export default Leaderboard
