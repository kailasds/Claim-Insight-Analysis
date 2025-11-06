
import React from 'react';
import { Page } from '../types';
import { sidebarItems, ICONS } from '../constants';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-start px-6 border-b border-gray-200">
          <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h1 className="text-xl font-bold text-gray-800 ml-3">Claims Intel</h1>
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActivePage(item.name as Page)}
                className={`w-full flex items-center px-4 py-2.5 my-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activePage === item.name
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {ICONS[item.icon]}
                <span className="ml-4">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
