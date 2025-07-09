export default function Loader({title}) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-row p-4 text-4xl font-extrabold">
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
      </div>
      <h1 className=" text-lg font-extralight"> {title} </h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="size-20"
      >
        <rect
          fill="#FF156D"
          stroke="#FF156D"
          stroke-width="4"
          width="30"
          height="30"
          x="25"
          y="85"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"
          ></animate>
        </rect>
        <rect
          fill="#FF156D"
          stroke="#FF156D"
          stroke-width="4"
          width="30"
          height="30"
          x="85"
          y="85"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"
          ></animate>
        </rect>
        <rect
          fill="#FF156D"
          stroke="#FF156D"
          stroke-width="4"
          width="30"
          height="30"
          x="145"
          y="85"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </rect>
      </svg>
    </div>
  );
}
