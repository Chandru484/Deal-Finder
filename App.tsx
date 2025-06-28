import React, { useState, useMemo } from 'react';
import { fetchProductDeals } from './services/geminiService';
import { ProductDeal } from './types';
import SearchBar from './components/SearchBar';
import ResultsDisplay from './components/ResultsDisplay';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import { LogoIcon } from './components/IconComponents';
import FilterControls from './components/FilterControls';

const App: React.FC = () => {
  const [productDeals, setProductDeals] = useState<ProductDeal[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('price-asc');

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a product to search for.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setProductDeals(null);
    setHasSearched(true);
    setPlatformFilter('All');
    setSortBy('price-asc');

    try {
      const deals = await fetchProductDeals(query);
      if (deals.length === 0) {
        setError('No deals found for this product. Try a different search term.');
      }
      setProductDeals(deals);
    } catch (e: unknown) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to fetch deals. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const availablePlatforms = useMemo(() => {
    if (!productDeals) return [];
    const platforms = new Set(productDeals.map(deal => deal.platform));
    return ['All', ...Array.from(platforms).sort()];
  }, [productDeals]);

  const absoluteBestDeal = useMemo(() => {
    if (!productDeals || productDeals.length === 0) {
      return null;
    }
    return productDeals.reduce((best, current) => {
        return current.price < best.price ? current : best;
    }, productDeals[0]);
  }, [productDeals]);

  const displayedDeals = useMemo(() => {
    if (!productDeals) return null;

    let filtered = [...productDeals];

    if (platformFilter !== 'All') {
      filtered = filtered.filter(deal => deal.platform === platformFilter);
    }

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    return filtered;
  }, [productDeals, platformFilter, sortBy]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <LogoIcon className="h-10 w-10 text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter bg-gradient-to-r from-white to-cyan-400 text-transparent bg-clip-text">
              Deal Finder AI
            </h1>
          </div>
          <p className="text-slate-400 text-center sm:text-right">Find the best prices, powered by Gemini.</p>
        </header>

        <main>
          <div className="max-w-3xl mx-auto mb-10">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {isLoading && <Loader />}
          
          {error && !isLoading && <ErrorDisplay message={error} />}
          
          {displayedDeals && !isLoading && !error && (
             <>
              <FilterControls
                platforms={availablePlatforms}
                selectedPlatform={platformFilter}
                onPlatformChange={setPlatformFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
              <ResultsDisplay deals={displayedDeals} absoluteBestDeal={absoluteBestDeal} />
            </>
          )}

          {!hasSearched && !isLoading && !error && (
             <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-slate-300 mb-2">Welcome to Deal Finder AI</h2>
                <p className="text-slate-400 max-w-md mx-auto">
                    Enter a product name above, like "wireless noise-cancelling headphones" or "4K 55-inch TV", and let our AI find the best deals for you across top Indian stores.
                </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;