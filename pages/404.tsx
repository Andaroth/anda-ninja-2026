import Ascii from "@/components/Ascii";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <div className="reading relative">
        <h2 className="title text-center">Page Not Found</h2>

        <p className="text-center text-[#F90] mt-8">
          Oh noes D: u're lost... no worries, let us explain!
        </p>
        <aside className="mt-8">
          You are here{" "}
          <Link
            href="/"
            className="whitespace-nowrap !text-white hover:no-underline"
          >
            ------&gt;&nbsp;<b className="text-[#F00]">X</b>
          </Link>
        </aside>
      </div>

      <Ascii fileName="island02" />
    </>
  );
}
