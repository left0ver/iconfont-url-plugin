const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMajorVersion = require('webpack/package.json').version.split('.')[0]
const { IconfontUrlPlugin } = require('iconfont-url-plugin')

module.exports = {
  context: __dirname,
  entry: './example.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, `dist/webpack-${webpackMajorVersion}`),
    publicPath: '',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // { test: /\.png$/, type: 'asset/resource' },
    ],
  },
  // if you want to build with webpack4 ,please run 'pnpm add webpack@4 html-webpack-plugin@4 webpack-cli@4 -D'
  plugins: [
    new HtmlWebpackPlugin(),
    new IconfontUrlPlugin({ projectName: 'vue-admin', cookie: 'ctoken=6e1Yzhl3KHCdorMPV56Pv0iB; cna=W/3aGwMnGiYCAWVQeLRp6Skp; xlly_s=1; EGG_SESS_ICONFONT=LwyPfFe9mdLtPg5kAyRM2oKTWe0dYQN45w0qN-zVhK6dp-njsVT2v8vj0y7Na1xO_qxR0Q5yn44fvFMYv4dAbFkkPN7Q2SIT7WFQ5FO2LlJVKsCyelzFFL8JjTAVNK-3jyCRMmszG1y4c25mFifA0KCTRNGsC3yO4F5BQ7TmkGklE3PTdw0HJK8iKAk8vOfcosi1out1fHvBNMvkz8FNSQ==; u=8520645; u.sig=s3SVY9PtAbD8LE5GAHj0_MUPeCU3Mgt8M0-Qb1rj7jU; isg=BHJyitcnRTdd0XkHHopIhzTEw75UA3ad0BSLjTxPiyXbzxTJJJMPrTVtvmvz1-41', fileType: 'js' }),
  ],
}
