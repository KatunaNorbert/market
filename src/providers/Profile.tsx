import React, {
  useState,
  ReactElement,
  createContext,
  useContext,
  ReactNode
} from 'react'
import { Profile } from '../models/Profile'

const ProfileContext = createContext(null)

export default function ProfileProvider({
  children
}: {
  children: ReactNode
}): ReactElement {
  const [profile, setProfile] = useState<Profile>()
  const [account, setAccount] = useState()

  return (
    <ProfileContext.Provider
      value={{ profile, account, setProfile, setAccount }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

// Helper hook to access the provider values
const useProfile = () => useContext(ProfileContext)

export { ProfileProvider, useProfile }
