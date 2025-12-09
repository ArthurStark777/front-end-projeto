'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './wa-hotel-caruaru.module.css';

export default function WaHotelCaruaru() {
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [abaSelecionada, setAbaSelecionada] = useState('visao-geral');

  const hotel = {
    nome: 'WA Hotel Caruaru',
    rating: '⭐ 4.9 Excelente',
    imagens: [
      '/imagens/imagens.hoteis/wa hotel caruaru/imagem (3).png',
      '/imagens/imagens.hoteis/wa hotel caruaru/Rectangle 19.png',
      '/imagens/imagens.hoteis/wa hotel caruaru/Rectangle 20.png',
      '/imagens/imagens.hoteis/wa hotel caruaru/Rectangle 22.png',
      '/imagens/imagens.hoteis/wa hotel caruaru/Rectangle 23.png'
    ],
    descricao: 'Tenha fácil acesso a todas lojas e restaurantes do Caruaru Shopping. Seu veículo em segurança, dentro do nosso estacionamento próprio. Saboreie as nossas delícias matinais com café da manhã completo da região. Ambiente ideal para eventos corporativos com sofisticação e tecnologia.',
    endereco: 'Avenida Adjar da Silva Casé, 800 Caruaru',
    telefone: '+55(81)37255232',
    checkIn: '14:00',
    checkOut: '12:00',
    comodidades: [
      'WiFi gratuito',
      'Recepção 24h',
      'Ar condicionado',
      'TV Smart',
      'Café da manhã completo',
      'Estacionamento próprio',
      'Sala de eventos',
      'Frigobar',
      'Próximo ao shopping'
    ],
    preco: 'R$ 311',
    precoOriginal: 'R$ 389',
    regras: [
      'Check-in a partir das 14:00',
      'Check-out até às 12:00',
      'Cancelamento gratuito até 24h antes',
      'Documentos de identificação necessários',
      'Não é permitido fumar'
    ]
  };

  const proximaImagem = () => {
    setImagemAtiva((prev) => (prev + 1) % hotel.imagens.length);
  };

  const imagemAnterior = () => {
    setImagemAtiva((prev) => (prev - 1 + hotel.imagens.length) % hotel.imagens.length);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <Link href="/hoteis" className={styles.setaVoltar}>←</Link>
        <div className={styles.tituloCentral}>
          <span className={styles.icon}>🏨</span>
          <span>Explora+</span>
        </div>
        <div style={{ width: '45px' }}></div>
      </header>

      {/* Barra de Busca */}
      <div className={styles.barraBusca}>
        <input type="text" placeholder="destino" />
        <input type="date" />
        <input type="date" />
        <button className={styles.buscar}>Buscar</button>
      </div>

      {/* Abas de Navegação */}
      <div className={styles.opcoesFiltro}>
        <button 
          className={`${styles.filtroBotao} ${abaSelecionada === 'visao-geral' ? styles.active : ''}`}
          onClick={() => setAbaSelecionada('visao-geral')}
        >
          Visão Geral
        </button>
        <button 
          className={`${styles.filtroBotao} ${abaSelecionada === 'precos' ? styles.active : ''}`}
          onClick={() => setAbaSelecionada('precos')}
        >
          Informações e Preços
        </button>
        <button 
          className={`${styles.filtroBotao} ${abaSelecionada === 'comodidades' ? styles.active : ''}`}
          onClick={() => setAbaSelecionada('comodidades')}
        >
          Comodidades
        </button>
        <button 
          className={`${styles.filtroBotao} ${abaSelecionada === 'regras' ? styles.active : ''}`}
          onClick={() => setAbaSelecionada('regras')}
        >
          Regras de Casa
        </button>
      </div>

      {/* Conteúdo Principal */}
      <main className={styles.conteudo}>
        <div className={styles.hotelCard}>
          <h1 className={styles.hotelNome}>{hotel.nome}</h1>
          <p className={styles.rating}>{hotel.rating}</p>

          {/* Botões de Interação */}
          <div className={styles.interacaoButtons}>
            <button className={styles.btnInteracao}>❤️ Favoritar</button>
            <button className={styles.btnInteracao}>📤 Compartilhar</button>
          </div>

          {/* Carrossel de Imagens */}
          <div className={styles.carrossel}>
            <button className={styles.carrosselBtn} onClick={imagemAnterior}>‹</button>
            <div className={styles.imagemContainer}>
              <img
                src={hotel.imagens[imagemAtiva]}
                alt={`${hotel.nome} - Imagem ${imagemAtiva + 1}`}
                className={styles.imagemPrincipal}
              />
            </div>
            <button className={styles.carrosselBtn} onClick={proximaImagem}>›</button>
          </div>

          {/* Indicadores do Carrossel */}
          <div className={styles.indicadores}>
            {hotel.imagens.map((_, index) => (
              <span
                key={index}
                className={`${styles.indicador} ${index === imagemAtiva ? styles.ativo : ''}`}
                onClick={() => setImagemAtiva(index)}
              />
            ))}
          </div>

          {/* Conteúdo das Abas */}
          {abaSelecionada === 'visao-geral' && (
            <div className={styles.secao}>
              <h2>Sobre o Hotel</h2>
              <p className={styles.descricao}>{hotel.descricao}</p>
              
              <h3>Meios de Contato</h3>
              <div className={styles.contato}>
                <p><strong>Endereço:</strong> {hotel.endereco}</p>
                <p><strong>Telefone:</strong> {hotel.telefone}</p>
                <p><strong>Check-in:</strong> A partir de {hotel.checkIn}</p>
                <p><strong>Check-out:</strong> Até {hotel.checkOut}</p>
              </div>
            </div>
          )}

          {abaSelecionada === 'precos' && (
            <div className={styles.secao}>
              <h2>Informações e Preços</h2>
              <div className={styles.precoCard}>
                <h3>Diária a partir de</h3>
                <p className={styles.precoValor}>{hotel.preco}</p>
                <Link href="/reserva" className={styles.btnReservar}>Reservar Agora</Link>
              </div>
              <div className={styles.infoExtra}>
                <p>✓ Cancelamento gratuito até 24h antes</p>
                <p>✓ Sem cobrança de taxa de reserva</p>
                <p>✓ Pagamento no hotel ou antecipado</p>
              </div>
            </div>
          )}

          {abaSelecionada === 'comodidades' && (
            <div className={styles.secao}>
              <h2>Comodidades do Hotel</h2>
              <div className={styles.comodidadesGrid}>
                {hotel.comodidades.map((comodidade, index) => (
                  <div key={index} className={styles.comodidadeItem}>
                    <span className={styles.checkIcon}>✓</span>
                    {comodidade}
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaSelecionada === 'regras' && (
            <div className={styles.secao}>
              <h2>Regras de Casa</h2>
              <div className={styles.regrasList}>
                {hotel.regras.map((regra, index) => (
                  <div key={index} className={styles.regraItem}>
                    <span className={styles.bulletIcon}>•</span>
                    {regra}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Botão de Reserva Fixo */}
      <div className={styles.reservaFixa}>
        <div className={styles.precoResumo}>
          <span>Diária a partir de</span>
          <strong>{hotel.preco}</strong>
        </div>
        <Link href="/reserva" className={styles.btnReservarFixo}>Reservar</Link>
      </div>
    </div>
  );
}
