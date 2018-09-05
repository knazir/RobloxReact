const config = Object.assign({
  HOME_URL: "/",
  SITE_TITLE: `${process.env.NODE_ENV === "development" ? "[DEV] " : ""}Roblox`
}, process.env);

for (let key of Object.keys(config)) Object.defineProperty(config, key, { writable: false });
export default config;
