import Header from "../../components/header/header";
import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Resource from "./resources";
import Product from "./product";
import Aboutus from "./aboutus";
import './landing.css'
import Footer from "../../components/header/footer";



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
            <div className='w-full h-3/4 md:flex md:flex-col flex flex-col md:justify-center justify-start pt-10'>
                <div className='flex flex-row md:w-3/4 w-full md:pl-10 pl-3'>
                    <div className=''>
                        <span className='text-white md:text-5xl text-3xl'>
                            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        </span>
                        <br />
                        <span className='text-white md:text-2xl pt-4 text-xl'>
                            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        </span>

                    </div>

                </div>
                <div className='md:absolute md:w-1/3 md:left-2/3 md:h-full'>
                    <img className={` w-full md:h-full ${currentFadeIn}`} src={process.env.PUBLIC_URL + './images/connected_boxes.png'} />
                </div>

            </div>

        </>
    )
}






function LandingPage() {
    return (
        <>

            <div className=' h-auto landing-div'>
                <Header />
                <div className='h-auto overflow-auto'>
                    <Routes>
                        <Route index element={<IntroText />} />
                        <Route path='/' element={<IntroText />} />
                        <Route path='resource' element={<Resource />} />
                        <Route path='product' element={<Product />} />
                        <Route path='/about-us' element={<Aboutus />} />
                    </Routes>

                </div>
                <Footer />



            </div>



        </>
    )
}

export { LandingPage };
