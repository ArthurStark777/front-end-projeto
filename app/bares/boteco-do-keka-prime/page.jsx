'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './boteco-do-keka-prime.module.css';

export default function BotecoDoKekaPrime() {
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [abaSelecionada, setAbaSelecionada] = useState('visao-geral');
  const [modalCupom, setModalCupom] = useState(false);

  const bar = {
    nome: "Boteco do Keka Prime",
    rating: '⭐ 4.8 Excelente',
    avaliacoes: 328,
    imagens: [
      "/imagens/imagens.bares/boteco do keka/Imagem do WhatsApp de 2025-11-22 à(s) 17.34.05_5ed20084.jpg",
      "/imagens/imagens.bares/boteco do keka/Imagem do WhatsApp de 2025-11-22 à(s) 17.34.06_2369360c.jpg",
      "/imagens/imagens.bares/boteco do keka/Imagem do WhatsApp de 2025-11-22 à(s) 17.34.06_7c76c96a.jpg",
      "/imagens/imagens.bares/boteco do keka/Imagem do WhatsApp de 2025-11-22 à(s) 17.34.06_bc2a481e.jpg",
      "/imagens/imagens.bares/boteco do keka/Imagem do WhatsApp de 2025-11-22 à(s) 17.34.06_e71fc711.jpg"
    ],
    descricao: 'Elegância descomplicada. Drinks premium, ambiente intimista e atendimento impecável. Perfeito para dates especiais ou comemorar aquela promoção no trabalho.',
    endereco: 'R. Alferes Jorge, 398 - Indianópolis, Caruaru - PE',
    telefone: '(81) 9 9999-0000',
    cupom: 'KEKA20',
    desconto: '20%',
    validade: '31/03/2026',
    horarios: {
      'segunda-feira': '18:30 - 02:00',
      'terça-feira': '18:30 - 02:00',
      'quarta-feira': '18:30 - 01:00',
      'quinta-feira': '18:30 - 01:30',
      'sexta-feira': '18:30 - 02:00',
      'sábado': '18:30 - 04:00',
      'domingo': '18:30 - 02:00'
    },
    preco: 'R$ 40 - 80',
    precoOriginal: 'R$ 50 - 100',
    especialidades: [
      'Drinks premium',
      'Ambiente intimista',
      'Atendimento impecável',
      'Carta de vinhos',
      'Petiscos gourmet',
      'Happy hour especial'
    ],
    formasPagamento: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'PIX'],
    caracteristicas: [
      'Ambiente climatizado',
      'Música ao vivo',
      'Área externa',
      'Wi-Fi gratuito',
      'Estacionamento próximo',
      'Aceita reservas'
    ]
  };

  const proximaImagem = () => {
    setImagemAtiva((prev) => (prev + 1) % bar.imagens.length);
  };

  const imagemAnterior = () => {
    setImagemAtiva((prev) => (prev - 1 + bar.imagens.length) % bar.imagens.length);
  };

  const copiarCupom = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(bar.cupom)
        .then(() => {
          alert('✓ Cupom ' + bar.cupom + ' copiado com sucesso!');
        })
        .catch(() => {
          alert('Cupom: ' + bar.cupom);
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = bar.cupom;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('✓ Cupom ' + bar.cupom + ' copiado com sucesso!');
      } catch (err) {
        alert('Cupom: ' + bar.cupom);
      }
      document.body.removeChild(textArea);
    }
  };

  const abrirModal = () => setModalCupom(true);
  const fecharModal = () => setModalCupom(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/bares" className={styles.setaVoltar}>←</Link>
        <div className={styles.tituloCentral}>
          <Image 
            src="/imagens/imagens.bares/Imagem do WhatsApp de 2025-11-22 à(s) 17.34.10_5d7c3ce1.jpg" 
            alt="Ícone"
            width={32}
            height={32}
            className={styles.iconImg}
          />
          <span>bares</span>
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
              <h1 className={styles.restauranteNome}>{bar.nome}</h1>
              <p className={styles.rating}>{bar.rating} ({bar.avaliacoes} avaliações)</p>
            </div>
            
            <div className={styles.cupomDestaque}>
              <div className={styles.cupomBadge}>
                <span className={styles.descontoTexto}>🎉 {bar.desconto} OFF</span>
                <span className={styles.cupomCodigo} onClick={copiarCupom} title="Clique para copiar">
                  {bar.cupom}
                </span>
                <small className={styles.validadeTexto}>Válido até {bar.validade}</small>
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
                src={bar.imagens[imagemAtiva]}
                alt={`${bar.nome} - Imagem ${imagemAtiva + 1}`}
                className={styles.imagemPrincipal}
              />
            </div>
            <button className={styles.carrosselBtn} onClick={proximaImagem}>›</button>
          </div>

          <div className={styles.indicadores}>
            {bar.imagens.map((_, index) => (
              <span
                key={index}
                className={`${styles.indicador} ${index === imagemAtiva ? styles.ativo : ''}`}
                onClick={() => setImagemAtiva(index)}
              />
            ))}
          </div>

          {abaSelecionada === 'visao-geral' && (
            <div className={styles.secao}>
              <h2>Sobre o Bar</h2>
              <p className={styles.descricao}>{bar.descricao}</p>
              
              <h3>Localização e Contato</h3>
              <div className={styles.contato}>
                <p><strong>📍 Endereço:</strong> {bar.endereco}</p>
                <p><strong>📞 Telefone:</strong> {bar.telefone}</p>
              </div>

              <h3>Características</h3>
              <div className={styles.caracteristicasGrid}>
                {bar.caracteristicas.map((car, index) => (
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
                  <span className={styles.precoRiscado}>De {bar.precoOriginal}</span>
                  <span className={styles.precoAtual}>Por {bar.preco}</span>
                  <span className={styles.economiaTexto}>
                    Economize até {bar.desconto} com cupom!
                  </span>
                </div>
              </div>

              <h3>Formas de Pagamento</h3>
              <div className={styles.pagamentoGrid}>
                {bar.formasPagamento.map((forma, index) => (
                  <div key={index} className={styles.pagamentoItem}>
                    💳 {forma}
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaSelecionada === 'especialidades' && (
            <div className={styles.secao}>
              <h2>Especialidades do Bar</h2>
              <div className={styles.especialidadesGrid}>
                {bar.especialidades.map((esp, index) => (
                  <div key={index} className={styles.especialidadeItem}>
                    <span className={styles.chefIcon}>🍺</span>
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
                {Object.entries(bar.horarios).map(([dia, horario]) => (
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
              <h3 className={styles.descontoGrande}>{bar.desconto}</h3>
              <p className={styles.subtituloCupom}>de desconto em sua visita!</p>
              <p className={styles.instrucaoCupom}>👇 Clique no código para copiar</p>
              <div className={styles.cupomCodeGrande} onClick={copiarCupom} title="Clique para copiar">
                {bar.cupom}
              </div>
              <small className={styles.copiado}>✨ Clique acima para copiar automaticamente</small>
            </div>
            <div className={styles.modalInfo}>
              <h4 className={styles.restauranteNomeModal}>{bar.nome}</h4>
              <div className={styles.infoLista}>
                <p>✓ <strong>Válido até:</strong> {bar.validade}</p>
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
            <span className={styles.barraDesconto}>🎉 {bar.desconto} OFF</span>
            <small className={styles.barraValidadeSmall}>até {bar.validade}</small>
          </div>
          <div className={styles.barraPrecos}>
            <span className={styles.barraPrecoAntigo}>De {bar.precoOriginal}</span>
            <strong className={styles.barraPreco}>Por {bar.preco}</strong>
          </div>
        </div>
        <button className={styles.btnBarraFixa} onClick={abrirModal}>
          🎟️ Ver Cupom
        </button>
      </div>
    </div>
  );
}
