import { useState } from "react";

export default function Img({ src, alt, className = "", imgClassName = "" }) {
  const [state, setState] = useState("loading");

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-white ${className}`}>
      {state === "loading" && <div className="absolute inset-3 animate-pulse rounded-lg bg-gray-100" />}
      {state === "error" ? (
        <span className="text-xs text-gray-400">Image unavailable</span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          className={`h-full w-full object-contain transition-opacity duration-300 ${
            state === "ready" ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
