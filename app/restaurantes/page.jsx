'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './restaurantes.module.css';

export default function RestaurantesPage() {
  const [modalAberto, setModalAberto] = useState(false);
  const [restauranteSelecionado, setRestauranteSelecionado] = useState(null);
  const [favoritados, setFavoritados] = useState([]);

  const restaurantes = [
    {
      id: 1,
      img: '/imagens/imagens.restaurantes/bentu\'s restaurante/image (1).png',
      title: 'Bentu\'s Restaurante',
      slug: 'bentus',
      rating: '⭐ 4.6 Excelente',
      price: 'R$ 50 - 80',
      priceOriginal: 'R$ 67 - 107',
      benefits: ['Comida regional', 'Ambiente aconchego', 'Música ao vivo', 'Estacionamento'],
      cupom: 'BENTUS25',
      desconto: '25%',
      validade: '31/12/2025',
    },
    {
      id: 2,
      img: '/imagens/imagens.restaurantes/mãe beata/image 6.png',
      title: 'Mãe Beata Restaurante',
      slug: 'mae-beata',
      rating: '⭐ 4.7 Excelente',
      price: 'R$ 35 - 60',
      priceOriginal: 'R$ 54 - 92',
      benefits: ['Comida caseira caipira', 'Culinária nordestina', 'Buffet completo', 'Sobremesas artesanais'],
      cupom: 'MAEBEATA35',
      desconto: '35%',
      validade: '28/02/2026',
    },
    {
      id: 3,
      img: '/imagens/imagens.restaurantes/diamante da serra/image 1.png',
      title: 'Diamante da Serra',
      slug: 'diamante-da-serra',
      rating: '⭐ 4.5 Muito bom',
      price: 'R$ 40 - 70',
      priceOriginal: 'R$ 57 - 100',
      benefits: ['Comida típica', 'Ambiente rural', 'Vista panorâmica', 'Produtos orgânicos'],
      cupom: 'DIAMANTE30',
      desconto: '30%',
      validade: '31/03/2026',
    },
    {
      id: 4,
      img: '/imagens/imagens.restaurantes/ferreiro rooftop/image 2.png',
      title: 'Ferreiro Rooftop',
      slug: 'ferreiro-rooftop',
      rating: '⭐ 4.8 Excelente',
      price: 'R$ 60 - 100',
      priceOriginal: 'R$ 80 - 133',
      benefits: ['Vista deslumbrante', 'Gastronomia sofisticada', 'Bar completo', 'Ambiente romântico'],
      cupom: 'FERREIRO25',
      desconto: '25%',
      validade: '15/01/2026',
    },
    {
      id: 5,
      img: '/imagens/imagens.restaurantes/tio armenio/20180220_175131 1.png',
      title: 'Tio Armênio',
      slug: 'tio-armenio',
      rating: '⭐ 4.6 Excelente',
      price: 'R$ 45 - 75',
      priceOriginal: 'R$ 64 - 107',
      benefits: ['Comida portuguesa', 'Pratos executivos', 'Almoço por quilo', 'Delivery disponível'],
      cupom: 'ARMENIO30',
      desconto: '30%',
      validade: '31/12/2025',
    },
  ];

  const abrirModal = (restaurante) => {
    setRestauranteSelecionado(restaurante);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setRestauranteSelecionado(null);
  };

  const copiarCupom = (codigo) => {
    navigator.clipboard.writeText(codigo);
    alert('✓ Cupom copiado com sucesso!');
  };

  const alternarFavorito = (restauranteId) => {
    setFavoritados((prev) =>
      prev.includes(restauranteId) ? prev.filter((id) => id !== restauranteId) : [...prev, restauranteId]
    );
  };

  const compartilharRestaurante = (restaurante) => {
    const texto = `Confira o ${restaurante.title} em Caruaru! ${restaurante.rating} - ${restaurante.price}`;
    if (navigator.share) {
      navigator.share({
        title: restaurante.title,
        text: texto,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(texto);
      alert('✓ Link copiado para compartilhar!');
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <Link href="/home" className={styles.setaVoltar}>←</Link>
        <div className={styles.tituloCentral}>
          <span className={styles.icon}>🍽️</span>
          <span>Restaurantes</span>
        </div>
        <button className={styles.btnCompartilhar} onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Restaurantes em Caruaru',
              text: 'Confira os melhores restaurantes de Caruaru com descontos exclusivos!',
              url: window.location.href,
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
            alert('✓ Link copiado!');
          }
        }}>
          🔗
        </button>
      </header>

      {/* Cards de Restaurantes */}
      <main className={styles.main}>
        <h2 className={styles.secaoTitulo}>Restaurantes Disponíveis em Caruaru</h2>
        <div className={styles.cards}>
          {restaurantes.map(restaurante => (
            <div key={restaurante.id} className={styles.card}>
              {restaurante.desconto && (
                <div className={styles.descontoBadge}>{restaurante.desconto}</div>
              )}
              <img 
                src={restaurante.img} 
                alt={restaurante.title} 
                className={styles.img} 
              />
              <div className={styles.cardContent}>
                <span className={styles.badge}>Restaurante</span>
                <h3>{restaurante.title}</h3>
                <p className={styles.rating}>{restaurante.rating}</p>
                
                {restaurante.priceOriginal && (
                  <span className={styles.precoOriginal}>De {restaurante.priceOriginal}</span>
                )}
                <span className={styles.preco}>Por {restaurante.price}</span>
                
                {restaurante.cupom && (
                  <div className={styles.cupomInfo}>
                    🎟️ Use o cupom: 
                    <span 
                      className={styles.cupomCode}
                      onClick={() => abrirModal(restaurante)}
                    >
                      {restaurante.cupom}
                    </span>
                  </div>
                )}

                <div className={styles.benefitsList}>
                  {restaurante.benefits.slice(0, 2).map((ben, idx) => (
                    <span key={idx} className={styles.benefit}>✓ {ben}</span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.btnFavoritar}
                    onClick={() => alternarFavorito(restaurante.id)}
                  >
                    {favoritados.includes(restaurante.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    className={styles.btnCompartilharCard}
                    onClick={() => compartilharRestaurante(restaurante)}
                  >
                    🔗
                  </button>
                </div>

                <Link href={`/restaurantes/${restaurante.slug}`}>
                  <button className={styles.botaoCard}>
                    {restaurante.cupom ? 'Ver Cupom' : 'Ver Ofertas'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de Cupom */}
      {modalAberto && restauranteSelecionado && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>🎉 Cupom de Desconto</h2>
              <button className={styles.closeModal} onClick={fecharModal}>×</button>
            </div>
            <div className={styles.cupomDestaque}>
              <h3>{restauranteSelecionado.desconto}</h3>
              <p>Use o código abaixo</p>
              <div 
                className={styles.cupomCodeGrande}
                onClick={() => copiarCupom(restauranteSelecionado.cupom)}
              >
                {restauranteSelecionado.cupom}
              </div>
            </div>
            <div className={styles.modalInfo}>
              <strong>{restauranteSelecionado.title}</strong>
              <p>✓ Válido até: {restauranteSelecionado.validade}</p>
              <p>✓ Aplicável em refeições no local</p>
              <p>✓ Não cumulativo com outras promoções</p>
              <div style={{ marginTop: '15px' }}>
                {restauranteSelecionado.benefits.map((ben, idx) => (
                  <p key={idx}>✓ {ben}</p>
                ))}
              </div>
            </div>
            <Link href={`/restaurantes/${restauranteSelecionado.slug}`}>
              <button className={styles.copiarBtn}>
                📋 Copiar Código e Reservar
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
