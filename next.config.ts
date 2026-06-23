import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://*.firebaseapp.com https://*.googleapis.com; frame-src https://apis.google.com https://*.firebaseapp.com; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebasedatabase.app wss://*.firebasedatabase.app https://*.firebaseapp.com https://identitytoolkit.googleapis.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
