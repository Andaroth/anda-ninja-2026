import { FC, useState, useEffect } from "react";
import Link from "next/link";

import cn from "classnames";

import data from "@/data/menu.json";

import i18next from "i18next";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import AButton from "./a-button";

import Ascii from "./Ascii";

import useStore from "@/store/global";

import ALoginButton from "./a-loginbutton";

import { useTranslation } from "react-i18next";

const ATopbar: FC = () => {
  const { t } = useTranslation();
  const { account, theme, cgu, lang, setLang } = useStore((state) => ({
    account: state.account,
    theme: state.theme,
    cgu: state.cgu,
    lang: state.lang,
    setLang: state.setLang,
  }));
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [isLive, setIsLive] = useState(false);
  const [showLive, setShowLive] = useState(false);
  const [liveFullScreen, setLiveFullScreen] = useState(false);

  const clearMenu = () => setShowMenu(false);

  const handleScrollTo = (e: any, anchor: string) => {
    e.preventDefault();
    const container = document.querySelector("main");
    const domElement = document.querySelector(anchor);
    if (container) {
      container.scroll({
        top:
          container.scrollTop +
          (domElement?.getBoundingClientRect().top || -container.scrollTop) -
          120,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const themeColor = {
    default: "#0F0",
    red: "#F00",
  }[theme];
  const darkColor = {
    default: "#060",
    red: "#600",
  }[theme];

  useEffect(() => {
    router.events.on("routeChangeStart", clearMenu);
    return () => router.events.off("routeChangeStart", clearMenu);
  }, []);

  useEffect(() => {
    window.removeEventListener("scroll", clearMenu);
    window.addEventListener("scroll", clearMenu, { passive: true });
    return () => window.removeEventListener("scroll", clearMenu);
  }, []);

  useEffect(() => {
    if (process.env.ENVIRONMENT === "production") {
      const _ = fetch(process.env.NEXT_PUBLIC_KICK_API)
        .then((r) => r.json())
        .then(({ livestream }) => {
          setShowLive(!!livestream);
          setIsLive(!!livestream);
        });
    }
  }, []);

  const handleClickLiveToggle = (force?: boolean) => {
    setShowLive(force || !showLive);
    setLiveFullScreen(false);
    if (force) setShowMenu(false);
  };

  const handleChangeLanguage = (e) => {
    e.preventDefault();
    const _lang = lang === "fr" ? "en" : "fr";
    i18next.changeLanguage(_lang);
    setLang(_lang);
    setShowMenu(false);
  };

  const LiveIndicator: FC = () => (
    <>
      <span className="text-[#F00] font-bold">🔴 LIVE</span>
      {!showLive ? (
        <span className="hidden lg:flex text-[#F00] font-bold">
          &nbsp;EN DIRECT
        </span>
      ) : (
        ""
      )}
    </>
  );

  const LivePlayer: FC = () => (
    <div
      className={cn(
        cgu ? "bottom-[60px]" : "bottom-[33vh]",
        "fixed md:top-[80px] right-8 rounded-lg z-50 bg-[#030] border-2 border-[#0F0]",
        liveFullScreen
          ? "w-[80vw]"
          : "w-[300px] h-[180px] md:w-[400px] md:h-[225px]",
      )}
      style={{
        pointerEvents: showLive ? "initial" : "none",
        maxWidth: "calc(100vw - 64px)",
      }}
    >
      <div className="absolute top-2 left-2 flex bg-white rounded-md px-2">
        <LiveIndicator />
      </div>
      <div
        className={cn(
          "hidden md:flex absolute top-2 right-12 md:right-8 rounded-[50%] flex-col justify-center text-center border-2 border-[#0F0] md:border-transparent hover:border-[#F00] w-8 md:w-6 h-8 md:h-6 text-xl text-[#0F0] hover:text-[#F00] cursor-pointer",
        )}
        onClick={() => setLiveFullScreen(!liveFullScreen)}
      >
        <aside className="text-sm">{liveFullScreen ? "—" : "+"}</aside>
      </div>
      <div
        className="absolute top-2 right-2 rounded-[50%] flex flex-col justify-center text-center border-2 border-[#0F0] md:border-transparent hover:border-[#F00] w-8 md:w-6 h-8 md:h-6 text-xl text-[#0F0] hover:text-[#F00] cursor-pointer"
        onClick={() => handleClickLiveToggle(false)}
      >
        <aside>&times;</aside>
      </div>
      <div className="flex h-full">
        <Link
          className="flex-grow"
          href={process.env.NEXT_PUBLIC_KICK_CHANNEL_URL}
          target="_blank"
        >
          <iframe
            className="pointer-events-none rounded-lg w-full h-full"
            allowFullScreen={false}
            src="https://player.kick.com/anda-pirate"
          ></iframe>
        </Link>
        {/* { liveFullScreen ? <iframe src="https://kick.com/anda-pirate/chatroom" frameBorder={0}></iframe> : ''} */}
      </div>
    </div>
  );

  const isUrlSelected = (link: any) =>
    pathname.includes(link.url) ||
    link.aliases.find((l: string) => pathname.includes(l));

  const menu = data.links.filter((l) => params.has("debug") || !l.hidden);

  const [showRibbon, setShowRibbon] = useState(true);
  const AnnounceRibbon: FC = () => {
    const shouldDisplay = () => !pathname.includes("/browserdetect");
    return shouldDisplay() && showRibbon ? (
      <div
        className={cn(
          "flex justify-center fixed top-10 md:top-[56px] left-4 w-[calc(100vw-32px)] z-40 rounded-t-md overflow-hidden",
          theme === "red" ? "bg-[#F00]" : "bg-[#0F0]",
        )}
      >
        <div
          className="fixed top-[44px] md:top-[60px] text-black hover:text-red-500 right-6 cursor-pointer text-xl"
          onClick={() => setShowRibbon(false)}
        >
          &times;
        </div>
        <Link
          className="flex flex-col justify-center text-center w-full !text-black h-8 whitespace-nowrap text-ellipsis overflow-hidden"
          href="https://vidya.chat"
          target="_blank"
        >
          {t("home.discovervidya")}
        </Link>
      </div>
    ) : (
      <></>
    );
  };

  const ContactButton: FC = () => {
    return (
      <div>
        <AButton
          className="!ml-2 !bg-[#0F0]"
          variant="dark"
          href={"mailto:" + process.env.NEXT_PUBLIC_EMAIL}
        >
          <span className="!text-black">{t("topbar.contact")}</span>
        </AButton>
      </div>
    );
  };

  return (
    <div className="topbar flex flex-row w-full py-3 px-4 justify-between">
      {/* DESKTOP MENU */}
      <aside className="flex flex-col justify-center">
        <Link
          href=""
          onClick={(e) => handleScrollTo(e, "#_")}
          className={theme === "red" ? "!text-[red]" : ""}
        >
          <p className="hidden">Anda Ninja</p>
          <aside className="h1">![&Delta;nd&Delta; Ninj&Delta;]</aside>
        </Link>
      </aside>
      <nav className="hidden md:flex">
        <div className="flex flex-col justify-center">
          <ul className="flex flex-row">
            {isLive && !showLive ? (
              <li
                className="ml-2 flex flex-row leading-3 cursor-pointer hover:underline"
                onClick={() => handleClickLiveToggle(true)}
              >
                <LiveIndicator />
              </li>
            ) : (
              ""
            )}
            {menu
              .filter((l) => !l.mobileOnly)
              .map((l) => (
                <li key={l.name[lang]} className="ml-2 flex flex-row leading-3">
                  <span className="hidden sm:block">/</span>
                  <span className="ml-1">
                    <Link
                      className={cn(
                        isUrlSelected(l) ? "selected" : "",
                        theme === "red" ? "!text-[red]" : "",
                      )}
                      href={
                        l.url === "/discord"
                          ? process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK
                          : l.url
                      }
                      onClick={(e) =>
                        l.anchor ? handleScrollTo(e, l.anchor) : null
                      }
                      target={l.target}
                    >
                      {l.name[lang]}
                    </Link>
                  </span>
                </li>
              ))}
          </ul>
        </div>
        <ContactButton />
      </nav>
      <aside className="mobilenav md:hidden">
        {/* MOBILE MENU */}
        <button className="flex" onClick={() => setShowMenu(!showMenu)}>
          <div className="mr-2">Menu</div>
          <div>{showMenu ? "x" : "="}</div>
        </button>
      </aside>
      {showMenu && (
        <>
          <div
            className="menuElement overlay md:hidden fixed left-0 top-0 w-[100vw] h-[100vh] bg-black/80 z-40"
            onClick={() => setShowMenu(false)}
          ></div>
          <div
            className={cn(
              `menuElement fixed rounded-md md:hidden flex top-[56px] right-[24px] w-[calc(100vw - 32px)] pb-2 bg-black border-2 border-[${themeColor}] z-50`,
            )}
          >
            <ul className="flex flex-col w-full">
              {menu
                .filter((l) => !l.noMobile)
                .map((l) => (
                  <Link
                    className={cn(
                      "flex flex-col justify-center py-2 border-b-[1px] w-full",
                      `border-[${darkColor}]`,
                    )}
                    href={
                      l.url === "/discord"
                        ? process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK
                        : l.url
                    }
                    onClick={(e) =>
                      l.anchor ? handleScrollTo(e, l.anchor) : null
                    }
                    key={l.name[lang]}
                    target={l.target}
                  >
                    <li>
                      <div className="flex flex-row mt-0 px-4 justify-end">
                        <span className="text-white">/</span>
                        <div className="flex flex-col justify-center"></div>
                        <div className="flex flex-col justify-center">
                          <div
                            className={cn(
                              theme === "red" ? "!text-[#999]" : "!text-white",
                              isUrlSelected(l) ? "underline" : "",
                            )}
                          >
                            {l.name[lang]}
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
              <li>
                <a
                  className={cn(
                    "flex flex-col justify-center py-2 border-b-[1px] w-full",
                    `border-[${darkColor}]`,
                  )}
                  onClick={(e) => handleChangeLanguage(e)}
                >
                  <div className="flex flex-row mt-0 px-4 justify-end">
                    <span className="text-white">/</span>
                    <div className="flex flex-col justify-center"></div>
                    <div className="flex flex-col justify-center">
                      <div
                        className={cn(
                          theme === "red" ? "!text-[#999]" : "!text-white",
                        )}
                      >
                        {lang === "fr" ? "English site" : "Site en Français"}
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              {isLive ? (
                <div
                  className="flex mt-4 mx-auto cursor-pointer"
                  onClick={() => handleClickLiveToggle(true)}
                >
                  <LiveIndicator />
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-row justify-center mr-6 py-2">
                <Link href="/" className="hover:no-underline -my-8">
                  <Ascii
                    fileName="computer01"
                    color={theme === "red" ? "#B70" : "#0BF"}
                    className="text-[0.5em] mb-2"
                  />
                </Link>
              </div>
            </ul>
          </div>
        </>
      )}
      {isLive && showLive ? <LivePlayer /> : ""}
      {/*<AnnounceRibbon />*/}
    </div>
  );
};

export default ATopbar;
