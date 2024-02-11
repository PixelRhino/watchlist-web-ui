import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from './components/mode-toggle'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <ModeToggle />
      </div>
    </ThemeProvider>
  )
}

export default App
