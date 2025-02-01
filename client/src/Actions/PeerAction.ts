export const ADD_PEER = "ADD_PEER" as const;
export const REMOVE_PEER = "REMOVE_PEER" as const;
export const RESET_PEERS = "RESET_PEERS" as const;


export const addPeerAction = (roomId: string, peerId: string, stream: MediaStream) => ({
    type: ADD_PEER,
    payload: { roomId, peerId, stream }
});

export const removePeerAction = (roomId: string, peerId: string) => ({
    type: REMOVE_PEER,
    payload: { roomId, peerId }
});

export const resetPeersAction = (roomId: string) => ({
    type: RESET_PEERS,
    payload: { roomId }
});

export type PeerAction =
    | {
        type: typeof ADD_PEER;
        payload: { roomId: string; peerId: string; stream: MediaStream };
    }
    | {
        type: typeof REMOVE_PEER;
        payload: { roomId: string; peerId: string };
    }
    | {
        type: typeof RESET_PEERS;
        payload: { roomId: string };
    };
