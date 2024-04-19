import Header from "../../components/header/header";
import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'



function IntroText() {

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
            <div className='w-full h-3/4 md:flex md:flex-col flex flex-col md:justify-center justify-start pt-10 relative'>
                <div className='flex flex-row md:w-3/4 w-full'>
                    <div className='px-10 relative left-20'>
                        <span className='text-white md:text-5xl text-3xl'>
                            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        </span>
                        <br />
                        <span className='text-white md:text-2xl pt-4 text-xl'>
                            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        </span>

                    </div>

                </div>
                <div className='absolute left-3/4 '>
                    <img className={`h-1/2 ${currentFadeIn}`} src={process.env.PUBLIC_URL + './images/connected_boxes.png'} />
                </div>

            </div>

        </>
    )
}


function Resources(){
    return(
        <>
            <h1>hi i am LUke</h1>
        </>
    )
}






function LandingPage() {
    return (
        <>
            <div className='p-0 m-0 bg-purple-900 h-screen'>

                <Header />
                <Routes>
                    <Route index element={<IntroText />} />
                    <Route path='home' element={<IntroText />} />
                    <Route path='resource' element={<Resources />} />
                </Routes>


            </div>

        </>
    )
}

export default LandingPage;
