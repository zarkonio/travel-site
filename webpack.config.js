const currentTask = process.env.npm_lifecycle_event
const path = require("path"); // node.js biblioteka
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // instalirali da bismo mogli sa npm run build da obrisemo stare fajlove u dist folderu (produkcijska app) i generisemo nove sa  skorijim promenama
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // instalirali smo ga sa npm install mini-css-extract-plugin --save-dev
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')               // paket za podrsku za vise html fajlova

const postCSSPlugins = [
  require('postcss-import'),              // neka bude moguce importovati css u css fajlu - modularnost css-a 
  require('postcss-mixins'),              // mixins za css 
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer')
];

class RunAfterCompile { // ova klasa mi treba da bi se sve slike kopirale u odgovarajuci folder u dist kako bi imali slike za distribucionu verziju projekta
  apply(compiler){
    compiler.hooks.done.tap('Copy images', function(){
      // fse.copySync('./app/assets/images', './dist/assets/images') // ovde koristimo dist za naziv foldera za distribuciju ali github trazi da se on naziva docs pa samo to menjamo
      fse.copySync('./app/assets/images', './docs/assets/images')
    })
  }
}

let cssConfig =  {
  test: /\.css$/i,                  // samo css fajlove (ovo je reg exp) neka vidi css-loader modul
  use: ['css-loader', {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: postCSSPlugins
      }
    }
  }]
}

let pages = fse.readdirSync('./app').filter(function(file){
  return file.endsWith('.html') // vrati mi samo nazive html fajlova iz app foldera u nizu
}).map(function(page){    // generisi novi niz na osnovu niza naziva html fajlova. 
  return new HtmlWebpackPlugin({ // novi niz ce biti niz sa vise html webpack pluginova
    filename: page,
    template: `./app/${page}`
  })
})

let config = {
  entry: "./app/assets/scripts/App.js",   // putanja do fajla koji hocemo da watch, process and bundle-ujemo
  // plugins : [new HtmlWebpackPlugin({filename: 'index.html', template: './app/index.html'})],
  plugins: pages,
  module: {                               // webpack sada vidi i razume css fajlove
    rules: [
     cssConfig
    ]
  }              
}

if(currentTask == 'dev') {  // ili runujemo dev skriptu za workflow u toku razvoja aplikacije
  cssConfig.use.unshift('style-loader') // kod developmenta korsitimo style-loader dodatak
  config.output = {                               // gde je produkcijaska verzija cele aplikacije umesto defaultnog foldera disk i main.js fajla
    filename: "bundled.js",               // necemo main.js u folderu disk vec hocemo bundled.js u folderu app
    path: path.resolve(__dirname, "app"), // gde da bude bundled.js. Hocemo da bude gde i index.html tj. u folderu app
  }
  config.devServer = {
    onBeforeSetupMiddleware: function (devServer) {     // ovde nasao ispravku za verziju 5: https://github.com/webpack/webpack/discussions/15250
      devServer.app.get('./app/**/*.html', function (req, res) {
        res.json({ custom: "response" });
      });
    },
    static: path.join(__dirname, 'app'),
    hot: true,                            // bez refreshovanja browsera neka se sajt live prikazuje u toku developmenta
    port: 3000,                           // default je 8080 ali koristicemo 3000 jer se lakse pamti a i trebalo bi da je slobodan
    host: '0.0.0.0'                       // trebalo bi da mogu da ucitam na fonu na 192.168.1.12:3000 sajt ali nece nesto
  }
  config.mode = 'development'
}

if(currentTask == 'build') { // ili runujemo build skriptu za generisanje aplikacije za produkciju
  config.module.rules.push({  // treba mi da bi se generisao za produkciju js takav da ne koristi bas najsvezije featureove koje postoje kako bi podrska za browsere uvek bila veca
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  })
  cssConfig.use.unshift(MiniCssExtractPlugin.loader) // kod buildovanja projekta korsitimo ne style-loader dodatak vec MiniCssExtractPlugin-ov loader
  postCSSPlugins.push(require('cssnano'))          // dodaj u niz css nano za kompresiju css fajlova u produkciji
  config.output = {                               // gde je produkcijaska verzija cele aplikacije umesto defaultnog foldera disk i main.js fajla
    filename: "[name].[chunkhash].js",               // necemo main.js u folderu disk vec hocemo bundled.js u folderu app
    chunkFilename: '[name].[chunkhash].js', // chunkhash je hash naziv za fajlove koji ce biti generisani 
    // path: path.resolve(__dirname, "dist") // gde da bude bundled.js. Hocemo da bude gde i index.html tj. u folderu za distribuciju - dist
    // ovde koristimo dist za naziv foldera za distribuciju ali github trazi da se on naziva docs pa samo to menjamo
    path: path.resolve(__dirname, "docs")
  }
  config.mode = 'production'
  config.optimization = {
    splitChunks: {chunks: 'all'}
  }
  config.plugins.push(
    new CleanWebpackPlugin(), // da bi se automatski obrisali stari fajlovi u dist folderu (app u produkciji) i generisali novi sa npm run build posle promene u app
    new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}), // generisanje css fajlova
    new RunAfterCompile()
  )
}

// module.exports = {
let deleteMeLater = {  
  // entry: "./app/assets/scripts/App.js",   // putanja do fajla koji hocemo da watch, process and bundle-ujemo
  // output: {                               // gde je produkcijaska verzija cele aplikacije umesto defaultnog foldera disk i main.js fajla
  //   filename: "bundled.js",               // necemo main.js u folderu disk vec hocemo bundled.js u folderu app
  //   path: path.resolve(__dirname, "app"), // gde da bude bundled.js. Hocemo da bude gde i index.html tj. u folderu app
  // },
  // devServer: {
  //   onBeforeSetupMiddleware: function (devServer) {     // ovde nasao ispravku za verziju 5: https://github.com/webpack/webpack/discussions/15250
  //     devServer.app.get('./app/**/*.html', function (req, res) {
  //       res.json({ custom: "response" });
  //     });
  //   },
  //   static: path.join(__dirname, 'app'),
  //   hot: true,                            // bez refreshovanja browsera neka se sajt live prikazuje u toku developmenta
  //   port: 3000,                           // default je 8080 ali koristicemo 3000 jer se lakse pamti a i trebalo bi da je slobodan
  //   host: '0.0.0.0'                       // trebalo bi da mogu da ucitam na fonu na 192.168.1.12:3000 sajt ali nece nesto
  // },
  // mode: "development",                    // trenutno smo u development modu. mode moze biti i production
  // watch: true,                            // webpack ce ostati runnovan tj. necemo posle svake promene u kodu morati kucati u terminal npm run dev da bismo 
                                          // dobili produkcijsku ili dev verziju projekta u toku razvoja. nesto poput live servera za staticke sajtove
  /*                                        // Ctrl + C u terminalu zaustavlja konstantno runnovanje webpack-a. Ovo brisemo ako smo dodali devServer koji ovo isto radi + jos svasta 
  module: {                               // webpack sada vidi i razume css fajlove
    rules: [
      {
        test: /\.css$/i,                  // samo css fajlove (ovo je reg exp) neka vidi css-loader modul
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: postCSSPlugins
            }
          }
        }]
      }
    ]
  }           
  */                             
};                                                

module.exports = config