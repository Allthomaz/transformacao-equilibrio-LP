# Pendências — Publicação, domínio e mensuração

**Projeto:** Landing page Andréa Rosa Souza
**Atualizado em:** 26/08/2026
**Status:** aguardando respostas e acessos do gestor de tráfego

## Informações já recebidas

- Google Tag / Conversion ID: `AW-374411592`
- Google Tag Manager: `GTM-KTXQSJD2`
- Domínio previsto: `transformacaoeequilibrio.com.br`
- Site atual: Wix
- Hospedagem planejada para a nova landing page: Vercel
- O site já envia ao `dataLayer` os eventos:
  - `click_whatsapp`
  - `click_doctoralia`
  - `scroll_depth` em 25%, 50%, 75% e 90%

## Aguardando o gestor de tráfego

### 1. Conversão do WhatsApp no Google Ads

- [ ] Confirmar se já existe uma ação de conversão específica para clique no WhatsApp.
- [ ] Se existir, solicitar o **Conversion Label** dessa ação.
- [ ] Se não existir, o gestor deverá criar uma conversão de site chamada, por exemplo, `Clique no WhatsApp — LP Andréa`.
- [ ] Configurar a ação como lead/contato e, em regra, contar `Uma` conversão por interação.
- [ ] Selecionar instalação via Google Tag Manager.
- [ ] Vincular a conversão ao evento `click_whatsapp` no contêiner `GTM-KTXQSJD2`.
- [ ] Avaliar se também será criada uma conversão separada para `click_doctoralia`.

Formato esperado após a criação:

```text
Conversion ID: AW-374411592
Conversion Label: código específico da ação
Destino completo: AW-374411592/CONVERSION_LABEL
```

### 2. Pixel da Meta

- [ ] Confirmar se será utilizado Meta Ads.
- [ ] Se sim, solicitar o ID numérico do Pixel e definir quais eventos serão enviados.

### 3. Acesso ao domínio no Wix

- [ ] Confirmar se o gestor consegue acessar no Wix: `Domínios → Ações do domínio → Gerenciar registros DNS`.
- [ ] Solicitar um print dessa tela, sem alterar os registros neste momento.
- [ ] Confirmar se existe e-mail profissional usando `@transformacaoeequilibrio.com.br`.
- [ ] Se a opção de DNS não aparecer, descobrir em qual registrador/provedor o domínio é realmente administrado.

## Etapas sob responsabilidade do projeto

### GitHub e Vercel

- [ ] Revisar e consolidar as alterações locais antes do primeiro push.
- [ ] Criar o repositório GitHub sugerido: `transformacao-equilibrio-site`.
- [ ] Conectar o Git local ao repositório remoto.
- [ ] Importar o repositório na Vercel.
- [ ] Configurar `lp` como **Root Directory**.
- [ ] Validar o endereço temporário `*.vercel.app` antes de mexer no domínio.
- [ ] Testar WhatsApp, Doctoralia, vídeos, responsividade, GTM e Google Ads Tag.

### Migração do domínio

- [ ] Adicionar na Vercel:
  - `transformacaoeequilibrio.com.br`
  - `www.transformacaoeequilibrio.com.br`
- [ ] Definir qual versão será a principal e redirecionar a outra.
- [ ] Copiar da Vercel os valores exatos do registro `A` e do `CNAME`.
- [ ] No Wix, substituir somente os registros do site indicados pela Vercel.
- [ ] Preservar `MX`, `TXT`, SPF, DKIM, DMARC e demais registros de e-mail.
- [ ] Validar propagação, HTTPS e funcionamento das duas versões do domínio.
- [ ] Criar redirecionamento para URLs antigas relevantes, incluindo `/schedule`.
- [ ] Desativar o site/plano Wix somente depois que o novo site estiver estável no domínio oficial.

## Mensagens prontas

### Para confirmar a conversão

> Você já criou no Google Ads uma ação de conversão específica para clique no WhatsApp dessa landing page? Se já criou, preciso do Conversion Label. O `AW-374411592` é o Conversion ID geral e já está instalado. Se ainda não criou, precisamos criar a ação `Clique no WhatsApp — LP Andréa` e configurá-la pelo Google Tag Manager.

### Para confirmar o acesso ao domínio

> O domínio `transformacaoeequilibrio.com.br` parece estar administrado pelo Wix. Você consegue acessar `Domínios → Ações do domínio → Gerenciar registros DNS`? Não altere nada ainda; apenas confirme e envie um print. Quando a nova página estiver validada na Vercel, enviaremos os valores exatos do registro A e do CNAME. Não serão alterados os registros de e-mail.
