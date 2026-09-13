import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Next.js 16 compiles `proxy.ts` as Node middleware. The file lands at
 * `.next/server/middleware.js`, but standalone output only keeps the `.nft.json`.
 * OpenNext's `copyTracedFiles` then asserts `standalone/.next/server/middleware.js`
 * exists (same gap they already paper over for `instrumentation.js`).
 *
 * Copy the compiled middleware and any missing nft-traced files into standalone
 * so `opennextjs-cloudflare build` can bundle it.
 */
const root = process.cwd();
const dotNext = path.join(root, '.next');
const standaloneServer = path.join(dotNext, 'standalone', '.next', 'server');
const middlewareSrc = path.join(dotNext, 'server', 'middleware.js');
const nftSrc = path.join(dotNext, 'server', 'middleware.js.nft.json');

if (!existsSync(middlewareSrc)) {
  process.exit(0);
}

mkdirSync(standaloneServer, { recursive: true });
copyFileSync(middlewareSrc, path.join(standaloneServer, 'middleware.js'));

if (!existsSync(nftSrc)) {
  process.exit(0);
}

const { files = [] } = JSON.parse(readFileSync(nftSrc, 'utf8'));

for (const rel of files) {
  const src = path.resolve(path.join(dotNext, 'server'), rel);
  const dest = path.resolve(path.join(standaloneServer), rel);
  if (!src.startsWith(dotNext) || !existsSync(src) || existsSync(dest)) {
    continue;
  }
  mkdirSync(path.dirname(dest), { recursive: true });
  copyFileSync(src, dest);
}
