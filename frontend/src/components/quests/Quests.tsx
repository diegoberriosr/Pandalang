import React from 'react';


// Icon imports
import Medal from '../../assets/elements/medal.png';
import Thunder from '../../assets/elements/thunder.png';

// Component imports
import GeneralView from '../../views/GeneralView.tsx';
import ViewListElement from '../../views/ViewListElement.tsx';

type Quest = {
  title : string,
  xp : number
}

const TEST_QUESTS : [Quest] = [
  { title : 'Earn 10 xp', xp : 10},
  { title : 'Earn 100 xp', xp : 100},
  { title : 'Earn 1000 xp', xp : 1000},
  { title : 'Earn 10000 xp', xp: 10000},
  { title : 'Earn 100000 xp', xp: 100000},
  { title : 'Earn 1000000 xp', xp : 1000000}
];

const Quests = () => {

  return (
    <GeneralView header='Quests' subheader='Complete quests by earning xp' icon={Medal}>
      <ul className='w-screen md:w-8/12'>
        {TEST_QUESTS.map( quest => <ViewListElement styling=''>
          <div className="flex items-center space-x-3 w-full">
            <img src={Thunder} alt='thunder' className='w-8 h-8'/>
            <div className= 'w-full'>
              <h4 className='text-lg text-slate-800 font-bold'>{quest.title}</h4>
              <progress max={quest.xp}  value={10} className='w-full bg-slate-200 rounded'/>
            </div>
          </div>
        </ViewListElement>)}
      </ul>
    </GeneralView>
  )
}

export default Quests
