import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
		],
		unoptimized: true,
	},
	// cacheComponents: true,
	reactCompiler: true,
	reactStrictMode: false,
	poweredByHeader: false, // remove X-Powered-By
	compress: true, // gzip compression,
}

export default nextConfig
