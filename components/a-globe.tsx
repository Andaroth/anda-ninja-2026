"use client";

import { FC, useRef, useState, useEffect, useMemo } from "react";

// import useStore from "@/store/global";

import countries from "@/data/geo/countries.json";

let GlobeGL: any;
const AGlobe: FC = () => {
  const globeElement = useRef();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (mounted && GlobeGL) return;
    GlobeGL = require("react-globe.gl").default;
    setMounted(true);
  }, []);

  useEffect(() => {
    const container = document.querySelector("main");
    const rotateView = () => {
      const latDelta = container.scrollTop / 30;
      const altDelta = container.scrollTop / 5000;
      const x = 0; // Number(localStorage.getItem("mouseX") || "0") / 150;
      const y = 0; // Number(localStorage.getItem("mouseY") || "0") / 150 / 3;
      if (globeElement?.current) {
        const el = globeElement.current as any;
        el.pointOfView({
          lat: 30 - altDelta * 30 - y,
          lng: 4 + latDelta + x,
          altitude: 2.5 - altDelta * 2,
        });
      }
    };
    const interval = setInterval(rotateView, 1000 / 120);
    return () => clearInterval(interval);
  }, [globeElement]);

  if (!mounted) return <></>;

  const destinations = [
    { name: "Brussels, Belgium", lat: 50.8503, lng: 4.3517 },
    { name: "New York, USA", lat: 40.7128, lng: -74.006 },
    { name: "Malte", lat: 35.9375, lng: 14.3754 },
    { name: "Bangkok, Thaïlande", lat: 13.7563, lng: 100.5018 },
    { name: "Kinshasa, RDC (capitale)", lat: -4.4419, lng: 15.2663 },
    { name: "Moscou, Russie", lat: 55.7558, lng: 37.6173 },
    { name: "Montevideo, Uruguay", lat: -34.9011, lng: -56.1645 },
    {
      name: "Nouvelle-Guinée (Port Moresby approx.)",
      lat: -9.4438,
      lng: 147.1803,
    },
  ];
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

  return (
    <div
      id="globe-container"
      className="fixed left-[18px] top-[70px] pointer-events-none overflow-hidden !max-w-max !max-h-max !m-0 !w-[calc(100vw-36px)] !h-[calc(100dvh-112px)] z-10 !border-3 !border-transparent"
      style={{
        borderRadius: ".125rem",
      }}
    >
      {GlobeGL ? (
        <GlobeGL
          ref={globeElement}
          globeImageUrl="./img/earth-dark.jpg"
          // globeColor={"rgba(128,128,128,128)"}
          // showGlobe={false}
          arcsData={arcsData}
          arcColor="color"
          autoRotate={true}
          autoRotateSpeed={10}
          arcDashLength={() => Math.random()}
          arcDashGap={1}
          arcDashInitialGap={() => Math.random()}
          arcDashAnimateTime={() => Math.random() * 4000 + 500}
          // arcsTransitionDuration={0}
          // polygonsData={countries.features.filter(
          //   (d) => d.properties.ISO_A2 !== "AQ",
          // )}
          // polygonCapColor={"rgba(200, 0, 0, 0.6)"}
          // polygonSideColor={"rgba(0, 100, 0, 0.05)"}
          // polygonColor={"rgba(0,0,0,0)"}
          // polygonsTransitionDuration={4000}
          // polygonAltitude={(feat) =>
          //   Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5)
          // }
          ringsData={[{ lat: 90, lng: 0 }]}
          ringAltitude={0.05}
          ringMaxRadius={180}
          ringPropagationSpeed={7}
          ringRepeatPeriod={7000}
          ringColor={() => "rgba(128,128,128,128)"}
          backgroundColor={"rgba(0,0,0,0)"}
          hexPolygonsData={countries.features}
          hexPolygonAltitude={0.0025}
          hexPolygonColor={() => "rgba(0,64,0,255)"}
          atmosphereColor={"rgba(0,164,0,255)"}
        />
      ) : (
        <canvas></canvas>
      )}
    </div>
  );
};

export default AGlobe;
