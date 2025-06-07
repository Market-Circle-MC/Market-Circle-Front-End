import {
  Whatsapp,
  CallOutgoing,
  Youtube,
  Facebook,
  Instagram,
} from "iconsax-react";
import { CATEGORIES, CUSTOMERS, PLAY, IOS } from "../../constants/index";
export default function Footer() {
  return (
    <footer className="px-32 flex justify-between items-center bg-[#f7f7f7] py-10">
      <section className=" flex flex-col gap-6">
        <section className="flex flex-row text-4xl font-extrabold ">
          <span className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 absolute -top-1 right-14 stroke-yellow-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <h1 className="text-green-500 ">Market</h1>
          </span>
          <h1 className="text-yellow-400 ">Circle</h1>
        </section>
        <div className="flex flex-col gap-3 text-[#686868]">
          <h3>Contact Us</h3>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <Whatsapp size="24" color="#464646" variant="Outline" />
              <h3>WhatsApp</h3>
            </div>

            <div className="ml-8">
              <h2>+233244056789</h2>
            </div>
          </div>

          <div className="flex - flex-col">
            <div className="flex gap-2">
              <CallOutgoing size="24" color="#464646" variant="Outline" />
              <h3>Call Us</h3>
            </div>
            <div className="ml-8">
              <h3>+233244056789</h3>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Instagram size="32" color="#53b32d" variant="Bold" />
          <Facebook size="32" color="#53b32d" variant="Bold" />
          <Youtube size="32" color="#53b32d" variant="Bold" />
        </div>
      </section>
      <section className=" flex flex-col gap-6 text-[#686868]">
        <h1 className="underline-offset-8 underline">Popular Categories</h1>

        <ul className="flex gap-2  flex-col">
          {CATEGORIES.map((category, index) => (
            <li key={index}>{category.title}</li>
          ))}
        </ul>
      </section>
      <section className=" flex flex-col gap-6 text-[#686868]">
        <h1 className="underline underline-offset-8">Customer Services</h1>
        <div className="flex flex-col gap-2">
          {CUSTOMERS.map((customer, index) => (
            <ul>
              <li key={index}>{customer.title}</li>
            </ul>
          ))}
        </div>
      </section>
      <section className=" flex flex-col gap-6">
        <h1 className="underline underline-offset-8 text-[#686868]">
          Download App
        </h1>
        <div className="flex flex-col ">
          <img className="h-22 w-38" src={IOS} alt="" />
          <img className="h-18 w-38" src={PLAY} alt="" />
        </div>
      </section>
    </footer>
  );
}
