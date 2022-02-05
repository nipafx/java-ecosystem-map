
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-index-tsx": preferDefault(require("/home/nipa/code/java-ecosystem-map/src/pages/index.tsx"))
}

