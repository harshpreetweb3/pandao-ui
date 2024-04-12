import HeroSection from "../../components/layout/hero/hero";
import Brief from "./components/brief";
import { useRef } from 'react'
import EarlyReview from "./components/earlyreview";
import LandingFooter from './components/landingfooter';


function LandingPage() {
    return (
        <>
            <div className='bg-gradient-to-br from-gray-900'>
                <HeroSection />
                <Brief />
                <EarlyReview />
                <LandingFooter/>

            </div>

        </>
    )
}

export default LandingPage;
