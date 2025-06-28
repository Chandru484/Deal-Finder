import React from 'react';
import { ProductDeal } from '../types';
import ProductCard from './ProductCard';

interface ResultsDisplayProps {
  deals: ProductDeal[];
  absoluteBestDeal: ProductDeal | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ deals, absoluteBestDeal }) => {
  if (deals.length === 0) {
    return (
        <div className="text-center py-20 animate-fade-in">
            <h3 className="text-xl font-semibold text-slate-300">No Matching Deals</h3>
            <p className="text-slate-400 mt-2">Try adjusting your filters or search for another product.</p>
        </div>
    );
  }
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {deals.map((deal, index) => (
        <ProductCard 
          key={`${deal.platform}-${deal.productName}-${index}`} 
          deal={deal} 
          isBestDeal={deal === absoluteBestDeal} 
        />
      ))}
    </div>
  );
};

export default ResultsDisplay;
