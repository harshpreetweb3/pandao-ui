import Header from "../../components/header/header";
import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Resource from "./resources";
import Product from "./product";
import Aboutus from "./aboutus";
import './landing.css'
import Footer from "../../components/header/footer";



function IntroText(props) {

    const [currentFadeIn, setFadein] = useState('fade-in-from-down')

    let fadeinImage = () => {

        setFadein(preState => (preState === 'fade-in-from-down' ? 'fade-out-from-down' : 'fade-in-from-down')
        )


    }

    useEffect(() => {
        const imageFadeInInterval = setInterval(fadeinImage, 5000)
        return () => { clearInterval(imageFadeInInterval) }
    }, [])






    return (
        <>
            <div className='w-full h-screen md:flex md:flex-col flex flex-col md:justify-center justify-start pt-10'>
                <div className='flex flex-row md:w-1/2 w-full md:pl-10 pl-3'>
                    <div className=''>
                        <span className={`${props.textColor} md:text-5xl text-3xl`}>
                            Bringing Governance to All: Effortless, Effective, Empowering.
                        </span>
                        <br />
                        <span className={`${props.textColor} md:text-2xl pt-4 text-xl`}>
                            Making Blockchain Accessible and DAO Governance Effortless.
                        </span>

                    </div>

                </div>
                <div className='md:absolute md:w-1/3 md:left-2/3 md:h-full'>
                    <img className={` h-fll w-full md:h-full ${currentFadeIn}`} src={process.env.PUBLIC_URL + './images/connected_boxes.png'} />
                </div>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <button
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '14px 20px',
                            margin: '20px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '18px',
                        }}
                        onClick={() => console.log('Redirecting to user registration or dashboard')}
                    >
                        Get Started
                    </button>
                </div>

            </div>

        </>
    )
}


function LandingPage() {


    const [globalTextColor, setGlobalTextColor] = useState('text-white')
    const [darkMode, ToggledarkMode] = useState('landing-div')
    const [darkModeChanging, ToggledarkModeChanging] = useState(false)
    const setDarkModeChangingStatusTrue = () => {
        ToggledarkModeChanging(true)
    }
    const setDarkModeChangingStatusFalse = () => {
        ToggledarkModeChanging(false)
    }

    const changeColorMode = () => {
        console.log("it happend from child component")
        if (darkMode === 'landing-div') {
            ToggledarkMode('bg-neutral-300')
            setGlobalTextColor('text-black')

        } else {
            ToggledarkMode('landing-div')
            setGlobalTextColor('text-white')
        }
        // set dark mode changing as true
        setDarkModeChangingStatusTrue()
        // then set dark mode changing after 1 sec
        setTimeout(setDarkModeChangingStatusFalse,1000)

    }

    return (
        <>
            <div className={`z-1 h-full transition ease-in-out delay-150 duration-1000 ${darkMode}`}>
                <Header toggleDarkMode={changeColorMode} textColor={globalTextColor} />
                <div className='h-auto overflow-auto'>
                    <Routes>
                        <Route index element={<IntroText textColor={globalTextColor} />} />
                        <Route path='/' element={<IntroText textColor={globalTextColor} />} />
                        <Route path='resource' element={<Resource textColor={globalTextColor} />} />
                        <Route path='product' element={<Product textColor={globalTextColor} />} />
                        <Route path='/about-us' element={<Aboutus textColor={globalTextColor} />} />
                    </Routes>

                </div>
                <Footer />
            </div>{
                darkModeChanging && (
                    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-10 animate-slide-up">
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <h1>Changinge color Mode</h1>
                            </div>
                        </div>
                    </div>
                )
            }




        </>
    )
}

export { LandingPage };
