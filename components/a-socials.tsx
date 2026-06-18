import Link from "next/link";
import Image from "next/image";

import ATiktokIcon from "@/components/a-icons/tiktok";
import AInstagramIcon from "@/components/a-icons/instagram";
import ADiscordIcon from "@/components/a-icons/discord";
import AYoutubeIcon from "@/components/a-icons/youtube";
import AGithubIcon from "@/components/a-icons/github";
import SCIcon from "@/components/a-icons/soundcloud";

const ASocials = () => {
  const socials = [
    // { label: "TikTok", url: "https://www.tiktok.com/@anda_pirate", img: null, children: <ATiktokIcon height={64} width={64} className="cursor-pointer" /> },
    {
      label: "Instagram",
      url: "https://instagram.com/anda_pirate",
      img: null,
      children: (
        <AInstagramIcon height={56} width={56} className="cursor-pointer" />
      ),
    },
    // { label: "Discord", url: "https://andapirate.com/discord", img: null, children: <ADiscordIcon height={56} width={56} fill="#7289DA" className="cursor-pointer" /> },
    // { label: "YouTube", url: "https://www.youtube.com/@AndaPirate", img: null, children: <AYoutubeIcon height={64} width={64} className="cursor-pointer" /> },
    {
      label: "GitHub",
      url: "https://github.com/Andaroth",
      img: null,
      children: (
        <AGithubIcon height={56} width={56} className="cursor-pointer" />
      ),
    },
    {
      label: "SoundCloud",
      url: "https://soundcloud.com/axel-andaroth",
      img: null,
      children: <SCIcon height={60} width={60} className="cursor-pointer" />,
    },
  ];

  return (
    <ul className="grid gap-4 grid-cols-2 md:grid-cols-3">
      {socials.map((soc) => (
        <li
          key={socials.indexOf(soc)}
          className="flex flex-col justify-start bg-[#030] rounded-lg p-4 text-center h-full"
        >
          <Link
            className="flex flex-col gap-2 h-full origin-center hover:scale-[1.05]"
            href={soc.url}
            target="_blank"
          >
            <h3 className="text-xs sm:text-sm md:text-base">{soc.label}</h3>
            <div className="flex flex-grow cursor-pointer">
              <div className="flex flex-col w-full justify-center">
                {soc.children ? (
                  <div className="flex justify-center w-full">
                    {soc.children}
                  </div>
                ) : (
                  <Image
                    src={soc.img || ""}
                    alt={soc.label}
                    width="200"
                    height="200"
                  />
                )}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ASocials;
