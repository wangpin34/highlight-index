/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/highlightjs',
        destination: '/hljs',
        permanent: true,
      },
      {
        source: '/highlightjs/:slug',
        destination: '/hljs/:slug',
        permanent: true,
      },
      {
        source: '/prismjs',
        destination: '/prism',
        permanent: true,
      },
      {
        source: '/prismjs/:slug',
        destination: '/prism/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
