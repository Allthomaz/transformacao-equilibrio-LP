# Spec — Landing Page Andréa Rosa Souza · Transformação & Equilíbrio

**Data:** 23/08/2026 · **Status:** aprovada em brainstorming · **Base:** briefing-andrea.md + decisões desta sessão

---

## 1. Objetivo

Landing page de conversão para a psicóloga clínica Andréa Rosa Souza (CRP 06/136303), Clínica Transformação & Equilíbrio, Tatuapé/SP. Canal real de fechamento: **WhatsApp** (com Doctoralia como alternativa). Sem promessa de cura, sem depoimento fictício, sem gatilho abusivo (ética CFP). Sem isca digital de meditação (decisão 23/08).

## 2. Stack

| Camada | Decisão |
|---|---|
| Framework | **Astro 5** — componentes por seção, zero JS por padrão, deploy Vercel |
| CSS | Puro com design tokens em `:root` (paleta + tipografia) |
| Vídeo "Como funciona" | **Remotion** (skill `remotion-motion-graphics` em `.claude/skills/`) → renderiza MP4/WebM → `<video autoplay muted loop playsinline>` com play on-scroll |
| Fontes | DM Serif Display (títulos) + DM Sans (corpo) — Google Fonts, preconnect + `font-display: swap` (mesma tipografia de hector.psc.br, confirmada no CSS compilado) |
| Ícones | SVG inline stroke fino |
| Animações | CSS puro (hover shine, marquee, o/a/x do hero) + **Motion One** (motion.dev, ~18kb, sem React — escolhido por combinar com Remotion: mesma sintaxe `animate`/springs usada no vídeo) para coreografia de scroll: reveals encadeados, entrada do hero, contadores da prova social. `prefers-reduced-motion` em tudo |
| Imagens | `<Image>` do Astro (WebP automático) |
| SEO/GEO | Sitemap, meta tags, JSON-LD `Psychologist`/LocalBusiness |
| Analytics | Slot pronto para GTM/GA4 + Pixel Meta (definição final com Thiago) |
| Deploy | Vercel; domínio atual dela migrado por troca de DNS (passo orientado na hora) |

## 3. Design tokens

- `--bg: #F5F1EA` · `--bege: #E8DCC0` · `--texto: #1A1A1A` · `--terracota: #B25F3F` (CTA) · `--terracota-escuro: #96492E` · `--verde: #4A7C59` · `--superficie-card: #FBF8F2`
- Títulos: DM Serif Display 400 · Corpo: DM Sans 300/400/500

## 4. Estrutura da página (ordem final)

1. **Header fixo** — logo `logo-fundo-criativo-02.png` + CTA WhatsApp compacto sempre visível
2. **Hero** — foto da Andréa (`retrato-psicologa-criativo.jpg` ou `foto-da-psicologa.jpeg`) · kicker "Psicóloga clínica · Online e presencial · Tatuapé" · headline DM Serif: **"Você não precisa mais carregar isso sozinh_"** com a última letra ciclando **o → a → x** (CSS keyframes, ~2s cada, transição suave, terracota) · subtítulo do briefing · CTA duplo: "Falar com a psicóloga" (WhatsApp) + "Verificar horários" (Doctoralia) · microcopy "Sem compromisso · Respondo pessoalmente"
3. **Marquee loop** — faixa com borda hairline, palavras em DM Sans 500, 0.7rem, tracking 0.18em, alternando cor sutil (`rgba(26,26,26,0.55)`) e terracota, separadas por bolinha 3px; conteúdo duplicado para loop seamless (`animation: translateX` infinita). Palavras: EQUILÍBRIO · ESCUTA · ACOLHIMENTO · TRANSFORMAÇÃO · RESPEITO AO RITMO · SEM JUÍZO · PRESENCIAL · ONLINE · TATUAPÉ (validar com cliente)
4. **Prova social** — 5,0/5 · 70 avaliações · selos Doctoralia Best Quality 2019/2020 · 3 trechos verificados
5. **Atendimento** (premium estilo Apple, tons delicados) — kicker "Atendimento" + título "Tratamento e acolhimento a questões como:" + subtítulo "Se alguma dessas frases parece com o seu momento, é um bom lugar pra começar." + grid de cards com **hover shine sweep** (gradiente branco translúcido deslizando 0.9s cubic-bezier + lift −3px). Cards (título serifa + copy identificação 2ª pessoa):
   - Ansiedade — "Sua mente não desliga, mesmo cansada"
   - Depressão — "Faltar ânimo até pro que você gostava"
   - Luto e perdas — "Aprender a viver depois de uma perda"
   - Traumas e fobias — "Medos que limitam o seu dia a dia"
   - TOC — "Pensamentos e rituais que se repetem"
   - Bipolaridade — "Altos e baixos que parecem não ter meio-termo"
   - Borderline — "Relações intensas com medo de abandono"
   - Relacionamento abusivo — "Relações que machucam sem nomear"
   - Casal — "Conflitos e distância na relação"
   - Autoconhecimento — "Padrões que se repetem nas suas escolhas"
   - CTA final: "Não se identificou? A conversa é o começo" → WhatsApp
