import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const sourceRoot = fileURLToPath(new URL('../src/', import.meta.url));

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : [path];
  }));
  return files.flat().filter((path) => /\.(astro|css|ts)$/.test(path));
}

async function sourceText() {
  const paths = await sourceFiles(sourceRoot);
  return (await Promise.all(paths.map((path) => readFile(path, 'utf8')))).join('\n');
}

test('não publica bipolaridade ou borderline entre os atendimentos', async () => {
  const source = await sourceText();
  assert.doesNotMatch(source, /bipolaridade|borderline/i);
});

test('informa somente PIX e transferência como formas de pagamento', async () => {
  const faq = await readFile(new URL('../src/components/Faq.astro', import.meta.url), 'utf8');
  assert.match(faq, /pagamento pode ser feito via PIX ou transferência/i);
  assert.doesNotMatch(faq, /cartão|crédito|débito|boleto/i);
});

test('usa a nova paleta verde sem os antigos tons terracota', async () => {
  const source = await sourceText();
  assert.match(source, /--verde-principal:\s*#5F7865/i);
  assert.match(source, /--verde-acao:\s*#446B50/i);
  assert.match(source, /--verde-escuro:\s*#355B43/i);
  assert.doesNotMatch(source, /#B25F3F|#AA5638|#96492E|178\s*,\s*95\s*,\s*63|150\s*,\s*73\s*,\s*46/i);
});
