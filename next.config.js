const nextConfig = {
  generateBuildId: async () => {
    const generateYourBuildId = async () => {
      return `moflix_${new Date().getTime()}`;
    };
    const buildId = await generateYourBuildId(); // Your custom build ID generation logic
    console.log("Current Build ID:", buildId); // Log the build ID during the build process
    return buildId;
  },
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  generateEtags: false,
  generate: {
    // Increase the timeout value (in milliseconds)
    fallback: "blocking",
  },
  dataCollection: {
    timeout: 120000, // Set it to 60 seconds
  },
  images: {
    unoptimized: true,
  },
  webpack5: true,
};

module.exports = nextConfig;
