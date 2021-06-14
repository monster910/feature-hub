import {Text} from '@blueprintjs/core';
import {FeatureAppDefinition} from '@feature-hub/core';
import {ReactFeatureApp} from '@feature-hub/react';
import Zoid from './zoid-component';
import * as React from 'react';
// import { useScripts } from './useScripts';

const getFakeServerLag = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function fetchDataFromServer(): Promise<string> {
  await getFakeServerLag(1000);
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
    fetchDataFromServer()
      .then(setServerResponse)
      .then(loadingDone)
      .catch(loadingError);
  }, [loadingDone, loadingError]);

  if (!serverResponse) {
    return null;
  }

  return (
    <Text>
      <span>The feature app is using a zoid component:</span>
      <pre>
        <Zoid id={config.id} url={config.url} />
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
