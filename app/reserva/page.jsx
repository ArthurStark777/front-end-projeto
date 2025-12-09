'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './reserva.module.css';

export default function Reserva() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [quartoSelecionado, setQuartoSelecionado] = useState(null);
  const [precoQuarto, setPrecoQuarto] = useState(0);
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const [descontoCupom, setDescontoCupom] = useState(0);
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');
  const [codigoReserva, setCodigoReserva] = useState('');
  const [inputCupom, setInputCupom] = useState('');
  const [feedbackCupom, setFeedbackCupom] = useState({ mostrar: false, mensagem: '', tipo: '' });

  const cuponsValidos = {
    'CITIHOTEL30': { desconto: 0.30, nome: 'CITIHOTEL30' },
    'EXPRESS30': { desconto: 0.30, nome: 'EXPRESS30' },
    'WAHOTEL20': { desconto: 0.20, nome: 'WAHOTEL20' },
    'VILLAGE20': { desconto: 0.20, nome: 'VILLAGE20' },
    'MAYSA30': { desconto: 0.30, nome: 'MAYSA30' }
  };

  const quartos = [
    {
      id: 1,
      nome: 'Quarto Standard',
      preco: 180,
      features: ['👥 2 pessoas', '📶 Wi-Fi', '❄️ Ar condicionado', '🚿 Banheiro privativo']
    },
    {
      id: 2,
      nome: 'Quarto Luxo',
      preco: 280,
      features: ['👥 2 pessoas', '📶 Wi-Fi', '❄️ Ar condicionado', '🛁 Banheira', '📺 Smart TV', '☕ Café da manhã']
    },
    {
      id: 3,
      nome: 'Suíte Premium',
      preco: 450,
      features: ['👥 4 pessoas', '📶 Wi-Fi', '❄️ Ar condicionado', '🛁 Hidromassagem', '📺 Smart TV', '☕ Café da manhã', '🏊 Acesso à piscina privativa']
    }
  ];

  const calcularResumo = () => {
    if (!precoQuarto) return { subtotal: 0, desconto: 0, taxas: 45, total: 45 };
    
    const subtotal = precoQuarto * 3;
    const desconto = Math.round(subtotal * descontoCupom);
    const taxas = 45;
    const total = subtotal - desconto + taxas;
    
    return { subtotal, desconto, taxas, total };
  };

  const aplicarCupom = () => {
    const codigo = inputCupom.toUpperCase().trim();
    
    if (!codigo) {
      setFeedbackCupom({ mostrar: true, mensagem: '❌ Digite um código de cupom', tipo: 'erro' });
      return;
    }

    if (cuponsValidos[codigo]) {
      setCupomAplicado(true);
      setDescontoCupom(cuponsValidos[codigo].desconto);
      setFeedbackCupom({ mostrar: true, mensagem: '✓ Cupom aplicado com sucesso!', tipo: 'sucesso' });
    } else {
      setFeedbackCupom({ mostrar: true, mensagem: '❌ Cupom inválido ou expirado', tipo: 'erro' });
      setCupomAplicado(false);
      setDescontoCupom(0);
    }
  };

  const selecionarQuarto = (quarto) => {
    setQuartoSelecionado(quarto.nome);
    setPrecoQuarto(quarto.preco);
  };

  const proximaEtapa = (etapa) => {
    if (etapa === 2 && !quartoSelecionado) {
      alert('Por favor, selecione um quarto antes de continuar.');
      return;
    }

    if (etapa === 4) {
      const codigo = 'EXP-2025-' + Math.floor(Math.random() * 9000 + 1000);
      setCodigoReserva(codigo);
    }

    setEtapaAtual(etapa);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const voltarEtapa = (etapa) => {
    setEtapaAtual(etapa);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gerarQRCode = () => {
    const canvas = document.getElementById('qrcode');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 200, 200);
    ctx.fillStyle = '#000';
    const pixelSize = 4;
    
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        if (Math.random() > 0.5) {
          ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  };

  useEffect(() => {
    if (metodoPagamento === 'pix') {
      setTimeout(gerarQRCode, 100);
    }
  }, [metodoPagamento]);

  const resumo = calcularResumo();
  const progressoPercentual = ((etapaAtual - 1) / 3) * 100;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>Explora+</div>
        <Link href="/hoteis" className={styles.voltarBtn}>
          ← Voltar
        </Link>
      </header>

      <main className={styles.main}>
        {/* Barra de Progresso */}
        <div className={styles.progressBar}>
          <div className={styles.steps}>
            <div className={styles.stepProgress} style={{ width: `${progressoPercentual}%` }} />
            {[1, 2, 3, 4].map(num => (
              <div 
                key={num}
                className={`${styles.step} ${
                  num < etapaAtual ? styles.completed : ''
                } ${num === etapaAtual ? styles.active : ''}`}
              >
                <div className={styles.stepNumber}>{num}</div>
                <div className={styles.stepLabel}>
                  {num === 1 && 'Selecionar Quarto'}
                  {num === 2 && 'Dados Pessoais'}
                  {num === 3 && 'Pagamento'}
                  {num === 4 && 'Confirmação'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mainContent}>
          {/* Formulário */}
          <div className={styles.formSection}>
            {/* Etapa 1 */}
            {etapaAtual === 1 && (
              <div className={styles.etapa}>
                <h2 className={styles.sectionTitle}>Escolha seu Quarto</h2>
                <div className={styles.roomOptions}>
                  {quartos.map(quarto => (
                    <div
                      key={quarto.id}
                      className={`${styles.roomCard} ${quartoSelecionado === quarto.nome ? styles.selected : ''}`}
                      onClick={() => selecionarQuarto(quarto)}
                    >
                      <div className={styles.roomCardHeader}>
                        <div className={styles.roomTitle}>🛏️ {quarto.nome}</div>
                        <div className={styles.roomPrice}>R$ {quarto.preco}/noite</div>
                      </div>
                      <div className={styles.roomFeatures}>
                        {quarto.features.map((feature, idx) => (
                          <span key={idx} className={styles.roomFeature}>{feature}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.btnGroup}>
                  <button className={styles.btnPrimary} onClick={() => proximaEtapa(2)}>
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Etapa 2 */}
            {etapaAtual === 2 && (
              <div className={styles.etapa}>
                <h2 className={styles.sectionTitle}>Seus Dados</h2>
                <form>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nome Completo</label>
                    <input type="text" className={styles.formInput} placeholder="Digite seu nome completo" required />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>E-mail</label>
                      <input type="email" className={styles.formInput} placeholder="seu@email.com" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Telefone</label>
                      <input type="tel" className={styles.formInput} placeholder="(00) 00000-0000" required />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>CPF</label>
                      <input type="text" className={styles.formInput} placeholder="000.000.000-00" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Data de Nascimento</label>
                      <input type="date" className={styles.formInput} required />
                    </div>
                  </div>
                </form>
                <div className={styles.btnGroup}>
                  <button className={styles.btnSecondary} onClick={() => voltarEtapa(1)}>Voltar</button>
                  <button className={styles.btnPrimary} onClick={() => proximaEtapa(3)}>Continuar</button>
                </div>
              </div>
            )}

            {/* Etapa 3 */}
            {etapaAtual === 3 && (
              <div className={styles.etapa}>
                <h2 className={styles.sectionTitle}>Pagamento</h2>
                
                <div className={styles.paymentMethods}>
                  {['cartao', 'pix', 'boleto'].map(metodo => (
                    <div
                      key={metodo}
                      className={`${styles.paymentMethod} ${metodoPagamento === metodo ? styles.selected : ''}`}
                      onClick={() => setMetodoPagamento(metodo)}
                    >
                      <span className={styles.paymentIcon}>
                        {metodo === 'cartao' && '💳'}
                        {metodo === 'pix' && '📱'}
                        {metodo === 'boleto' && '🧾'}
                      </span>
                      <span style={{ fontWeight: 600, marginTop: '8px' }}>
                        {metodo === 'cartao' && 'Cartão de Crédito'}
                        {metodo === 'pix' && 'PIX'}
                        {metodo === 'boleto' && 'Boleto Bancário'}
                      </span>
                    </div>
                  ))}
                </div>

                {metodoPagamento === 'cartao' && (
                  <form className={styles.paymentForm}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Número do Cartão</label>
                      <input type="text" className={styles.formInput} placeholder="0000 0000 0000 0000" maxLength={19} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Nome no Cartão</label>
                      <input type="text" className={styles.formInput} placeholder="Como está no cartão" />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Validade</label>
                        <input type="text" className={styles.formInput} placeholder="MM/AA" maxLength={5} />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>CVV</label>
                        <input type="text" className={styles.formInput} placeholder="000" maxLength={3} />
                      </div>
                    </div>
                  </form>
                )}

                {metodoPagamento === 'pix' && (
                  <div className={styles.pixContainer}>
                    <h3>Pague com PIX</h3>
                    <p>Escaneie o QR Code abaixo com o app do seu banco</p>
                    <div className={styles.qrcodeWrapper}>
                      <canvas id="qrcode" width="200" height="200"></canvas>
                    </div>
                    <p className={styles.pixInfo}>⏱️ O pagamento será confirmado em até 2 minutos</p>
                  </div>
                )}

                {metodoPagamento === 'boleto' && (
                  <div className={styles.boletoContainer}>
                    <h3>Boleto Bancário</h3>
                    <p>O boleto será enviado para seu e-mail</p>
                    <div className={styles.boletoCode}>
                      <span>23793.38128 60000.000001 00000.000000 1 99990000050800</span>
                    </div>
                    <p className={styles.boletoAviso}>⚠️ O boleto vence em 3 dias úteis</p>
                  </div>
                )}

                <div className={styles.btnGroup}>
                  <button className={styles.btnSecondary} onClick={() => voltarEtapa(2)}>Voltar</button>
                  <button className={styles.btnPrimary} onClick={() => proximaEtapa(4)}>Finalizar Reserva</button>
                </div>
              </div>
            )}

            {/* Etapa 4 */}
            {etapaAtual === 4 && (
              <div className={styles.etapa}>
                <div className={styles.confirmacaoIcon}>✓</div>
                <div className={styles.confirmacaoText}>
                  <h2>Reserva Confirmada!</h2>
                  <p>Parabéns! Sua reserva foi confirmada com sucesso.<br />Você receberá um e-mail com todos os detalhes.</p>
                </div>
                <div className={styles.codigoReserva}>
                  <p>Código da Reserva:</p>
                  <strong>{codigoReserva}</strong>
                </div>
                <Link href="/hoteis" className={styles.btnFull}>
                  Voltar para Hotéis
                </Link>
              </div>
            )}
          </div>

          {/* Resumo */}
          <div className={styles.resumoSection}>
            <h3 className={styles.sectionTitle}>Resumo da Reserva</h3>
            
            <div className={styles.hotelInfo}>
              <img src="/imagens/imagens.hoteis/citi hotel express caruaru/Imagem (1).png" alt="Hotel" className={styles.hotelImg} />
              <div className={styles.hotelDetails}>
                <h3>Citi Hotel Express</h3>
                <p className={styles.hotelLocation}>📍 Caruaru, PE</p>
                <p className={styles.hotelRating}>⭐ 4.6 Excelente</p>
              </div>
            </div>

            <div className={styles.resumoItem}>
              <span className={styles.resumoLabel}>Check-in:</span>
              <span className={styles.resumoValue}>05/01/2026</span>
            </div>
            <div className={styles.resumoItem}>
              <span className={styles.resumoLabel}>Check-out:</span>
              <span className={styles.resumoValue}>08/01/2026</span>
            </div>
            <div className={styles.resumoItem}>
              <span className={styles.resumoLabel}>Noites:</span>
              <span className={styles.resumoValue}>3 noites</span>
            </div>
            <div className={styles.resumoItem}>
              <span className={styles.resumoLabel}>Tipo de Quarto:</span>
              <span className={styles.resumoValue}>{quartoSelecionado || '-'}</span>
            </div>

            <div className={styles.formGroup} style={{ margin: '20px 0' }}>
              <label className={styles.formLabel}>Tem um cupom?</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  className={styles.formInput} 
                  placeholder="Digite o código"
                  value={inputCupom}
                  onChange={(e) => setInputCupom(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button onClick={aplicarCupom} className={styles.btnAplicar}>Aplicar</button>
              </div>
              {feedbackCupom.mostrar && (
                <div className={`${styles.cupomFeedback} ${styles[feedbackCupom.tipo]}`}>
                  {feedbackCupom.mensagem}
                </div>
              )}
            </div>

            {cupomAplicado && (
              <div className={styles.cupomAplicado}>
                🎉 Cupom {inputCupom.toUpperCase()} aplicado!<br />
                Você economizou R$ {resumo.desconto}
              </div>
            )}

            <div className={styles.resumoItem}>
              <span className={styles.resumoLabel}>Subtotal (3 noites):</span>
              <span className={styles.resumoValue}>R$ {resumo.subtotal}</span>
            </div>
            <div className={styles.resumoItem}>
              <span className={styles.resumoLabel}>Desconto ({Math.round(descontoCupom * 100)}%):</span>
              <span className={styles.resumoValue} style={{ color: '#28a745' }}>- R$ {resumo.desconto}</span>
            </div>
            <div className={styles.resumoItem}>
              <span className={styles.resumoLabel}>Taxas:</span>
              <span className={styles.resumoValue}>R$ {resumo.taxas}</span>
            </div>

            <div className={styles.totalSection}>
              <div className={styles.resumoItem}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalValue}>R$ {resumo.total}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
