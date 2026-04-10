"use client";

import clsx from "clsx";
import { Menu } from "lib/api/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function FooterMenuItem({ item }: { item: Menu }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          "block p-2 text-sm font-sans font-medium underline-offset-4 hover:text-mitologi-gold hover:underline md:inline-block transition-colors text-slate-400",
          {
            "text-white font-bold": active,
          },
        )}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item: Menu) => {
          return (
            <FooterMenuItem key={`${item.title}-${item.path}`} item={item} />
          );
        })}
      </ul>
    </nav>
  );
}
