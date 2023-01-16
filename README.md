<div align="center">
<img src='https://img.shields.io/github/actions/workflow/status/left0ver/iconfont-url-plugin/ci.yml?branch=main'/>
<img src='https://img.shields.io/npm/v/iconfont-url-plugin'/>
</div>

# :tada: iconfont-url-plugin

这是一个 webpack 插件,让你可以获取自己的[iconfont](https://wwww.iconfont.cn/)中的在线链接并且通过[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)自动将对应的标签 inject 到生成的 html 中

> 该项目建议只用于个人项目, cookie 等隐私数据建议使用环境变量的方式注入,并且不要直接上传到 GitHub 等平台,以免造成不必要的麻烦

# :key: Install

```shell
# npm
npm i iconfont-url-plugin -D

# yarn

yarn add iconfont-url-plugin -D

# pnpm
pnpm add iconfont-url-plugin -D

```

# :rainbow: Usage

```typescript
//webpack.config.js

  plugins: [
  //.... other plugin
    new HtmlWebpackPlugin(),
    new IconfontUrlPlugin({ projectName: 'your iconfont project name', cookie: 'your cookie',fileType:"js" }),
  ],

```

# :bulb: Options

- projectName : iconfont 中的项目名

  - required

- cookie : iconfont 网站的 cookie
  - required
- fileType: 引入的文件类型
  - required
  - value: js | css
  - description: iconfont 中的有 3 种方式引入字体图标,详情请看[字体图标使用](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code),如果你使用 `font-class` 引用字体图标,则需引入对应的 css 文件,此时 fileType 应设置为 css,如果使用 symbol 引用,则此时 fileType 应设置为 js


# :necktie: Related project

- [iconfont-url](https://github.com/left0ver/iconfont-url)
# :sparkles: LICENSE

[MIT](./LICENSE)
