import { createContext, useContext, useState, useEffect } from 'react';
import { RadixDappToolkit, RadixNetwork } from "@radixdlt/radix-dapp-toolkit";
import PropTypes from 'prop-types'; 

// Creating the context
const RadixContext = createContext(null);

export const useRadix = () => useContext(RadixContext);
const RadixProvider = ({ children }) => {
  const [rdt, setRdt] = useState(null);

  useEffect(() => {
      const initRdt = RadixDappToolkit({
          networkId: RadixNetwork.Stokenet,
          applicationVersion: "1.0.0",
          applicationName: "Pandao",
          applicationDappDefinitionAddress: "account_tdx_2_128wx75khgz5rstma5aapejz3656eluz43v3jruz2s3kv3n0urr8m23",
      });
      
      setRdt(initRdt);
  }, []);

  return (
      <RadixContext.Provider value={{ rdt }}>
          {children}
      </RadixContext.Provider>
  );
};

export default RadixProvider;
RadixProvider.propTypes = {
  children: PropTypes.node 
};