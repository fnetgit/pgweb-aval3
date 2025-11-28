import { SearchInput } from "./SearchInput";

export const HeroSection = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <img src="/theEarth.png" alt="Earth" />
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
          <h1 className="text-white text-3xl">
            <span className="font-bold">Geo</span>Pedia
          </h1>
          <SearchInput />
        </div>
      </div>
    </div>
  );
};
