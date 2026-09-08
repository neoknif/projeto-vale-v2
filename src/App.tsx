import { useState, FormEvent, useCallback, useEffect, useRef } from "react";

type Page = "home" | "projects" | "cadastro";

/* ── Logo SVG ───────────────────────────────────────────── */
function ValeLogo({ light = false, size = 22, animated = false }:
  { light?: boolean; size?: number; animated?: boolean }) {
  const stroke = light ? "#74c69d" : "#1b4332";
  const fill   = light ? "#74c69d" : "#1b4332";
  const scale  = size / 44;
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none"
      aria-hidden="true" className={animated ? "transition-svg" : undefined}
      style={{ overflow: "visible" }}>
      <path className={animated ? "valley-path" : undefined}
        d="M5 9 L22 33 L39 9" stroke={stroke}
        strokeWidth={3.2 / scale} strokeLinecap="round" strokeLinejoin="round" />
      <line className={animated ? "stem-line" : undefined}
        x1="22" y1="33" x2="22" y2="20" stroke={stroke}
        strokeWidth={2.2 / scale} strokeLinecap="round" />
      <path className={animated ? "leaf-l" : undefined}
        d="M22 26 C19 24 15 21 16 17 C18 16 21 19 22 22" fill={fill} fillOpacity="0.9" />
      <path className={animated ? "leaf-r" : undefined}
        d="M22 26 C25 24 29 21 28 17 C26 16 23 19 22 22" fill={fill} fillOpacity="0.9" />
      <circle className={animated ? "tip-circle" : undefined}
        cx="22" cy="17" r="2.4" fill={fill} />
    </svg>
  );
}

/* ── Page Transition Overlay ─────────────────────────────── */
function PageTransition({ phase }: { phase: "entering" | "leaving" | "idle" }) {
  if (phase === "idle") return null;
  return (
    <div className={`page-transition ${phase}`} aria-hidden="true">
      <div className="transition-mark">
        <ValeLogo light size={46} animated={phase === "entering"} />
      </div>
      <div className="transition-wordmark">
        <span className="t-name">Projeto <em>Vale</em></span>
        <span className="t-sub">ONG · Vale do Paraíba</span>
      </div>
    </div>
  );
}

