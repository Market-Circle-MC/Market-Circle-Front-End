import { Link, NavLink } from "react-router-dom";
import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ArchiveBox, Heart } from "iconsax-react";

const Navigation = () => {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const { cart, setCart } = useContext(CartContext);

  return (
    <nav className="px-32 h-24 flex items-center justify-between fixed w-full bg-white z-50">
      <main className="flex justify-between w-full items-center">
        <section className="">
          <NavLink
            to={"/home"}
            className="flex flex-row p-4 text-4xl font-extrabold"
          >
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

              <h1 className="text-[#53b32d] ">Market</h1>
            </span>
            <h1 className="text-yellow-400">Circle</h1>
          </NavLink>
        </section>
        <section>
          <div className="bg-[#f3f9fb] p-3 w-96 rounded-lg h-10 flex items-center gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 fill-[#91cd79]"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              placeholder="Search..."
              className="w-80 focus:outline-0 text-md"
              type="text"
            />
          </div>
        </section>
        <section className="flex gap-4 items-center">
          <NavLink className=" pointer w-32 cursor-pointer  bg-gray-200 rounded-md text-gray-600 flex gap-2 px-2 py-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 stroke-[#1b1c1b]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="p-0 cursor-pointer text-lg bg-transparent text-gray-600 hover:bg-bg-transparent outline-0">
                  {" "}
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white  cursor-pointer  border-gray-50 ">
                <DropdownMenuItem className="  cursor-pointer p-2 text-white  flex items-center justify-center ">
                  <Link to="/login">
                    <Button className="p-4 cursor-pointer bg-green-600 w-50 hover:bg-green-700 text-lg h-12 shadow-md">
                      Sign In
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-[0.5px] h-[1px] border-gray-200" />

                <DropdownMenuItem className=" cursor-pointer p-0  flex ">
                  <Link to={"/userdashboard"}>
                    <Button className="bg-transparent hover:bg-transprent text-gray-400 cursor-pointer shadow-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 stroke-[#91cd79]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>{" "}
                      My Account
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className=" cursor-pointer p-0 flex "
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  <Button className="bg-transparent hover:bg-transparent text-gray-400 cursor-pointer shadow-none">
                    <ArchiveBox size="32" color="#91cd79" /> Orders
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className=" cursor-pointer p-0  flex "
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  <Button className="bg-transparent hover:bg-transparent text-gray-400 shadow-none">
                    <Heart size="32" color="#91cd79" /> Wishlist
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavLink>
          <span className=" text-[#dfdfdf] h-6 bg[#dfdfdf] border border-[#dfdfdf]"></span>
          <NavLink
            to="cart"
            className="flex gap-1 text-[#797979] not-even:items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 stroke-[#91cd79]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>

            <h3>Cart</h3>
            <span className="border px-2 rounded-full bg-red-500 text-white">
              {cart.length}
            </span>
          </NavLink>
        </section>
      </main>
    </nav>
  );
};

export default Navigation;
