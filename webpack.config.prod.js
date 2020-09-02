//node js import syntax, path is a defualt node package
const path = require("path")

//sets the correct prefix to css class based on browser such as -webkit or -moz
const autoprefixer = require("autoprefixer")

//for injecting our bundled and transformed files into index,.html
const HtmlWebpackPlugin = require("html-webpack-plugin")

//our main webpack config
module.exports = {
    //tells webpack what mode we will be in, to see if it should fully optimize the page or not, shrinking it to production level makes debuging harder 
    mode: "production",

    //where webpack enters our app
    entry: "./src/index.js",

    //where webpack outputs our bundles
    output: {
        //write our bundled code to a dist folder in the current directory
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: ''
    },
    //controls where the source map runs when we get an error, allows us to debug our code, not the compiled code, this will be none in the production build
    devtool: "none",
    module: {
        //an array of rules that is going to tell webpack which loaders/transpilers to apply to which files 
        rules: [
            {
                //regex to say target the .js files
                test: /\.js$/,
                //this loader knows how to compile js files, such as ES6 -> ES3
                loader: "babel-loader",
                //we do not want anything to be changed in the node modules, they should be good when we install them  
                exclude: /node_modules/
            },
            {
                //target .css
                test: /\.css$/,
                //we do not want anything to be changed in the node modules, they should be good when we install them  
                exclude: /node_modules/,
                //to use multiple loaders, use takes an array of objects
                use: [
                    //style loader looks at the actual styles we use
                    { loader: "style-loader" },

                    //css loader looks at our css imports and connections, we ad options for more configuration, in this case adding css modules
                    {
                        loader: "css-loader",
                        //options for css-loader
                        options: {
                            //says how many loaders before css-loader is applied, ie style loader before this one
                            importLoaders: 1,
                            modules: {
                                //sets how the random css name is generated 
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        }
                    },
                    //this loader helps us auto prefix our css for it to help it load in older browsers, like the "@babel/present-env" for css
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            //plugins has to be a function that returns an array of plugins
                            plugins: () => [autoprefixer()]
                        }
                    }
                ]
            }, 
            {
                //tests for images 
                test: /\.(png|jpe?g|gif)$/,
                //user th url loader with inline options, limit = 8000kb or 8mb, name = images folder [name of image].[extension of image]
                loader: "url-loader?limit=8000&name=images/[name].[ext]"
            }
        ]
    }, 

    //plugins to our webpack 
    plugins :[
        //must create a new instance of the plugin and configure it 

        new HtmlWebpackPlugin({
            //use this index.html file as out starting point
            template: __dirname + "/src/index.html", 
            
            //create an index.html file 
            filename: "index.html",
            
            //inject our new links, such as bundle.js into the body
            inject: "body"
        })
    ]
}

