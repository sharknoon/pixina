const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

module.exports = {
    module: {
      rules: [
        // this will apply to both plain `.scss` files
        // AND `<style lang="scss">` blocks in `.vue` files
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new GoogleFontsPlugin({
          fonts: [
              { family: "Kumbh Sans", variants: [ "300", "Regular", "700" ] },
              { family: "Roboto", variants: [ "400", "700italic" ] }
          ]
      })
  ]
  }