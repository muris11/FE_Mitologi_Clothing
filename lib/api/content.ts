import { ENDPOINTS } from "./endpoints";
import { apiFetch } from "./index";
import {
  LandingPageData,
  Menu,
  Page,
  PortfolioItem,
  SiteSettings,
} from "./types";

export async function getMenu(handle: string): Promise<Menu[]> {
  try {
    const data = await apiFetch<Menu[]>(ENDPOINTS.MENU(handle), {}, [
      `menu-${handle}`,
    ]);
    return data || [];
  } catch (error) {
    return [];
  }
}

export async function getPages(requestOptions?: RequestInit): Promise<Page[]> {
  try {
    return await apiFetch<Page[]>(ENDPOINTS.PAGES, requestOptions || {}, [
      "pages",
    ]);
  } catch (error) {
    return [];
  }
}

export async function getPage(handle: string): Promise<Page | undefined> {
  try {
    return await apiFetch<Page>(ENDPOINTS.PAGE_DETAIL(handle), {}, [
      `page-${handle}`,
    ]);
  } catch (error) {
    return undefined;
  }
}

export async function getLandingPageData(): Promise<
  LandingPageData | undefined
> {
  try {
    return await apiFetch<LandingPageData>(ENDPOINTS.LANDING_PAGE, {}, [
      "landing-page",
    ]);
  } catch (error) {
    return undefined;
  }
}

export async function getPortfolios(): Promise<PortfolioItem[]> {
  try {
    return await apiFetch<PortfolioItem[]>(ENDPOINTS.PORTFOLIOS, {}, [
      "portfolios",
    ]);
  } catch (error) {
    return [];
  }
}

export async function getPortfolio(
  slug: string,
): Promise<PortfolioItem | undefined> {
  try {
    return await apiFetch<PortfolioItem>(ENDPOINTS.PORTFOLIO_DETAIL(slug), {}, [
      `portfolio-${slug}`,
    ]);
  } catch (error) {
    return undefined;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | undefined> {
  try {
    return await apiFetch<SiteSettings>(ENDPOINTS.SITE_SETTINGS, {}, [
      "site-settings",
    ]);
  } catch (error) {
    return undefined;
  }
}

/**
 * Get team member photo URL (bypasses symlink issues on Windows)
 * @param id - Team member ID
 * @returns Full URL to the team member's photo
 */
export function getTeamMemberPhotoUrl(id: string | number): string {
  const apiUrl = ENDPOINTS.TEAM_MEMBER_PHOTO(id);
  // Use backend URL if available, otherwise relative
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  return backendUrl ? `${backendUrl.replace(/\/+$/, "")}${apiUrl}` : apiUrl;
}
