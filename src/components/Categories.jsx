import { CATEGORIES } from "../constants";
export default function Categories() {
  return (
    <main>
      <div className="py-4 flex gap-4 justify-center">
        {CATEGORIES.map((category, index) => (
          <button
            key={index}
            className="h-8 bg-[#f3f9fb] w-44  cursor-pointer text-xs p-4 rounded-xl flex items-center justify-center"
          >
            {category.title}
          </button>
        ))}
      </div>
    </main>
  );
}
