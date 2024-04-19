import Header from "../../components/header/header";

function IntroText() {
    return (
        <>
            <div className='w-full h-screen md:flex md:flex-col flex flex-col md:justify-center justify-start pt-10'>
                <div className='flex flex-row md:w-1/2 w-full'>
                    <div className='px-10'>
                        <span className='text-white md:text-5xl'>
                            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        </span>

                    </div>

                </div>

            </div>

        </>
    )
}

function LandingPage() {
    return (
        <>
            <div className='p-0 m-0 bg-purple-900 h-full'>
                <Header />
                <IntroText />
            </div>

        </>
    )
}

export default LandingPage;
