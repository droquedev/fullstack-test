import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.dev.app",
  appName: "app",
  webDir: "dist",
  server: {
    url: "http://192.168.68.116:5173",
    cleartext: true,
  },
};

export default config;
