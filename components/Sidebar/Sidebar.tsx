"use client";

import React from "react";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  const sidebarList = [
    { title: "Home", href: "/" },
    { title: "My Library", href: "/Books" },
    { title: "Upload a Book", href: "/Upload" },
    { title: "Bookstore", href: "/bookstore" },
  ];

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        {sidebarList.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <li key={index} className={styles.sidebarItem}>
              <Link
                href={item.href}
                className={`${styles.sidebarLink} ${isActive ? styles.active : ""}`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
