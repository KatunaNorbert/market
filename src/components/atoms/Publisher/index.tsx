import React, { ReactElement, useEffect, useState } from 'react'
import styles from './index.module.css'
import classNames from 'classnames/bind'
import Tooltip from '../Tooltip'
import { Link } from 'gatsby'
import get3BoxProfile from '../../../utils/profile'
import EtherscanLink from '../EtherscanLink'
import { accountTruncate } from '../../../utils/wallet'
import axios from 'axios'
import { useOcean } from '@oceanprotocol/react'
import { ReactComponent as Info } from '../../../images/info.svg'
import ProfileDetails from './ProfileDetails'
import { useProfile } from '../../../providers/Profile'
import Add from './Add'

const cx = classNames.bind(styles)

export default function Publisher({
  account,
  minimal,
  className
}: {
  account: string
  minimal?: boolean
  className?: string
}): ReactElement {
  const { networkId, accountId } = useOcean()
  const [name, setName] = useState<string>()
  const { profile, setProfile, setAccount } = useProfile()
  const showAdd = account === accountId && !profile

  useEffect(() => {
    if (!account) return

    setName(accountTruncate(account))
    const source = axios.CancelToken.source()

    async function get3Box() {
      const newProfile = await get3BoxProfile(account, source.token)
      if (!newProfile) return
      setProfile(newProfile)
      setAccount(account)
      const { name, emoji } = newProfile
      name && setName(`${emoji || ''} ${name}`)
    }
    get3Box()

    return () => {
      source.cancel()
    }
  }, [account])

  const styleClasses = cx({
    publisher: true,
    [className]: className
  })

  return (
    <div className={styleClasses}>
      {minimal ? (
        name
      ) : (
        <>
          <Link
            to={`/search/?owner=${account}`}
            title="Show all data sets created by this account."
          >
            {name}
          </Link>

          <div className={styles.links}>
            {' — '}
            {profile && (
              <Tooltip
                placement="bottom"
                content={
                  <ProfileDetails
                    profile={profile}
                    networkId={networkId}
                    account={account}
                  />
                }
              >
                <span className={styles.detailsTrigger}>
                  Profile <Info className={styles.linksExternal} />
                </span>
              </Tooltip>
            )}
            {showAdd && <Add />}
            <EtherscanLink networkId={networkId} path={`address/${account}`}>
              Etherscan
            </EtherscanLink>
          </div>
        </>
      )}
    </div>
  )
}
