import Routes from './routes/Routes';
import AuthProvider from './components/auth/AuthContext';
import { customTheme } from './theme/Theme';
import { ThemeProvider } from '@material-ui/core';

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}
