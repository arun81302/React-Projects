import Chat from "./components/Chat"
import Sidebar from "./components/Sidebar"

const App = () => {
  return (
    <>
      <div className="bg-futuristic" />
      <div className="bg-grid" />
      <div className="orb h-64 w-64 bg-violet-600 -top-16 -left-16" />
      <div className="orb h-72 w-72 bg-cyan-500 bottom-10 -right-20" style={{ animationDelay: '-6s' }} />

      <div className="relative z-10 flex h-[100dvh] w-full overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </>
  )
}

export default App
