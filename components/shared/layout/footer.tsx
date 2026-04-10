import FooterMenu from "components/shared/layout/footer-menu";
import { getMenu } from "lib/api";
import Link from "next/link";
import { Suspense } from "react";

const { COMPANY_NAME, SITE_NAME } = process.env;
const CURRENT_YEAR = new Date().getFullYear();

export default async function Footer() {
  const menu = await getMenu("next-js-frontend-footer-menu");
  const copyrightDate = 2023 + (CURRENT_YEAR > 2023 ? `-${CURRENT_YEAR}` : "");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="bg-mitologi-navy text-slate-300 border-t border-slate-800/50 text-sm font-sans mt-auto">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link
              className="flex items-center gap-2 text-white hover:text-mitologi-gold transition-colors p-1 -ml-1"
              href="/"
            >
              <span className="uppercase font-extrabold tracking-wider text-xl">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed mt-2 font-medium">
              Vendor clothing terpercaya yang mengangkat nilai-nilai budaya
              Nusantara ke dalam fashion modern berkualitas tinggi.
            </p>
            <div className="flex gap-4 mt-4">
              {/* Social Icons (SVG) */}
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM_BASE_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-mitologi-gold hover:-translate-y-1 transition-all p-2 bg-white/5 rounded-full hover:bg-white/10"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h-.165zm-2.37 1.734c-1.55.071-2.285.405-2.962.887-.97.697-1.572 1.722-1.572 3.12 0 .093.003.187.01.278.411-1.928 2.115-3.374 4.148-3.374 2.373 0 4.298 1.925 4.298 4.298 0 .151-.009.3-.026.447.882-.236 1.554-.959 1.737-1.897.108-.553.155-1.32.155-2.296 0-1.282-.016-1.688-.066-2.222-.058-.616-.25-1.14-.59-1.583a2.915 2.915 0 00-1.107-.905c-.655-.316-1.52-.465-2.827-.51-1.36-.046-1.766-.046-3.197.054zM12 8.356a3.644 3.644 0 110 7.288 3.644 3.644 0 010-7.288zm5.838-3.313a.928.928 0 110 1.856.928.928 0 010-1.856z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">
              Koleksi
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/search/t-shirt"
                  className="text-slate-400 hover:text-mitologi-gold hover:translate-x-1 inline-block transition-transform"
                >
                  T-Shirts Myth Series
                </Link>
              </li>
              <li>
                <Link
                  href="/search/hoodie"
                  className="text-slate-400 hover:text-mitologi-gold hover:translate-x-1 inline-block transition-transform"
                >
                  Premium Hoodies
                </Link>
              </li>
              <li>
                <Link
                  href="/search/jacket"
                  className="text-slate-400 hover:text-mitologi-gold hover:translate-x-1 inline-block transition-transform"
                >
                  Bomber Jackets
                </Link>
              </li>
              <li>
                <Link
                  href="/search/accessories"
                  className="text-slate-400 hover:text-mitologi-gold hover:translate-x-1 inline-block transition-transform"
                >
                  Aksesoris
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column (Dynamic) */}
          <div>
            <h3 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">
              Bantuan
            </h3>
            <Suspense
              fallback={
                <div className="h-20 bg-white/5 rounded-lg animate-pulse" />
              }
            >
              <FooterMenu menu={menu} />
            </Suspense>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">
              Kontak
            </h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex gap-3">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mt-1 flex-none text-mitologi-gold"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>
                  Jl. Veteran No. 45,
                  <br />
                  Indramayu, Jawa Barat 45212
                </span>
              </li>
              <li className="flex gap-3">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 flex-none text-mitologi-gold"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                  className="hover:text-mitologi-gold transition-colors"
                >
                  {process.env.NEXT_PUBLIC_CONTACT_PHONE}
                </a>
              </li>
              <li className="flex gap-3">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 flex-none text-mitologi-gold"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                  className="hover:text-mitologi-gold transition-colors"
                >
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-800/50 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <p className="text-sm leading-5 text-slate-400 text-center md:text-center">
            &copy; {copyrightDate} {copyrightName}. Hak Cipta Dilindungi.
          </p>
          <div className="mt-4 md:mt-0 flex gap-4 justify-center md:justify-end">
            {/* Payment Icons Placeholder */}
            <div className="h-8 w-12 bg-white/10 rounded overflow-hidden"></div>
            <div className="h-8 w-12 bg-white/10 rounded overflow-hidden"></div>
            <div className="h-8 w-12 bg-white/10 rounded overflow-hidden"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
