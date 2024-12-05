import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage.jsx';

import './styles/globals.css';
import './styles/style.css';
import './styles/buttons.css';
import './styles/header.css';
import './styles/slideshow.css';
import './styles/arrow.css';
import './styles/mega-menu.css';
import './styles/start-page.css';
import './styles/connected-systems.css';
import './styles/tooltip.css';

import GovComponent from './components/GovComponent/GovComponent.jsx';
import Agency from './components/Agency/Agency.jsx';
import Careers from './components/Careers/Careers.jsx';
import FeaturedVideos from './components/FeaturedVideos/FeaturedVideos.jsx';
import MoreInfo from './components/MoreInfo/MoreInfo.jsx';
import HeaderHero from './components/HeaderHero/HeaderHero.jsx';
import Header from './components/Header/Header.jsx';
import Contact from './components/Contact/Contact.jsx';
import MccCorner from './components/MccCorner/MccCorner.jsx';
import News from './components/News/News.jsx';

const App = () => {
    return (
        <Router>
            <div className="landing-page-desktop">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header />
                            <HeaderHero />
                            <News />
                            <FeaturedVideos />
                            <MoreInfo />
                            <Careers />
                            <MccCorner />
                            <Contact />
                            <Agency />
                            <GovComponent />
                        </>
                    } />
                    <Route path="/StartPage" element={<StartPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;