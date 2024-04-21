function Resource() {

    return (
        <div className="h-auto  w-3/4 text-white md:p-8 md:m-8 p-2 m-2">
            <img className='absolute' src={process.env.PUBLIC_URL + './images/linear-blocks.png'}>
            </img>
            <h1 className="text-4xl font-bold mb-6">Radix Ecosystem Overview</h1>

            {/* Radix Blockchain Section */}
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
                    with Radix's DeFi applications.
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

    );

}

export default Resource;