import React from 'react';

function Story() {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl md:text-6xl text-center mb-8">
                It's simple, We know what you want
            </h1>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                <p className="text-gray-400">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                {/* More paragraphs or content can be added here */}
            </div>
        </div>
    )
}

function Founders() {

    return (
        <div className="bg-black text-gray-800 p-6 flex items-center">
            <div className="w-full md:flex md:items-center">

                <div className="md:w-1/4">
                    <img src='https://i.postimg.cc/4xC2vGYG/icon.jpg' alt="luke image goes here" className="rounded-full border-4 border-gray-300 shadow-lg mx-auto" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                </div>
                {/* Content Section */}
                <div className="md:w-3/4 mt-4 md:mt-0 md:ml-6">
                    <h3 className="text-2xl font-semibold">Luke Michael, Founder, CTO</h3>
                    <p className="mt-2 text-cyan-900">
                        Luke Michael Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                    </p>
                </div>
            </div>
        </div>
    )

}

function IntroUi(){
    return (
        <div className="max-w-6xl mx-auto flex flex-wrap items-center">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 my-4 lg:my-0">
            <h2 className="text-5xl font-bold mb-3">Changing the world through personalized blockchain experiences.</h2>
            <p className="mb-4">

            </p>
            <button className="text-white bg-pink-600 hover:bg-pink-700 transition-colors duration-300 py-2 px-4 rounded-full">
                Read more
            </button>
        </div>
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
            <img src="https://i.postimg.cc/c1kxCGqc/Screenshot-2024-04-03-at-10-35-37-PM.png" alt="About Us" className="w-full" />
        </div>
    </div>
    )
}

const AboutUs = () => {
    return (
        <div className="bg-black text-white p-8">
            <IntroUi/>
            <Story/>
            <h2 className="text-3xl text-center font-bold mb-8 pt-20">Meet the Founders</h2>
            <Founders/>
        </div>
    );
};

export default AboutUs;
