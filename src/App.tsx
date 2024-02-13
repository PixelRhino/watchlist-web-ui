import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
import Login from './components/pages/auth/login/Login';

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <main>
                <Login />
            </main>
        </ThemeProvider>
    );
}

export default App;
