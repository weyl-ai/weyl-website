// src/components/posters/PosterGallery.tsx
import { useState, useMemo } from 'react';
import { posters, filterPosters, type PosterMode, type PosterRound, type Poster } from '@/lib/posters/data';
import { GalleryFilters } from './GalleryFilters';
import { PosterCard } from './PosterCard';
import { PosterModal } from './PosterModal';

export function PosterGallery() {
  const [mode, setMode] = useState<PosterMode | 'all'>('all');
  const [round, setRound] = useState<PosterRound | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);

  // Filter posters based on current selections
  const filteredPosters = useMemo(
    () => filterPosters(mode, round),
    [mode, round]
  );

  // Calculate counts for filters
  const counts = useMemo(
    () => ({
      all: posters.length,
      hypermodern: posters.filter((p) => p.mode === 'hypermodern').length,
      institutional: posters.filter((p) => p.mode === 'institutional').length,
      r1: posters.filter((p) => p.round === 'r1').length,
      r2: posters.filter((p) => p.round === 'r2').length,
    }),
    []
  );

  // Get current index of selected poster in filtered list
  const currentIndex = selectedPoster
    ? filteredPosters.findIndex((p) => p.id === selectedPoster.id)
    : -1;

  // Navigation handlers
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prev = filteredPosters[currentIndex - 1];
      if (prev) setSelectedPoster(prev);
    } else if (currentIndex === 0 && filteredPosters.length > 0) {
      // Wrap to end
      const last = filteredPosters[filteredPosters.length - 1];
      if (last) setSelectedPoster(last);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredPosters.length - 1) {
      const next = filteredPosters[currentIndex + 1];
      if (next) setSelectedPoster(next);
    } else if (currentIndex === filteredPosters.length - 1 && filteredPosters.length > 0) {
      // Wrap to beginning
      const first = filteredPosters[0];
      if (first) setSelectedPoster(first);
    }
  };

  return (
    <div>
      {/* Filters */}
      <GalleryFilters
        mode={mode}
        round={round}
        viewMode={viewMode}
        counts={counts}
        onModeChange={setMode}
        onRoundChange={setRound}
        onViewModeChange={setViewMode}
      />

      {/* Poster grid/list */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            : 'flex flex-col gap-2'
        }
      >
        {filteredPosters.map((poster) => (
          <PosterCard
            key={poster.id}
            poster={poster}
            viewMode={viewMode}
            onClick={() => setSelectedPoster(poster)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredPosters.length === 0 && (
        <div className="text-center py-16">
          <p className="font-mono text-[#8b949e]">
            No posters match the current filters.
          </p>
        </div>
      )}

      {/* Modal */}
      {selectedPoster && (
        <PosterModal
          poster={selectedPoster}
          onClose={() => setSelectedPoster(null)}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

