import {Text} from '@blueprintjs/core';
import {FeatureAppDefinition} from '@feature-hub/core';
import {ReactFeatureApp} from '@feature-hub/react';
import LoginZoid from './login-zoid-component';
import * as React from 'react';
// import {ZoidFrameworkContextProvider} from './zoid-context';
// import {useScripts} from "./useScripts";

const getFakeServerLag = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function fetchDataFromServer(): Promise<string> {
  await getFakeServerLag(500);
//
//   if (Math.random() > 0.5) {
//     throw Error(`Server Error: Bad luck!
// For performance reasons this server flips a coin to consider which calls to answer.
// Reload the demo to try again.`);
//   }

  return 'You got lucky! Have some juicy server data. Reload the example for a chance at an error.';
}


interface AppProps {
  loadingDone: () => void;
  loadingError: (err: Error) => void;
  config: any
}

const App: React.FunctionComponent<AppProps> = ({
  loadingDone,
  loadingError,
  config
}) => {
  const [serverResponse, setServerResponse] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    console.log('fetching data');

    // this is a load inside the feature-app. It does not work with the UMD definition. See webpack-config.js
    // async function loadZoidDefinition() {
    //   const zoidUrls = [
    //     'http://localhost:1337/dist/zoid.frameworks.js'
    //   ];
    //   // load component definition script
    //   await useScripts(zoidUrls, false);
    //
    // }
    // loadZoidDefinition();

    fetchDataFromServer()
      .then(setServerResponse)
      .then(loadingDone)
      .catch(loadingError);
  }, [loadingDone, loadingError]);

  if (!serverResponse) {
    return null;
  }

  console.log('render feature app');
  return (
    <Text>
      <span>The feature app is using a zoid component:</span>
      <pre>
        {/*<ZoidFrameworkContextProvider url={'http://localhost:1337/dist/zoid.min.js'}>*/}
          <LoginZoid id={config.id} url={config.url} />
        {/*</ZoidFrameworkContextProvider>*/}
      </pre>
    </Text>
  );
};

const featureAppDefinition: FeatureAppDefinition<ReactFeatureApp> = {
  create: (env) => {
    console.log(env);
    let resolve: () => void;
    let reject: (err: Error) => void;

    const loadingPromise: Promise<void> = new Promise(
      (res, rej) => ([resolve, reject] = [res, rej])
    );

    return {
      loadingPromise,
      render: () => {
        console.log('render()');
        return (
          <App loadingDone={resolve} loadingError={reject} config={env.config}/>
        )
      },
    };
  },
};

export default featureAppDefinition;
