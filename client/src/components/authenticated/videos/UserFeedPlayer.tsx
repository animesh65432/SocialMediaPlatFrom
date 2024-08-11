import { useEffect, useRef } from "react";

type Props = {
  stream: MediaStream;
};

const UserFeedPlayer: React.FC<Props> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      className="w-full max-w-xs rounded-lg shadow-md"
      muted
      autoPlay
    />
  );
};

export default UserFeedPlayer;
