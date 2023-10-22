import { FC, ReactNode } from 'react'

import style from './style.module.scss'

interface Props {
  children: ReactNode
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className={style.container}>
      <div className={style.imageBlock} />
      <div className={style.mainContent}>{children}</div>
    </div>
  )
}

export default AuthLayout
