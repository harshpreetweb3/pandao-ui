import React from 'react';
import {RadixDappToolkit, RadixNetwork } from '@radixdlt/radix-dapp-toolkit'
import { useState ,useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    
    let navigate = useNavigate();
    // hard code dapp definition for now 
    const rdt = RadixDappToolkit({
        dAppDefinitionAddress:
          'account_tdx_2_12yyhl24hpxpat4d4k3mxsq24utlflsvpzv0zhn3r5d0eprfue4awh2',
        networkId: RadixNetwork.Stokenet,
        applicationName: 'Pandao Candies',
        applicationVersion: '1.0.0',
    })

    rdt.walletApi.provideConnectResponseCallback((result) => {
        if (result.isErr()) {
          console.log(" aaah man !")
        }else{
            navigate("/candy-machine");
        }
    })
  
    return (
        
        <div className="h-screen flex flex-col ">
            <nav className="flex justify-between pb-10 pl-10 mt-6">
                <div className="text-white text-2xl font-bold w-1/2">PANDAO</div>
                <div className=" w-1/2 flex flex-row justify-left text-white text-2xl space-x-2 pr-10  ">
                    <a href="#" id='links' className="hover:text-gray-300">HOME</a>
                    <span className="text-gray-400 pl-6 pr-6">|    </span>
                    <a href="#" className="hover:text-gray-300">RESOURCES</a>
                    <span className="text-gray-400 pl-6 pr-6">|</span>
                    <a href="#" className="hover:text-gray-300">PRICING</a>
                    <span className="text-gray-400 pl-6 pr-6">|</span>
                    <a href="#" className="hover:text-gray-300">ABOUT US</a>
                </div>
                <div className="connect-btn pr-10 hover:scale-110">
                    <radix-connect-button />
                </div>
            </nav>
            <div className=" to-indigo-600 h-screen flex flex-row justify-left items-center text-white">
                <div className="text-center p-4 flex flex-col justify-space-between">
                    <div className='flex flex-row w-1/2 text-left justify-center pl-10 m-11'>
                        <h1 className="fade-in-opacity text-4xl lg:text-6xl font-bold mb-4">
                            EMPOWERING DECENTRALIZED COLLABORATION
                        </h1>
                    </div>
                    <div className='text-left w-1/2 pl-10 ml-11'>
                        <p className=" fade-in-opacity text-xl lg:text-2xl mb-8">
                            EXPERIENCE SEAMLESS USER INTERACTION WITH OUR DAO, POWERED BY AN ULTRA-FRIENDLY TECH STACK.
                        </p>

                    </div>

                    <div className="flex justify-between pl-10 ml-11">
                        <div className='flex flex-row'>
                            <img src='./down-arrow.png' />
                            <button className="bg-transparent border border-white text-white rounded px-6 py-2 mr-4 hover:bg-white hover:text-blue-900 transition ease-in-out duration-300">
                                EXPLORE DAO
                            </button>
                        </div>
                        <div>
                            <button className="rounded px-6 py-2 hover:bg-gray-100 hover:scale-110 transition ease-in-out duration-300">
                                GET STARTED
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;