import { useEffect } from 'react'

import { useAppDispatch } from '@/hooks/redux.ts'
import { getUserInfo } from '@/services/user-service'
import { setUserInfo } from '@/store/reducers/UserInfoSlice'

const useGetUserInfo = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    getUserInfoData()
  }, [])

  const getUserInfoData = async () => {
    const { data } = await getUserInfo()
    data &&
      dispatch(
        setUserInfo({
          userFirstName: data.firstName,
          userSecondName: data.lastName,
          email: data.email,
        }),
      )
  }
}

export default useGetUserInfo
