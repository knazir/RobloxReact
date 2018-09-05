"use strict";

/* Replaces {...} substitutions in the HTML template with values from process.env.
   Note: ${...} is handled by _.template inside html-web-pack-plugin. */
module.exports = class InterpolatePlugin {
  apply(compiler) {
    const name = this.constructor.name;
    compiler.hooks.compilation.tap(name, compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(name, data => this.replace(data, compilation));
    });
  }

  replace(data, compilation) {
    data.html = data.html.replace(/\{(\w+)\}/g, (match, key) => {
      if (process.env[key] == null) {
        compilation.errors.push(new Error(`HTML interpolation: Undefined substitution: ${key}`));
        return match;
      }
      return process.env[key];
    });
  }
};
