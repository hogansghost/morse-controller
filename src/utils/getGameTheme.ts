import WallpaperForza from "../assets/wallpapers/forza.jpg";
import WallpaperGears from "../assets/wallpapers/gears.jpg";
import WallpaperHalo from "../assets/wallpapers/halo.jpg.webp";
import WallpaperStarfield001 from "../assets/wallpapers/starfield-001.jpg";
import WallpaperStarfield002 from "../assets/wallpapers/starfield-002.jpeg";
import WallpaperStarfield003 from "../assets/wallpapers/starfield-003.jpg";
import { randomInteger } from "./randomInteger";

export const getGameTheme = () => {
  const wallpapers = [
    {
      color: "#8e1c27",
      backgroundImage: `url(${WallpaperStarfield001})`,
    },
    {
      color: "#4f7b80",
      backgroundImage: `url(${WallpaperStarfield002})`,
    },
    {
      color: "#8e949e",
      backgroundImage: `url(${WallpaperStarfield003})`,
    },
    {
      color: "#41434a",
      backgroundImage: `url(${WallpaperForza})`,
    },
    {
      color: "#708169",
      backgroundImage: `url(${WallpaperHalo})`,
    },
    {
      color: "#f34232",
      backgroundImage: `url(${WallpaperGears})`,
    },
  ];
  return wallpapers[randomInteger(0, wallpapers.length - 1)];
};
