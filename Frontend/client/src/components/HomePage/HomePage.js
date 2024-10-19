import React from 'react';
import './HomePage.scss';
import bannerBottom1 from '../../assets/images/banner_bottom1.jpg';
import bannerBottom2 from '../../assets/images/banner_bottom2.png';
import bannerBottom3 from '../../assets/images/banner_bottom3.jpg';
import bannerBottom4 from '../../assets/images/banner_bottom4.jpg';
import bannerBottom5 from '../../assets/images/banner_bottom5.jpg';
import bannerBottom6 from '../../assets/images/banner_bottom6.png';

const HomePage = () => {
    return (
        <div id='wrapper' className='d-md-block d-none'>
            <div id='banner'>
                <div className='box-bottom'>
                    <img src={bannerBottom1} />
                    <img src={bannerBottom2} />
                    <img src={bannerBottom3} />
                    <img src={bannerBottom4} />
                    <img className='d-lg-block d-none' src={bannerBottom5} />
                    <img className='d-lg-block d-none' src={bannerBottom6} />
                </div>
            </div>
        </div>
    )
}

export default HomePage
