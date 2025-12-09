'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './bentus.module.css';

export default function Bentus() {
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [abaSelecionada, setAbaSelecionada] = useState('visao-geral');
  const [modalCupom, setModalCupom] = useState(false);

  const restaurante = {
    nome: "Bentu's Restaurante",
    rating: '⭐ 4.6 Excelente',
    avaliacoes: 328,
    imagens: [
      "/imagens/imagens.restaurantes/bentu's restaurante/image (1).png",
      "/imagens/imagens.restaurantes/bentu's restaurante/image (2).png",
      "/imagens/imagens.restaurantes/bentu's restaurante/image (3).png",
      "/imagens/imagens.restaurantes/bentu's restaurante/image (4).png",
      "/imagens/imagens.restaurantes/bentu's restaurante/image.png"
    ],
    descricao: 'É um espaço que combina sabor, autenticidade e aconchego, oferecendo uma experiência gastronômica marcante no cenário da cidade. Com um cardápio que valoriza ingredientes regionais e restaurantes.',
    endereco: 'R. Bogotá, 50 - Maurício de Nassau, Caruaru - PE',
    telefone: '(81) 3721-5883',
    cupom: 'BENTUS25',
    desconto: '25%',
    validade: '31/12/2025',
    horarios: {
      'segunda-feira': 'Fechado',
      'terça-feira': '11:00 - 16:00',
      'quarta-feira': '11:00 - 16:00',
      'quinta-feira': '11:00 - 16:00',
      'sexta-feira': '11:00 - 16:00',
      'sábado': '11:00 - 16:00',
      'domingo': '11:00 - 16:00'
    },
    preco: 'R$ 50 - 80',
    precoOriginal: 'R$ 67 - 107',
    especialidades: [
      'Comida regional nordestina',
      'Pratos típicos de Caruaru',
      'Carnes nobres grelhadas',
      'Frutos do mar frescos',
      'Sobremesas caseiras',
      'Opções vegetarianas'
    ],
    formasPagamento: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'PIX'],
    caracteristicas: [
      'Estacionamento gratuito',
      'WiFi disponível',
      'Ar condicionado',
      'Aceita reservas',
      'Música ao vivo aos fins de semana',
      'Área externa'
    ]
  };

  const proximaImagem = () => {
    setImagemAtiva((prev) => (prev + 1) % restaurante.imagens.length);
  };

  const imagemAnterior = () => {
    setImagemAtiva((prev) => (prev - 1 + restaurante.imagens.length) % restaurante.imagens.length);
  };

  const copiarCupom = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(restaurante.cupom)
        .then(() => {
          alert('✓ Cupom ' + restaurante.cupom + ' copiado com sucesso!');
        })
        .catch(() => {
          alert('Cupom: ' + restaurante.cupom);
        });
    } else {
      // Fallback para navegadores que não suportam clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = restaurante.cupom;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('✓ Cupom ' + restaurante.cupom + ' copiado com sucesso!');
      } catch (err) {
        alert('Cupom: ' + restaurante.cupom);
      }
      document.body.removeChild(textArea);
    }
  };

  const abrirModal = () => setModalCupom(true);
  const fecharModal = () => setModalCupom(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/restaurantes" className={styles.setaVoltar}>←</Link>
        <div className={styles.tituloCentral}>
          <Image 
            src="/imagens/imagens.restaurantes/bentu's restaurante/icon.jpg" 
            alt="Ícone"
            width={32}
            height={32}
            className={styles.iconImg}
          />
          <span>restaurantes</span>
        </div>
        <div style={{ width: '45px' }}></div>
      </header>

      <div className={styles.barraBusca}>
        <input type="text" placeholder="destino" />
        <input type="date" />
        <input type="date" />
        <button className={styles.buscar}>Buscar</button>
      </div>

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
          className={`${styles.filtroBotao} ${abaSelecionada === 'especialidades' ? styles.active : ''}`}
          onClick={() => setAbaSelecionada('especialidades')}
        >
          Comodidades
        </button>
        <button 
          className={`${styles.filtroBotao} ${abaSelecionada === 'horarios' ? styles.active : ''}`}
          onClick={() => setAbaSelecionada('horarios')}
        >
          Informações Importantes
        </button>
      </div>

      <main className={styles.conteudo}>
        <div className={styles.restauranteCard}>
          <div className={styles.headerInfo}>
            <div>
              <h1 className={styles.restauranteNome}>{restaurante.nome}</h1>
              <p className={styles.rating}>{restaurante.rating} ({restaurante.avaliacoes} avaliações)</p>
            </div>
            
            <div className={styles.cupomDestaque}>
              <div className={styles.cupomBadge}>
                <span className={styles.descontoTexto}>🎉 {restaurante.desconto} OFF</span>
                <span className={styles.cupomCodigo} onClick={copiarCupom} title="Clique para copiar">
                  {restaurante.cupom}
                </span>
                <small className={styles.validadeTexto}>Válido até {restaurante.validade}</small>
              </div>
              <button className={styles.btnUsarCupom} onClick={abrirModal}>
                🎟️ Ver Detalhes do Cupom
              </button>
            </div>
          </div>

          <div className={styles.interacaoButtons}>
            <button className={styles.btnInteracao}>❤️ Favoritar</button>
            <button className={styles.btnInteracao}>📤 Compartilhar</button>
          </div>

          <div className={styles.carrossel}>
            <button className={styles.carrosselBtn} onClick={imagemAnterior}>‹</button>
            <div className={styles.imagemContainer}>
              <img
                src={restaurante.imagens[imagemAtiva]}
                alt={`${restaurante.nome} - Imagem ${imagemAtiva + 1}`}
                className={styles.imagemPrincipal}
              />
            </div>
            <button className={styles.carrosselBtn} onClick={proximaImagem}>›</button>
          </div>

          <div className={styles.indicadores}>
            {restaurante.imagens.map((_, index) => (
              <span
                key={index}
                className={`${styles.indicador} ${index === imagemAtiva ? styles.ativo : ''}`}
                onClick={() => setImagemAtiva(index)}
              />
            ))}
          </div>

          {abaSelecionada === 'visao-geral' && (
            <div className={styles.secao}>
              <h2>Sobre o Restaurante</h2>
              <p className={styles.descricao}>{restaurante.descricao}</p>
              
              <h3>Localização e Contato</h3>
              <div className={styles.contato}>
                <p><strong>📍 Endereço:</strong> {restaurante.endereco}</p>
                <p><strong>📞 Telefone:</strong> {restaurante.telefone}</p>
              </div>

              <h3>Características</h3>
              <div className={styles.caracteristicasGrid}>
                {restaurante.caracteristicas.map((car, index) => (
                  <div key={index} className={styles.caracteristicaItem}>
                    <span className={styles.checkIcon}>✓</span>
                    {car}
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaSelecionada === 'precos' && (
            <div className={styles.secao}>
              <h2>Informações e Preços</h2>
              
              <div className={styles.precoDestaque}>
                <div className={styles.precoComparar}>
                  <span className={styles.precoRiscado}>De {restaurante.precoOriginal}</span>
                  <span className={styles.precoAtual}>Por {restaurante.preco}</span>
                  <span className={styles.economiaTexto}>
                    Economize até {restaurante.desconto} com cupom!
                  </span>
                </div>
              </div>

              <h3>Formas de Pagamento</h3>
              <div className={styles.pagamentoGrid}>
                {restaurante.formasPagamento.map((forma, index) => (
                  <div key={index} className={styles.pagamentoItem}>
                    💳 {forma}
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaSelecionada === 'especialidades' && (
            <div className={styles.secao}>
              <h2>Especialidades da Casa</h2>
              <div className={styles.especialidadesGrid}>
                {restaurante.especialidades.map((esp, index) => (
                  <div key={index} className={styles.especialidadeItem}>
                    <span className={styles.chefIcon}>👨‍🍳</span>
                    <span>{esp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaSelecionada === 'horarios' && (
            <div className={styles.secao}>
              <h2>Horário de Funcionamento</h2>
              <div className={styles.horariosList}>
                {Object.entries(restaurante.horarios).map(([dia, horario]) => (
                  <div key={dia} className={styles.horarioItem}>
                    <strong>{dia}:</strong>
                    <span>{horario}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {modalCupom && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>🎉 Cupom de Desconto Exclusivo</h2>
              <button className={styles.closeModal} onClick={fecharModal} title="Fechar">×</button>
            </div>
            <div className={styles.cupomModalDestaque}>
              <h3 className={styles.descontoGrande}>{restaurante.desconto}</h3>
              <p className={styles.subtituloCupom}>de desconto em sua visita!</p>
              <p className={styles.instrucaoCupom}>👇 Clique no código para copiar</p>
              <div className={styles.cupomCodeGrande} onClick={copiarCupom} title="Clique para copiar">
                {restaurante.cupom}
              </div>
              <small className={styles.copiado}>✨ Clique acima para copiar automaticamente</small>
            </div>
            <div className={styles.modalInfo}>
              <h4 className={styles.restauranteNomeModal}>{restaurante.nome}</h4>
              <div className={styles.infoLista}>
                <p>✓ <strong>Válido até:</strong> {restaurante.validade}</p>
                <p>✓ <strong>Aplicável:</strong> No consumo total</p>
                <p>✓ <strong>Como usar:</strong> Apresente o cupom antes do pedido</p>
                <p>⚠️ <strong>Atenção:</strong> Não cumulativo com outras promoções</p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.copiarBtn} onClick={copiarCupom}>
                📋 Copiar Código do Cupom
              </button>
              <button className={styles.fecharBtn} onClick={fecharModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.barraFixa}>
        <div className={styles.barraInfo}>
          <div className={styles.barraDescontoBox}>
            <span className={styles.barraDesconto}>🎉 {restaurante.desconto} OFF</span>
            <small className={styles.barraValidadeSmall}>até {restaurante.validade}</small>
          </div>
          <div className={styles.barraPrecos}>
            <span className={styles.barraPrecoAntigo}>De {restaurante.precoOriginal}</span>
            <strong className={styles.barraPreco}>Por {restaurante.preco}</strong>
          </div>
        </div>
        <button className={styles.btnBarraFixa} onClick={abrirModal}>
          🎟️ Ver Cupom
        </button>
      </div>
    </div>
  );
}
