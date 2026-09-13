import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute } from '@/lib/shared';

// Next 16 prefers `proxy.ts` (Node), but OpenNext on Cloudflare only
// bundles Edge middleware from `middleware.ts`. Keep this filename until
// OpenNext reliably runs proxy.ts — otherwise `/*.md` rewrites 404.

const { rewrite: rewriteDocs } = rewritePath(
  '{/*path}',
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  '{/*path}.md',
  `${docsContentRoute}{/*path}/content.md`,
);

function isInternalPath(pathname: string) {
  return (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/og/') ||
    pathname.startsWith('/llms') ||
    pathname === '/icon.svg'
  );
}

export function middleware(request: NextRequest) {
  if (isInternalPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const docsRewrite = rewriteDocs(request.nextUrl.pathname);

    if (docsRewrite) {
      return NextResponse.rewrite(new URL(docsRewrite, request.nextUrl));
    }
  }

  return NextResponse.next();
}
