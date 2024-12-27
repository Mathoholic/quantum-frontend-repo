import Link from 'next/link';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const menuItems = [
        { name: 'Lead View', path: '/pages/admin' },
        { name: 'Members', path: '/pages/members' },
    ];

    return (
        <div className={styles.sidebar}>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <Link href={item.path}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
