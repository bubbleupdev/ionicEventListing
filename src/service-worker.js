/**
 * Check out https://googlechrome.github.io/sw-toolbox/docs/master/index.html for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json',
    'https://woodlandscenter.7.dev.bubbleup.com/api/v1/events',
    'https://woodlandscenter.7.dev.bubbleup.com/api/v1/events',
    'https://woodlandscenter.7.dev.bubbleup.com/api/v1/pages?path=directions',
    'https://woodlandscenter.7.dev.bubbleup.com/api/v1/pages?path=season-seats',
    'https://woodlandscenter.7.dev.bubbleup.com/api/v1/pages?path=pavilion-rules',
    'https://woodlandscenter.7.dev.bubbleup.com/api/v1/pages?path=parking',
    'https://woodlandscenter.7.dev.bubbleup.com/api/v1/pages?path=venue-maps',
    'https://www.woodlandscenter.org/api/v1/events',
    'https://www.woodlandscenter.org/api/v1/pages?path=directions',
    'https://www.woodlandscenter.org/api/v1/pages?path=season-seats',
    'https://www.woodlandscenter.org/api/v1/pages?path=pavilion-rules',
    'https://www.woodlandscenter.org/api/v1/pages?path=parking',
    'https://www.woodlandscenter.org/api/v1/pages?path=venue-maps',
    'https://s3.amazonaws.com/busites-www/woodlandscenterapp/maps/2017-cwmp-map-01.svg',
    'https://s3.amazonaws.com/busites-www/woodlandscenterapp/maps/seating-map-public-01.svg',
    'https://s3.amazonaws.com/busites-www/woodlandscenterapp/maps/public-parking-and-pathways-map-01.svg',
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
