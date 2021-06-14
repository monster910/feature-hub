import React, {createContext, useContext, useEffect, useState} from 'react';
import { useScripts } from './useScripts';

const ZoidFrameworkContext = createContext( {
  url: null,
});

interface ZoidContextProps {
  url: string;
  children: any;
}

const ZoidFrameworkContextProvider = (props: ZoidContextProps) => {
  const { url, children } = props;
  const [ loaded, setLoaded ] = useState(false);
  const zoidContext = useContext(ZoidFrameworkContext);

  useEffect(() => {
    async function loadZoidFramework() {
      console.log('loading zoid framework');
      console.log(url);
      const urls = [
        url,
      ];
      await useScripts(urls, false, () => setLoaded(true));
      console.log('done loading zoid framework');
    }
    if (!loaded) {
      loadZoidFramework();
    }
  });

  return (
    <ZoidFrameworkContext.Provider value={zoidContext}>
      {loaded ? children: ''}
    </ZoidFrameworkContext.Provider>
  );
}



export { ZoidFrameworkContext, ZoidFrameworkContextProvider };
