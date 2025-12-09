'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './hoteis.module.css';

export default function HoteisPage() {
  const [modalAberto, setModalAberto] = useState(false);
  const [hotelSelecionado, setHotelSelecionado] = useState(null);
  const [favoritados, setFavoritados] = useState([]);

  const hoteis = [
    {
      id: 1,
      img: '/imagens/imagens.hoteis/citi hotel residence caruaru/citi hotel.png',
      title: 'Citi Hotel Residence Caruaru',
      slug: 'citi-hotel-residence-caruaru',
      rating: '⭐ 4.8 Excelente',
      price: 'R$ 281',
      priceOriginal: 'R$ 401',
      benefit: 'Café da manhã incluído',
      cupom: 'CITIHOTEL30',
      desconto: '30%',
      validade: '28/02/2026',
      benefits: ['Café da manhã incluído', 'Wi-Fi gratuito', 'Estacionamento', 'Piscina']
    },
    {
      id: 2,
      img: '/imagens/imagens.hoteis/citi hotel express caruaru/Imagem (1).png',
      title: 'Citi Hotel Express Caruaru',
      slug: 'citi-hotel-express-caruaru',
      rating: '⭐ 4.6 Excelente',
      price: 'R$ 180',
      priceOriginal: 'R$ 257',
      benefit: 'Café da manhã incluído',
      cupom: 'EXPRESS30',
      desconto: '30%',
      validade: '31/12/2025',
      benefits: ['Café da manhã incluído', 'Wi-Fi gratuito', 'Ar condicionado', 'TV a cabo']
    },
    {
      id: 3,
      img: '/imagens/imagens.hoteis/imagem (2).png',
      title: 'Hotel Maysa Caruaru',
      slug: 'hotel-maysa-caruaru',
      rating: '⭐ 4.5 Muito bom',
      price: 'R$ 298',
      priceOriginal: 'R$ 426',
      benefit: 'Café da manhã incluído',
      cupom: 'MAYSA30',
      desconto: '30%',
      validade: '15/03/2026',
      benefits: ['Café da manhã incluído', 'Localização central', 'Academia', 'Restaurante']
    },
    {
      id: 4,
      img: '/imagens/imagens.hoteis/wa hotel caruaru/imagem (3).png',
      title: 'WA Hotel Caruaru',
      slug: 'wa-hotel-caruaru',
      rating: '⭐ 4.9 Excelente',
      price: 'R$ 311',
      priceOriginal: 'R$ 389',
      benefit: 'Cancelamento grátis',
      cupom: 'WAHOTEL20',
      desconto: '20%',
      validade: '31/03/2026',
      benefits: ['Cancelamento grátis', 'Wi-Fi gratuito', 'Spa', 'Bar']
    },
    {
      id: 5,
      img: '/imagens/imagens.hoteis/hotel vilage premium caruaru/imagem (4).png',
      title: 'Hotel Village Premium Caruaru',
      slug: 'hotel-village-premium-caruaru',
      rating: '⭐ 4.6 Muito bom',
      price: 'R$ 275',
      priceOriginal: 'R$ 344',
      benefit: 'Café da manhã incluído',
      cupom: 'VILLAGE20',
      desconto: '20%',
      validade: '28/02/2026',
      benefits: ['Café da manhã incluído', 'Piscina aquecida', 'Sauna', 'Recepção 24h']
    },
  ];

  const abrirModal = (hotel) => {
    setHotelSelecionado(hotel);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setHotelSelecionado(null);
  };

  const copiarCupom = (codigo) => {
    navigator.clipboard.writeText(codigo);
    alert('✓ Cupom copiado com sucesso!');
  };

  const alternarFavorito = (hotelId) => {
    setFavoritados((prev) =>
      prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]
    );
  };

  const compartilharHotel = (hotel) => {
    const texto = `Confira o ${hotel.title} em Caruaru! ${hotel.rating} - A partir de ${hotel.price}`;
    if (navigator.share) {
      navigator.share({
        title: hotel.title,
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
          <span className={styles.icon}>🏨</span>
          <span>Hotéis</span>
        </div>
        <button className={styles.btnCompartilhar} onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Hotéis em Caruaru',
              text: 'Confira os melhores hotéis de Caruaru com descontos exclusivos!',
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

      {/* Busca */}
      <div className={styles.buscaSection}>
        <div className={styles.barraBusca}>
          <input type="text" placeholder="Buscar hotel..." />
          <input type="date" placeholder="Check-in" />
          <input type="date" placeholder="Check-out" />
          <button className={styles.buscar}>Buscar</button>
        </div>
      </div>

      {/* Cards de Hotéis */}
      <main className={styles.main}>
        <h2 className={styles.secaoTitulo}>Hotéis Disponíveis em Caruaru</h2>
        <div className={styles.cards}>
          {hoteis.map(hotel => (
            <div key={hotel.id} className={styles.card}>
              {hotel.desconto && (
                <div className={styles.descontoBadge}>{hotel.desconto}</div>
              )}
              <img 
                src={hotel.img} 
                alt={hotel.title} 
                className={styles.img} 
              />
              <div className={styles.cardContent}>
                <span className={styles.badge}>Hotel</span>
                <h3>{hotel.title}</h3>
                <p className={styles.rating}>{hotel.rating}</p>
                
                {hotel.priceOriginal && (
                  <span className={styles.precoOriginal}>De {hotel.priceOriginal}</span>
                )}
                <span className={styles.preco}>Por {hotel.price}</span>
                
                {hotel.cupom && (
                  <div className={styles.cupomInfo}>
                    🎟️ Use o cupom: 
                    <span 
                      className={styles.cupomCode}
                      onClick={() => abrirModal(hotel)}
                    >
                      {hotel.cupom}
                    </span>
                  </div>
                )}

                <div className={styles.benefitsList}>
                  {hotel.benefits.slice(0, 2).map((ben, idx) => (
                    <span key={idx} className={styles.benefit}>✓ {ben}</span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.btnFavoritar}
                    onClick={() => alternarFavorito(hotel.id)}
                  >
                    {favoritados.includes(hotel.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    className={styles.btnCompartilharCard}
                    onClick={() => compartilharHotel(hotel)}
                  >
                    🔗
                  </button>
                </div>

                <Link href={`/hoteis/${hotel.slug}`}>
                  <button className={styles.botaoCard}>
                    {hotel.cupom ? 'Ver Cupom e Reservar' : 'Ver Ofertas'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de Cupom */}
      {modalAberto && hotelSelecionado && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>🎉 Cupom de Desconto</h2>
              <button className={styles.closeModal} onClick={fecharModal}>×</button>
            </div>
            <div className={styles.cupomDestaque}>
              <h3>{hotelSelecionado.desconto}</h3>
              <p>Use o código abaixo</p>
              <div 
                className={styles.cupomCodeGrande}
                onClick={() => copiarCupom(hotelSelecionado.cupom)}
              >
                {hotelSelecionado.cupom}
              </div>
            </div>
            <div className={styles.modalInfo}>
              <strong>{hotelSelecionado.title}</strong>
              <p>✓ Válido até: {hotelSelecionado.validade}</p>
              <p>✓ Aplicável em reservas pelo site</p>
              <p>✓ Não cumulativo com outras promoções</p>
              <div style={{ marginTop: '15px' }}>
                {hotelSelecionado.benefits.map((ben, idx) => (
                  <p key={idx}>✓ {ben}</p>
                ))}
              </div>
            </div>
            <Link href={`/hoteis/${hotelSelecionado.slug}`}>
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
