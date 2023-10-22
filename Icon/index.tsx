import { FC } from 'react'

import { ReactComponent as BoldBuildings } from '@/assets/icons/bold-buildings.svg'
import { ReactComponent as BoldPeople } from '@/assets/icons/bold-people.svg'
import { ReactComponent as BoldUser } from '@/assets/icons/bold-user.svg'
import { ReactComponent as BoldVideoTime } from '@/assets/icons/bold-video-time.svg'
import { ReactComponent as ArrowBreadCrumbs } from '@/assets/icons/breadcrumb-right-arrow.svg'
import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg'
import { ReactComponent as ClearPhotoIcon } from '@/assets/icons/clear-photo.svg'
import { ReactComponent as ContactUsIcon } from '@/assets/icons/contact-us.svg'
import { ReactComponent as CrossIcon } from '@/assets/icons/cross-dark.svg'
import { ReactComponent as Filter } from '@/assets/icons/filter.svg'
import { ReactComponent as HelmetBold } from '@/assets/icons/helmet-bold.svg'
import { ReactComponent as LinearArrowDown } from '@/assets/icons/linear-arrow-down.svg'

interface IconProps {
  name: keyof typeof components
  className?: string
  onClick?: () => void
}

const components = {
  checkIcon: CheckIcon,
  clearPhotoIcon: ClearPhotoIcon,
  contactUs: ContactUsIcon,
  crossIcon: CrossIcon,
  linearArrowDown: LinearArrowDown,
  filter: Filter,
  arrowBreadCrumbs: ArrowBreadCrumbs,
  boldUser: BoldUser,
  boldVideoTime: BoldVideoTime,
  boldBuildings: BoldBuildings,
  helmetBold: HelmetBold,
  boldPeople: BoldPeople,
}

const Icon: FC<IconProps> = ({ className, name, onClick }) => {
  const DynamicIcon = components[name]
  return <DynamicIcon className={className} onClick={onClick} />
}

export default Icon
