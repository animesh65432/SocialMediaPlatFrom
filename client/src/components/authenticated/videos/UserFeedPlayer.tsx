import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Video, VideoOff } from "lucide-react";

type Props = {
  stream: MediaStream | null;
};

const UserFeedPlayer: React.FC<Props> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
    if (audioRef.current && stream) {
      audioRef.current.srcObject = stream;
      audioRef.current.play().catch((err) => {
        console.error("Failed to play audio stream:", err);
      });
    }
  }, [stream]);

  useEffect(() => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isAudioEnabled;
      });
    }
  }, [stream, isAudioEnabled]);

  useEffect(() => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = isVideoEnabled;
      });
    }
  }, [stream, isVideoEnabled]);

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  return (
    <div className="relative w-[20vw] h-[25vh]  overflow-hidden rounded-lg shadow-md bg-black ">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        autoPlay
      />
      <audio ref={audioRef} autoPlay />

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4">
        <button
          onClick={toggleAudio}
          className="p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/70 text-white"
          aria-label={isAudioEnabled ? "Mute audio" : "Unmute audio"}
        >
          {isAudioEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={toggleVideo}
          className="p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/70 text-white"
          aria-label={isVideoEnabled ? "Turn off video" : "Turn on video"}
        >
          {isVideoEnabled ? (
            <Video className="w-5 h-5" />
          ) : (
            <VideoOff className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserFeedPlayer;