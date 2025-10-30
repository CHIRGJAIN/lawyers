import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'
import { MessagingProvider } from '@/context/MessagingContext'
import { HomePage } from '@/pages/Home'
import { NetworkPage } from '@/pages/Network'
import { MessagesPage } from '@/pages/Messages'
import { OpportunitiesPage } from '@/pages/Opportunities'
import { AlertsPage } from '@/pages/Alerts'
import { SettingsPage } from '@/pages/Settings'
import { ProfilePage } from '@/pages/Profile'
import { LoginPage } from '@/pages/Login'
import { RegisterPage } from '@/pages/Register'
import { NotFoundPage } from '@/pages/NotFound'

const AppShell = () => {
  const { pathname } = useLocation()
  const hideChrome = pathname === '/login' || pathname === '/register'

  return (
    <div className='min-h-screen bg-[var(--brand-sand)]'>
      {!hideChrome && <AppHeader />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/network' element={<NetworkPage />} />
        <Route path='/messages' element={<MessagesPage />} />
        <Route path='/opportunities' element={<OpportunitiesPage />} />
        <Route path='/alerts' element={<AlertsPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

const App = () => (
  <MessagingProvider>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </MessagingProvider>
)

export default App
