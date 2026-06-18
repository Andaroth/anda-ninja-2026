import { useState, useEffect } from "react";

import cn from "classnames"

import arts from "@/data/ascii.json"

interface AsciiProps {
  fileName: string
  color?: string
  className?: string
  h1?: string
  size?: "small" | "normal"
}

const Ascii = ({ fileName, color, className, h1, size }: AsciiProps = { fileName: "bienvenue", size: "normal" }) => {
  const ascii = arts[fileName]

  return <>
    {h1 && <h1 className="hidden">{h1}</h1>}
    <aside className="ascii-container flex justify-center my-8 select-none">
      <pre className={cn(
        "asciiart text-[0.3em] sm:text-[0.6em] md:text-[0.7em] lg:text-[1em]",
        className,
        !color ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#0E0] to-[#0A0]' : '',
        size === "small" && "!text-[0.3em]"
      )}
        style={{ color: color }}
      >{ascii}</pre>
    </aside>
  </>
}

export default Ascii