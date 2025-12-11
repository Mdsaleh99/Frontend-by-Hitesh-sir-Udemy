import { useAppStore } from "../store/appStore";

export default function Navbar() {
//   const user = useAppStore((state) => state.user);
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  return (
    <nav>
      <span>Theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </nav>
  );
}
