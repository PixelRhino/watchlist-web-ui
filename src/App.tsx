import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import Register from './components/pages/register/Register'
// import { ModeToggle } from './components/mode-toggle'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
        <Register/>
      </main>
    </ThemeProvider>
  )
}

export default App
