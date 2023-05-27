import React from 'react'
import cn from 'classnames'
import styles from './Sidebar.module.css'
import navlink from 'mocks/navlink'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div id={styles.sidebar}>
      <header>Kolam Sejahtera</header>
      <ul className="nav flex-column gap-1">
        {navlink.map((item, index) => (
          <li key={index} className="nav-item">
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? styles.active : '')}
              end={item.end}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
