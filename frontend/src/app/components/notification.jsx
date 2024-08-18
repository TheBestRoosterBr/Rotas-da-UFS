// src/components/Notification.jsx
import React from 'react';
import styles from './notification.module.css';

export default function notification({ type, title, description }) {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
