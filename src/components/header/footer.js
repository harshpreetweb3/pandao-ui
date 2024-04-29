import Chatbot from "../../utils/chatbot";
import { useState } from 'react'
function Footer() {

    const subscribeNewsLetter = () => {
        console.log("subscribed")
    }
    const [email,setEmail] = useState('')
    const captureEmail = (e) => {

    }
    const [subscribeFormOpen, setSubcribeFormOpen] = useState(false)
    const setFormOpen = () => {
        setSubcribeFormOpen(!subscribeFormOpen)
    }

    return (
        <div className='flex flex-row justify-center'>
            <div className='flex flex-col text-white'>
                <div className='p-5 md:w-full  w-full flex flex-row justify-center'>
                    <span className='text-3xl '>Follow us on</span>
                </div>
                <div className='flex flex-row md:w-full justify-center text-white pl-10 h-18 w-72' >
                    <img className='' src={process.env.PUBLIC_URL + "/images/social.png"}></img>
                </div>
                <div className='flex md:flex-row flex-col justify-between'>
                    <div className='flex flex-col pt-8 mt-8'>
                        <span className='text-white text-center p-2 m-2'>Sign up to get weekly updates on advancements in DAOs and technology</span>
                        <div className='w-full  flex flex-row justify-center'>
                            <button className='rounded-2xl bg-red-700 w-3/4 pl-10' onClick={setFormOpen}>
                                Suscribe
                            </button>
                        </div>

                        <div className='flex flex-row justify-between p-10'>
                            <span className='text-blue-900 hover:text-blue-500'>Terms and conditions</span>
                            <span className='text-blue-900 hover:text-blue-500'>privacy policy</span>

                        </div>
                    </div>
                    <div>
                        <Chatbot />
                    </div>
                </div>
                {
                    subscribeFormOpen && (
                        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-10 animate-slide-up">
                            <form onSubmit={subscribeNewsLetter} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold text-center text-gray-900">Subscribe to our Newsletter</h2>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter your email"
                                        // value={email}
                                        // onChange={handleEmailChange}
                                    />
                                </div>
                                <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                                    Subscribe
                                </button>
                                {/* {submitted && (
                                    <p className="text-center text-green-500">Thank you for subscribing!</p>
                                )} */}
                            </form>
                        </div>
                    )
                }
            </div>
        </div>

    )

}
export default Footer;