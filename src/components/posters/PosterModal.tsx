// src/components/posters/PosterModal.tsx
import { useEffect, useCallback } from 'react';
import type { Poster } from '@/lib/posters/data';

interface PosterModalProps {
  poster: Poster;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function PosterModal({
  poster,
  onClose,
  onPrevious,
  onNext,
}: PosterModalProps) {
  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    },
    [onClose, onPrevious, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Handle backdrop click - close if clicking outside the poster image
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close if clicking directly on the backdrop or outer container
    // (not on the image, buttons, or their children)
    const target = e.target as HTMLElement;
    const isClickOnPoster = target.closest('img') !== null;
    const isClickOnButton = target.closest('button') !== null;
    
    if (!isClickOnPoster && !isClickOnButton) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Close"
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Previous arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrevious(); }}
        className="absolute left-4 z-20 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Previous poster"
      >
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 z-20 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Next poster"
      >
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Poster */}
      <img
        src={poster.image}
        alt={poster.title}
        className="relative z-10 max-w-[90vw] max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
