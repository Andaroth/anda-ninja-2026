import { FC, useEffect, useState, useRef } from "react";
import cn from "classnames";

import { themeNameType } from "@/store/global";

import { isMobile } from "react-device-detect";
import { usePathname } from "next/navigation";

import useStore from "@/store/global";

const ACursor: FC = () => {
  const pathname = usePathname();
  const theme = useStore((state) => state.theme);
  const cursorContainer = useRef<HTMLDivElement>();
  const [hover, setHover] = useState(false);
  const [moved, setMoved] = useState(false);
  const [visible, setVisible] = useState(false);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const themeColors = (pick?: themeNameType) =>
    ({
      default: "#0F0",
      red: "#F00",
    })[pick || theme];
  const textColors = (pick?: themeNameType) =>
    ({
      default: "#00FF0088",
      red: "#FF000033",
    })[pick || theme];

  const [crossColor, setCrossColor] = useState(themeColors());

  useEffect(() => {
    const setXY = ({ target, pageX, pageY }) => {
      setMoved(true);
      if (
        target?.tagName === "A" ||
        target?.tagName === "INPUT" ||
        target?.parentNode?.tagName === "A" ||
        target?.parentNode?.parentNode?.tagName === "A" ||
        target?.classList?.contains("cursor-pointer") ||
        target?.parentNode?.classList?.contains("cursor-pointer") ||
        target?.parentNode?.parentNode?.classList?.contains("cursor-pointer")
      ) {
        setHover(true);
        setCrossColor("#F0F");
      } else {
        setHover(false);
        setCrossColor(null);
      }
      setTimeout(() => {
        setX(pageX);
        setY(pageY);
        localStorage.setItem("mouseX", pageX);
        localStorage.setItem("mouseY", pageY);
      });
    };

    if (!isMobile)
      window.addEventListener("mousemove", setXY, { passive: true });
    return () => window.removeEventListener("mousemove", setXY);
  }, []);

  useEffect(() => {
    setVisible(!isMobile);
  }, []);

  return visible ? (
    <div
      ref={cursorContainer}
      className="customCursor fixed pointer-events-none z-50"
      style={{ left: x + "px", top: y + "px" }}
    >
      <div
        className={cn(
          "hBar w-[20px] pointer-events-none relative",
          moved ? "opacity-1" : "opacity-0",
          hover ? "h-[3px] -left-[9px]" : `h-[1px] -left-[10px]`,
        )}
        style={{
          backgroundColor: crossColor || themeColors(),
          transition: "all .2 ease-out",
          zIndex: 150,
        }}
      />
      <div
        className={cn(
          "vBar h-[20px] pointer-events-none relative",
          moved ? "opacity-1" : "opacity-0",
          hover ? "w-[3px] -top-[11px]" : `w-[1px] -top-[10px]`,
        )}
        style={{
          backgroundColor: crossColor || themeColors(),
          transition: "all .2 ease-out",
          zIndex: 150,
        }}
      />
      <div
        className={cn(
          "relative pointer-events-none",
          `text-[11px] left-[4px] -top-[20px]`,
          moved ? "opacity-1" : "opacity-0",
        )}
        style={{ color: crossColor || textColors() }}
      >
        x/{x}
        <br />
        y/{y}
      </div>
      <style>{` * { cursor: none !important; } div.customCursor { z-index: 256; }`}</style>
    </div>
  ) : (
    ""
  );
};

export default ACursor;
