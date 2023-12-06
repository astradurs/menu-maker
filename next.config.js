/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false, // does this help dnd?
	env: {
		API_URL: process.env.API_URL
	}
};

module.exports = nextConfig;