/* ── Header ─────────────────────────────────────────────── */
function Header({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="logo-btn" onClick={() => setPage("home")}>
          <span className="logo-mark">
            <ValeLogo light />
          </span>
          <span className="logo-wordmark">
            <span className="logo-name">Projeto Vale</span>
            <span className="logo-tagline">ONG · Vale do Paraíba</span>
          </span>
        </button>

        <nav aria-label="Navegação principal">
          <ul className="nav-list">
            <li>
              <button className={`nav-btn ${page === "home" ? "active" : ""}`}
                onClick={() => setPage("home")}>Início</button>
            </li>
            <li>
              <button className={`nav-btn ${page === "projects" ? "active" : ""}`}
                onClick={() => setPage("projects")}>Projetos & Ações</button>
            </li>
            <li>
              <button className={`nav-btn ${page === "cadastro" ? "active" : ""}`}
                onClick={() => setPage("cadastro")}>Voluntariado</button>
            </li>
            <li>
              <button className="nav-cta-btn" onClick={() => setPage("cadastro")}>
                Doe Agora
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ── Footer ─────────────────────────────────────────────── */
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Brand col */}
        <div className="footer-brand">
          <button className="logo-btn" onClick={() => setPage("home")} style={{ marginBottom: 0 }}>
            <span className="logo-mark" style={{ background: "rgba(116,198,157,0.15)", border: "1px solid rgba(116,198,157,0.2)" }}>
              <ValeLogo light />
            </span>
            <span className="logo-wordmark">
              <span className="logo-name">Projeto Vale</span>
              <span className="logo-tagline">ONG · Vale do Paraíba</span>
            </span>
          </button>
          <p className="footer-desc">
            Promovemos inclusão social, capacitação profissional e suporte direto
            a famílias em situação de vulnerabilidade no Vale do Paraíba desde 2018.
          </p>
        </div>

        {/* Links col */}
        <div className="footer-col">
          <h4>Navegação</h4>
          <ul className="footer-links">
            <li><button onClick={() => setPage("home")}>Início</button></li>
            <li><button onClick={() => setPage("projects")}>Projetos & Ações</button></li>
            <li><button onClick={() => setPage("projects")}>Voluntariado</button></li>
            <li><button onClick={() => setPage("projects")}>Doações</button></li>
            <li><button onClick={() => setPage("cadastro")}>Cadastro</button></li>
          </ul>
        </div>

        {/* Contact col */}
        <div className="footer-col">
          <h4>Contato</h4>
          <div className="footer-contact-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            contato@projetovale.org.br
          </div>
          <div className="footer-contact-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 1.18 2 2 0 013.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            (12) 99999-8888
          </div>
          <div className="footer-contact-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Av. Principal, 500 — Jacareí / SP
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 <span>Projeto Vale</span>. Todos os direitos reservados.</span>
        <span>CNPJ: 00.123.456/0001-89</span>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════
   HOME PAGE
══════════════════════════════════════ */
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <img
          className="hero-img"
          src="https://images.unsplash.com/photo-1649730828859-73efaff40d04?auto=format&fit=crop&w=1600&q=80"
          alt="Comunidade unida em ação solidária"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">
            <span />
            ONG ativa desde 2018
          </div>
          <h1 className="hero-title">
            Transformando <em>vidas</em> no<br />Vale do Paraíba
          </h1>
          <p className="hero-sub">
            Inclusão social, capacitação profissional e apoio direto a famílias
            que precisam. Juntos, construímos uma comunidade mais justa.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setPage("cadastro")}>
              Quero Apoiar
            </button>
            <button className="btn-outline-white" onClick={() => setPage("projects")}>
              Conheça os Projetos
            </button>
          </div>
        </div>
      </section>

      {/* ── Impact Stats ── */}
      <div className="stats-bar">
        <div className="stats-inner">
          {[
            { n: "+150",  label: "Alunos por ciclo" },
            { n: "200",   label: "Famílias atendidas" },
            { n: "8",     label: "Anos de atuação" },
            { n: "+300",  label: "Voluntários formados" },
          ].map((s) => (
            <div className="stat-item" key={s.label}>
              <span className="stat-number">{s.n}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quem Somos ── */}
      <section className="section">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=800&q=80"
                alt="Voluntários organizando alimentos para doação"
              />
              <div className="about-img-badge">
                <strong>+8 anos</strong>
                de impacto social
              </div>
            </div>

            <div className="about-text">
              <div>
                <span className="section-label">Quem Somos</span>
                <h2 className="section-title">Uma comunidade que cuida de quem precisa</h2>
              </div>
              <p>
                O <strong>Projeto Vale</strong> é uma iniciativa comunitária fundada em 2018,
                dedicada à inclusão social e ao desenvolvimento humano no Vale do Paraíba.
                Acreditamos que educação, alimentação e oportunidade transformam histórias.
              </p>
              <p>
                Atuamos com transparência, inovação social e um compromisso real com
                as famílias mais vulneráveis da nossa região — porque cada vida importa
                e cada ação faz diferença.
              </p>
              <button className="btn-primary" onClick={() => setPage("projects")}
                style={{ alignSelf: "flex-start" }}>
                Ver nossos projetos →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Missão e Valores ── */}
      <section className="section section-light-green">
        <div className="section-inner">
          <span className="section-label">Nossos Valores</span>
          <h2 className="section-title">O que nos guia</h2>
          <p className="section-desc">
            Nossa missão é promover a autonomia e a transformação social por meio
            de ações educativas e de impacto direto na comunidade.
          </p>
          <div className="values-grid">
            {[
              { icon: "🔍", title: "Transparência", desc: "Prestação de contas clara e acessível a toda a comunidade." },
              { icon: "💡", title: "Inovação Social", desc: "Soluções criativas para desafios reais de quem vive a vulnerabilidade." },
              { icon: "🤝", title: "Empatia", desc: "Escutamos, entendemos e agimos com respeito a cada história." },
              { icon: "🌱", title: "Compromisso", desc: "Presença contínua e responsável junto às famílias atendidas." },
            ].map((v) => (
              <div className="value-card" key={v.title}>
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projetos Preview ── */}
      <section className="section">
        <div className="section-inner">
          <span className="section-label">Projetos Ativos</span>
          <h2 className="section-title">Ações que transformam</h2>
          <p className="section-desc">
            Cada projeto é planejado com impacto real e mensurado, envolvendo a
            comunidade como protagonista da mudança.
          </p>
          <div className="projects-grid">
            <div className="project-card">
              <img
                className="project-card-img"
                src="https://images.unsplash.com/photo-1631350397792-8e0c2de5b637?auto=format&fit=crop&w=700&h=280&q=80"
                alt="Projeto Inclusão Digital — oficinas de tecnologia"
              />
              <div className="project-card-body">
                <span className="project-tag">Educação & Tecnologia</span>
                <h3>Projeto Inclusão Digital</h3>
                <p>Oficinas de informática básica, lógica de programação e navegação segura
                  para jovens e adultos da região que buscam inserção no mercado de trabalho.</p>
                <div className="project-card-stats">
                  <div className="project-stat">
                    <strong>+150</strong>
                    <span>alunos / ciclo</span>
                  </div>
                  <div className="project-stat">
                    <strong>Gratuito</strong>
                    <span>acesso livre</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="project-card">
              <img
                className="project-card-img"
                src="https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=700&h=280&q=80"
                alt="Ação Cesta Solidária — distribuição de alimentos"
              />
              <div className="project-card-body">
                <span className="project-tag">Alimentação & Solidariedade</span>
                <h3>Ação Cesta Solidária</h3>
                <p>Arrecadação e distribuição mensal de alimentos e itens de higiene para
                  famílias cadastradas em situação de insegurança alimentar.</p>
                <div className="project-card-stats">
                  <div className="project-stat">
                    <strong>200</strong>
                    <span>famílias / mês</span>
                  </div>
                  <div className="project-stat">
                    <strong>Mensal</strong>
                    <span>regularidade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <button className="btn-primary" onClick={() => setPage("projects")}>
              Ver todos os projetos
            </button>
          </div>
        </div>
      </section>

      {/* ── Donation CTA ── */}
      <section className="donate-section">
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <h2>Sua doação muda uma vida</h2>
          <p>
            Com qualquer valor você contribui para cestas básicas, material educativo
            e suporte a famílias que dependem do nosso trabalho todos os meses.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => setPage("projects")}>
              Veja como doar
            </button>
            <button className="btn-outline-white" onClick={() => setPage("cadastro")}>
              Ser voluntário
            </button>
          </div>
        </div>
      </section>

      {/* ── Contato ── */}
      <section className="section section-alt">
        <div className="section-inner">
          <span className="section-label">Fale Conosco</span>
          <h2 className="section-title">Entre em contato</h2>
          <p className="section-desc">
            Dúvidas, parcerias, visitas à sede ou doações de mantimentos —
            estamos disponíveis de segunda a sexta, das 9h às 17h.
          </p>
          <div className="contact-grid">
            {[
              { icon: "✉️", label: "E-mail", value: "contato@projetovale.org.br" },
              { icon: "📱", label: "WhatsApp", value: "(12) 99999-8888" },
              { icon: "📍", label: "Endereço", value: "Av. Principal, 500 — Jacareí / SP" },
            ].map((c) => (
              <div className="contact-card" key={c.label}>
                <div className="contact-icon">{c.icon}</div>
                <span className="label">{c.label}</span>
                <span className="value">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════
   PROJECTS PAGE
══════════════════════════════════════ */
function ProjectsPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <>
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb">
            <button onClick={() => setPage("home")}>Início</button>
            <span>›</span>
            <span>Projetos & Ações</span>
          </div>
          <h1>Projetos & Ações</h1>
          <p>Conheça as iniciativas ativas do Projeto Vale e o impacto real que geramos.</p>
        </div>
      </div>

      {/* Projetos */}
      <section className="section">
        <div className="section-inner">
          <span className="section-label">Iniciativas Ativas</span>
          <h2 className="section-title">Nossos Projetos Sociais</h2>
          <div className="projects-grid">
            <div className="project-card">
              <img className="project-card-img"
                src="https://images.unsplash.com/photo-1631350397792-8e0c2de5b637?auto=format&fit=crop&w=700&h=260&q=80"
                alt="Oficina de inclusão digital com computadores" />
              <div className="project-card-body">
                <span className="project-tag">Educação & Tecnologia</span>
                <h3>Projeto Inclusão Digital</h3>
                <p>Oferece oficinas básicas de tecnologia, lógica e navegação segura
                  para jovens e adultos. Os alunos recebem certificado de conclusão e
                  orientação para o mercado de trabalho.</p>
                <div className="project-card-stats">
                  <div className="project-stat"><strong>+150</strong><span>alunos / ciclo</span></div>
                  <div className="project-stat"><strong>100%</strong><span>gratuito</span></div>
                </div>
              </div>
            </div>

            <div className="project-card">
              <img className="project-card-img"
                src="https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=700&h=260&q=80"
                alt="Voluntários embalando cestas de alimentos" />
              <div className="project-card-body">
                <span className="project-tag">Alimentação & Solidariedade</span>
                <h3>Ação Cesta Solidária</h3>
                <p>Arrecadação e distribuição de alimentos e itens de higiene para
                  famílias cadastradas. As cestas são montadas por voluntários e entregues
                  mensalmente nos bairros atendidos.</p>
                <div className="project-card-stats">
                  <div className="project-stat"><strong>200</strong><span>famílias / mês</span></div>
                  <div className="project-stat"><strong>Mensal</strong><span>regularidade</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voluntariado */}
      <section className="section section-light-green">
        <div className="section-inner">
          <span className="section-label">Faça Parte</span>
          <h2 className="section-title">Programa de Voluntariado</h2>
          <p className="section-desc">
            Doe seu tempo e conhecimento em uma das nossas frentes de atuação.
            Não é necessária experiência prévia — apenas vontade de ajudar.
          </p>
          <div className="vol-grid">
            {[
              { title: "Inclusão Digital", desc: "Instrução de informática básica e auxílio prático em sala de aula." },
              { title: "Logística e Triagem", desc: "Organização e separação de suprimentos para distribuição." },
              { title: "Comunicação", desc: "Produção de conteúdo para redes sociais e divulgação de ações." },
              { title: "Apoio Administrativo", desc: "Auxílio em processos internos, cadastros e relatórios." },
            ].map((v) => (
              <dl className="vol-card" key={v.title}>
                <dt>{v.title}</dt>
                <dd>{v.desc}</dd>
              </dl>
            ))}
          </div>
        </div>
      </section>

      {/* Doações */}
      <section className="section">
        <div className="section-inner">
          <span className="section-label">Contribua Financeiramente</span>
          <h2 className="section-title">Canais de Doação</h2>
          <p className="section-desc">
            Toda doação é registrada com transparência e destinada diretamente
            aos projetos. Você pode acompanhar os relatórios no nosso site.
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Modalidade</th>
                <th>Chave / Dados</th>
                <th>Destinação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="pix-badge">PIX · CNPJ</span></td>
                <td><strong>00.123.456/0001-89</strong></td>
                <td>Manutenção Geral e Projetos</td>
              </tr>
              <tr>
                <td><span className="pix-badge" style={{ background: "#f3f4f6", color: "#374151" }}>Conta Bancária</span></td>
                <td><strong>Banco 001 · Ag: 1234 · CC: 56789-0</strong></td>
                <td>Compra de Cestas Básicas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Aside CTA */}
      <section className="section section-alt">
        <div className="section-inner">
          <aside className="aside-cta">
            <h3>Faça parte da mudança</h3>
            <p>Quer atuar como voluntário ou contribuir como doador recorrente?
              Preencha nosso cadastro e comece a transformar vidas.</p>
            <button className="btn-primary" onClick={() => setPage("cadastro")}>
              Acessar Formulário de Cadastro →
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════
   CADASTRO PAGE
══════════════════════════════════════ */
function CadastroPage({ setPage }: { setPage: (p: Page) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [engajamento, setEngajamento] = useState<"voluntario" | "doador" | "">("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
    (e.target as HTMLFormElement).reset();
    setEngajamento("");
  }

  return (
    <>
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb">
            <button onClick={() => setPage("home")}>Início</button>
            <span>›</span>
            <span>Cadastro de Apoio</span>
          </div>
          <h1>Cadastro de Voluntários e Doadores</h1>
          <p>Preencha os dados abaixo para integrar a rede de apoio do Projeto Vale.</p>
        </div>
      </div>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="form-wrap">
            {submitted && (
              <div className="form-success">
                ✓ &nbsp;Cadastro recebido com sucesso! Entraremos em contato em breve.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Dados Pessoais */}
              <fieldset className="form-fieldset">
                <legend>Dados Pessoais</legend>
                <div className="form-grid">
                  <div className="field-group full-width">
                    <label className="field-label" htmlFor="nome">Nome Completo *</label>
                    <input className="field-input" type="text" id="nome" name="nome"
                      required minLength={3} placeholder="Digite seu nome completo" />
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="cpf">CPF *</label>
                    <input className="field-input" type="text" id="cpf" name="cpf"
                      required maxLength={14} placeholder="000.000.000-00" />
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="data-nascimento">Data de Nascimento *</label>
                    <input className="field-input" type="date" id="data-nascimento"
                      name="data-nascimento" required />
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="email">E-mail *</label>
                    <input className="field-input" type="email" id="email" name="email"
                      required placeholder="seuemail@exemplo.com" />
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="telefone">Telefone / WhatsApp *</label>
                    <input className="field-input" type="tel" id="telefone" name="telefone"
                      required maxLength={15} placeholder="(12) 99999-8888" />
                  </div>
                </div>
              </fieldset>

              {/* Endereço */}
              <fieldset className="form-fieldset">
                <legend>Endereço e Localização</legend>
                <div className="form-grid">
                  <div className="field-group">
                    <label className="field-label" htmlFor="cep">CEP *</label>
                    <input className="field-input" type="text" id="cep" name="cep"
                      required maxLength={9} placeholder="12345-678" />
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="cidade">Cidade *</label>
                    <input className="field-input" type="text" id="cidade" name="cidade"
                      required placeholder="Digite sua cidade" />
                  </div>
                  <div className="field-group full-width">
                    <label className="field-label" htmlFor="endereco">Endereço *</label>
                    <input className="field-input" type="text" id="endereco" name="endereco"
                      required placeholder="Rua, número e complemento" />
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="estado">Estado (UF) *</label>
                    <select className="field-input" id="estado" name="estado" required>
                      <option value="">Selecione...</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="PR">Paraná</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="BA">Bahia</option>
                      <option value="GO">Goiás</option>
                      <option value="DF">Distrito Federal</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Perfil de Engajamento */}
              <fieldset className="form-fieldset">
                <legend>Perfil de Engajamento</legend>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "16px" }}>
                  Como você deseja contribuir com o Projeto Vale?
                </p>
                <div className="radio-group">
                  <label className={`radio-option ${engajamento === "voluntario" ? "selected" : ""}`}
                    htmlFor="tipo-voluntario">
                    <input type="radio" id="tipo-voluntario" name="tipo-apoio"
                      value="voluntario" required onChange={() => setEngajamento("voluntario")} />
                    <span>
                      <span className="radio-title">Voluntário</span>
                      <span className="radio-desc">Doe seu tempo e talento em nossas ações</span>
                    </span>
                  </label>
                  <label className={`radio-option ${engajamento === "doador" ? "selected" : ""}`}
                    htmlFor="tipo-doador">
                    <input type="radio" id="tipo-doador" name="tipo-apoio"
                      value="doador" onChange={() => setEngajamento("doador")} />
                    <span>
                      <span className="radio-title">Doador</span>
                      <span className="radio-desc">Contribua financeiramente com a causa</span>
                    </span>
                  </label>
                </div>
              </fieldset>

              <button type="submit" className="submit-btn">
                Finalizar Cadastro
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════
   APP SHELL
══════════════════════════════════════ */
export default function App() {
  const [page, setPage]           = useState<Page>("home");
  const [phase, setPhase]         = useState<"entering" | "leaving" | "idle">("entering");
  const pendingPage               = useRef<Page | null>(null);

  /* First-load entrance animation */
  useEffect(() => {
    const t = setTimeout(() => setPhase("leaving"), 680);
    const u = setTimeout(() => setPhase("idle"),    1020);
    return () => { clearTimeout(t); clearTimeout(u); };
  }, []);

  /* Navigate with transition */
  const navigate = useCallback((next: Page) => {
    if (next === page) return;
    pendingPage.current = next;
    setPhase("entering");
    /* At peak opacity, swap the page */
    const swap = setTimeout(() => {
      if (pendingPage.current) setPage(pendingPage.current);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, 260);
    /* Start fade-out */  
    const out = setTimeout(() => setPhase("leaving"), 680);
    /* Done */
    const done = setTimeout(() => setPhase("idle"), 1020);
    return () => { clearTimeout(swap); clearTimeout(out); clearTimeout(done); };
  }, [page]);

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <PageTransition phase={phase} />
      <Header page={page} setPage={navigate} />
      <main style={{ flex: 1 }}>
        {page === "home"     && <HomePage setPage={navigate} />}
        {page === "projects" && <ProjectsPage setPage={navigate} />}
        {page === "cadastro" && <CadastroPage setPage={navigate} />}
      </main>
      <Footer setPage={navigate} />
    </div>  
  );
}
