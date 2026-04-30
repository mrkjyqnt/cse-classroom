export function Progress({ value, color = "#1a1a18", height = 5 }: { value: number; color?: string; height?: number }) {
  return (
    <div style={{ height, width:"100%", background:"#e8e2d9", borderRadius:999, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${Math.min(100,Math.max(0,value))}%`, background:color, borderRadius:999, transition:"width 0.4s ease" }} />
    </div>
  );
}
