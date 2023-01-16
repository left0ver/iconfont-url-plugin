import type { Compilation, Compiler, WebpackPluginInstance } from 'webpack'
import type HtmlWebpackPluginInstance from 'html-webpack-plugin'
import type { HtmlTagObject } from 'html-webpack-plugin'
import { getOnlineUrl } from 'iconfont-url'

declare namespace IconfontUrlPlugin {
  interface options {
    projectName: string
    cookie: string
    fileType?: 'js' | 'css'
  }
}
interface HtmlWebpackPluginData {
  assetTags: {
    scripts: Array<HtmlTagObject>
    styles: Array<HtmlTagObject>
    meta: Array<HtmlTagObject>
  }
  publicPath: string
  outputName: string
  plugin: HtmlWebpackPluginInstance

}
class IconfontUrlPlugin implements WebpackPluginInstance {
  private options: IconfontUrlPlugin.options

  constructor(options: IconfontUrlPlugin.options) {
    this.options = options
  }

  private getHtmlWebpackPlugin = (
    compiler: Compiler,
  ): typeof HtmlWebpackPluginInstance | null => {
    const htmlWebpackPlugin = (compiler.options.plugins || []).find((plugin) => {
      return plugin.constructor.name === 'HtmlWebpackPlugin'
    }) as typeof HtmlWebpackPluginInstance | undefined

    if (!htmlWebpackPlugin) {
      return null
    }

    const HtmlWebpackPlugin = htmlWebpackPlugin.constructor
    if (!HtmlWebpackPlugin || !('getHooks' in HtmlWebpackPlugin)) {
      return null
    }
    return HtmlWebpackPlugin as typeof HtmlWebpackPluginInstance
  }

  private async addIconFontUrlTag(data: HtmlWebpackPluginData, options: IconfontUrlPlugin.options) {
    const { projectName, cookie, fileType = 'js' } = options
    if (fileType !== 'js' && fileType !== 'css') {
      throw new Error('fileType field is required and must be one of [\'css\',\'js\']')
    }
    if (!cookie) {
      throw new Error('cookie field is required')
    }

    if (!projectName) {
      throw new Error('projectName field is required')
    }
    const fontUrlObj = await getOnlineUrl(projectName, cookie)

    if (fontUrlObj !== null) {
      const { js_file, css_file } = fontUrlObj

      const scriptAssetTag: HtmlTagObject = {
        tagName: 'script',
        voidTag: false,
        meta: { plugin: 'icon-font-url-plugin' },
        attributes: { defer: true, type: 'text/javascript', src: js_file, crossorigin: true },
      }
      const styleAssetTag: HtmlTagObject = {
        tagName: 'link',
        voidTag: false,
        meta: { plugin: 'icon-font-url-plugin' },
        attributes: { type: 'text/css', href: css_file, rel: 'stylesheet', crossorigin: true },
      }
      const insertTag: HtmlTagObject = fileType === 'js'
        ? scriptAssetTag
        : styleAssetTag
      console.log(data.assetTags.scripts)

      data.assetTags.scripts.unshift(insertTag)
    }

    return data
  }

  apply(compiler: Compiler) {
    const pluginName = IconfontUrlPlugin.name
    compiler.hooks.compilation.tap(pluginName, (compilation: Compilation) => {
      const HtmlWebpackPlugin = this.getHtmlWebpackPlugin(compiler)

      if (!HtmlWebpackPlugin) {
        throw new Error(`${pluginName} needs to be used with html-webpack-plugin`)
      }

      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        pluginName,
        (data: HtmlWebpackPluginData, cb: any) => {
          cb(null, this.addIconFontUrlTag(data, this.options))
        },
      )
    })
  }
}

export { IconfontUrlPlugin }
