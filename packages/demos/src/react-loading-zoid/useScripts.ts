/**
 * Load a script directly into dom
 * @param url the url to load
 * @param target target (head, body, etc...)
 * @param asyncLoad async load or not
 * @returns {Promise<unknown>}
 */
const loadScript = (url: string, target: any, asyncLoad: boolean) => new Promise((resolve, reject) => {
  const tag = document.createElement('script');
  tag.onload = () => {
    // @ts-ignore
    // console.log(zoid);
  }
  tag.onerror = (event) => {
    console.log(event);
    reject(new Error(`script loading error ${url}`));
  }
  tag.async = asyncLoad;
  tag.src = url;
  target.appendChild(tag);
  tag.addEventListener('load', resolve, {
    once: true
  });
});

/**
 * Load scripts into document body
 *
 * @param urls the urls to load
 * @param asyncLoad async load or not
 * @param loaded an optional callback to be used when complete
 * @param error an optional callback to be used when there is an error
 * @param delay a optional delay. When 0 there is no delay
 */
export const useScripts = async (urls: string[], asyncLoad: boolean,
                                 loaded = (values: any) => values, error = (error: Error) => error) => {
  return Promise.all(urls.map(url => loadScript(url, document.head, asyncLoad))).then(values => {
    console.log(values);
    loaded(values);
    return values;
  })
  .catch(aError => {
    error(aError);
    return aError;
  });
};
