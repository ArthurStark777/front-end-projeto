'use client';

import { useState, useEffect } from 'react';
import styles from './InteractiveFeatures.module.css';

export default function InteractiveFeatures({ title, category }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const storageKey = `favoritos${category}`;
    const favorites = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setIsFavorite(favorites.includes(title));
  }, [title, category]);

  const toggleFavorite = () => {
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Confira: ${title}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copiado!');
    setShowShareMenu(false);
  };

  const shareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Confira: ${title}`);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };

  const shareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Confira: ${title}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return (
    <div className={styles.interactiveButtons}>
      <button 
        className={`${styles.btnFavorite} ${isFavorite ? styles.active : ''}`}
        onClick={toggleFavorite}
        title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <div className={styles.shareContainer}>
        <button 
          className={styles.btnShare}
          onClick={handleShare}
          title="Compartilhar"
        >
          📤
        </button>

        {showShareMenu && (
          <div className={styles.shareMenu}>
            <button onClick={copyLink} className={styles.shareOption}>
              🔗 Copiar Link
            </button>
            <button onClick={shareWhatsApp} className={styles.shareOption}>
              💬 WhatsApp
            </button>
            <button onClick={shareFacebook} className={styles.shareOption}>
              📘 Facebook
            </button>
            <button onClick={shareTwitter} className={styles.shareOption}>
              🐦 Twitter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
