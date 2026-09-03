import { useState, FormEvent } from "react";

type Page = "home" | "projects" | "cadastro";

/* ── Componente de Vídeo com Skeleton Loader & Lazy Load ── */
function VideoSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`video-container ${!isLoaded ? 'loading' : ''}`}>
      {!isLoaded && (
        <div className="video-skeleton">
          <div className="skeleton-spinner"></div>
          <span>Carregando vídeo institucional...</span>
        </div>
      )}
      <iframe
        src="https://player.vimeo.com/video/1223171814?badge=0&autopause=0&player_id=0&app_id=58479"
        title="ProjetoVale"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.4s ease-in-out"
        }}
      ></iframe>
    </div>
  );
}

/* ── Logo SVG ───────────────────────────────────────────── */
function ProjetoValeLogo({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Projeto Vale logo"
    >
      <path
        d="M5 9 L22 33 L39 9"
        stroke="#00ff66"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="22"
        y1="33"
        x2="22"
        y2="20"
        stroke="#00ff66"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 26 C19 24 15 21 16 17 C18 16 21 19 22 22"
        fill="#00ff66"
        fillOpacity="0.85"
      />
      <path
        d="M22 26 C25 24 29 21 28 17 C26 16 23 19 22 22"
        fill="#00ff66"
        fillOpacity="0.85"
      />
      <circle cx="22" cy="17" r="2.2" fill="#00ff66" />
    </svg>
  );
}

