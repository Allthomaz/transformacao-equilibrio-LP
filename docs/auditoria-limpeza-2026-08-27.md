# Auditoria de limpeza — 27/08/2026

**Escopo:** `lp/` (Astro) e `video/` (Remotion/React)
**Modo:** diagnóstico apenas; nenhuma remoção ou alteração de comportamento realizada
**Status geral:** auditoria estática concluída; cobertura de testes indisponível

## Baseline

- `lp`: `npm run build` concluído sem erros.
- `video`: `npm run lint` (`eslint src && tsc`) concluído sem erros.
- Não há Vitest ou Jest configurado em nenhum dos dois projetos.

## Código morto — LP

O Knip apontou:

- `src/scripts/animar.ts`
- `src/scripts/analytics.ts`
- dependência `motion`

Os três achados são **falsos positivos** do grafo estático:

- `Layout.astro` carrega `animar.ts` e `analytics.ts` por tags `<script src>`.
- `animar.ts` importa e utiliza `motion`.

**Decisão:** manter os dois scripts e a dependência `motion`.

Todos os 14 componentes Astro em `src/components/` são importados pela página principal.

## Duplicação — LP

- 61 arquivos analisados.
- Nenhum clone encontrado.
- 0 linhas duplicadas pelos limiares da auditoria.

## Código morto — Remotion

O Knip apontou:

- `remotion.config.ts`
- dependência `@remotion/tailwind-v4`
- devDependencies `@types/web` e `prettier`

Interpretação:

- `remotion.config.ts` é carregado por convenção pela CLI do Remotion: **manter**.
- `@remotion/tailwind-v4` é importado pelo arquivo de configuração: **manter**.
- `tailwindcss` é importado em `src/index.css`: **manter**.
- `@types/web` pode ser carregado globalmente pelo TypeScript mesmo sem import explícito: revisar em um lote de limpeza com remoção experimental + `npm run lint`.
- `prettier` não possui script nem configuração no projeto: candidato de maior confiança para remoção futura, ainda sujeito a confirmação do fluxo do desenvolvedor.

As duas composições Remotion e seus arquivos de tema estão conectados ao `Root.tsx`.

## Duplicação — Remotion

Foram encontrados dois clones somente em JSON:

1. metadados do `package.json` repetidos no `package-lock.json`;
2. blocos internos de dependências repetidos no próprio lockfile.

Não houve clones em TSX ou TypeScript. Esses achados são normais em lockfiles e não justificam refatoração.

## Arquivos locais antes do primeiro push

### Recomendar ignorar no `.gitignore` raiz

- `.firecrawl/` — resultados temporários de pesquisa web.
- `.playwright-mcp/` — logs e snapshots temporários do navegador.
- `**/cleanup-report/` — relatórios reproduzíveis desta auditoria.

### Recomendar remover em um lote de limpeza posterior

- `package-lock.json` na raiz — lockfile vazio sem `package.json` correspondente.
- `assets/imagens/logo-icone.png` não rastreado — cópia byte a byte idêntica a `lp/src/assets/imagens/logo-icone.png` e sem referência atual.
- `lp/preview-hero-fix-desktop.png` e `lp/preview-hero-fix-mobile.png` — revisar se ainda têm valor após a aprovação da nova versão.

### Decisão editorial antes do commit

- `hero-mobile-variacoes/` contém protótipos e previews de aprovação; pode ser mantido como documentação de design ou excluído do repositório de produção.
- `lp/preview-hero-mobile-opcao-3-aprovada.png` é a referência visual da versão mobile aprovada; manter apenas se previews fizerem parte da documentação do projeto.
- Os previews antigos já rastreados em `lp/` não são código morto, mas aumentam o tamanho e o ruído do repositório. Uma reorganização para `docs/previews/` deve ser tratada como lote separado.

## Próximo lote seguro proposto

1. Criar `.gitignore` raiz apenas com artefatos de ferramentas.
2. Remover o lockfile vazio da raiz e a cópia não usada do logo.
3. Decidir se protótipos e previews serão documentação ou descartáveis.
4. Se autorizado, testar a remoção de `prettier` e possivelmente `@types/web` do projeto Remotion.
5. Repetir `npm run build` em `lp/` e `npm run lint` em `video/`.
6. Somente então consolidar o primeiro commit para o repositório remoto.
