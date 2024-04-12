import React from 'react';
import ReactTangleImages from './images';
import { useEffect, useState, useRef } from 'react'
import handleViewport, { InjectedViewportProps } from 'react-in-viewport';
import { useInViewport } from 'react-in-viewport';

const Brief = () => {



    return (
        <>
            <div className='h-full flex flex-col '>
                {/* Image and about us */}
                <div className='flex flex-row justify-between ml-10 mr-10 mt-10 pl-10 pr-10 pt-10'>
                    <div className='w-1/2'>
                        <div className="flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full animate-spin duration-1000 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"></div>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <div className='m-5 p-5'>
                            <h1 className='text-white text-l text-2xl'>About us</h1>
                        </div>
                        <div className='m-5 p-5'>
                            <span className='text-white'>
                                simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </span>
                        </div>
                        <div className='m-5 p-5'>
                            <span className='text-3xl text-white'>
                                Learn more
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-center pt-10'>
                    <h1 className='text-5xl text-white'>Our services</h1>
                </div>
                <div id='apple' className={`fade-inflex flex row justify-between p-10 m-10 `} >
                    <ReactTangleImages heading='sample heading' content='this is sample content' />
                    <ReactTangleImages />
                    <ReactTangleImages />
                </div>
                <div className='flex flex-row justify-center'>
                    <h1 className='text-5xl text-white '>FAQs</h1>
                </div>
                <div id='apple' className={`fade-inflex flex row justify-between p-10 m-10 `} >
                    <ReactTangleImages heading='sample heading' content='this is sample content' />
                    <ReactTangleImages />
                    <ReactTangleImages />
                </div>
            </div>
        </>
    );
};

export default Brief;