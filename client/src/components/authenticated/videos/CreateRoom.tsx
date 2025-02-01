import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Socketcontext } from "@/context/SocketProvider"

const CreateRoom: React.FC = () => {
  const { socket } = useContext(Socketcontext)
  const initroom = () => {
    console.log("click")
    socket.emit('create-room') //create room
  }


  return (
    <div className='h-[90vh] bg-slate-50 flex justify-center items-center'>
      <Button onClick={initroom} >Create Meeting room</Button>
    </div>
  )
}

export default CreateRoom