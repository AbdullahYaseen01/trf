import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BedDouble, Bath, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id: number | string;
  title: string;
  location: string;
  type: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  image: string;
  price?: number;
  currency?: string;
}

const PropertyCard = ({
  id,
  title,
  location,
  type,
  guests,
  bedrooms,
  beds,
  baths,
  image,
  price,
  currency = "USD",
}: PropertyCardProps) => {
  const { preferredCurrency, formatPrice } = useCurrency();
  
  const showConversion = price && currency !== preferredCurrency.code;
  const originalPrice = price ? `${currency === "USD" ? "$" : currency === "CAD" ? "C$" : currency === "GBP" ? "£" : currency === "EUR" ? "€" : "₪"}${price}` : null;

  return (
    <Link to={`/property/${id}`}>
      <Card className="group overflow-hidden border-border hover:tref-shadow-hover transition-all duration-300 cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 hover:bg-background rounded-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </Button>
          {price && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground cursor-help">
                  {formatPrice(price, currency)}/night
                  {showConversion && (
                    <span className="ml-1 text-xs opacity-75">
                      ({originalPrice})
                    </span>
                  )}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Original: {originalPrice}/night</p>
                <p>Converted: {formatPrice(price, currency)}/night</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-3 sm:p-4">
          {/* Type & Location */}
          <p className="text-xs sm:text-sm text-primary font-medium mb-1 line-clamp-1">
            {type} in {location}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-foreground text-base sm:text-lg mb-2 sm:mb-3 line-clamp-1">
            {title}
          </h3>

          {/* Amenities - Responsive layout */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {guests}
            </span>
            <span className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {bedrooms}bd · {beds}b
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {baths}ba
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
