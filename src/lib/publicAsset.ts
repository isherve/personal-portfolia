/** Public folder URLs that work on GitHub Pages (subpath) and local dev. */
export const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
