import axios from "axios";
import { useState } from "react";
import { backendurl } from "@/utils"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store"
import { addOthersUser } from "@/store/slices/UserSlices"


type useUpdatefollowersreturnTypes = [
    loading: boolean,
    updatefollowers: (userId: number) => Promise<void>
]

const useUpdatefollowers = (): useUpdatefollowersreturnTypes => {
    const [loading, setloading] = useState<boolean>(false)
    const token = useSelector((state: RootState) => state.user.idtoken)
    const dispatch = useDispatch()

    const updatefollowers = async (userId: number) => {
        setloading(true)
        try {
            await axios.put(`${backendurl}/users/updatefollowers/${userId}`, {}, {
                headers: {
                    token
                }
            })

            const response = await axios.get(`${backendurl}/users/seeothersPeoples/${userId}`, {
                headers: {
                    token
                }
            })
            const updateuser = response?.data?.user
            dispatch(addOthersUser(updateuser))
        } catch (error) {
            console.log(error, `errors in updateflollowers hooks`)
        }
        finally {
            setloading(false)
        }
    }

    return [loading, updatefollowers]
}


export default useUpdatefollowers