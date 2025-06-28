import React from 'react';
import { ProductDeal } from '../types';
import { StarIcon, TagIcon, BestDealIcon } from './IconComponents';

interface ProductCardProps {
  deal: ProductDeal;
  isBestDeal: boolean;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="w-5 h-5 text-amber-400" />)}
      {halfStar && <StarIcon key="half" className="w-5 h-5 text-amber-400" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }} />}
      {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="w-5 h-5 text-slate-600" />)}
       <span className="ml-2 text-sm text-slate-400">{rating.toFixed(1)}</span>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ deal, isBestDeal }) => {
  const cardClasses = `
    relative flex flex-col bg-slate-800/50 border rounded-lg overflow-hidden shadow-lg 
    transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-cyan-500/20
    ${isBestDeal ? 'border-cyan-500 ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-900' : 'border-slate-700'}
  `;

  return (
    <div className={cardClasses}>
      {isBestDeal && (
        <div className="absolute top-0 right-0 z-10">
            <div className="flex items-center bg-cyan-500 text-slate-900 font-bold text-xs px-3 py-1 rounded-bl-lg">
                <BestDealIcon className="w-4 h-4 mr-1"/>
                Best Deal
            </div>
        </div>
      )}
      <div className="relative">
        <img src={deal.imageUrl} alt={deal.productName} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-block bg-slate-900/70 text-slate-300 text-xs font-semibold px-2 py-1 rounded">
                {deal.platform}
            </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-slate-100 mb-2 flex-grow min-h-[56px]">{deal.productName}</h3>
        
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={deal.rating} />
        </div>
        
        <div className="mt-auto flex items-end justify-between">
            <div className="flex items-baseline">
                <TagIcon className="w-6 h-6 text-cyan-400 mr-2"/>
                <span className="text-3xl font-bold text-white">₹{deal.price.toLocaleString('en-IN')}</span>
            </div>
            <a 
              href={deal.productUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-700 text-sm font-semibold text-white rounded-md hover:bg-cyan-600 transition-colors"
            >
              View Deal
            </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;