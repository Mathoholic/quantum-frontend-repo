"use client"
import { useState } from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { FaBars, FaHome, FaUsers } from 'react-icons/fa'; // Importing the hamburger icon

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for toggling sidebar

  const menuItems = [
    { name: 'Lead View', path: '/pages/admin', icon: <FaHome /> },
    { name: 'Members', path: '/pages/members', icon: <FaUsers /> },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? '' : styles.closed}`}>
      <div className={styles.toggleButton} onClick={toggleSidebar}>
        {/* <FaBars /> Hamburger icon */}
      </div>

      <ul>
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link href={item.path} className={styles.link}>
              <span className={styles.icon}>{item.icon}</span>
              {isSidebarOpen && item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
