import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import InvitationForm from './components/InvitationForm'
import ShareScreen from './components/ShareScreen'
import HomeScreen from './components/HomeScreen'
import YesScreen from './components/YesScreen'
import NoScreen from './components/NoScreen'
import ReminderScreen from './components/ReminderScreen'
import NotFound from './components/NotFound'
import RequireParams from './components/RequireParams'

const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Sender flow */}
        <Route path="/" element={<InvitationForm />} />
        <Route 
          path="/share" 
          element={
            <RequireParams>
              <ShareScreen />
            </RequireParams>
          } 
        />
        
        {/* Receiver flow - all require params */}
        <Route 
          path="/card" 
          element={
            <RequireParams>
              <HomeScreen />
            </RequireParams>
          } 
        />
        <Route 
          path="/yes" 
          element={
            <RequireParams>
              <YesScreen />
            </RequireParams>
          } 
        />
        <Route 
          path="/no" 
          element={
            <RequireParams>
              <NoScreen />
            </RequireParams>
          } 
        />
        <Route 
          path="/reminder" 
          element={
            <RequireParams>
              <ReminderScreen />
            </RequireParams>
          } 
        />

        {/* 404 - catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
