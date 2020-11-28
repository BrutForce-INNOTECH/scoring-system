const withPlugins = require('next-compose-plugins');
const path = require('path')
const withOptimizedImages = require('next-optimized-images');

module.exports = withPlugins(
  [
    [
      withOptimizedImages,
      {
        optimizeImages: true,
        optimizeImagesInDev: false,
        inlineImageLimit: 8192,
        imagesFolder: 'images',
        imagesName: '[name]-[hash].[ext]',
        handleImages: ['jpeg', 'jpg', 'png', 'svg', 'webp', 'gif'],
        mozjpeg: {
          quality: 90,
        },
        optipng: {
          optimizationLevel: 3,
        },
        webp: {
          preset: 'default',
          quality: 90,
        },
        svgo: {
          // enable/disable svgo plugins here
        },
      },
    ],
  ], {
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    api: {
      // OR
      bodyParser: {
        sizeLimit: '50mb', // Set max body size
      },
    },
  });