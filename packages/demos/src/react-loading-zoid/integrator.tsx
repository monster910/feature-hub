import {Callout, Card, H4, Intent, Spinner} from '@blueprintjs/core';
import {createFeatureHub} from '@feature-hub/core';
import {defineExternals, loadAmdModule} from '@feature-hub/module-loader-amd';
import {FeatureAppLoader, FeatureHubContextProvider} from '@feature-hub/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../blueprint-css';
import {ZoidFrameworkContextProvider} from './zoid-context';

defineExternals({react: React});

const {featureAppManager} = createFeatureHub('test:integrator', {
  moduleLoader: loadAmdModule,
  providedExternals: {react: process.env.REACT_VERSION as string},
});

function ErrorUi({error}: {error: Error}): JSX.Element {
  return (
    <Callout intent={Intent.DANGER}>
      <H4>Example Error UI</H4>
      <p>{error.message}</p>
    </Callout>
  );
}

const config = { id: 'featureAppId', url: 'http://localhost:1337/demo/frameworks/react/login.js' };

// this is implemented using the framework that is context loaded. Dynamic scripts loaded with UMD are not created a new
// definition which fails. See ../start-server.js which the framework is added directly in HEAD of HTML doc
ReactDOM.render(
  <div style={{padding: '20px'}}>
    <ZoidFrameworkContextProvider url={'http://localhost:1337/dist/zoid.frameworks.js'}>
      <FeatureHubContextProvider value={{featureAppManager}}>
        <FeatureAppLoader
          featureAppId="test:invalid"
          src="feature-app.umd.js"
          config={config}
          onError={console.warn}
        >
          {({error, featureAppNode, loading}) => {
            if (error) {
              return <ErrorUi error={error} />;
            }

            console.log('loading = ', loading);
            return (
              <Card>
                <div style={{display: loading ? 'none' : 'initial'}} id={config.id}>
                  {featureAppNode}
                </div>
                {loading && (
                  <div>
                    <Spinner />
                    Example Loading UI…
                  </div>
                )}
              </Card>
            );
          }}
        </FeatureAppLoader>
      </FeatureHubContextProvider>
    </ZoidFrameworkContextProvider>
  </div>,
  document.querySelector('main')
);
