

export function Rich({ html, className = "" }: { html: string; className?: string }) {
  // Content comes from our own extracted data (allowlist-sanitized at extraction time).
  return <div className={`rich ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
