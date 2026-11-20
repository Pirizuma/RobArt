// A template (unlike the layout) re-mounts on every navigation, so each new
// page gets the fade-in rather than only the first one loaded.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in motion-reduce:animate-none">{children}</div>;
}
