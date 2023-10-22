import { FC } from 'react'

import ActiveUsersBlock from '@/components/blocks/ActiveUsersBlock'
import Header from '@/components/common/Header'
import NoLiveFeeds from '@/components/common/NoContent/NoLiveFeeds'
import { BreadCrumbs, SpinnerContainer } from '@/components/ui'
import { usersPath } from '@/components/ui/BreadCrumbs/path/usersPagePath'
import { useAppSelector } from '@/hooks/redux'
import useGetEmployees from '@/hooks/useGetEmployees'

import style from './style.module.scss'

const Users: FC = () => {
  const liveUsers = useAppSelector((s) => s.liveUsersReducer.liveUsers)
  const isLiveLoading = useAppSelector((s) => s.liveUsersReducer.isLiveLoading)
  useGetEmployees()
  return (
    <SpinnerContainer loading={isLiveLoading}>
      <div className={style.container}>
        <Header className={style.header}>
          <BreadCrumbs pathArray={usersPath} />
        </Header>
        {liveUsers.length ? (
          <ActiveUsersBlock />
        ) : (
          <div className={style.wrapper}>
            <span className={style.title}>Live Feeds</span>
            {!isLiveLoading && <NoLiveFeeds />}
          </div>
        )}
      </div>
    </SpinnerContainer>
  )
}

export default Users
