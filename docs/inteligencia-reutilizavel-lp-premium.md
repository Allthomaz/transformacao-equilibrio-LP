# Inteligência reutilizável — construção de uma LP premium

> Material de referência para futura incorporação ao **Meu Saber**.
>
> Origem: desenvolvimento e auditoria responsiva da landing page da psicóloga Andréa Rosa Souza.
> Data do registro: 24 de agosto de 2026.

## Princípio central

Uma landing page premium não depende de efeitos complexos. O resultado vem de decisões responsivas específicas, movimento controlado, conteúdo coerente e validação contínua em dispositivos reais.

Desktop e mobile devem ser tratados como duas composições relacionadas, não como a mesma composição apenas redimensionada.

## 1. Art direction responsiva para imagens

A mesma fotografia raramente oferece o melhor enquadramento em telas verticais e horizontais.

Padrão reutilizável:

- usar imagem vertical no mobile;
- produzir uma versão horizontal própria para desktop;
- usar `<picture>` e `<source media>` para baixar somente o arquivo adequado;
- definir `object-position` por breakpoint;
- evitar resolver incompatibilidades de proporção apenas com zoom;
- preservar o foco visual e não cortar elementos humanos ou arquitetônicos importantes.

```html
<picture>
  <source media="(min-width: 641px)" srcset="imagem-horizontal.webp" />
  <img src="imagem-vertical.webp" alt="Descrição real da imagem" />
</picture>
```

Esse padrão é especialmente útil para consultórios, hotéis, imóveis, restaurantes, profissionais e produtos fotografados.

## 2. Altura responsiva por contexto

Uma única altura não produz necessariamente a mesma sensação visual em todos os dispositivos.

Exemplo validado nesta LP:

```css
.secao {
  height: 108vh;
  height: 108svh;
}

@media (max-width: 640px) {
  .secao {
    height: 92vh;
    height: 92svh;
  }
}
```

`svh` ajuda a lidar com as barras dinâmicas do navegador mobile. A altura deve ser validada visualmente, considerando o enquadramento da foto e o ritmo total da página.

## 3. Liquid glass como apoio ao conteúdo

O efeito glass deve melhorar a leitura sem esconder a imagem.

Funcionou melhor quando combinou:

- fundo bastante transparente;
- blur concentrado atrás do texto;
- borda branca discreta;
- sombra ampla e suave;
- cantos generosos;
- posição previsível, sem cobrir o foco da fotografia.

```css
.glass {
  background: rgba(245, 241, 234, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.32);
  backdrop-filter: blur(10px) saturate(1.06);
  border-radius: 24px;
  box-shadow:
    0 18px 48px rgba(26, 26, 26, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.38);
}
```

A transparência precisa ser calibrada sobre a imagem final, e não somente em um fundo de teste.

## 4. Animações de scroll coordenadas

Observar e animar cada card individualmente pode produzir tremor, piscadas e sensação de desencaixe durante o scroll.

Padrão mais estável:

- observar o contêiner;
- animar os filhos em uma única sequência;
- usar stagger curto;
- modificar somente `opacity` e `transform`;
- não animar altura, margem ou propriedades que recalculam o layout;
- executar apenas uma vez;
- respeitar `prefers-reduced-motion`.

Configuração validada:

- deslocamento vertical: `10px`;
- duração: `450ms`;
- intervalo entre cards: `80ms`;
- easing suave;
- movimento ainda menor ou somente fade no mobile.

Regra de design: a animação deve comunicar hierarquia e continuidade, não competir com o conteúdo.

## 5. Vídeo responsivo sem salto de layout

O espaço do vídeo deve estar reservado antes do carregamento do arquivo.

```css
.video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

@media (max-width: 860px) {
  .video {
    aspect-ratio: 9 / 16;
  }
}
```

Boas práticas:

- vídeo horizontal no desktop e vertical no mobile;
- posters específicos por formato;
- `muted`, `playsinline` e `loop` quando houver autoplay contextual;
- `preload="none"` para proteger a carga inicial;
- iniciar quando o vídeo estiver visível;
- pausar ao sair da viewport;
- oferecer controles quando `prefers-reduced-motion` estiver ativo;
- revelar o contêiner com fade, subida curta e escala mínima, sem alterar suas dimensões.

## 6. Header premium: comportamento antes do efeito