6. **Serviços** (reposicionamento do menu Doctoralia) — 4 cards: Psicoterapia Individual (adultos e jovens ≥14, presencial/online; engloba ansiedade, depressão, fobias, traumas, TOC, bipolar, borderline — citados na copy interna) · Terapia de Casal · Avaliação p/ Cirurgia Bariátrica com laudo (nicho, SEO local) · Avaliação Psicológica. Badges "Online" e "Presencial · Tatuapé" nos cards. Sem preços na LP.
7. **Acolhimento** — evolução da seção aprovada: foto `consultorio.jpeg` full-bleed, **texto reposicionado** (descentralizado, menor, para a foto respirar) + frase serifa clara + assinatura "Transformação & Equilíbrio"
8. **Sobre** — texto aprovado (briefing §8) + +10 anos · Rua Apucarana, Tatuapé · CRP
9. **Como funciona** — 3 passos (contato → 1ª sessão → acompanhamento) com **vídeo Remotion** embutido (tipografia animada na paleta; seguindo as regras da skill remotion-motion-graphics: spring easing, nunca linear, stagger, 5-layer stack, Ken Burns se usar foto)
10. **FAQ** — particular (sem convênios), PIX/cartão/boleto, recibo p/ reembolso, online como funciona, jovens ≥14
11. **CTA final** — headline de baixa pressão + CTA duplo + microcopy
12. **Rodapé** — logo, CRP 06/136303, Rua Apucarana — Tatuapé/SP, CNPJ 36.940.050/0001-04, WhatsApp, Doctoralia, favicon `logo-fundo-branco-fivicon.png`

## 5. CTAs (links)

- WhatsApp: `https://wa.me/5511961205743` (com mensagem pré-preenchida a definir)
- Doctoralia: `https://www.doctoralia.com.br/andrea-rosa-souza/psicologo/sao-paulo`
- CTAs repetidos 3–4x (hero, atendimento, como funciona, final), microcopy sem pressão

## 6. Assets (`assets/imagens/`)

| Arquivo | Uso |
|---|---|
| `retrato-psicologa-criativo.jpg` (1254×1254) | Hero (principal) |
| `foto-da-psicologa.jpeg` | Hero/Sobre (alternativa/backup) |
| `consultorio.jpeg` | Acolhimento |
| `criativas/consultorio-criativo-sofa.jpg` · `-sala.jpg` | Acolhimento/Como funciona (apoio) |
| `logo-fundo-criativo-02.png` | Header |
| `logo-com-fundo-criativo.png` | Alternativa |
| `logo-fundo-branco-fivicon.png` | Favicon |
| `comparativo-logos.png` | Artefato de decisão (descartável) |

## 7. Estrutura do projeto

```
psicologa/
├── lp/                    # projeto Astro (novo)
│   ├── src/components/    # Header, Hero, Marquee, ProvaSocial, Atendimento,
│   │                      # Servicos, Acolhimento, Sobre, ComoFunciona, FAQ, CtaFinal, Rodape
│   ├── src/styles/tokens.css
│   ├── src/pages/index.astro
│   └── public/videos/como-funciona.mp4
├── video/                 # projeto Remotion (novo) — renderiza → lp/public/videos/
├── assets/imagens/        # fonte das imagens (build copia/otimiza)
├── secao-acolhimento/     # protótipos aprovados (referência)
└── briefing-andrea.md     # fonte canônica de copy
```

Protótipos standalone existentes (`secao-acolhimento/`, futuro `secao-hero/`, `secao-atendimento/`) são referência de validação; a LP final os reimplementa como componentes Astro.

## 8. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Shine sweep invisível em fundo claro | calibrar opacidade + validar em screenshot |
| Animação o/a/x confundir leitura | cycling apenas na letra final, terracota, teste A/B possível |
| Vídeo Remotion pesar no LCP | MP4 comprimido (<2MB), `preload="none"` + poster, play on-scroll |
| Copy soar diagnóstico (CFP) | frases em 2ª pessoa "você sente", revisão contra código de ética |
| Mobile sem hover | shine dispara no active/toque; grid 1 coluna |

## 9. Fora de escopo (v1)

- Isca digital (Desafio de Meditação/newsletter) — excluída por decisão do cliente
- Blog, multi-páginas
- Pixel/GTM ativos (só slot pronto)
