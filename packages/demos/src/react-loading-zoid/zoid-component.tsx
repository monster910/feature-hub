import React, { useEffect, useState } from 'react';
// import styles from './zoid-component.module.scss';
import { ZoidProps, ZoidMessageTypes } from './zoid-component.types';
import { useScripts } from "./useScripts";

const Zoid: React.FC<ZoidProps> = (props: ZoidProps) => {
  console.log('initialize Zoid Component');
  console.log(props.url);
  if (props.url === undefined) {
    throw new Error('Url to zoid component must be defined');
  }

  /**
   * Handle messages for the dashboard embedded component
   *
   * @param event
   */
  function handleMessage(event: any) {
    console.log(event);
    // ignore messages
    if (props.url.includes(event.origin)) { return; }
    switch(event.data.type as ZoidMessageTypes) {

      case ZoidMessageTypes.RENDER_COMPLETE:
        console.log('react-loading-zoid ===> Zoid Render complete');
        break;
    }
  }

  // useEffect swallows errors so we use state to save errors and throw
  // from main execution path
  const [error, setError] = useState(undefined);

  useEffect(() => {
    console.log('useEffect zoid component');
    async function loadComponentDefinition() {
      const zoidUrls = [
        props.url
      ];
      // load component definition script
      await useScripts(zoidUrls, false);
      const MyLoginZoidComponent = (window as any).MyLoginZoidComponent;
      if (MyLoginZoidComponent) {
        // username is optional. Only sent when using mock server. It is ignore when not mocking.
        MyLoginZoidComponent({handleMessage}).render('#' + props.id);
        // optional - listen for message events from child window. One could also pass a function that can be called
        // from child window
        window.addEventListener('message', handleMessage, false);
      } else {
        const error = new Error('MyLoginZoidComponent is undefined');
        // @ts-ignore
        setError(error);
        throw error;
      }

    }
    loadComponentDefinition()
  }, []);

  // if there was an error loading zoid, throw the error
  if (error) {
    throw error;
  }

  return (
    <div>
      <div id={props.id}></div>
    </div>
  );
};

export default Zoid;
