export function viteStyleHmrFix() {
  return {
    name: "vite-style-hmr-fix",
    apply: "serve",
    handleHotUpdate({ file, server }) {
      const isVueSfc = file.endsWith(".vue");
      const isProjectScss =
        file.endsWith(".scss") &&
        !file.includes("node_modules") &&
        (file.includes("/components/") ||
          file.includes("/pages/") ||
          file.includes("/layouts/") ||
          file.includes("/assets/styles/"));

      if (isVueSfc || isProjectScss) {
        server.ws.send({ type: "full-reload" });
        return [];
      }
    },
  };
}

export const cssModuleScopedName = (name, filename) => {
  const match = filename.match(/([^/\\]+)\.vue/);
  return match ? `${match[1]}__${name}` : name;
};
