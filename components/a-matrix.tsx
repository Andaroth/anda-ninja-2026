import { FC, useState, useEffect } from "react";
import cn from "classnames";

interface AMatrixProps {
  maxlen?: number | string;
  delay?: number | string;
  prefix?: string;
  suffix?: string;
  chars?: Array<string>;
  direction?: "horizontal" | "vertical";
  color?: string;
  position?: "static" | "relative" | "absolute" | "sticky" | "fixed";
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  className?: string;
}

const AMatrix: FC<AMatrixProps> = ({
  maxlen = 10,
  delay = 300,
  prefix = "",
  suffix = "",
  chars = ["0", "1"],
  direction = "vertical",
  color = "#0F0",
  position = "fixed",
  left,
  right,
  top,
  bottom,
  className,
}: AMatrixProps) => {
  const [matrix, setMatrix] = useState<string>(prefix);
  const [displayIndex, setDisplayIndex] = useState<number>(0);

  const generateString = () => {
    let res = prefix;
    for (let i = prefix.length; i < Number(maxlen) + prefix.length; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
    }
    res += suffix;
    return res;
  };

  const addChar = () => {
    if (displayIndex >= Number(maxlen) + prefix.length) {
      setDisplayIndex(prefix.length);
      setMatrix(generateString());
    } else setDisplayIndex(displayIndex + 1);
  };

  useEffect(() => {
    setTimeout(addChar, Number(delay));
  }, [displayIndex]);

  const isCharHidden = (index: number) =>
    index >= displayIndex && index !== matrix.length - suffix.length;

  return (
    <aside
      className={cn(
        "customMatrix fixed flex pointer-events-none",
        direction === "vertical" ? "flex-col" : "flex-row",
        `!position-${position}`,
        top ? `!top-[${top}]` : "",
        bottom ? `!bottom-[${bottom}]` : "",
        left ? `!left-[${left}]` : "",
        right ? `!right-[${right}]` : "",
        className,
      )}
      style={{
        position: position,
        color: color,
        top: top,
        left: left,
        right: right,
        bottom: bottom,
      }}
    >
      {matrix.split("").map((char, index) => (
        <div
          key={index}
          className={cn(isCharHidden(index) ? "opacity-0" : "opacity-0.5")}
        >
          {char}
        </div>
      ))}
    </aside>
  );
};

export default AMatrix;
