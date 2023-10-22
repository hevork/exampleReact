import cn from 'classnames'
import { FC, ReactNode } from 'react'
import { SpinnerCircular } from 'spinners-react'

import style from './style.module.scss'

interface ISpinnerCircular {
  color?: string
  secondaryColor?: string
  className?: string
  size?: string | number
}

interface SpinnerContainerProps extends ISpinnerCircular {
  loading: boolean
  children: ReactNode
  classNameContainer?: string
}

type Size = 'large' | 'middle' | 'small' | string | number

const DefaultSizes = {
  large: 400,
  middle: 200,
  small: 80,
}

export const SpinnerContainer: FC<SpinnerContainerProps> = ({
  loading,
  children,
  classNameContainer,
  size,
  color,
  secondaryColor,
  ...props
}) => {
  const getSize = (size?: Size): number | string =>
    size ? DefaultSizes[size as keyof typeof DefaultSizes] ?? size : DefaultSizes['small']

  return (
    <div className={cn(style.spinnerContainer, classNameContainer)}>
      {children}
      {loading && (
        <div className={style.spinner}>
          <SpinnerCircular
            {...props}
            color={color ?? '#0d0d25'}
            thickness={80}
            secondaryColor={secondaryColor ?? '#fff'}
            size={getSize(size)}
            className={cn(props.className)}
          />
        </div>
      )}
    </div>
  )
}
