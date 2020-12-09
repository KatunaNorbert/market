import React, {
  useState,
  ReactElement,
  createContext,
  useContext,
  ReactNode
} from 'react'
import { Profile } from '../models/Profile'

interface ProfileProviderValue {
  profile: Profile | undefined
  account: String | undefined
  setProfile: (profile: Profile) => void
  setAccount: (account: String) => void
}

const ProfileContext = createContext({} as ProfileProviderValue)

export default function ProfileProvider({
  children
}: {
  children: ReactNode
}): ReactElement {
  const [profile, setProfile] = useState<Profile>()
  const [account, setAccount] = useState('')

  return (
    <ProfileContext.Provider
      value={
        { profile, account, setProfile, setAccount } as ProfileProviderValue
      }
    >
      {children}
    </ProfileContext.Provider>
  )
}

// Helper hook to access the provider values
const useProfile = () => useContext(ProfileContext)

export { ProfileProvider, useProfile }
