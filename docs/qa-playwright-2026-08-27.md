# QA Playwright — 27/08/2026

## Resultado

Todos os cenários executados passaram. A validação foi feita em Chromium headless contra a build local da LP, com contextos novos para cada cenário e viewport desktop (`1440 × 900`) e mobile (`390 × 844`).

## Cenários validados

- Abertura de 2,5 segundos aparece em toda recarga, exibe os textos corretos e aceita dispensa por `Escape`.
- Hero mobile mostra a foto antes do título e não cria rolagem horizontal.
- Navegação principal aparece no desktop; menu mobile abre, fecha e restaura seus atributos ARIA.
- Desktop mostra os 10 cards de atendimento, com os dois últimos centralizados.
- Mobile começa com quatro cards; “Ver mais questões que acompanho” revela os restantes e “Mostrar menos questões” recolhe novamente.
- FAQ abre e revela sua resposta.
- Cliques em WhatsApp e Doctoralia geram `click_whatsapp` e `click_doctoralia` no `dataLayer`.
- Rolagem gera `scroll_depth` em 25%, 50%, 75% e 90%.
- Links externos relevantes usam `rel="noopener"`.
- Imagens carregam sem quebra e não houve erro de página nem resposta local HTTP 4xx/5xx durante os cenários.
- `title`, meta description, canonical e JSON-LD do tipo `Psychologist` estão presentes.
- `sitemap-index.xml` e `robots.txt` estão presentes na build.

## Evidência visual

As capturas completas de desktop e mobile foram geradas temporariamente em `/tmp/qa-psicologa-playwright/` e inspecionadas visualmente. Não foram adicionadas ao repositório para evitar novos artefatos de QA no commit.

## Limites desta rodada

- Execução somente em Chromium; Firefox e WebKit não foram incluídos porque o projeto ainda não possui suíte Playwright permanente nem dependências próprias de E2E.
- Não substitui auditoria dedicada de acessibilidade, desempenho ou validação da conversão final dentro das contas do GTM/GA4/Google Ads.
- A conversão específica do Google Ads continua dependendo do `conversion label` a ser criado ou enviado pelo gestor de tráfego.
