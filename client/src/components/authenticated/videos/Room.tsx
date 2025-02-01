import React, { useEffect, useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from "@/store"
import { Socketcontext } from '@/context/SocketProvider'
import { useUserMedia } from "@/hooks/customhooks"
import UserFeedPlayer from "@/components/authenticated/videos/UserFeedPlayer"
import { removePeerAction, resetPeersAction } from "@/Actions/PeerAction"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { frontendurl } from "@/utils"
import YourFeedPlayer from './YourFeedPlayer'


const Room: React.FC = () => {
  const { roomId } = useParams()
  const userId = useSelector((state: RootState) => state.user.user.Id)
  const { socket, peer, peers, dispatch, setroomId } = useContext(Socketcontext)
  const { fetchUserAudio, stream } = useUserMedia()
  const [url, seturl] = useState("")

  if (!roomId) return

  console.log(userId)

  useEffect(() => {
    if (!peer || !roomId) return;

    dispatch(resetPeersAction(roomId))
    setroomId(roomId)

    fetchUserAudio()
    socket.emit("joined_room", { roomId, userId, peerId: peer._id })

    const handleUsers = ({ users }: { users: any }) => {
      console.log("Fetched Users:", users)
    }

    const handleUserLeft = (data: any) => {
      console.log("User Left:", data)
      dispatch(removePeerAction(roomId, data.peerId))
    }

    socket.on('Get-Users', handleUsers)
    socket.on('user-left', handleUserLeft)

    return () => {
      console.log("Unmounting Room Component, Removing from Room")
      socket.emit("remove-room", { roomId, userId, peerId: peer._id })


      socket.off("Get-Users", handleUsers)
      socket.off("user-left", handleUserLeft)
    }
  }, [peer, roomId])

  const copytheurl = () => {
    seturl(`${frontendurl}/Rooms/${roomId}`)
  }

  return (
    <div className='h-[90vh] p-4 bg-white flex flex-col gap-2'>
      <div className='flex justify-end gap-2'>
        <Input value={url}></Input>
        <Button onClick={copytheurl}>copy url</Button>
      </div>
      <div className='flex justify-between'>
        <div> <YourFeedPlayer stream={stream} />
          You</div>
        <div className='flex flex-col items-center gap-4  h-[70vh] overflow-auto '>
          Users
          {peers[roomId] && Object.keys(peers[roomId]).map((peerId) => (
            <UserFeedPlayer key={peerId} stream={peers[roomId][peerId].stream} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Room
