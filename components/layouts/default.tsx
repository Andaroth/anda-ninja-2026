import { FC, useRef, useEffect, useState } from "react";
import Image from "next/image";

import AGlobe from "../a-globe";
import LogoSvg from "@/assets/logo_andapirate.svg";

import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

import useStore from "@/store/global";

import ACookieBanner from "../a-cookie-banner";

import cn from "classnames";

import ATopbar from "@/components/a-topbar";
import AFooter from "@/components/a-footer";
import ACursor from "@/components/a-cursor";
import AMatrix from "@/components/a-matrix";
import Ascii from "../Ascii";

import { themeNameType } from "@/store/global";

interface Props {
  children: any;
}

const DefaultLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { theme, setTheme, globe } = useStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
    globe: state.globe,
  }));
  const mainRef = useRef<HTMLDivElement>();
  const pathname = usePathname();
  const [screenW, setScreenW] = useState(0);

  const handleResize = () => setScreenW(window.innerWidth);

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.hash.length) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          const rect = target.getBoundingClientRect();
          mainRef.current.scrollTo(rect.left, rect.top);
        }
      } else {
        mainRef.current.scrollTo(0, 0);
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const emitScroll = () =>
    window.dispatchEvent(new Event("scroll", { bubbles: true }));

  useEffect(() => {
    mainRef?.current.addEventListener("scroll", emitScroll, { passive: true });
    return () => mainRef?.current?.removeEventListener("scroll", emitScroll);
  }, [mainRef]);

  const shouldDisplayEffects = () => !pathname.includes("mobile-view-source");
  const shouldEnableGlobe = () => pathname.includes("map");

  useEffect(() => setTheme("default"), [pathname]);

  return (
    <div
      className={cn(
        "flex flex-col h-[100dvh]",
        pathname !== "/" ? `page${pathname.replaceAll("/", "-")}` : "page-home",
      )}
    >
      <ATopbar />
      <main
        ref={mainRef}
        id={pathname.substring(1)}
        className={cn(
          "flex-grow mx-4 p-4 border-2",
          "overflow-x-hidden overflow-y-auto",
          "bg-transparent",
          theme === "default"
            ? "border-[#0F0]"
            : theme === "red"
              ? "border-[#F00] bg-[#000]"
              : "",
          pathname.includes("mobile-view-source") ? "!overflow-x-auto" : "",
        )}
      >
        <AGlobe
          classNames={shouldEnableGlobe() ? "" : "pointer-events-none"}
          lat={globe.lat}
          lng={globe.lng}
          zoom={globe.zoom}
        />
        {/*<div className="scribe flex flex-row justify-center select-none pointer-events-none fixed bottom-10 md:bottom-16 opacity-30">
          <Image
            src={LogoSvg}
            alt="Anda Ninja"
            width={screenW * 0.8}
            className="opacity-40"
            loading="eager"
          />
        </div>*/}
        {children}
        <Matrix
          chars={["0","1","3","4","5","6","7","8","9","A","B","C","D","E","F"]}
          theme={"default"}
        />
      </main>
      <AFooter />
      <ACursor />
      <ACookieBanner />
    </div>
  );
};

const Matrix = ({
  chars,
  theme,
}: {
  chars: Array<string>;
  theme: themeNameType;
}) => (
  <>
    <AMatrix
      top="68px"
      left="24px"
      maxlen="12"
      direction="vertical"
      color={theme == "default" ? "#00FF0088" : "rgba(200,0,0,80)"}
      className="max-h-[calc(100vh-104px)] overflow-hidden"
    />
    <AMatrix
      top="68px"
      left="36px"
      maxlen="8"
      direction="vertical"
      color={theme == "default" ? "#00FF0088" : "rgba(200,0,0,80)"}
      className="max-h-[calc(100vh-104px)] overflow-hidden hidden md:flex"
    />
    <AMatrix
      top="68px"
      left="48px"
      maxlen="4"
      direction="vertical"
      color={theme == "default" ? "#00FF0088" : "rgba(200,0,0,80)"}
      delay="200"
      className="max-h-[calc(100vh-104px)] overflow-hidden hidden sm:flex"
    />

    <AMatrix
      top="68px"
      right="54px"
      maxlen="6"
      delay="500"
      direction="vertical"
      color={theme == "default" ? "#00FF0088" : "rgba(200,0,0,80)"}
      className="max-h-[calc(100vh-104px)] overflow-hidden hidden sm:flex"
    />
    <AMatrix
      top="68px"
      right="42px"
      maxlen="9"
      delay="300"
      direction="vertical"
      color={theme == "default" ? "#00FF0088" : "rgba(200,0,0,80)"}
      className="max-h-[calc(100vh-104px)] overflow-hidden hidden sm:flex"
    />
    <AMatrix
      top="68px"
      right="30px"
      maxlen="15"
      delay="200"
      direction="vertical"
      color={theme == "default" ? "#00FF0088" : "rgba(200,0,0,80)"}
      className="max-h-[calc(100vh-104px)] overflow-hidden"
    />

    <AMatrix
      bottom="84px"
      left="24px"
      chars={["|"]}
      prefix="LUA: ["
      suffix="]"
      delay="300"
      maxlen="13"
      direction="horizontal"
      color={theme == "default" ? "#00FF0088" : "#FF000088"}
    />
    <AMatrix
      bottom="104px"
      left="24px"
      chars={["|"]}
      prefix="Rust: ["
      suffix="]"
      delay="300"
      maxlen="12"
      direction="horizontal"
      color={theme == "default" ? "#00FF0088" : "#FF000088"}
    />
    <AMatrix
      bottom="64px"
      left="24px"
      chars={["|"]}
      prefix="C/Cpp/C#: ["
      suffix="]"
      delay="300"
      maxlen="8"
      direction="horizontal"
      color={theme == "default" ? "#00FF0088" : "#FF000088"}
    />
    <AMatrix
      bottom="44px"
      left="24px"
      chars={["|"]}
      prefix="JS/TS: ["
      suffix="]"
      delay="300"
      maxlen="11"
      direction="horizontal"
      color={theme == "default" ? "#00FF0088" : "#FF000088"}
    />
  </>
);

export default DefaultLayout;
