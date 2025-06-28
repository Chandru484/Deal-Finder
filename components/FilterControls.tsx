import React from 'react';
import { FilterIcon, SortIcon } from './IconComponents';

interface FilterControlsProps {
  platforms: string[];
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  platforms,
  selectedPlatform,
  onPlatformChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="mb-6 bg-slate-800/60 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <label htmlFor="platform-filter" className="flex items-center text-sm font-medium text-slate-300 whitespace-nowrap">
          <FilterIcon className="w-5 h-5 mr-2 text-cyan-400" />
          Filter:
        </label>
        <select
          id="platform-filter"
          value={selectedPlatform}
          onChange={(e) => onPlatformChange(e.target.value)}
          className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 transition-colors"
          aria-label="Filter by platform"
        >
          {platforms.map(platform => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <label htmlFor="sort-by" className="flex items-center text-sm font-medium text-slate-300 whitespace-nowrap">
          <SortIcon className="w-5 h-5 mr-2 text-cyan-400" />
          Sort by:
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 transition-colors"
          aria-label="Sort by price or rating"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
