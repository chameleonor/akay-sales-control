import { defineConfig } from "vite";
// import path from "path";

import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), TanStackRouterVite(), tsconfigPaths()],
		resolve: {
		alias: {
			"@stores": "/src/stores",
			"@components": "/src/components",
			"@routes": "/src/routes",
			"@utils": "/src/utils",
		},
	},
});
