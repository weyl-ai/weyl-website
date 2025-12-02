// src/components/posters/PosterCard.tsx
import type { Poster } from '@/lib/posters/data';

interface PosterCardProps {
  poster: Poster;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

export function PosterCard({ poster, viewMode, onClick }: PosterCardProps) {
  const isHypermodern = poster.mode === 'hypermodern';
  const roundLabel = poster.round.toUpperCase();
  const modeLabel = poster.mode.toUpperCase();

  if (viewMode === 'list') {
    return (
      <button
        onClick={onClick}
        className={`
          w-full text-left transition-all duration-200 group
          ${isHypermodern 
            ? 'bg-[#13161a] border border-[#21262d] hover:border-[#54aeff] hover:shadow-[0_0_16px_rgba(84,174,255,0.2)]' 
            : 'bg-white border-2 border-[#1a1a1a] hover:border-[#1a5276]'
          }
        `}
      >
        <div className="flex items-center gap-6 p-4">
          {/* Thumbnail */}
          <div className={`
            w-16 h-24 flex-shrink-0 overflow-hidden
            ${isHypermodern ? 'border border-[#21262d]' : 'border border-[#1a1a1a]'}
          `}>
            <img
              src={poster.image}
              alt={poster.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className={`
              text-xs font-mono tracking-wider mb-1
              ${isHypermodern ? 'text-[#8b949e]' : 'text-[#8b7355]'}
            `}>
              <span className="inline-flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                {roundLabel} / {modeLabel}
              </span>
            </div>
            <h3 className={`
              font-mono text-sm font-bold tracking-wide truncate
              ${isHypermodern ? 'text-[#e6f7ff]' : 'text-[#1a1a1a]'}
            `}>
              {poster.title}
            </h3>
            <p className={`
              text-xs mt-1 truncate
              ${isHypermodern 
                ? 'font-mono text-[#c9d1d9]' 
                : 'font-serif text-[#484f58]'
              }
            `}>
              {poster.description}
            </p>
          </div>

          {/* Arrow indicator */}
          <div className={`
            opacity-0 group-hover:opacity-100 transition-opacity
            ${isHypermodern ? 'text-[#54aeff]' : 'text-[#1a5276]'}
          `}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </button>
    );
  }

  // Grid view
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left transition-all duration-200 group
        ${isHypermodern 
          ? 'bg-[#13161a] border border-[#21262d] hover:border-[#54aeff] hover:shadow-[0_0_16px_rgba(84,174,255,0.2)]' 
          : 'bg-white border-2 border-[#1a1a1a] hover:border-[#1a5276]'
        }
      `}
    >
      <div className="p-4">
        {/* Header with mode indicator */}
        <div className={`
          flex items-center gap-2 text-xs font-mono tracking-wider mb-3
          ${isHypermodern ? 'text-[#8b949e]' : 'text-[#8b7355]'}
        `}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          {roundLabel} / {modeLabel}
        </div>

        {/* Title */}
        <h3 className={`
          font-mono text-sm font-bold tracking-wide mb-2
          ${isHypermodern ? 'text-[#e6f7ff]' : 'text-[#1a1a1a]'}
        `}>
          {poster.title}
        </h3>

        {/* Description */}
        <p className={`
          text-xs leading-relaxed line-clamp-2
          ${isHypermodern 
            ? 'font-mono text-[#c9d1d9]' 
            : 'font-serif text-[#484f58]'
          }
        `}>
          {poster.description}
        </p>
      </div>
    </button>
  );
}

