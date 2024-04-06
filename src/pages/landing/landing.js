import HeroSection from "../../components/layout/hero/hero";
import Brief from "./components/brief";
import { useRef } from 'react'


function LandingPage() {
    return (
        <>
            <HeroSection />
            <Brief />
        </>
    )
}

export default LandingPage;