/* ── Header ─────────────────────────────────────────────── */
function Header({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const navItems: [Page, string, boolean][] = [
    ["home", "Início", false],
    ["projects", "Projetos", false],
    ["cadastro", "Quero Ajudar", true],
  ];

  return (
    <header className="site-header">
      <button className="logo-btn" onClick={() => setPage("home")}>
        <span className="logo-mark">
          <ProjetoValeLogo size={22} />
        </span>
        <span className="logo-wordmark">
          <span className="logo-wordmark-top">
            Projeto <em>Vale</em>
          </span>
          <span className="logo-wordmark-sub">ONG · Vale do Paraíba</span>
        </span>
      </button>

      <nav aria-label="Navegação principal">
        <ul className="nav-list">
          {navItems.map(([key, label, isCta]) => (
            <li key={key}>
              <button
                className={`nav-btn ${isCta ? "nav-cta" : ""} ${page === key ? "active" : ""}`}
                onClick={() => setPage(key)}
                aria-current={page === key ? "page" : undefined}
              >
                <span className="nav-dot" aria-hidden="true" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

/* ── Footer ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="site-footer">
      <p>
        &copy; 2026 <span>Projeto Vale</span>. Todos os direitos reservados.
      </p>
    </footer>
  );
}

/* ── Home Page ───────────────────────────────────────────── */
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Apresentação + Vídeo com Skeleton Loader */}
      <section className="card" id="apresentacao-video">
        <h2 className="heading-mono">Conheça o Projeto Vale</h2>
        <p className="body-text">
          Assista ao vídeo institucional de apresentação e acompanhe nossas
          ações comunitárias:
        </p>
        <VideoSection />
      </section>

      {/* Quem Somos */}
      <section className="card" id="sobre">
        <h2 className="heading-mono">Quem Somos</h2>
        <p className="body-text">
          O Projeto Vale é uma iniciativa comunitária focada na inclusão social,
          capacitação profissional e suporte direto a famílias no Vale do
          Paraíba. Atuamos com transparência, empatia e compromisso real com
          quem mais precisa.
        </p>
        <figure className="media-figure">
          <img
            src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=1200&h=500&q=80"
            alt="Voluntários organizando alimentos enlatados para distribuição em ação de doação comunitária."
          />
          <figcaption className="media-figcaption">
            Voluntários separando alimentos para distribuição — Ação Cesta
            Solidária.
          </figcaption>
        </figure>
      </section>

      {/* Missão e Valores */}
      <section className="card" id="missao-valores">
        <h2 className="heading-mono">Missão e Valores</h2>
        <p className="body-text">
          <strong style={{ color: "var(--text-primary)" }}>Missão:</strong>{" "}
          Promover a autonomia e a transformação social por meio de ações
          educativas e de impacto local, alcançando quem mais precisa no Vale do
          Paraíba.
        </p>

        <div className="value-grid">
          {[
            { icon: "🔍", label: "Transparência" },
            { icon: "💡", label: "Inovação Social" },
            { icon: "🤝", label: "Empatia" },
            { icon: "🌱", label: "Compromisso" },
          ].map((v) => (
            <div className="value-badge" key={v.label}>
              <div className="icon">{v.icon}</div>
              <span>{v.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section className="card" id="contato">
        <h2 className="heading-mono">Entre em Contato</h2>
        <p className="body-text">
          Dúvidas, parcerias ou agendamento de visitas à nossa sede:
        </p>
        <ul className="contact-list">
          <li>
            <span className="label">E-mail</span>
            contato@projetovale.org.br
          </li>
          <li>
            <span className="label">WhatsApp</span>
            (12) 99999-8888
          </li>
          <li>
            <span className="label">Endereço</span>
            Av. Principal, 500 — Jacareí / SP
          </li>
        </ul>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button className="cta-btn" onClick={() => setPage("cadastro")}>
            Quero Participar →
          </button>
        </div>
      </section>
    </main>
  );
}

/* ── Projects Page ───────────────────────────────────────── */
function ProjectsPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <section className="card" id="projetos">
        <h2 className="heading-mono">Projetos Sociais Ativos</h2>
        <p className="body-text">
          Conheça nossas iniciativas em andamento e o impacto real que estamos
          gerando.
        </p>

        <div className="articles-grid">
          <article className="article-card">
            <span className="article-tag">ATIVO</span>
            <h3 className="subheading">Projeto Inclusão Digital</h3>
            <p className="body-text" style={{ fontSize: "0.88rem" }}>
              Oficinas de tecnologia, lógica de programação e navegação segura
              para jovens e adultos da região.
            </p>
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "0" }}>
              <div className="article-stat">
                <strong>Atendidos</strong>
                <span>+150 alunos por ciclo</span>
              </div>
              <div className="article-stat">
                <strong>Impacto</strong>
                <span>Capacitação para o mercado</span>
              </div>
            </div>
          </article>

          <article className="article-card">
            <span className="article-tag">ATIVO</span>
            <h3 className="subheading">Ação Cesta Solidária</h3>
            <p className="body-text" style={{ fontSize: "0.88rem" }}>
              Arrecadação e distribuição mensal de alimentos e itens de higiene
              para famílias cadastradas em situação de vulnerabilidade.
            </p>
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column" }}>
              <div className="article-stat">
                <strong>Meta Mensal</strong>
                <span>200 famílias beneficiadas</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="card" id="voluntariado">
        <h2 className="heading-mono">Programa de Voluntariado</h2>
        <p className="body-text">
          Apoie nossas frentes de atuação doando seu tempo e conhecimento. Veja
          as áreas disponíveis:
        </p>

        <div className="vol-grid">
          <div className="vol-item">
            <dt>Inclusão Digital</dt>
            <dd>Instrução de informática básica e auxílio prático em sala de aula.</dd>
          </div>
          <div className="vol-item">
            <dt>Logística e Triagem</dt>
            <dd>Organização e separação de suprimentos para doação.</dd>
          </div>
          <div className="vol-item">
            <dt>Comunicação</dt>
            <dd>Divulgação em redes sociais e produção de conteúdo.</dd>
          </div>
          <div className="vol-item">
            <dt>Apoio Administrativo</dt>
            <dd>Auxílio em processos internos e gestão de cadastros.</dd>
          </div>
        </div>
      </section>

      <section className="card" id="doacoes">
        <h2 className="heading-mono">Canais de Doação</h2>
        <p className="body-text">
          Sua contribuição financeira garante a continuidade de nossas
          atividades. Toda doação é registrada com transparência.
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
              <td>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--accent-neon)",
                    background: "var(--accent-glow)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  PIX · CNPJ
                </span>
              </td>
              <td className="highlight-cell">00.123.456/0001-89</td>
              <td>Manutenção Geral e Projetos</td>
            </tr>
            <tr>
              <td>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    background: "var(--surface-hover)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  Conta Bancária
                </span>
              </td>
              <td className="highlight-cell">
                Banco 001 · Ag: 1234 · CC: 56789-0
              </td>
              <td>Compra de Cestas Básicas</td>
            </tr>
          </tbody>
        </table>
      </section>

      <aside className="aside-cta">
        <h3 className="subheading" style={{ fontSize: "1.1rem" }}>
          Faça Parte da Mudança
        </h3>
        <p className="body-text">
          Quer atuar como voluntário ou contribuir como doador recorrente?
          Cadastre-se e comece a transformar vidas.
        </p>
        <button className="cta-btn" onClick={() => setPage("cadastro")}>
          Acessar Formulário de Cadastro →
        </button>
      </aside>
    </main>
  );
}

/* ── Cadastro Page ───────────────────────────────────────── */
function CadastroPage() {
  const [submitted, setSubmitted] = useState(false);
  const [engajamento, setEngajamento] = useState<"voluntario" | "doador" | "">("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    (e.target as HTMLFormElement).reset();
    setEngajamento("");
  }

  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <section className="card-flat">
        <h2 className="heading-mono">Cadastro de Voluntários e Doadores</h2>
        <p className="body-text">
          Preencha os dados abaixo para integrar a rede de apoio do Projeto
          Vale. Seu engajamento faz diferença real na comunidade.
        </p>

        {submitted && (
          <div className="form-success">
            <span>✓</span>
            Cadastro recebido com sucesso! Entraremos em contato em breve.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <fieldset className="form-fieldset">
            <legend>Dados Pessoais</legend>
            <div className="form-grid">
              <div className="field-group full-width">
                <label className="field-label" htmlFor="nome">
                  Nome Completo
                </label>
                <input
                  className="field-input"
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  minLength={3}
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="cpf">
                  CPF
                </label>
                <input
                  className="field-input"
                  type="text"
                  id="cpf"
                  name="cpf"
                  required
                  maxLength={14}
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="data-nascimento">
                  Data de Nascimento
                </label>
                <input
                  className="field-input"
                  type="date"
                  id="data-nascimento"
                  name="data-nascimento"
                  required
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="field-input"
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="seuemail@exemplo.com"
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="telefone">
                  Telefone / WhatsApp
                </label>
                <input
                  className="field-input"
                  type="tel"
                  id="telefone"
                  name="telefone"
                  required
                  maxLength={15}
                  placeholder="(12) 99999-8888"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-fieldset">
            <legend>Endereço e Localização</legend>
            <div className="form-grid">
              <div className="field-group">
                <label className="field-label" htmlFor="cep">
                  CEP
                </label>
                <input
                  className="field-input"
                  type="text"
                  id="cep"
                  name="cep"
                  required
                  maxLength={9}
                  placeholder="12345-678"
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="cidade">
                  Cidade
                </label>
                <input
                  className="field-input"
                  type="text"
                  id="cidade"
                  name="cidade"
                  required
                  placeholder="Digite sua cidade"
                />
              </div>

              <div className="field-group full-width">
                <label className="field-label" htmlFor="endereco">
                  Endereço
                </label>
                <input
                  className="field-input"
                  type="text"
                  id="endereco"
                  name="endereco"
                  required
                  placeholder="Rua, número e complemento"
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="estado">
                  Estado (UF)
                </label>
                <select className="field-input" id="estado" name="estado" required>
                  <option value="">Selecione o estado...</option>
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

          <fieldset className="form-fieldset">
            <legend>Perfil de Engajamento</legend>
            <p className="body-text" style={{ marginBottom: "12px" }}>
              Como você deseja contribuir com o Projeto Vale?
            </p>
            <div className="radio-group">
              <label
                className={`radio-option ${engajamento === "voluntario" ? "selected" : ""}`}
                htmlFor="tipo-voluntario"
              >
                <input
                  type="radio"
                  id="tipo-voluntario"
                  name="tipo-apoio"
                  value="voluntario"
                  required
                  onChange={() => setEngajamento("voluntario")}
                />
                <span className="radio-label">
                  <strong style={{ display: "block", color: "var(--text-primary)", marginBottom: "2px" }}>
                    Voluntário
                  </strong>
                  <span style={{ fontSize: "0.8rem" }}>Doe seu tempo e talento</span>
                </span>
              </label>

              <label
                className={`radio-option ${engajamento === "doador" ? "selected" : ""}`}
                htmlFor="tipo-doador"
              >
                <input
                  type="radio"
                  id="tipo-doador"
                  name="tipo-apoio"
                  value="doador"
                  onChange={() => setEngajamento("doador")}
                />
                <span className="radio-label">
                  <strong style={{ display: "block", color: "var(--text-primary)", marginBottom: "2px" }}>
                    Doador
                  </strong>
                  <span style={{ fontSize: "0.8rem" }}>Contribua financeiramente</span>
                </span>
              </label>
            </div>
          </fieldset>

          <button type="submit" className="submit-btn">
            ✓ &nbsp;Finalizar Cadastro
          </button>
        </form>
      </section>
    </main>
  );
}

/* ── App Shell ───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "16px 18px 0",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header page={page} setPage={setPage} />

      <div style={{ flex: 1, marginTop: "24px" }}>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "projects" && <ProjectsPage setPage={setPage} />}
        {page === "cadastro" && <CadastroPage />}
      </div>

      <Footer />
    </div>
  );
}