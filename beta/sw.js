importScripts("/fish-out-of-water/betaprecache-manifest.b3c1095e94fe60e81cc598be70f6185c.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/**
 * You should only modify this, if you know what you are doing.
 * This phaser template is using workbox (https://developers.google.com/web/tools/workbox/)
 * to precache all assets.
 * It uses the InjectManifest function from 'workbox-webpack-plugin' inside
 * webpack/webpack.common.js
 */
workbox.precaching.precacheAndRoute(__precacheManifest)

