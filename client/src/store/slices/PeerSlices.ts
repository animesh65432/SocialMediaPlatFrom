import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Peer = {
    id: string
    stream: MediaStream
}

// Define type for room
type Room = {
    id: string
    peers: Peer[]
}

type AddPeerPayload = {
    roomId: string,
    peer: {
        id: string,
        stream: MediaStream
    }
}

export interface PeerSliceState {
    rooms: Room[];
}

const initialState: PeerSliceState = {
    rooms: [],
}

const PeerSlice = createSlice({
    name: "peers",
    initialState,
    reducers: {
        addRoom: (state, action: PayloadAction<AddPeerPayload>) => {
            const room = state.rooms.find(r => r.id === action.payload.roomId)

            if (room) {
                room.peers.push({
                    id: action.payload.peer.id,
                    stream: action.payload.peer.stream
                })
            } else {
                state.rooms.push({
                    id: action.payload.roomId,
                    peers: [{
                        id: action.payload.peer.id,
                        stream: action.payload.peer.stream
                    }]
                })
            }
        },

        removeRoom: (state, action: PayloadAction<string>) => {
            state.rooms = state.rooms.filter(room => room.id !== action.payload)
        },


    }
})

export const { addRoom, removeRoom } = PeerSlice.actions

export default PeerSlice.reducer