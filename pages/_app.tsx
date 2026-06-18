import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import i18next from "i18next";
import type { AvailableLangs } from "@/store/global";

import "@/utils/i18config"; // makes lang available across the app
import { useTranslation } from "react-i18next";

// import posthog from "posthog-js";

import Head from "next/head";
import Image from "next/image";
import DefaultLayout from "@/components/layouts/default";

import ASiteLoader from "@/components/a-siteloader";

import useStore from "@/store/global";

import AButton from "@/components/a-button";
import AModal from "@/components/a-modal";
import Ascii from "@/components/Ascii";

import LogoTape from "@/assets/logo_andatape.svg";

import { isMobile } from "react-device-detect";

import "@/styles/global.css";
import "tailwindcss/tailwind.css";

const App = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathName = usePathname();
  const { initStore, setAccount, setCgu, setLang } = useStore((state) => ({
    initStore: state.initStore,
    setAccount: state.setAccount,
    setCgu: state.setCgu,
    setLang: state.setLang,
  }));
  const [ready, setReady] = useState(true);

  const [langModal, showLangModal] = useState(false);

  useEffect(
    () =>
      initStore({
        theme: !pathName.includes("darkgpt") ? "default" : "red",
      }),
    [],
  );

  useEffect(() => {
    if (localStorage.getItem("discord_account")) {
      const parse = JSON.parse(localStorage.getItem("discord_account"));
      setAccount(parse);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("cgu") === "accept") setCgu(true);
  }, []);

  // useEffect(() => {
  //   const handleRouteChange = () => posthog?.capture("$pageview");
  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (process.env.environment === "production")
  //     posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
  //       api_host:
  //         process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
  //       person_profiles: "always", // or 'always' to create profiles for anonymous users as well
  //       loaded: (posthog) => {
  //         if (process.env.ENVIRONMENT === "staging") posthog.debug(); // debug mode in development
  //       },
  //     });
  // }, []);

  useEffect(() => {
    // if stored access_token is invalid, force logout
    const access_token = localStorage.getItem("access_token");
    if (access_token && !pathName.includes("/logout")) {
      const body = new URLSearchParams();
      body.append("access_token", access_token);
      body.append("token_type", "Bearer");
      const account = fetch("/api/v1/account/me", {
        method: "POST",
        body,
      })
        .then((r) => r.json())
        .then((acc) => {
          if (!acc || acc.code === 0) {
            router.replace("/account/logout");
          }
        })
        .catch((e) => {
          console.error(e);
          router.replace("/account/logout");
        });
    }
  }, []);

  useEffect(() => {
    const perform = (_lang) => {
      i18next.changeLanguage(_lang);
      setLang(_lang);
    };
    if (localStorage.getItem("lang")) {
      const storageLang = localStorage.getItem("lang");
      if (storageLang === "fr" || storageLang === "en") perform(storageLang);
    } else if (!navigator.language.startsWith("fr")) showLangModal(true);
  }, []);

  const title = "Anda Ninja";

  const description = "Creator of incredible interfaces since 2005";

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.jpg" />
        <meta name="keywords" content={process.env.NEXT_PUBLIC_KEYWORDS} />
        <meta name="og:image" content="/img/thumbnail.png" />
        <meta
          property="og:site_name"
          name="og:site_name"
          content={title}
        ></meta>
        <meta
          property="twitter:description"
          name="twitter:description"
          content={description}
        />
        <meta property="twitter:title" name="twitter:title" content={title} />
        <meta
          property="twitter:image"
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/thumbnail.jpg`}
        />
        <meta
          property="twitter:card"
          name="twitter:card"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/thumbnail.jpg`}
        />
        <meta property="description" name="description" content={description} />
        <meta property="og:title" name="og:title" content={title} />
        <meta property="og:locale" name="og:locale" content="fr_FR" />
        <meta
          property="og:description"
          name="og:description"
          content={description}
        />
        <meta
          property="og:image"
          name="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/thumbnail.jpg`}
        />
        <meta
          property="og:url"
          name="og:url"
          content={process.env.NEXT_PUBLIC_SITE_URL}
        />
      </Head>
      <DefaultLayout>
        <Component {...pageProps} />
        <ASiteLoader visible={!ready} />
      </DefaultLayout>
      <AModal
        title="Welcome!"
        isOpen={langModal}
        onClose={() => showLangModal(false)}
        overlay
        footer={
          <>
            <div className="flex flex-col">
              <AButton
                variant="dark"
                onClick={() => {
                  i18next.changeLanguage("fr");
                  setLang("fr");
                  showLangModal(false);
                }}
              >
                No
              </AButton>
            </div>
            <div className="flex flex-col">
              <AButton
                onClick={() => {
                  i18next.changeLanguage("en");
                  setLang("en");
                  showLangModal(false);
                }}
              >
                Yes
              </AButton>
            </div>
          </>
        }
      >
        <Image
          src={LogoTape}
          alt="Anda Pirate"
          width="400"
          className="opacity-60 mx-auto mt-4"
        />
        <p className="text-white">Yo, we da french piRates!</p>
        <p className="text-white">
          You can see this website in English if you want to!
        </p>
        <p className="text-white">This setting can be changed later.</p>
      </AModal>
    </>
  );
};

export default App;
