import { useState } from "react";

export default function Img({ src, alt, className = "", imgClassName = "" }) {
  const [state, setState] = useState("loading");

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-white ${className}`}>
      {state === "loading" && <div className="absolute inset-3 skeleton rounded-lg" />}
      {state === "error" ? (
        <span className="text-xs text-gray-400">Image unavailable</span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          className={`h-full w-full object-contain transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
            state === "ready" ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
