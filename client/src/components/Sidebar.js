import React from 'react';
import '../App.css';

const Sidebar = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <aside className="sidebar">
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category}
            className={`category-item ${category === selectedCategory ? 'active' : ''}`}
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
