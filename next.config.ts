import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ] }];
  },
  outputFileTracingIncludes: { "/*": ["./content/**/*.md", "./content/quiz/questions.json"] },
  outputFileTracingExcludes: { "/*": ["./**/gôm nhặt trên mạng/**", "./.qa/**"] },
};
export default config;
