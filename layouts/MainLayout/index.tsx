import { FC, ReactNode } from 'react'

import SideBar from '@/components/SideBar'

import style from './style.module.scss'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={style.container}>
      <div>
        <SideBar />
      </div>
      <div className={style.mainContent}>{children}</div>
    </div>
  )
}

export default Layout
