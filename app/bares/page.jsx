'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './bares.module.css';

export default function BaresPage() {
  const [modalAberto, setModalAberto] = useState(false);
  const [barSelecionado, setBarSelecionado] = useState(null);
  const [favoritados, setFavoritados] = useState([]);

  const bares = [
    {
      id: 1,
      img: '/imagens/imagens.bares/boteco do keka/Imagem do WhatsApp de 2025-11-22 à(s) 17.34.08_457a3d5d.jpg',
      title: 'Boteco do Keka Prime',
      slug: 'boteco-do-keka-prime',
      rating: '⭐ 4.8 Excelente',
      price: 'R$ 40 - 80',
      priceOriginal: 'R$ 50 - 100',
      benefits: ['Música ao vivo', 'Aceita reservas', 'Happy hour especial', 'Petiscos variados'],
      cupom: 'KEKA20',
      desconto: '20%',
      validade: '31/03/2026',
    },
    {
      id: 2,
      img: '/imagens/imagens.bares/Seu Zé lounge/Imagem do WhatsApp de 2025-11-22 à(s) 17.34.06_580f598a.jpg',
      title: 'Seu Zé Lounge',
      slug: 'seu-ze-lounge',
      rating: '⭐ 4.6 Excelente',
      price: 'R$ 40 - 60',
      priceOriginal: 'R$ 100',
      benefits: ['Organiza eventos', 'Ótimos drinks', 'Ambiente climatizado', 'DJ aos finais de semana'],
      cupom: 'SEUZE40',
      desconto: '40%',
      validade: '28/02/2026',
    },
    {
      id: 3,
      img: '/imagens/imagens.bares/metal beer/Imagem do WhatsApp de 2025-11-22 à(s) 17.34.09_bd5c23e3.jpg',
      title: 'Metal Beer',
      slug: 'metal-beer',
      rating: '⭐ 4.6 Muito Bom',
      price: 'R$ 35 - 70',
      priceOriginal: 'R$ 41 - 82',
      benefits: ['Tem música ao vivo', 'Serve ótimos coquetéis', 'Cerveja artesanal', 'Rock ao vivo'],
      cupom: 'METAL15',
      desconto: '15%',
      validade: '31/03/2026',
    },
    {
      id: 4,
      img: '/imagens/imagens.bares/petiscaria do tio tio/Imagem do WhatsApp de 2025-11-22 à(s) 17.34.07_02b1d6f2.jpg',
      title: 'Petiscaria do titio',
      slug: 'petiscaria-do-titio',
      rating: '⭐ 4.5 Muito bom',
      price: 'R$ 40 - 60',
      priceOriginal: 'R$ 85',
      benefits: ['Cardápio variado', 'Tem mesas externas', 'Porções generosas', 'Atendimento familiar'],
      cupom: 'TITIO35',
      desconto: '35%',
      validade: '15/01/2026',
    },
    {
      id: 5,
      img: '/imagens/imagens.bares/fulano de tal/Imagem do WhatsApp de 2025-11-22 à(s) 17.34.05_9a1012d6.jpg',
      title: 'Fulano de Tal',
      slug: 'fulano-de-tal',
      rating: '⭐ 4.5 Muito bom',
      price: 'R$ 40 - 70',
      priceOriginal: 'R$ 95',
      benefits: ['Organiza eventos', 'Música ao vivo', 'Espaço para festas', 'Cardápio especial'],
      cupom: 'FULANO25',
      desconto: '25%',
      validade: '31/12/2025',
    },
  ];

  const abrirModal = (bar) => {
    setBarSelecionado(bar);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setBarSelecionado(null);
  };

  const copiarCupom = (codigo) => {
    navigator.clipboard.writeText(codigo);
    alert('✓ Cupom copiado com sucesso!');
  };

  const alternarFavorito = (barId) => {
    setFavoritados((prev) =>
      prev.includes(barId) ? prev.filter((id) => id !== barId) : [...prev, barId]
    );
  };

  const compartilharBar = (bar) => {
    const texto = `Confira o ${bar.title} em Caruaru! ${bar.rating} - ${bar.price}`;
    if (navigator.share) {
      navigator.share({
        title: bar.title,
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
          <span className={styles.icon}>🍺</span>
          <span>Bares</span>
        </div>
        <button className={styles.btnCompartilhar} onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Bares em Caruaru',
              text: 'Confira os melhores bares de Caruaru com descontos exclusivos!',
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

      {/* Cards de Bares */}
      <main className={styles.main}>
        <h2 className={styles.secaoTitulo}>Bares Disponíveis em Caruaru</h2>
        <div className={styles.cards}>
          {bares.map(bar => (
            <div key={bar.id} className={styles.card}>
              {bar.desconto && (
                <div className={styles.descontoBadge}>{bar.desconto}</div>
              )}
              <img 
                src={bar.img} 
                alt={bar.title} 
                className={styles.img} 
              />
              <div className={styles.cardContent}>
                <span className={styles.badge}>Bar</span>
                <h3>{bar.title}</h3>
                <p className={styles.rating}>{bar.rating}</p>
                
                {bar.priceOriginal && (
                  <span className={styles.precoOriginal}>De {bar.priceOriginal}</span>
                )}
                <span className={styles.preco}>Por {bar.price}</span>
                
                {bar.cupom && (
                  <div className={styles.cupomInfo}>
                    🎟️ Use o cupom: 
                    <span 
                      className={styles.cupomCode}
                      onClick={() => abrirModal(bar)}
                    >
                      {bar.cupom}
                    </span>
                  </div>
                )}

                <div className={styles.benefitsList}>
                  {bar.benefits.slice(0, 2).map((ben, idx) => (
                    <span key={idx} className={styles.benefit}>✓ {ben}</span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.btnFavoritar}
                    onClick={() => alternarFavorito(bar.id)}
                  >
                    {favoritados.includes(bar.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    className={styles.btnCompartilharCard}
                    onClick={() => compartilharBar(bar)}
                  >
                    🔗
                  </button>
                </div>

                <Link href={`/bares/${bar.slug}`}>
                  <button className={styles.botaoCard}>
                    {bar.cupom ? 'Ver Cupom' : 'Ver Ofertas'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de Cupom */}
      {modalAberto && barSelecionado && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>🎉 Cupom de Desconto</h2>
              <button className={styles.closeModal} onClick={fecharModal}>×</button>
            </div>
            <div className={styles.cupomDestaque}>
              <h3>{barSelecionado.desconto}</h3>
              <p>Use o código abaixo</p>
              <div 
                className={styles.cupomCodeGrande}
                onClick={() => copiarCupom(barSelecionado.cupom)}
              >
                {barSelecionado.cupom}
              </div>
            </div>
            <div className={styles.modalInfo}>
              <strong>{barSelecionado.title}</strong>
              <p>✓ Válido até: {barSelecionado.validade}</p>
              <p>✓ Aplicável em consumo no local</p>
              <p>✓ Não cumulativo com outras promoções</p>
              <div style={{ marginTop: '15px' }}>
                {barSelecionado.benefits.map((ben, idx) => (
                  <p key={idx}>✓ {ben}</p>
                ))}
              </div>
            </div>
            <Link href={`/bares/${barSelecionado.slug}`}>
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
