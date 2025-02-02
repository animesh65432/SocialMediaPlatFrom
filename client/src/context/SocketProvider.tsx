import React, { createContext, useEffect, useReducer, useState } from "react"
import socketioclinet from "socket.io-client"
import { backendurl } from "@/utils"
import { useNavigate } from "react-router-dom"
import { Peer } from "peerjs"
import { v4 as UUidv4 } from "uuid"
import { peerReducer } from "../Reducers/PeerReducer"
import { addPeerAction } from "@/Actions/PeerAction"
import { useUserMedia } from "@/hooks/customhooks"
export const Socketcontext = createContext<any | null>(null)

const socket = socketioclinet(backendurl, {
    withCredentials: true
})

type props = {
    children: React.ReactNode
}

const SocketProvider: React.FC<props> = ({ children }) => {
    const naviagte = useNavigate()
    const [peer, setpeer] = useState<Peer | null>(null)
    const [peers, dispatch] = useReducer(peerReducer, {})
    const [roomId, setroomId] = useState<string>()
    const peerid = UUidv4()
    const { stream, fetchUserAudio } = useUserMedia()
    const newpeer = new Peer(peerid, {
        host: 'peerserver-7lhp.onrender.com',
        port: 443,
        secure: true,
        path: "/myapp"
    })

    useEffect(() => {
        if (!peer) {
            setpeer(newpeer)
        }
        fetchUserAudio()
        const enterroom = ({ roomId }: { roomId: string }) => {
            naviagte(`Rooms/${roomId}`)
        }
        socket.on("room-created", enterroom)
    }, [])
    useEffect(() => {

        if (!peer || !stream || !roomId) return;
        socket.on("user-joined", ({ peerId }) => {
            console.log(`call`, peerId)
            const call = peer.call(peerId, stream);
            console.log("Calling the new peer", peerId);
            call.on("stream", () => {
                dispatch(addPeerAction(roomId, peerId, stream));
            })
        })

        peer.on("call", (call) => {
            // what to do when other peers on the group call you when u joined
            console.log("receiving a call", call.peer);
            call.answer(stream);
            call.on("stream", () => {
                dispatch(addPeerAction(roomId, call.peer, stream));
            })
        })



        socket.emit("ready");
    }, [peer, stream, roomId])


    return <Socketcontext.Provider value={{ socket, peer, peers, dispatch, setroomId }}>
        {children}
    </Socketcontext.Provider>
}

export default SocketProvider