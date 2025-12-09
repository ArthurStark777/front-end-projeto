'use client';

import { useState, useEffect } from 'react';
import styles from './CardInteractive.module.css';

export default function CardInteractive({ title, category, children }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storageKey = `favoritos${category}`;
    const favorites = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setIsFavorite(favorites.includes(title));
  }, [title, category]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const storageKey = `favoritos${category}`;
    let favorites = JSON.parse(localStorage.getItem(storageKey) || '[]');

    if (isFavorite) {
      favorites = favorites.filter(f => f !== title);
    } else {
      favorites.push(title);
    }

    localStorage.setItem(storageKey, JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Confira: ${title}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Cancelado');
      }
    } else {
      alert(`Compartilhe: ${title}\n${window.location.href}`);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <button 
        className={`${styles.btnFavorite} ${isFavorite ? styles.active : ''}`}
        onClick={toggleFavorite}
        title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      
      <button 
        className={styles.btnShare}
        onClick={handleShare}
        title="Compartilhar"
      >
        📤
      </button>

      {children}
    </div>
  );
}
