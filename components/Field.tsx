type Props = {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  wide?: boolean;
  options?: readonly (readonly [string, string])[];
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

const box =
  "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3.5 text-[15px] transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 user-invalid:border-brand user-invalid:ring-4 user-invalid:ring-brand/10";

/** Labelled input (or select) with native validation styling via :user-invalid. */
export function Field({ name, label, hint, error, wide, options, required = true, ...rest }: Props) {
  return (
    <div className={`group/f ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={name} className="mb-1.5 flex justify-between text-sm font-semibold">
        {label}
        {!required && <span className="font-normal text-zinc-400">Optional</span>}
      </label>
      {options ? (
        <div className="relative">
          <select id={name} name={name} required={required} defaultValue="" className={`${box} appearance-none pr-10`}>
            <option value="" disabled>Select…</option>
            {options.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
          </select>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3 top-1/2 size-[18px] -translate-y-1/2 text-brand" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden><path d="m6 9 6 6 6-6" /></svg>
        </div>
      ) : (
        <input id={name} name={name} required={required} className={box} {...rest} />
      )}
      {hint && <p className="mt-1 text-xs text-zinc-500 group-has-[:user-invalid]/f:hidden">{hint}</p>}
      <p className="mt-1 hidden text-xs font-medium text-brand group-has-[:user-invalid]/f:block">{error ?? `Please enter a valid ${label.toLowerCase()}.`}</p>
    </div>
  );
}
