import { useDispatch } from "react-redux";
import { fetchUserFeed } from "../store/slices/SocketSlices";
import { useCallback } from "react";

const useUserMedia = () => {
  const dispatch = useDispatch();

  const fetchUserAudio = useCallback(async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      dispatch(fetchUserFeed(userStream));
    } catch (error) {
      console.error("Error fetching user media:", error);
    }
  }, [dispatch]);

  const removeUserAudio = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: false,
      });

      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return { fetchUserAudio, removeUserAudio };
};

export default useUserMedia;
