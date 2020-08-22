const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// ... your other imports

// You can tie this to whatever mechanisms you are using to detect a development environment.
// For example, as shown here, is to tie that to `NODE_ENV` -
// Then if you run `NODE_ENV=production webpack`, the constant will be set to false.
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  // It is suggested to run the plugin in development mode only
  // If you are an advanced user and would like to setup Webpack yourselves,
  // you can also use the `none` mode,
  // but you will need to set `forceEnable: true` in the plugin options.
  mode: isDevelopment ? "development" : "production",
  // ... other configurations
  plugins: [
    // ... other plugins
    // You could also keep the plugin in your production config,
    // It will simply do nothing.
    isDevelopment && new ReactRefreshWebpackPlugin()
  ].filter(Boolean)
};
