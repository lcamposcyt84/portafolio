import React, { useEffect, useRef, useState } from 'react';

const VideoBackground = () => {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [activeVideo, setActiveVideo] = useState(1);
  // Crossfade duration in seconds
  const crossfadeDuration = 2.0; 

  const handleTimeUpdate = (e, videoNumber) => {
    const video = e.target;
    if (!video.duration) return;

    // Time remaining until the end of the video
    const timeRemaining = video.duration - video.currentTime;
    
    // If we are within the crossfade window, start the other video
    if (timeRemaining <= crossfadeDuration && activeVideo === videoNumber) {
      const nextVideoNumber = videoNumber === 1 ? 2 : 1;
      const nextVideo = nextVideoNumber === 1 ? video1Ref.current : video2Ref.current;
      
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(e => console.log("Play failed:", e));
        setActiveVideo(nextVideoNumber);
      }
    }
    
    // Auto-loop failsafe: if we somehow hit the very end, restart
    if (timeRemaining <= 0.1) {
      video.currentTime = 0;
      video.pause();
    }
  };

  useEffect(() => {
    // Initial setup: set playback rate and play the first video
    const startVideo = async () => {
      if (video1Ref.current) {
        video1Ref.current.playbackRate = 0.5;
        try {
          await video1Ref.current.play();
        } catch(e) {
          console.log("Autoplay prevented:", e);
        }
      }
      if (video2Ref.current) {
        video2Ref.current.playbackRate = 0.5;
      }
    };
    startVideo();
  }, []);

  return (
    <div className="video-background-container">
      {/* Video 1 */}
      <video
        ref={video1Ref}
        muted
        playsInline
        onTimeUpdate={(e) => handleTimeUpdate(e, 1)}
        className="hero-video"
        style={{ 
          opacity: activeVideo === 1 ? 1 : 0, 
          transition: `opacity ${crossfadeDuration}s ease-in-out` 
        }}
      >
        <source src="/src/Video/IMG_1773.MOV" type="video/quicktime" />
      </video>

      {/* Video 2 */}
      <video
        ref={video2Ref}
        muted
        playsInline
        onTimeUpdate={(e) => handleTimeUpdate(e, 2)}
        className="hero-video"
        style={{ 
          opacity: activeVideo === 2 ? 1 : 0, 
          transition: `opacity ${crossfadeDuration}s ease-in-out` 
        }}
      >
        <source src="/src/Video/IMG_1773.MOV" type="video/quicktime" />
      </video>
    </div>
  );
};

export default VideoBackground;
