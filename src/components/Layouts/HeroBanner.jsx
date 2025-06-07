import { GROCERY } from "../../constants";
import CartegoryCard from "../CartegoryCard";
import { CATEGORIES } from "../../constants";
import { Category } from "iconsax-react";

export default function HeroBanner() {
  return (
    <main>
      <section className="md:h-[500px] relative px-32 bg-linear-to-r from-yellow-400 to-[#e93756] flex justify-between items-center">
        <div className="text-white ">
          <p className="text-3xl">Best Deal on icy delights</p>
          <p className="text-8xl font-bold">BEAT</p>

          <p
            className="text-8xl font-sans font-black text-transparent bg-clip-text
          
          "
            style={{ WebkitTextStroke: "1px white" }}
          >
            THE HEAT
          </p>

          <span className="flex gap-1">
            <p className="text-3xl">UP to </p>
            <p className="text-3xl font-bold">50% OFF</p>
          </span>
        </div>
        <img className="W-96" src={GROCERY} alt="" />
      </section>
    </main>
  );
}
