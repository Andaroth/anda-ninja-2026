"use client";

import { FC, useRef, useState, useEffect, useMemo } from "react";
import cn from "classnames";

import { usePathname } from "next/navigation";
// import useStore from "@/store/global";

import countries from "@/data/geo/countries.json";
import destinations from "@/data/geo/destinations.json";

interface AGlobeProps {
  classNames?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
}

let GlobeGL: any;
const AGlobe: FC<AGlobeProps> = ({
  classNames,
  lat,
  lng,
  zoom,
}: AGlobeProps) => {
  const globeElement = useRef();
  const pathname = usePathname();

  // mount component
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (mounted && GlobeGL) return;
    GlobeGL = require("react-globe.gl").default;
    setMounted(true);
  }, []);

  // rotate view on scroll
  useEffect(() => {
    const container = document.querySelector("main");
    const rotateView = () => {
      if (pathname?.includes("map")) return;
      const latDelta = container.scrollTop / 9;
      const altDelta = container.scrollTop / 5000;
      const x = 0; // Number(localStorage.getItem("mouseX") || "0") / 150;
      const y = 0; // Number(localStorage.getItem("mouseY") || "0") / 150 / 3;
      if (globeElement?.current) {
        const el = globeElement.current as any;
        el.pointOfView({
          lat: lat || 30 - altDelta * 30 - y,
          lng: lng || 4 + latDelta + x,
          altitude: zoom || 2.5 - altDelta * 2,
        });
      }
    };
    const interval = setInterval(rotateView, 1000 / 120);
    return () => clearInterval(interval);
  }, [globeElement]);

  if (!mounted) return <></>;

  const colors = ["cyan", "blue", "purple", "green", "green", "green"];
  const arcsData = [];
  for (let i = 1; i <= 20; i++) {
    destinations.forEach((start) => {
      // const start = destinations[Math.floor(Math.random() * destinations.length)];
      const ds = destinations.filter((d) => d.name !== start.name);
      const dest = ds[Math.floor(Math.random() * ds.length)];
      arcsData.push({
        startLat: start.lat,
        startLng: start.lng,
        endLat: dest.lat,
        endLng: dest.lng,
        color: [
          colors[Math.floor(Math.random() * colors.length)],
          colors[Math.floor(Math.random() * colors.length)],
        ],
        // facultatif: garder le nom de la destination pour debug/affichage
        destination: dest.name,
      });
    });
  }

  const activeCountries = countries.features.filter((c) => {
    const tags = [
      "Belgium",
      "France",
      "Canada",
      "United States of America",
      "Italy",
      "Japan",
      "Israel",
      "Palestine",
      "Saudi Arabia",
      "Nigeria",
      "Egypt",
      "Slovenia",
      "Australia",
      "Ukraine",
      "Morocco",
      "Algeria",
      "Spain",
      "Germany",
      "United Kingdom",
      "Thailand",
      "Dem. Rep. Congo",
      "Malaysia",
      "China",
      "Russia",
    ];
    return tags.includes(c.properties.NAME);
  });

  return (
    <div
      id="globe-container"
      className={cn(
        "fixed left-[18px] top-[70px] overflow-hidden !max-w-max !max-h-max !m-0 !w-[calc(100vw-36px)] !h-[calc(100dvh-112px)] z-10 !border-3 !border-transparent",
        classNames,
      )}
      style={{
        borderRadius: ".125rem",
      }}
    >
      {GlobeGL ? (
        <GlobeGL
          ref={globeElement}
          globeImageUrl="./img/earth-dark.jpg"
          bumpImageUrl="./img/earth-topology.png"
          arcsData={arcsData}
          arcColor="color"
          autoRotate={true}
          autoRotateSpeed={10}
          arcDashLength={() => Math.random()}
          arcDashGap={1}
          arcDashInitialGap={() => Math.random()}
          arcDashAnimateTime={() => Math.random() * 4000 + 500}
          arcsTransitionDuration={0}
          ringsData={[{ lat: 90, lng: 0 }]}
          ringAltitude={0.05}
          ringMaxRadius={180}
          ringPropagationSpeed={7}
          ringRepeatPeriod={7000}
          ringColor={() => "rgba(128,128,128,0.5)"}
          backgroundColor={"rgba(0,0,0,0)"}
          polygonsData={countries.features}
          polygonCapColor={() => "rgba(0,172,0,0.25)"}
          polygonSideColor={() => "rgba(0, 0, 0, 0)"}
          polygonAltitude={() => 0.01}
          hexPolygonsData={activeCountries}
          hexPolygonAltitude={() => Math.random() / 20 + 0.02}
          hexPolygonColor={() => "rgba(16,128,64,0.4)"}
          atmosphereColor={"rgba(0,164,0,1)"}
        />
      ) : (
        <canvas></canvas>
      )}
    </div>
  );
};

export default AGlobe;
