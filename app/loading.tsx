import { PipeArt } from "@/components/PipeArt";

export default function Loading() {
  return (
    <div role="status" className="grid min-h-[60vh] place-items-center">
      <PipeArt />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
