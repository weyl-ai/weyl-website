// src/components/posters/GalleryFilters.tsx
import type { PosterMode, PosterRound } from '@/lib/posters/data';

interface GalleryFiltersProps {
  mode: PosterMode | 'all';
  round: PosterRound | 'all';
  viewMode: 'grid' | 'list';
  counts: {
    all: number;
    hypermodern: number;
    institutional: number;
    r1: number;
    r2: number;
  };
  onModeChange: (mode: PosterMode | 'all') => void;
  onRoundChange: (round: PosterRound | 'all') => void;
  onViewModeChange: (view: 'grid' | 'list') => void;
}

export function GalleryFilters({
  mode,
  round,
  viewMode,
  counts,
  onModeChange,
  onRoundChange,
  onViewModeChange,
}: GalleryFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 font-mono text-xs">
      {/* Left side: Mode and Round filters */}
      <div className="flex flex-wrap items-center gap-6">
        {/* Mode filter */}
        <div className="flex items-center gap-3">
          <span className="text-[#8b949e] tracking-wider">MODE:</span>
          <div className="flex gap-1">
            <FilterButton
              active={mode === 'all'}
              onClick={() => onModeChange('all')}
              label={`ALL (${counts.all})`}
            />
            <FilterButton
              active={mode === 'hypermodern'}
              onClick={() => onModeChange('hypermodern')}
              label={`HYPERMODERN (${counts.hypermodern})`}
            />
            <FilterButton
              active={mode === 'institutional'}
              onClick={() => onModeChange('institutional')}
              label={`INSTITUTIONAL (${counts.institutional})`}
            />
          </div>
        </div>

        {/* Round filter */}
        <div className="flex items-center gap-3">
          <span className="text-[#8b949e] tracking-wider">ROUND:</span>
          <div className="flex gap-1">
            <FilterButton
              active={round === 'all'}
              onClick={() => onRoundChange('all')}
              label={`ALL (${counts.all})`}
            />
            <FilterButton
              active={round === 'r1'}
              onClick={() => onRoundChange('r1')}
              label={`R1 (${counts.r1})`}
            />
            <FilterButton
              active={round === 'r2'}
              onClick={() => onRoundChange('r2')}
              label={`R2 (${counts.r2})`}
            />
          </div>
        </div>
      </div>

      {/* Right side: View toggle */}
      <div className="flex gap-1">
        <ViewToggleButton
          active={viewMode === 'grid'}
          onClick={() => onViewModeChange('grid')}
          label="GRID"
          icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          }
        />
        <ViewToggleButton
          active={viewMode === 'list'}
          onClick={() => onViewModeChange('list')}
          label="LIST"
          icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          }
        />
      </div>
    </div>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function FilterButton({ active, onClick, label }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 tracking-wide transition-all duration-200
        border
        ${active
          ? 'bg-[rgba(84,174,255,0.15)] border-[#54aeff] text-[#54aeff]'
          : 'bg-transparent border-[#21262d] text-[#8b949e] hover:border-[#54aeff] hover:text-[#c9d1d9]'
        }
      `}
    >
      {label}
    </button>
  );
}

interface ViewToggleButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

function ViewToggleButton({ active, onClick, label, icon }: ViewToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 tracking-wide transition-all duration-200
        border flex items-center gap-2
        ${active
          ? 'bg-[rgba(84,174,255,0.15)] border-[#54aeff] text-[#54aeff]'
          : 'bg-transparent border-[#21262d] text-[#8b949e] hover:border-[#54aeff] hover:text-[#c9d1d9]'
        }
      `}
      title={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

