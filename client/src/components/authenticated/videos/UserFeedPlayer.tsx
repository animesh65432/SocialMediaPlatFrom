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
    <div className="relative w-full max-w-xs overflow-hidden rounded-lg shadow-md bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        autoPlay
      />
    </div>
  );
};

export default UserFeedPlayer;
