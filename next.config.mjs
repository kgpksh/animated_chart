/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    compiler: {
        removeConsole: true,
    },
    eslint: {
        ignoreDuringBuilds: true
    }
}

export default nextConfig;
