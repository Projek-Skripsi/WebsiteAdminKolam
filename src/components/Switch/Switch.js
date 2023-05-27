import React, { useState } from 'react'
import styles from './Switch.module.css'

const Switch = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className={styles.switch}>
      <input
        type="checkbox"
        id={'toggle-btn'}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor="toggle-btn"></label>
    </div>
  )
}

export default Switch
