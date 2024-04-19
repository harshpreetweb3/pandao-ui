import {
    Routes,
    Route
} from 'react-router-dom';



import Landing from './pages/landing/landing'
import NotFound from './pages/notfound/404';
import LoginPage from './pages/signin/login';
import ContactUs from './pages/contactus/contactus';
import CandyMachine from './pages/test_pages/pandao_candy';


function TestNotFound() {
    return (
        <>
            <h1 className='bg-red-700'>hii , this is wrong url</h1>
        </>
    )
}

function Routers() {
    return (
        <Routes>
            <Route path='/' element={<Landing />}></Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/candy-machine' element={<CandyMachine />} />
            <Route path="*" element={<TestNotFound />} />
        </Routes>


    )

}

export default Routers;