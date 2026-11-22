

const icons: Record<string, string> = {
  truck: "M3 6h11v9H3zM14 9h4l3 3v3h-7zM7 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm12 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
  lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  tag: "M3 12V4h8l9 9-8 8zM7.5 7.5h.01",
  check: "M12 3l2.5 2 3.2-.3.8 3.1 2.6 1.9-1.4 2.9 1.4 2.9-2.6 1.9-.8 3.1-3.2-.3L12 21l-2.5-2-3.2.3-.8-3.1L2.9 14.3l1.4-2.9-1.4-2.9 2.6-1.9.8-3.1 3.2.3zM8.5 12l2.5 2.5 4.5-5",
  chat: "M4 5h16v11H9l-5 4z",
};

export function Icon({ name, className = "size-6" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={icons[name]} />
    </svg>
  );
}
