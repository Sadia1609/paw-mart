import React from 'react';
import Slider from '../component/Slider';
import PopularSection from '../component/PopularSection';
import MeetOurVets from '../component/MeetOurVets';
import WinterCareTips from '../component/WinterCareTips';
import CategoryFilteredProduct from './CategoryFilteredProduct';
import CategorySection from './CategorySection';

const Home = () => {
    return (
        <div>
            <title>Home</title>
           <Slider></Slider>
           <CategorySection>
            <CategoryFilteredProduct>
           </CategoryFilteredProduct>
           </CategorySection>
           <PopularSection></PopularSection>
           <WinterCareTips></WinterCareTips>
           <MeetOurVets></MeetOurVets>
        </div>
    );
};

export default Home;