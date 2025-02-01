import { useCallback, useState } from "react";

const useUserMedia = () => {
  const [stream, setstream] = useState<MediaStream | null>(null)
  const fetchUserAudio = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setstream(stream)
    } catch (error) {
      console.error("Error fetching user media:", error);
    }
  }, []);

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
  }, []);

  return { fetchUserAudio, removeUserAudio, stream };
};

export default useUserMedia;
