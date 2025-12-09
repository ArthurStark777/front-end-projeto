'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './hotel-village-premium-caruaru.module.css';

export default function HotelVillagePremiumCaruaru() {
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [abaSelecionada, setAbaSelecionada] = useState('visao-geral');

  const hotel = {
    nome: 'Hotel Village Premium Caruaru',
    rating: '⭐ 4.8 Muito Bom',
    imagens: [
      '/imagens/imagens.hoteis/hotel vilage premium caruaru/imagem (4).png',
      '/imagens/imagens.hoteis/hotel vilage premium caruaru/Rectangle 46.png',
      '/imagens/imagens.hoteis/hotel vilage premium caruaru/Rectangle 48.png',
      '/imagens/imagens.hoteis/hotel vilage premium caruaru/Rectangle 49.png',
      '/imagens/imagens.hoteis/hotel vilage premium caruaru/Rectangle 50.png'
    ],
    descricao: 'Localizado na BR 232, o Hotel Village Premium oferece conforto e conveniência para viajantes. Com quartos modernos e aconchegantes, o hotel dispõe de excelente infraestrutura para hospedagem de negócios ou lazer. Próximo aos principais pontos comerciais de Caruaru.',
    endereco: 'BR 232, Km 130, Caruaru',
    telefone: '+55(81)31218800',
    checkIn: '14:00',
    checkOut: '12:00',
    comodidades: [
      'WiFi gratuito',
      'Recepção 24h',
      'Ar condicionado',
      'TV a cabo',
      'Café da manhã incluído',
      'Estacionamento gratuito',
      'Frigobar',
      'Localização privilegiada na BR 232'
    ],
    preco: 'R$ 195',
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
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/home">TravelWise</Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/home">Home</Link>
          <Link href="/hoteis">Hotéis</Link>
          <Link href="/restaurantes">Restaurantes</Link>
          <Link href="/bares">Bares</Link>
        </nav>
      </header>

      <div className={styles.hotelCard}>
        <div className={styles.hotelHeader}>
          <h1>{hotel.nome}</h1>
          <p className={styles.rating}>{hotel.rating}</p>
        </div>

        <div className={styles.carrossel}>
          <button className={styles.botaoAnterior} onClick={imagemAnterior}>
            &#8249;
          </button>
          <img
            src={hotel.imagens[imagemAtiva]}
            alt={`${hotel.nome} - Imagem ${imagemAtiva + 1}`}
            className={styles.imagemCarrossel}
          />
          <button className={styles.botaoProximo} onClick={proximaImagem}>
            &#8250;
          </button>
          <div className={styles.indicadores}>
            {hotel.imagens.map((_, index) => (
              <span
                key={index}
                className={`${styles.indicador} ${imagemAtiva === index ? styles.ativo : ''}`}
                onClick={() => setImagemAtiva(index)}
              ></span>
            ))}
          </div>
        </div>

        <div className={styles.opcoesFiltro}>
          <button
            className={abaSelecionada === 'visao-geral' ? styles.ativo : ''}
            onClick={() => setAbaSelecionada('visao-geral')}
          >
            Visão Geral
          </button>
          <button
            className={abaSelecionada === 'precos' ? styles.ativo : ''}
            onClick={() => setAbaSelecionada('precos')}
          >
            Preços
          </button>
          <button
            className={abaSelecionada === 'comodidades' ? styles.ativo : ''}
            onClick={() => setAbaSelecionada('comodidades')}
          >
            Comodidades
          </button>
          <button
            className={abaSelecionada === 'regras' ? styles.ativo : ''}
            onClick={() => setAbaSelecionada('regras')}
          >
            Regras da Casa
          </button>
        </div>

        {abaSelecionada === 'visao-geral' && (
          <div className={styles.conteudoAba}>
            <h2>Sobre o {hotel.nome}</h2>
            <p>{hotel.descricao}</p>
            <div className={styles.infoContato}>
              <p><strong>Endereço:</strong> {hotel.endereco}</p>
              <p><strong>Telefone:</strong> {hotel.telefone}</p>
            </div>
          </div>
        )}

        {abaSelecionada === 'precos' && (
          <div className={styles.conteudoAba}>
            <h2>Informações de Preços</h2>
            <div className={styles.precoDestaque}>
              <p className={styles.precoPrincipal}>{hotel.preco}</p>
              <p className={styles.precoDescricao}>por noite</p>
            </div>
            <div className={styles.infoCheckin}>
              <p><strong>Check-in:</strong> {hotel.checkIn}</p>
              <p><strong>Check-out:</strong> {hotel.checkOut}</p>
            </div>
          </div>
        )}

        {abaSelecionada === 'comodidades' && (
          <div className={styles.conteudoAba}>
            <h2>Comodidades</h2>
            <ul className={styles.listaComodidades}>
              {hotel.comodidades.map((comodidade, index) => (
                <li key={index}>{comodidade}</li>
              ))}
            </ul>
          </div>
        )}

        {abaSelecionada === 'regras' && (
          <div className={styles.conteudoAba}>
            <h2>Regras da Casa</h2>
            <ul className={styles.listaRegras}>
              {hotel.regras.map((regra, index) => (
                <li key={index}>{regra}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.reservaFixa}>
        <div className={styles.reservaConteudo}>
          <div className={styles.reservaInfo}>
            <span className={styles.reservaPreco}>{hotel.preco}</span>
            <span className={styles.reservaNoite}>/noite</span>
          </div>
          <button className={styles.botaoReservar}>Reservar Agora</button>
        </div>
      </div>
    </div>
  );
}
