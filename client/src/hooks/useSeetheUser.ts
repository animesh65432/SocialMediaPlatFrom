import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { backendurl } from "@/utils"
import { RootState } from "@/store"
import { addOthersUser } from "@/store/slices/UserSlices"


type useSeetheUser_returntypes = [
    loading: boolean,
    see_the_other_peoples: (userId: number) => Promise<void>
]

const useSeetheUser = (): useSeetheUser_returntypes => {
    const [loading, setLoading] = useState<boolean>(false)
    const token = useSelector((state: RootState) => state.user.idtoken)
    const dispatch = useDispatch()

    const see_the_other_peoples = async (userId: number) => {
        setLoading(true)
        try {
            const response = await axios.get(`${backendurl}/users/seeothersPeoples/${userId}`, {
                headers: { token }
            })
            dispatch(addOthersUser(response?.data?.user))
        } catch (error) {
            console.log(error, `Errors in see_the_other_peoples_hooks`)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return [loading, see_the_other_peoples]
}

export default useSeetheUser