# React loading zoid

The **React Loading Zoid** example illustrates the use feature app loading a zoid component. This
example is tied to the demo from the open source [zoid](https://github.com/krakenjs/zoid) project.

## Running demo
In order to run this demo

1. Clone the zoid project at https://github.com/krakenjs/zoid
2. Modify the login.js file located at ./demo/frameworks/react/login.js to have a full url that will load the definition script.

Modify line 10 to contain the full path to the html file.  url: 'http://localhost:1337/demo/frameworks/react/login.htm'

3. Open terminal on the zoid project and execute ```npm run demo```

4. On the feature-hub app execute ```yarn watch:demo react-loading-zoid```

5. Open browser on http://localhost:3001/

## Building distribution

1. From the ./demos directory execute ```npm run build:zoid``` and the output will be in the ./demos/dist directory

