const { withPlaiceholder } = require('@plaiceholder/next');

/** @type {import('next').NextConfig} */
module.exports = withPlaiceholder({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**'
      }
    ]
  }
  // your Next.js config
});
