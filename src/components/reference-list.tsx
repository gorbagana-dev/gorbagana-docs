'use client';

import { Check, Copy, ExternalLink } from 'lucide-react';
import type { MouseEventHandler } from 'react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { cn } from '@/lib/cn';

type ReferenceItem = {
  label: string;
  value: string;
  description?: string;
  href?: string;
  copy?: boolean;
  valueType?: ReferenceValueType;
};

type ReferenceValueType = 'code' | 'text';

type ReferenceListProps = {
  items: ReferenceItem[];
  columns?: 'one' | 'two';
  valueType?: ReferenceValueType;
};

export function ReferenceList({
  items,
  columns = 'one',
  valueType = 'code',
}: ReferenceListProps) {
  return (
    <div
      className={cn(
        'not-prose my-5 grid gap-2',
        columns === 'two' ? 'md:grid-cols-2' : undefined,
      )}
    >
      {items.map((item) => (
        <ReferenceListItem
          key={`${item.label}-${item.value}`}
          item={item}
          valueType={item.valueType ?? valueType}
        />
      ))}
    </div>
  );
}

function ReferenceListItem({
  item,
  valueType,
}: {
  item: ReferenceItem;
  valueType: ReferenceValueType;
}) {
  const allowCopy = item.copy !== false;
  const [copied, onCopy] = useCopyButton(() =>
    navigator.clipboard.writeText(item.value),
  );

  return (
    <div className="min-w-0 rounded-lg border border-fd-border bg-fd-card/50 p-3">
      <div className="flex min-w-0 items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
            {item.label}
          </div>
          <ReferenceValue item={item} valueType={valueType} />
          {item.description ? (
            <div className="mt-1 text-xs leading-relaxed text-fd-muted-foreground">
              {item.description}
            </div>
          ) : null}
        </div>
        {allowCopy ? (
          <CopyReferenceButton copied={copied} onCopy={onCopy} />
        ) : null}
      </div>
    </div>
  );
}

function ReferenceValue({
  item,
  valueType,
}: {
  item: ReferenceItem;
  valueType: ReferenceValueType;
}) {
  const className = cn(
    'mt-1 min-w-0 max-w-full text-sm leading-relaxed text-fd-foreground',
    valueType === 'code' ? 'font-mono' : undefined,
  );

  if (item.href) {
    return (
      <a
        className={cn(
          className,
          'inline-flex items-center gap-1 break-all underline-offset-4 hover:underline',
        )}
        href={item.href}
        rel="noreferrer"
        target="_blank"
      >
        <span className="min-w-0 break-all">{item.value}</span>
        <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
      </a>
    );
  }

  if (valueType === 'text') {
    return <p className={className}>{item.value}</p>;
  }

  return (
    <code
      className={cn(
        className,
        'block whitespace-normal break-all rounded-none bg-transparent p-0',
      )}
    >
      {item.value}
    </code>
  );
}

function CopyReferenceButton({
  copied,
  onCopy,
}: {
  copied: boolean;
  onCopy: MouseEventHandler;
}) {
  return (
    <button
      aria-label={copied ? 'Copied' : 'Copy value'}
      className={cn(
        buttonVariants({ color: 'ghost', size: 'icon-sm' }),
        'shrink-0 text-fd-muted-foreground',
      )}
      onClick={onCopy}
      type="button"
    >
      {copied ? (
        <Check className="size-3.5" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" aria-hidden="true" />
      )}
    </button>
  );
}
