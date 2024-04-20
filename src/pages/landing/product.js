function Product(){
    return (
        <div className="h-screen  text-white p-8 m-8">
          <h1 className="text-4xl font-bold mb-6">Welcome to Pandao</h1>
    
          {/* Pandao Overview Section */}
          <section>
            <h2 className="text-3xl font-bold mt-4 mb-2">What is Pandao?</h2>
            <p className="mt-2">
              Pandao is a revolutionary platform built on the Radix blockchain, designed to democratize
              the creation and management of decentralized autonomous organizations (DAOs). It simplifies
              the process of DAO deployment, making it accessible even to users with minimal blockchain
              knowledge. Our intuitive interface removes the complexities of smart contract programming,
              allowing anyone to start and manage a DAO with ease.
            </p>
          </section>
    
          {/* Features of Pandao Section */}
          <section>
            <h2 className="text-3xl font-bold mt-6 mb-2">Features of Pandao</h2>
            <p className="mt-2">
              Pandao integrates several key features to support its mission:
              <ul className="list-disc pl-8">
                <li>Simple DAO Setup: With just a few clicks, set up your own DAO, define its rules, and get it running.</li>
                <li>Customizable Governance Models: Choose from a variety of governance templates or customize your own to meet the specific needs of your community.</li>
                <li>Secure on Radix: Built on the Radix blockchain, Pandao leverages the security and scalability of this layer-1 protocol.</li>
                <li>Community Support: Gain access to a broad network of users and resources to ensure your DAO thrives.</li>
              </ul>
            </p>
          </section>
    
          {/* Getting Started with Pandao Section */}
          <section>
            <h2 className="text-3xl font-bold mt-6 mb-2">Getting Started with Pandao</h2>
            <p className="mt-2">
              Starting your journey with Pandao is straightforward:
              <ol className="list-decimal pl-8">
                <li>Visit the Pandao platform and sign up for an account.</li>
                <li>Follow the guided setup to create your DAO.</li>
                <li>Engage your community and begin governance with full autonomy and minimal fuss.</li>
              </ol>
              Embrace the future of decentralized governance with Pandao, where creating a DAO is as simple as managing a social media profile.
            </p>
          </section>
        </div>
      );
}
export default Product ;