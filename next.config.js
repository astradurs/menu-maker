/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false, // does this help dnd?
	env: {
		API_HOST: process.env.API_HOST
	}
};

module.exports = nextConfig;
