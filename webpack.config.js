const path = require("path"); // node.js biblioteka

const postCSSPlugins = [
  require('postcss-import'),              // neka bude moguce importovati css u css fajlu - modularnost css-a 
  require('postcss-mixins'),              // mixins za css 
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
];

module.exports = {
  entry: "./app/assets/scripts/App.js",   // putanja do fajla koji hocemo da watch, process and bundle-ujemo
  output: {                               // gde je produkcijaska verzija cele aplikacije umesto defaultnog foldera disk i main.js fajla
    filename: "bundled.js",               // necemo main.js u folderu disk vec hocemo bundled.js u folderu app
    path: path.resolve(__dirname, "app"), // gde da bude bundled.js. Hocemo da bude gde i index.html tj. u folderu app
  },
  devServer: {
    onBeforeSetupMiddleware: function (devServer) {     // ovde nasao ispravku za verziju 5: https://github.com/webpack/webpack/discussions/15250
      devServer.app.get('./app/**/*.html', function (req, res) {
        res.json({ custom: "response" });
      });
    },
    static: path.join(__dirname, 'app'),
    hot: true,                            // bez refreshovanja browsera neka se sajt live prikazuje u toku developmenta
    port: 3000,                           // default je 8080 ali koristicemo 3000 jer se lakse pamti a i trebalo bi da je slobodan
    host: '0.0.0.0'                       // trebalo bi da mogu da ucitam na fonu na 192.168.1.12:3000 sajt ali nece nesto
  },
  mode: "development",                    // trenutno smo u development modu. mode moze biti i production
  // watch: true,                            // webpack ce ostati runnovan tj. necemo posle svake promene u kodu morati kucati u terminal npm run dev da bismo 
                                          // dobili produkcijsku ili dev verziju projekta u toku razvoja. nesto poput live servera za staticke sajtove
                                          // Ctrl + C u terminalu zaustavlja konstantno runnovanje webpack-a. Ovo brisemo ako smo dodali devServer koji ovo isto radi + jos svasta 
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
};                                                
