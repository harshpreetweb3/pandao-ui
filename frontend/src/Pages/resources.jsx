
const Resource = () => {
    return (
        <div className="bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% ">
        <div className="min-h-screen flex items-center  justify-between  text-white max-w-[1440px] mx-auto pt-28">
             <div className="flex flex-col  items-start  gap-5 justify-center w-full p-5">
             <section>
                    <h2 className="text-3xl font-bold mt-4 mb-2">Radix Blockchain</h2>

                    <p className="mt-2">
                        Radix is a layer-1 protocol tailored specifically for decentralized finance (DeFi). It
                        boasts a unique ability to scale without sharding, ensuring unbroken composability and
                        high throughput. Its consensus algorithm, Cerberus, allows for multiple concurrent
                        operations, enhancing transaction speed and security across the network.
                    </p>
                </section>

                {/* Radix Wallet Section */}
                <section>
                    <h2 className="text-3xl font-bold mt-6 mb-2">Radix Wallet</h2>
                    <p className="mt-2">
                        The Radix Wallet is a pivotal element for users within the Radix ecosystem, designed for
                        secure storage and management of XRD tokens. It integrates features for staking, managing
                        delegations, and tracking transactions, thereby playing a central role in the interaction
                        with Radix&apos;s DeFi applications.
                    </p>
                </section>

                {/* DAO Section */}
                <section>
                    <h2 className="text-3xl font-bold mt-6 mb-2">Decentralized Autonomous Organizations (DAOs)</h2>
                    <p className="mt-2">
                        DAOs represent a new model of governance for online communities, operating without
                        centralized leadership. These are governed entirely by their members, with rules encoded
                        on a blockchain, promoting transparent and democratic decision-making processes. They are
                        especially prevalent in the DeFi sector, facilitating collaborative ventures and
                        decision-making in a trustless environment.
                    </p>
                </section>
             </div>
             <div className="md:flex hidden items-center justify-center w-full  h-full">
               <div className=" h-full  w-full  object-cover bg-no-repeat flex items-center justify-center ">
                <img src="./linear-blocks.png" alt="" />
               </div>
             </div>
           </div>
           </div>
    );
  };
  
  export default Resource;
  