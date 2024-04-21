function Footer() {

    return (
        <div className='flex flex-col text-white w-full'>
            <div className='p-5 md:w-1/3  w-full flex flex-row justify-center'>
                <span className='text-3xl '>Follow us on</span>
            </div>
            <div className='flex flex-row md:w-1/3 justify-center text-white pl-10 h-18 w-72' >
                <img src={process.env.PUBLIC_URL + "/images/social.png"}></img>
            </div>
            <div className='flex md:flex-row flex-col justify-between'>
                <div className='flex flex-col pt-8 mt-8'>
                    <span className='text-white text-center p-2 m-2'>Sign up to get weekly updates on advancements in DAOs and technology</span>
                    <div className='w-3/4  flex flex-row justify-center'>
                        <button className='rounded-2xl bg-red-700 w-3/4 pl-10'>
                            Email
                        </button>

                    </div>

                    <div className='flex flex-row justify-between p-10'>
                        <span className='text-blue-900 hover:text-blue-500'>Terms and conditions</span>
                        <span className='text-blue-900 hover:text-blue-500'>privacy policy</span>

                    </div>
                </div>
                <div>
                    <span>chat with us</span>
                </div>

            </div>


        </div>
    )

}
export default Footer;