import { getCollections, getPages, getProducts } from "lib/api";
import { baseUrl, validateEnvironmentVariables } from "lib/utils";
import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified: string;
};

/** Revalidate sitemap every hour instead of on every request */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const routesMap = [
    "",
    "/shop",
    "/portofolio",
    "/kontak",
    "/kategori",
    "/tentang-kami",
    "/layanan",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const collectionsPromise = getCollections({ cache: "force-cache" }).then(
    (collections) =>
      collections.map((collection) => ({
        url: `${baseUrl}${collection.path}`,
        lastModified: collection.updatedAt || new Date().toISOString(),
      })),
  );

  const productsPromise = getProducts({}, { cache: "force-cache" }).then(
    ({ products }) =>
      products.map((product) => ({
        url: `${baseUrl}/shop/product/${product.handle}`,
        lastModified: product.updatedAt || new Date().toISOString(),
      })),
  );

  const pagesPromise = getPages({ cache: "force-cache" }).then((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}/${page.handle}`,
      lastModified: page.updatedAt || new Date().toISOString(),
    })),
  );

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise])
    ).flat();
  } catch (error) {
    // Silent fail - use static routes only
  }

  return [...routesMap, ...fetchedRoutes];
}
