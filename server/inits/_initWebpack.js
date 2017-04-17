import webpackMiddleware from 'webpack-koa2-middleware';
import webpack from 'webpack';
import path from 'path';
export default {
    init(app, { debug }) {
        app.use(webpackMiddleware(webpack({
            context: path.resolve(ROOT_PATH, "frontend/app"),
            entry: { index: "./index" },
            output: {
                path: "/",
                // no real path is required, just pass "/" 
                // but it will work with other paths too. 
            }
        }), {
            // publicPath is required, whereas all other options are optional 

            // noInfo: false,
            // // display no info to console (only warnings and errors) 

            // quiet: false,
            // // display nothing to the console 

            lazy: false,
            // switch into lazy mode 
            // that means no watching, but recompilation on every request 

            watchOptions: {
                aggregateTimeout: 300,
                poll: true
            },
            // watch options (only lazy: false) 

            publicPath: "/assets/",
            // public path to bind the middleware to 
            // use the same as in webpack 

            index: "index.html",
            // the index path for web server 

            headers: { "X-Custom-Header": "yes" },
            // custom headers 

            stats: {
                colors: true
            },
            // options for formating the statistics 

            reporter: null,
            // Provide a custom reporter to change the way how logs are shown. 

            serverSideRender: false,
            // Turn off the server-side rendering mode. See Server-Side Rendering part for more info. 
        }));
    }
}