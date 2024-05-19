import House from './assets/elements/house.png';
import Dart from './assets/elements/dart.png';
import Medal from './assets/elements/medal.png';
import Shop from './assets/elements/shop.png';
import Trophy from './assets/elements/trophy.png';

const URLS = [
    {
        path : '/learn',
        name : 'Learn',
        slug : House,
        slugAlt : 'house'
    },
    {
        path : '/practice',
        name : 'Practice',
        slug : Dart,
        slugAlt : 'dart practice'
    },
    {
        path : '/quests',
        name : 'Quests',
        slug : Medal,
        slugAlt : 'medal'
    },
    {
        path : '/shop',
        name : 'Shop',
        slug : Shop,
        slugAlt : 'store'
    },
    {
      path : '/leaderboard',
      name : 'Leaderboards',
      slug : Trophy,
      slugAlt : 'trophy'
    }
];

export default URLS;