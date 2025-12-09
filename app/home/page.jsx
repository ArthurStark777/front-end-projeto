'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './home.module.css';

export default function HomePage() {
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [cupomSelecionado, setCupomSelecionado] = useState(null);

  const ofertas = [
    {
      id: 1,
      nome: "Bentu's Restaurante",
      local: "Caruaru",
      tipo: "Restaurante",
      preco: "R$ 50 - 80",
      precoOriginal: "R$ 67 - 107",
      imagem: "/imagens/imagens.tela-principal/bentu-restaurante.png",
      cupom: "BENTUS20",
      desconto: "20%",
      validade: "31/12/2025",
      link: "/restaurantes/bentus"
    },
    {
      id: 2,
      nome: "Restaurante Da Mãe Beata",
      local: "Caruaru",
      tipo: "Restaurante",
      preco: "R$ 35 - 60",
      precoOriginal: "R$ 54 - 92",
      imagem: "/imagens/imagens.tela-principal/restaurante-mae-beata.jpg",
      cupom: "MABEATA15",
      desconto: "15%",
      validade: "15/01/2026",
      link: "/restaurantes/mae-beata"
    },
    {
      id: 3,
      nome: "Petiscaria do Tio Tio",
      local: "Caruaru",
      tipo: "Bar",
      preco: "R$ 45 - 60",
      precoOriginal: "R$ 60 - 80",
      imagem: "/imagens/imagens.tela-principal/pestiscaria-tio-tio.png",
      cupom: "TIOTIO25",
      desconto: "25%",
      validade: "31/12/2025",
      link: "/bares/petiscaria-do-titio"
    },
    {
      id: 4,
      nome: "Citi Hotel Express Caruaru",
      local: "Caruaru",
      tipo: "Hotel",
      preco: "Diárias: R$ 180",
      precoOriginal: "Diárias: R$ 257",
      imagem: "/imagens/imagens.hoteis/citi hotel express caruaru/Imagem (1).png",
      cupom: "CITIHOTEL30",
      desconto: "30%",
      validade: "28/02/2026",
      link: "/hoteis/citi-hotel-express-caruaru"
    }
  ];

  const recomendacoes = [
    {
      id: 5,
      nome: "Boteco do Keka",
      local: "Caruaru",
      tipo: "Bar",
      preco: "R$ 40 - 80",
      precoOriginal: "R$ 50 - 100",
      imagem: "/imagens/imagens.tela-principal/boteco-keka.png",
      cupom: "KEKA20",
      desconto: "20%",
      validade: "31/03/2026",
      link: "/bares/boteco-do-keka-prime"
    },
    {
      id: 6,
      nome: "WA Hotel Caruaru",
      local: "Caruaru",
      tipo: "Hotel",
      preco: "Diárias: R$ 190",
      precoOriginal: "Diárias: R$ 238",
      imagem: "/imagens/imagens.tela-principal/wa-hotel.png",
      cupom: "WAHOTEL20",
      desconto: "20%",
      validade: "31/03/2026",
      link: "/hoteis/wa-hotel-caruaru"
    },
    {
      id: 7,
      nome: "Tio Armênio",
      local: "Caruaru",
      tipo: "Restaurante",
      preco: "R$ 45 - 75",
      precoOriginal: "R$ 64 - 107",
      imagem: "/imagens/imagens.tela-principal/trio-armenio.png",
      cupom: "ARMENIO30",
      desconto: "30%",
      validade: "31/03/2026",
      link: "/restaurantes/tio-armenio"
    }
  ];

  const abrirModal = (item) => {
    setCupomSelecionado(item);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCupomSelecionado(null);
  };

  const copiarCupom = (codigo) => {
    navigator.clipboard.writeText(codigo);
    alert('✓ Cupom copiado com sucesso!');
  };

  const ofertasFiltradas = filtroAtivo === 'todos' 
    ? ofertas 
    : ofertas.filter(item => item.tipo.toLowerCase() === filtroAtivo);

  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>Explora+</div>
        <div className={styles.perfilBtn}>P</div>
      </header>

      <div className={styles.container}>
        {/* Filtros */}
        <nav className={styles.filtros}>
          <Link href="/bares" className={styles.botaoFiltro}>
            🍺 Bares
          </Link>
          <Link href="/hoteis" className={styles.botaoFiltro}>
            🏨 Hotéis
          </Link>
          <Link href="/restaurantes" className={styles.botaoFiltro}>
            🍽️ Restaurantes
          </Link>
        </nav>

        {/* Hero Section */}
        <div className={styles.heroSection}>
          <h2 className={styles.titulo}>Quer encontrar uma ótima oferta de reserva?</h2>
          <div className={styles.barraBusca}>
            <input type="text" placeholder="Para onde você vai?" />
            <input type="date" />
            <input type="date" />
            <button className={styles.buscar}>Buscar</button>
          </div>
        </div>

        {/* Ofertas Imperdíveis */}
        <h2 className={styles.secaoTitulo}>Ofertas Imperdíveis</h2>
        <div className={styles.cards}>
          {ofertas.map(item => (
            <div key={item.id} className={styles.card}>
              {item.desconto && (
                <div className={styles.descontoBadge}>{item.desconto}</div>
              )}
              <img src={item.imagem} alt={item.nome} className={styles.cardImg} />
              <div className={styles.cardContent}>
                <span className={styles.badge}>{item.tipo}</span>
                <h3>{item.nome}</h3>
                <p className={styles.cardLocation}>{item.local}</p>
                {item.precoOriginal && (
                  <span className={styles.precoOriginal}>{item.precoOriginal}</span>
                )}
                <span className={styles.preco}>{item.preco}</span>
                {item.cupom && (
                  <div className={styles.cupomInfo}>
                    🎟️ Use o cupom: 
                    <span 
                      className={styles.cupomCode}
                      onClick={() => copiarCupom(item.cupom)}
                    >
                      {item.cupom}
                    </span>
                  </div>
                )}
                {item.link ? (
                  <Link href={item.link}>
                    <button className={styles.botaoCard}>
                      {item.tipo === 'Hotel' ? 'Ver Cupom e Reservar' : 'Ver Cupom'}
                    </button>
                  </Link>
                ) : (
                  <button 
                    className={styles.botaoCard}
                    onClick={() => item.cupom ? abrirModal(item) : null}
                  >
                    {item.cupom ? (item.tipo === 'Hotel' ? 'Ver Cupom e Reservar' : 'Ver Cupom') : 'Conferir'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recomendações */}
        <h2 className={styles.secaoTitulo}>Recomendações</h2>
        <div className={styles.cards}>
          {recomendacoes.map(item => (
            <div key={item.id} className={styles.card}>
              {item.desconto && (
                <div className={styles.descontoBadge}>{item.desconto}</div>
              )}
              <img src={item.imagem} alt={item.nome} className={styles.cardImg} />
              <div className={styles.cardContent}>
                <span className={styles.badge}>{item.tipo}</span>
                <h3>{item.nome}</h3>
                <p className={styles.cardLocation}>{item.local}</p>
                {item.precoOriginal && (
                  <span className={styles.precoOriginal}>{item.precoOriginal}</span>
                )}
                <span className={styles.preco}>{item.preco}</span>
                {item.cupom && (
                  <div className={styles.cupomInfo}>
                    🎟️ Use o cupom: 
                    <span 
                      className={styles.cupomCode}
                      onClick={() => copiarCupom(item.cupom)}
                    >
                      {item.cupom}
                    </span>
                  </div>
                )}
                {item.link ? (
                  <Link href={item.link}>
                    <button className={styles.botaoCard}>
                      {item.cupom ? (item.tipo === 'Hotel' ? 'Ver Cupom e Reservar' : 'Ver Cupom') : 'Conferir'}
                    </button>
                  </Link>
                ) : (
                  <button 
                    className={styles.botaoCard}
                    onClick={() => item.cupom ? abrirModal(item) : null}
                  >
                    {item.cupom ? (item.tipo === 'Hotel' ? 'Ver Cupom e Reservar' : 'Ver Cupom') : 'Conferir'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Cupom */}
      {modalAberto && cupomSelecionado && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>🎉 Cupom de Desconto</h2>
              <button className={styles.closeModal} onClick={fecharModal}>×</button>
            </div>
            <div className={styles.cupomDestaque}>
              <h3>{cupomSelecionado.desconto}</h3>
              <p>Use o código abaixo</p>
              <div 
                className={styles.cupomCodeGrande}
                onClick={() => copiarCupom(cupomSelecionado.cupom)}
              >
                {cupomSelecionado.cupom}
              </div>
            </div>
            <div className={styles.modalInfo}>
              <strong>{cupomSelecionado.nome}</strong>
              <p>✓ Válido até: {cupomSelecionado.validade}</p>
              <p>✓ Aplicável em reservas pelo site</p>
              <p>✓ Não cumulativo com outras promoções</p>
            </div>
            <Link href={cupomSelecionado.link}>
              <button className={styles.copiarBtn}>
                📋 Copiar Código e Continuar
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
