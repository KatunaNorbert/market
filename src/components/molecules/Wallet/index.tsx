import React, { ReactElement, useEffect } from 'react'
import Account from './Account'
import Details from './Details'
import { useProfile } from '../../../providers/Profile'
import ProfileDetails from '../../atoms/Publisher/ProfileDetails'
import Tooltip from '../../atoms/Tooltip'
import { useOcean } from '@oceanprotocol/react'

export default function Wallet(): ReactElement {
  const { networkId, accountId } = useOcean()
  const { profile, account } = useProfile()

  return (
    <Tooltip
      content={
        <ProfileDetails
          profile={profile}
          networkId={networkId}
          account={account}
        />
      }
      trigger="click focus"
      disabled={!accountId}
    >
      <Account />
    </Tooltip>
  )
}