Um header liquid glass precisa continuar funcional em condições reais.

Checklist reutilizável:

- permanecer visível durante a rolagem;
- fechar o menu ao rolar;
- fechar com Escape;
- fechar com clique externo;
- fechar após selecionar uma âncora;
- manter áreas de toque de pelo menos `44 × 44px`;
- adaptar o texto do CTA em telas estreitas;
- preservar foco visível;
- não roubar foco quando o menu já estiver fechado.

## 7. Acessibilidade como acabamento de qualidade

Acessibilidade e aparência premium se reforçam.

Fundação recomendada:

- skip link;
- `<main id="conteudo-principal">`;
- navegação completa por teclado;
- foco visível;
- contraste WCAG AA;
- áreas mínimas de toque;
- `aria-expanded` e nomes acessíveis;
- textos alternativos descritivos;
- semântica correta de títulos, seções, botões e links;
- suporte a `prefers-reduced-motion`.

Automação com axe deve ser complementada por teste manual de teclado, foco, leitura, toque e scroll.

## 8. Localização como seção editorial

Um mapa solto costuma parecer aleatório. A localização precisa responder à pergunta “como chegar?”.

Composição recomendada:

- posicionar depois do FAQ ou próximo do fechamento;
- mapa amplo no desktop;
- mapa acima do texto no mobile;
- mostrar endereço e referência do bairro;
- manter um único CTA claro, como “Como chegar”;
- usar iframe com título acessível e `loading="lazy"`;
- evitar botões redundantes que fazem a mesma coisa.

## 9. SEO local e consistência de entidade

A base de uma LP local deve incluir:

- título e meta description claros;
- canonical;
- Open Graph;
- sitemap;
- JSON-LD;
- nome, especialidade, telefone e endereço;
- bairro e modalidades de atendimento no conteúdo visível;
- `hasMap` e `sameAs` quando houver fontes oficiais;
- avaliações somente quando a origem e a contagem forem inequívocas.

Google Business Profile, mapa, diretórios profissionais, JSON-LD e texto da página devem apresentar informações consistentes.

## 10. Processo de implementação seguro

Sequência recomendada:

1. Ler as instruções locais do projeto.
2. Conferir `git status` antes de editar.
3. Investigar e preservar alterações existentes.
4. Trabalhar localmente e sem deploy automático.
5. Implementar em lotes pequenos.
6. Rodar build após cada lote relevante.
7. Validar mobile, tablet e desktop.
8. Testar em aparelho físico pela rede local.
9. Separar bugs funcionais de preferências estéticas.
10. Criar commits seletivos, sem misturar arquivos não relacionados.

## 11. Matriz mínima de auditoria

Viewports recomendadas:

- mobile: 320, 375, 390 e 430px;
- tablet: 768 e 1024px;
- desktop: 1280 e 1440px;
- Chromium, Firefox e WebKit quando disponíveis.

Verificar:

- overflow horizontal;
- header durante rolagem longa;
- menu mobile, Escape, clique externo, âncoras e resize;
- áreas de toque;
- imagens sem distorção;
- textos animados sem mudança de layout;
- vídeos e posters responsivos;
- navegação por teclado e foco;
- ARIA, contraste e semântica;
- console e recursos quebrados;
- regressão visual;
- Lighthouse, LCP, CLS e acessibilidade.

## 12. Componentes que podem virar template

- `HeaderLiquidGlass.astro`;
- imagem responsiva com art direction;
- seção fotográfica com ilha glass;
- grid de cards com stagger coordenado;
- vídeo responsivo controlado por viewport;
- seção de localização;
- FAQ acessível;
- tokens de cores, tipografia, espaçamento e movimento;
- estrutura de SEO local e JSON-LD;
- checklist de auditoria responsiva;
- fluxo de build, validação e commit seletivo.

## Síntese para o Meu Saber

O padrão mais valioso desta experiência é construir uma LP como um sistema de decisões contextuais:

- cada formato recebe o enquadramento mais adequado;
- cada animação possui uma função e não altera o layout;
- cada mídia reserva seu espaço antes de carregar;
- cada componente continua utilizável por teclado, toque e leitores assistivos;
- cada informação local é consistente para pessoas, buscadores e bots;
- cada mudança é validada e versionada de maneira isolada.

Esse conjunto pode se tornar um template técnico e um checklist de qualidade para futuras landing pages premium.
