export type LoginZoidProps = {
  id: string,
  url: string,
  messageHandler?: any
};

export enum LoginZoidMessageTypes {

  LOAD_ERROR = 'loadError',
  RENDER_COMPLETE = 'renderComplete',

}
