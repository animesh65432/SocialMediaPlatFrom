import React from 'react'
import { useSelector } from "react-redux"
import { RootState } from "@/store/index"
import { Card } from "@/components/ui/card"
import { Avatar, CircularProgress } from "@mui/material"
import { Button } from "@/components/ui/button"
import { useUpdatefollowers } from "@/hooks/customhooks"
const Others: React.FC = () => {
    const [loading, updatefollowers] = useUpdatefollowers()
    const User = useSelector((state: RootState) => state.user.OthersUsers)

    const upadte = async (userId: number) => {
        try {
            await updatefollowers(userId)
        } catch (error) {
            console.log(error)
        }
    }
    if (loading) {
        return <div className="flex items-center justify-center">
            <CircularProgress />
        </div>
    }
    return (
        <div className='h-[80vh] flex  items-center justify-center'>
            <Card className='bg-white h-[50vh] w-[30vw] p-4 flex  flex-col gap-2'>
                <div className='flex justify-center'>
                    {
                        User.PhotoUrl ? <Avatar src={User.PhotoUrl} alt="User Profile" /> : <>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkr94Z9oGA_KuzX9ghnsctIEudavAJJht_VUyCDUw6c8eBeijX1Hg1RA6ckmWhBVNUlx4&usqp=CAU" className="w-[10vw] h-[10vh] rounded-lg" /></>
                    }
                </div>
                <div className='mt-4'>
                    <p className='text-center font-bold text-[20px] '>{User.Name}</p>
                </div>
                <div>
                    <p >{User.Gender && <span>Gender={User.Gender}</span>}</p>
                </div>
                <div className='flex justify-center'>
                    {User.Email && <span>Email={User.Email}</span>}
                </div>
                <div className=' flex justify-center'>
                    <p className='font-bold'>Followers</p>
                    <p className='text-center font-bold'>({User.followers})</p>
                </div>
                <div className='flex justify-center'>
                    <Button onClick={() => upadte(User.Id)}>follow</Button>
                </div>
            </Card>
        </div>
    )
}

export default Others