import { ADD_PEER, REMOVE_PEER, RESET_PEERS, PeerAction } from "@/Actions/PeerAction";
export type PeerState = Record<string, Record<string, { stream: MediaStream }>>;


export const peerReducer = (state: PeerState, action: PeerAction) => {
    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.roomId]: {
                    ...state[action.payload.roomId],
                    [action.payload.peerId]: { stream: action.payload.stream }
                }
            };
        case REMOVE_PEER:
            if (!state[action.payload.roomId]) return state;
            const { [action.payload.peerId]: _, ...newPeers } = state[action.payload.roomId];
            return {
                ...state,
                [action.payload.roomId]: newPeers
            };
        case RESET_PEERS:
            return {
                ...state,
                [action.payload.roomId]: {}
            };
        default:
            return state;
    }
};