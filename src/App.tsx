import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Navigation } from './components/navigation'
import { HomePage } from './pages/HomePage'
import { DemoPage } from './pages/DemoPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { Toaster } from 'sonner'
import './index.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="resuscan-ui-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
