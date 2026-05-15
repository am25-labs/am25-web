import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://analytics.alemartir.com https://challenges.cloudflare.com https://static.cloudflareinsights.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "img-src 'self' data: blob: https://cms.alemartir.com https://cdn.alemartir.com https://d3t3ozftmdmh3i.cloudfront.net",
              "connect-src 'self' https://cms.alemartir.com https://cdn.alemartir.com https://analytics.alemartir.com https://challenges.cloudflare.com https://cloudflareinsights.com https://podcasters.alemartir.com https://anchor.fm",
              "media-src 'self' blob: https://podcasters.alemartir.com https://anchor.fm https://d3ctxlq1ktw2nl.cloudfront.net",
              "frame-src https://challenges.cloudflare.com https://www.youtube.com https://player.vimeo.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.alemartir.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.alemartir.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d3t3ozftmdmh3i.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
