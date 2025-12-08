import "./App.css";

function Navigation() {
  const isDark = true;

  const sections = [
    { id: "basic", label: "Basic Props", icon: "📦" },
    { id: "ref", label: "ref Props", icon: "🔗" },
    { id: "children", label: "children Props", icon: "👶" },
    { id: "complex", label: "complex Props", icon: "🧩" },
    { id: "theme", label: "theme Props", icon: "🎨" },
  ];

  return (
    <nav className={`sticky top-0 shadow-md z-50`}></nav>
  );
}

function AppContent() {
  return (
    <div className={`min-h-screen bg-gray-800`}>test</div>
  )
}

function App() {
  return (
    <>
      <AppContent/>
    </>
  );
}

export default App;
