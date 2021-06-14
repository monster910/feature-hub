export type ZoidProps = {
  id: string,
  url: string,
  messageHandler?: any
};

export enum ZoidMessageTypes {

  LOAD_ERROR = 'loadError',
  RENDER_COMPLETE = 'renderComplete',

}
