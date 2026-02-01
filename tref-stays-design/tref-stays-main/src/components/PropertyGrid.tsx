import PropertyCard from "./PropertyCard";
import CurrencySelector from "./CurrencySelector";
import { useCurrency } from "@/contexts/CurrencyContext";

// Mock property data with currency info
const properties = [
  {
    id: 1,
    title: "26 Quickway 1 flight up",
    location: "Monroe",
    type: "Short Term Residential House and Apt. Room",
    guests: 6,
    bedrooms: 3,
    beds: 6,
    baths: 2,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop",
    price: 150,
    currency: "USD",
  },
  {
    id: 2,
    title: "26 Quickway walk in",
    location: "Monroe",
    type: "Short Term Residential House and Apt. Room",
    guests: 2,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
    price: 95,
    currency: "USD",
  },
  {
    id: 3,
    title: "Park Ave Monticello",
    location: "Monticello",
    type: "Short Term Residential House and Apt. Room",
    guests: 7,
    bedrooms: 3,
    beds: 6,
    baths: 1,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    price: 180,
    currency: "USD",
  },
  {
    id: 4,
    title: "222 Penn",
    location: "Brooklyn",
    type: "Short Term Residential House and Apt. Room",
    guests: 5,
    bedrooms: 2,
    beds: 5,
    baths: 2,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
    price: 220,
    currency: "USD",
  },
  {
    id: 5,
    title: "Lakeside Retreat",
    location: "Liberty",
    type: "Short Term Residential House and Apt. Room",
    guests: 8,
    bedrooms: 4,
    beds: 8,
    baths: 3,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
    price: 275,
    currency: "CAD",
  },
  {
    id: 6,
    title: "Mountain View Cabin",
    location: "Woodbourne",
    type: "Short Term Residential House and Apt. Room",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    baths: 1,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop",
    price: 130,
    currency: "GBP",
  },
  {
    id: 7,
    title: "Cozy Downtown Apt",
    location: "Spring Valley",
    type: "Short Term Residential House and Apt. Room",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&auto=format&fit=crop",
    price: 100,
    currency: "EUR",
  },
  {
    id: 8,
    title: "Spacious Family Home",
    location: "Kiryas Joel",
    type: "Short Term Residential House and Apt. Room",
    guests: 10,
    bedrooms: 5,
    beds: 10,
    baths: 3,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop",
    price: 1200,
    currency: "ILS",
  },
];

const PropertyGrid = () => {
  const { preferredCurrency } = useCurrency();

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          Available Properties
        </h2>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <CurrencySelector />
          <p className="text-sm text-muted-foreground">
            {properties.length} properties · {preferredCurrency.code}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
