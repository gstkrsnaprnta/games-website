const symbols = [
  { text: "π", size: "text-4xl", top: "8%", left: "5%" },
  { text: "Σ", size: "text-5xl", top: "15%", right: "8%" },
  { text: "√x", size: "text-3xl", top: "45%", left: "3%" },
  { text: "∫", size: "text-6xl", bottom: "20%", right: "5%" },
  { text: "∞", size: "text-4xl", bottom: "12%", left: "12%" },
  { text: "a²+b²=c²", size: "text-xl", top: "35%", right: "12%" },
  { text: "Δ", size: "text-5xl", top: "60%", left: "8%" },
  { text: "θ", size: "text-3xl", bottom: "35%", right: "15%" },
  { text: "f(x)", size: "text-2xl", top: "72%", right: "3%" },
  { text: "λ", size: "text-4xl", top: "25%", left: "15%" },
];

type MathBackgroundProps = {
  variant?: "light" | "dark";
  density?: "sparse" | "normal" | "dense";
};

export function MathBackground({ variant = "dark", density = "normal" }: MathBackgroundProps) {
  const count = density === "sparse" ? 5 : density === "dense" ? 10 : 7;
  const colorClass = variant === "light" ? "math-symbol-light" : "";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {symbols.slice(0, count).map((symbol, index) => (
        <span
          key={index}
          className={`math-symbol ${colorClass} ${symbol.size} ${index % 2 === 0 ? "animate-float" : "animate-float-reverse"}`}
          style={{
            top: symbol.top,
            left: symbol.left,
            right: symbol.right,
            bottom: symbol.bottom,
            animationDelay: `${index * 0.8}s`,
          }}
        >
          {symbol.text}
        </span>
      ))}
    </div>
  );
}
