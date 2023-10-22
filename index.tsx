import { FC, useEffect, useState } from 'react'

import Header from '@/components/common/Header'
import UserCardsList from '@/components/common/UserCardsList'
import WeatherWidget from '@/components/common/WeatherWidget'
import LiveProjectsBlock from '@/components/dashboard/LiveProjectsBlock'
import MapViewBlock from '@/components/dashboard/MapViewBlock'
import { SpinnerContainer } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import useGetEmployees from '@/hooks/useGetEmployees'
import useGetProjects from '@/hooks/useGetProjects'
import { ILocationInfo } from '@/models/services/ProjectsServiceEntities'
import { ROUTES } from '@/router/routes'
import { getProjectsLocation } from '@/services/projects-service'
import { getCityInfo } from '@/services/weather-service'
import { setCurrentCity } from '@/store/reducers/CurrentCitySlice.ts'

import style from './style.module.scss'

const Dashboard: FC = () => {
  const dispatch = useAppDispatch()
  const liveUsers = useAppSelector((s) => s.liveUsersReducer.liveUsers)
  const usersCount = useAppSelector((s) => s.liveUsersReducer.usersCount)
  const liveProjects = useAppSelector((s) => s.liveProjectsReducer.liveProjects)
  const currentCity = useAppSelector((s) => s.currentCityReducer)
  const userFirstName = useAppSelector((s) => s.userInfoSlice.userFirstName)
  const isLiveLoading = useAppSelector((s) => s.liveUsersReducer.isLiveLoading)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [employeeId, setEmployeeId] = useState<number[]>()
  const [projectsLocationList, setProjectsLocationList] = useState<ILocationInfo[]>([])

  useGetProjects()
  useGetEmployees()

  useEffect(() => {
    getLocation()
  }, [employeeId])

  useEffect(() => {
    getProjectsId()
  }, [liveUsers.length])

  useEffect(() => {
    getPos()
  }, [])

  const getLocation = async () => {
    setIsLoading(true)
    if (employeeId?.length) {
      const { data } = await getProjectsLocation(employeeId.join())
      data && setProjectsLocationList(data)
    }
    setIsLoading(false)
  }

  const getProjectsId = () => {
    if (liveUsers.length) {
      setEmployeeId(
        liveUsers.map((user) => {
          return user.id
        }),
      )
    } else {
      setProjectsLocationList([])
    }
  }

  const getGeolocation = async () => {
    const pos: GeolocationPosition = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return { long: pos.coords.longitude, lati: pos.coords.latitude }
  }

  const getPos = async () => {
    const data = await getGeolocation()
    if (data) {
      const { city } = await getCityInfo(+data.lati, +data.long)
      city &&
        dispatch(
          setCurrentCity({
            ...currentCity,
            city,
            lat: data.lati,
            lng: data.long,
          }),
        )
    }
  }

  return (
    <SpinnerContainer loading={isLoading || isLiveLoading}>
      <div className={style.container}>
        <Header children={`Welcome, ${userFirstName}!`} className={style.header} />
        {!!currentCity.city && <WeatherWidget city={currentCity.city} />}
        <div className={style.middleBlock}>
          <MapViewBlock projectsLocationList={projectsLocationList} />
          <LiveProjectsBlock projectList={liveProjects} />
        </div>
        <UserCardsList
          isLoading={isLiveLoading}
          userCardsList={liveUsers}
          title={'Live Feeds'}
          link={{ url: ROUTES.USERS, text: `View all (${usersCount})` }}
        />
      </div>
    </SpinnerContainer>
  )
}

export default Dashboard
