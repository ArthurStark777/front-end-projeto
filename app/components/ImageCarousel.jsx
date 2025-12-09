'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ImageCarousel.module.css';

export default function ImageCarousel({ images, altPrefix }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselTrack}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`${styles.carouselSlide} ${idx === currentIndex ? styles.active : ''}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <Image
              src={img}
              alt={`${altPrefix} ${idx + 1}`}
              width={500}
              height={333}
              className={styles.carouselImg}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button 
            className={`${styles.carouselBtn} ${styles.prev}`}
            onClick={prevImage}
            aria-label="Imagem anterior"
          >
            ❮
          </button>
          <button 
            className={`${styles.carouselBtn} ${styles.next}`}
            onClick={nextImage}
            aria-label="Próxima imagem"
          >
            ❯
          </button>

          <div className={styles.carouselDots}>
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
                onClick={() => goToImage(idx)}
                aria-label={`Ir para imagem ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
