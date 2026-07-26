import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
export const VideoPlayer = ({ options, onReady }: { options: any; onReady?: (player: Player) => void }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoElement.classList.add('vjs-fluid');
      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }
      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;
      if (options.sources && options.sources.length > 0) {
        player.src(options.sources);
      }
    }
  }, [options, onReady]);
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);
  return (
    <div data-vjs-player className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
      <div ref={videoRef} />
    </div>
  );
};
export default VideoPlayer;
