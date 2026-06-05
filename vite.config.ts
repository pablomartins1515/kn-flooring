// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isNetlify = Boolean(process.env.NETLIFY);

export default defineConfig({
  nitro: {
    preset: isNetlify ? "netlify" : "vercel",
    ...(isNetlify
      ? {
          output: {
            dir: ".netlify/functions-internal",
            serverDir: ".netlify/functions-internal/server",
            publicDir: "dist/client",
          },
        }
      : {}),
  },
});
