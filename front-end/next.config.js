const { withContentlayer } = require('next-contentlayer');

const nextConfig = withContentlayer({
  reactStrictMode: true,
  images: {
    domains: [
      'source.unsplash.com',
      'images.unsplash.com',
      'prettygood236.github.io',
      'avatars.dicebear.com',
      'scs-phinf.pstatic.net',
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
});

module.exports = nextConfig;
