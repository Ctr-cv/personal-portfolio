import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework.
  poweredByHeader: false,

  // Trailing slashes off so canonical URLs match the sitemap exactly.
  trailingSlash: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stop MIME sniffing.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Don't leak full URLs to third parties.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // This site has no reason to be framed.
          { key: "X-Frame-Options", value: "DENY" },
          // Explicitly deny device APIs the site never uses.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
