import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

type PropTypes = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<PropTypes> = ({ sidebarOpen, toggleSidebar }) => {
    const location = useLocation(); // Hook to get current location

    // Function to check if the current route matches the given path
    const isActive = (path: string) => location.pathname === path;

    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out z-20`}
        >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faTimes} className="text-xl hover:cursor-pointer" />
                </button>
            </div>
            <ul className="p-4">
                <Link to="/Home" onClick={toggleSidebar}>
                    <li className={`py-2 px-2 rounded ${isActive('/Home') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                        Dashboard
                    </li>
                </Link>
                <Link to="/createCustomer" onClick={toggleSidebar}>
                    <li className={`py-2 px-2 rounded ${isActive('/createCustomer') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                        Create Customer
                    </li>
                </Link>
                <Link to="/addData" onClick={toggleSidebar}>
                    <li className={`py-2 px-2 rounded ${isActive('/addData') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                        Add Data
                    </li>
                </Link>
            </ul>
        </div>
    );
}

export default Sidebar;
