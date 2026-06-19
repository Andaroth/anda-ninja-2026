import Link from "next/link";
import Image from "next/image";

import { motion } from "motion/react";

import { useTranslation } from "react-i18next";

import Ascii from "@/components/Ascii";
import AButton from "@/components/a-button";
import ASocials from "@/components/a-socials";

// import useStore from "@/store/global";

const Home = () => {
  const { t } = useTranslation();
  // const { lang } = useStore((state) => ({ lang: state.lang }));

  const creations = [
    {
      name: "Vidyā AI",
      description: "Homemade AI assistant",
      url: "https://vidya.chat",
      img: "/img/b2b/vidya.jpeg",
      techs: [
        "ElectronJS",
        "OpenAI/BERT",
        "ReactJS",
        "NestJS",
        "postgres",
        "Azure",
      ],
    },
    {
      name: "NIKE",
      description: "Web3 & Blockchain Apps",
      url: "https://rtfkt.com",
      img: "/img/b2b/rtfkt.jpeg",
      techs: ["VueJS", "lit-element", "NodeJS", "etherjs", "MongoDB"],
    },
    {
      name: "RTFKT",
      description: "Crypto & NFT Minting",
      url: "https://web.archive.org/web/20210616144208/https%3A%2F%2Fcryptopunk.rtfkt.com%2F",
      img: "/img/b2b/cryptopunk.jpeg",
      techs: ["VueJS", "lit-element", "WebGL", "web3js", "OnChain DB"],
    },
    {
      name: "Anda Pirate",
      description: "Passing the cyber-security passion",
      url: "https://andapirate.com",
      img: "/img/b2b/andapirate.jpeg",
      techs: ["NextJS", "ReactJS", "TailwindCSS", "Python", "postgres"],
    },
    {
      name: "Hexofo",
      description: "Web promotion agency",
      url: "https://hexofo.com",
      img: "/img/b2b/hexofo.jpeg",
      techs: ["ReactJS", "NextJS", "Vercel"],
    },
    {
      name: "Winnables",
      description: "Blockchain trades & gambling",
      url: "https://winnables.com",
      img: "/img/b2b/winnables.jpeg",
      techs: ["NextJS", "ReactJS", "TailwindCSS", "postgres"],
    },
    {
      name: "iCure",
      description: "Connecting people to health online",
      url: "https://icure.com/fr/",
      img: "/img/b2b/icure.jpeg",
      techs: ["PolymerJS", "Kotlin", "eHealth gov API", "MySQL"],
    },
    {
      name: "GameOfBlocks",
      description: "Web3 Multiplayer Gaming",
      url: "https://web.archive.org/web/20231003112245/https%3A%2F%2Fgameofblocks.io%2F",
      img: "/img/b2b/screenshot.jpeg",
      techs: ["ReactJS", "Blitz", "etherjs", "express", "Ganache"],
    },
    {
      name: "TimbTrack",
      description: "Leading IoT innovation",
      url: "https://timbtrack.com",
      img: "/img/b2b/timbtrack.jpeg",
      techs: ["VueJS", "PHP", "NodeJS", "GraphQL", "MySQL"],
    },
    {
      name: "Sk8boarders",
      description: "Tailoring pages at any scale",
      url: "https://sk8boarders.be",
      img: "/img/b2b/sk8boarders.jpeg",
      techs: ["WordPress", "PHP", "HTML/CSS", "MySQL"],
    },
  ];

  const handleScrollTo = (e: any, anchor: string) => {
    e.preventDefault();
    const container = document.querySelector("main");
    const domElement = document.querySelector(anchor);
    if (container && domElement) {
      container.scroll({
        top:
          container.scrollTop +
          (domElement.getBoundingClientRect().top || 0) -
          120,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="reading mb-2 !max-w-screen-xl">
        <motion.div
          initial={{ translateY: 64, opacity: 0 }}
          animate={{
            translateY: 0,
            opacity: 1,
            transition: {
              delay: 2,
              duration: 1,
            },
          }}
        >
          <Ascii fileName="andaroth02" color="#0F0" className="-z-10 h-0" />
        </motion.div>

        <div className="h-[30dvh] lg:h-[35vh]" />
        <div className="flex flex-col max-h-[calc(100dvh-80px)]">
          <div className="flex flex-row w-full justify-center lg:justify-end">
            <div className="!max-w-screen-2xl">
              <h2 className="title text-center lg:text-right">
                {t("dev.role")}
              </h2>
              <div className="reading flex flex-col gap-8 bg-black/50 !border-y-2 !border-green-900 rounded-md p-4 shadow-lg !max-w-screen-2xl">
                <p>
                  {t("dev.bio.0")}
                  <strong>{t("dev.bio.1")}</strong>
                  {t("dev.bio.2")}
                  <strong>{t("dev.bio.3")}</strong>
                  {t("dev.bio.4")}
                  <strong>{t("dev.bio.5")}</strong>
                  {t("dev.bio.6")}.
                </p>
                <AButton
                  className="!mx-2 mb-2 md:mb-0"
                  variant="dark"
                  onClick={(e) => handleScrollTo(e, "#portfolio")}
                >
                  {t("dev.cta")}
                </AButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Ascii fileName="rocket01" color="#FFF" className="mt-12" />

      <Ascii fileName="world" color="#444" className="mt-12 -z-10" />

      <div id="portfolio" className="reading mb-12">
        <div className="flex flex-col gap-4">
          <h2 className="title text-center mb-6">{t("portfolio.title")}</h2>
          <div className="reading flex flex-col mx-auto gap-8 bg-black/50 p-4 rounded-md shadow-lg">
            <p className="text-center w-full mx-auto">
              {t("portfolio.paragraph.0")}
              <strong>{t("portfolio.paragraph.1")}</strong>
              {t("portfolio.paragraph.2")}
              {t("portfolio.paragraph.3")}
              <strong>{t("portfolio.paragraph.4")}</strong>.
            </p>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
              {creations.map((creation) => (
                <Link
                  className="creation rounded-md overflow-hidden flex flex-col cursor-pointer"
                  key={creation.name}
                  href={creation.url}
                  target="_blank"
                >
                  <div className="flex p-4 bg-black">
                    <h3 className="text-center w-full">@{creation.name}</h3>
                  </div>
                  <div className="w-full overflow-hidden aspect-video bg-black">
                    <Image
                      className="thumbnail w-full aspect-video"
                      src={creation.img}
                      alt={creation.name}
                      width="350"
                      height="200"
                    />
                    <div className="technos aspect-video transition-all z-100 rounded-b-lg -translate-y-[100%] cursor-pointer">
                      <div className="flex flex-col h-full justify-center w-full">
                        <div className="pl-8 text-lg text-white whitespace-pre-wrap">
                          {creation.description}
                        </div>
                        {creation.techs.map((t, i) => (
                          <div key={i} className="text-left text-sm pl-8">
                            <strong className="text-white">&gt;</strong>&nbsp;
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-center w-full mx-auto">
              {t("portfolio.signature.0")}
              <br />
              {t("portfolio.signature.1")}
            </p>
            <div className="flex flex-col mt-4 md:flex-row justify-center md:mb-6">
              <AButton
                className="!mx-2 mb-2 md:mb-0"
                variant="dark"
                onClick={(e) => handleScrollTo(e, "#contact")}
              >
                {t("portfolio.cta")}
              </AButton>
            </div>
          </div>
        </div>
      </div>

      <div className="reading">
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: {
                duration: 1,
              },
              repeatCount: 1,
            }}
          >
            <Ascii fileName="contact" color="#0C0" className="my-24" />
          </motion.div>
          <h2 className="title text-center hidden">{t("about.title")}</h2>
          <div
            id="contact"
            className="reading flex flex-col mx-auto gap-8 bg-black/50 p-4 rounded-md shadow-lg"
          >
            <img
              src="./img/avatar.jpeg"
              alt="me"
              width={64}
              className="rounded-full mx-auto z-11 relative -mb-4"
            />
            <p className="text-center w-full">
              {t("about.paragraph_a.0")}
              <strong>{t("about.paragraph_a.1")}</strong>!<br />
              {t("about.paragraph_a.2")}.
            </p>
            <p className="text-center w-full">
              {t("about.paragraph_b.0")}
              <strong>{t("about.paragraph_b.1")}</strong>
              {t("about.paragraph_b.2")}&nbsp;
              {t("about.paragraph_b.3")}
              <strong>{t("about.paragraph_b.4")}</strong>
            </p>
            <p className="text-center w-full">
              {t("about.paragraph_c.0")}&nbsp;
              <strong>{t("about.paragraph_c.1")}</strong>!
            </p>
            <div>
              <AButton
                className="!mx-2 my-4 md:mb-0 !bg-[#0F0]"
                variant="dark"
                href={"mailto:" + process.env.NEXT_PUBLIC_EMAIL}
              >
                <span className="!text-black">{t("about.cta")}</span>
              </AButton>
            </div>
            <ASocials />
          </div>
          <Ascii fileName="mail01" color="#FFF" />
        </div>
      </div>
    </>
  );
};

export default Home;
