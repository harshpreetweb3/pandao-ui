import Header from "../../components/header/header";

function IntroText() {
    return (
        <>
            <div className='w-full h-screen md:flex md:flex-col justify-center'>
                <div className='flex flex-row w-1/2'>
                    <div className='px-10'>
                        <h1 className='text-white text-5xl'>
                            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        </h1>

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
