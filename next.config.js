const fs = require("fs");
const path = require("path");

function findIndexHtmlDirs(dir, urlBase = "") {
  const dirs = [];
  if (!fs.existsSync(dir)) return dirs;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
    const urlPath = `${urlBase}/${entry.name}`;
    const fullPath = path.join(dir, entry.name);
    if (fs.existsSync(path.join(fullPath, "index.html"))) {
      dirs.push(urlPath);
    }
    dirs.push(...findIndexHtmlDirs(fullPath, urlPath));
  }

  return dirs;
}

const staticHtmlDirs = findIndexHtmlDirs(path.join(__dirname, "public"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Serve each public/*/index.html at /folder and /folder/ so static
    // mini-sites are reachable without the filename in the URL.
    return {
      beforeFiles: staticHtmlDirs.flatMap((dir) => [
        { source: dir, destination: `${dir}/index.html` },
        { source: `${dir}/`, destination: `${dir}/index.html` },
      ]),
    };
  },
};

module.exports = nextConfig;
