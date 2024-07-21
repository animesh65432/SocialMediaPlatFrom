import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Messagetypes = {
  id: number;
  text: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
};

type MessagesState = {
  messageArray: Messagetypes[];
};

const initialState: MessagesState = {
  messageArray: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Messagetypes>) {
      state.messageArray.push(action.payload);
    },
    
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
