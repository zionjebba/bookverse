"use client";

import React, { useState } from "react";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarList = [
    { title: "Home", href: "/" },
    { title: "My Library", href: "/mylibrary"},
    { title: "Upload a Book", href: "/upload" },
    { title: "Bookstore", href: "/bookstore" },
  ];

  return (
    <>
      {/* Toggle button */}
      <button
        className={styles.toggleBtn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        =
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.sidebarList}>
          {sidebarList.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li key={index} className={styles.sidebarItem}>
                <Link
                  href={item.href}
                  className={`${styles.sidebarLink} ${
                    isActive ? styles.active : ""
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
