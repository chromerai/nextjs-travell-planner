/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
    },
    typescript: {
        ignoreBuildErrors:true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        NEXT_PUBLIC_DOMAIN:"http://localhost:3000",
        NEXT_PUBLIC_STRIPE_PUBLIC_KEY:"pk_test_51PXbRjJ70KNrhseUlnVBJLPKSHZRF5uma3tOXYdeX9cLd9F2VAGEx2SLBAjdMYfnv7pvBYzmMqIX9vyp1JnOvs2N00My2U4PFi",
    },
    images: {
        remotePatterns:[
            {hostname:"imgcld.yatra.com"}
        ]
    }
};

export default nextConfig;
