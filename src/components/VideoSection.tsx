import React, { useState } from 'react';

export const VideoSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="video-section-wrapper">
      <div className={`video-container ${!isLoaded ? 'loading' : ''}`}>
        {/* Skeleton Loader animado exibido enquanto o iframe carrega */}
        {!isLoaded && (
          <div className="video-skeleton">
            <div className="skeleton-spinner"></div>
            <span>Carregando vídeo institucional...</span>
          </div>
        )}

        <iframe
          src="https://player.vimeo.com/video/1223171814?badge=0&autopause=0&player_id=0&app_id=58479"
          title="Vídeo Institucional - Projeto Vale"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease-in-out'
          }}
        ></iframe>
      </div>
    </section>
  );
};