import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Search, MapPin, ChevronUp, Map, CalendarIcon, Users, Minus, Plus, Globe } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-bg.jpg";

const HeroBanner = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 86400000),
  });
  const [showFilters, setShowFilters] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [babies, setBabies] = useState(0);

  const totalGuests = adults + kids + babies;

  const GuestCounter = ({ 
    label, 
    description, 
    value, 
    onChange, 
    min = 0 
  }: { 
    label: string; 
    description: string; 
    value: number; 
    onChange: (val: number) => void; 
    min?: number;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-6 text-center font-medium">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-[85svh] md:min-h-[90vh] flex flex-col overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* Decorative Elements - Hidden on mobile for performance */}
      <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="hidden md:block absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-3 pt-14 md:pt-24 pb-4 md:pb-8">

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-white mb-2 md:mb-6 leading-tight">
          Tref Your Perfect
          <br />
          <span className="relative inline-block mt-0.5 md:mt-2">
            <span className="relative z-10 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Rental Home
            </span>
            <span className="absolute -bottom-0.5 md:-bottom-2 left-0 right-0 h-1.5 md:h-4 bg-primary rounded-sm -skew-x-3" />
          </span>
        </h1>
        
        <p className="text-xs sm:text-base md:text-lg lg:text-xl text-white/80 text-center max-w-2xl mb-4 md:mb-12 leading-relaxed px-2">
          Discover unique stays and experiences around the world.
        </p>

        {/* Search Card */}
        <div className="w-full max-w-5xl">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl shadow-black/20 border border-border overflow-hidden">
            {/* Main Search Row - Stacked on mobile */}
            <div className="p-3 md:p-4 flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-2 md:gap-3">
              {/* Country */}
              <Select defaultValue="us">
                <SelectTrigger className="w-full md:w-[160px] h-11 border-border bg-background">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  <SelectItem value="us">🇺🇸 United States</SelectItem>
                  <SelectItem value="ca">🇨🇦 Canada</SelectItem>
                  <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="be">🇧🇪 Belgium</SelectItem>
                  <SelectItem value="il">🇮🇱 Israel</SelectItem>
                </SelectContent>
              </Select>

              {/* Zipcode */}
              <div className="flex-1 min-w-0 md:min-w-[160px]">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter Zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className="pl-10 h-11 border-border bg-background"
                  />
                </div>
              </div>

              {/* Property Type */}
              <Select defaultValue="short-term">
                <SelectTrigger className="w-full md:w-[180px] h-11 border-border bg-background">
                  <SelectValue placeholder="Property type..." />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="short-term" className="font-medium">Short Term Rent</SelectItem>
                  <SelectItem value="long-term">Long Term Rent</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile: Action buttons row */}
              <div className="flex gap-2 md:contents">
                {/* Other Filters Toggle */}
                <Button
                  variant="outline"
                  className="flex-1 md:flex-none h-11 gap-2 border-border bg-background"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <ChevronUp className={`h-4 w-4 transition-transform ${showFilters ? '' : 'rotate-180'}`} />
                  <span className="md:inline">Filters</span>
                  <span className="hidden lg:inline text-muted-foreground text-sm">
                    {dateRange?.from && dateRange?.to
                      ? `${format(dateRange.from, "MM/dd/yyyy")} - ${format(dateRange.to, "MM/dd/yyyy")}`
                      : ""}
                  </span>
                </Button>

                {/* Search Button */}
                <Button className="flex-1 md:flex-none h-11 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-4 md:px-6 font-semibold shadow-lg shadow-primary/20">
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Search</span>
                </Button>

                {/* Map Button */}
                <Button variant="outline" className="h-11 gap-2 border-border bg-background px-3 md:px-4">
                  <Map className="h-4 w-4" />
                  <span className="hidden sm:inline">Map</span>
                </Button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="px-3 md:px-4 pb-3 md:pb-4 animate-in slide-in-from-top-2 duration-200">
                <div className="border-t border-border pt-3 md:pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Check in / Check out */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Check in / Check out
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full h-11 justify-start border-border bg-muted/30 font-normal text-sm"
                          >
                            <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">
                              {dateRange?.from && dateRange?.to 
                                ? `${format(dateRange.from, "MM/dd")} - ${format(dateRange.to, "MM/dd/yy")}`
                                : "Select dates"
                              }
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-background border-border" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={1}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Guests
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full h-11 justify-start border-border bg-muted/30 font-normal text-sm"
                          >
                            <Users className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">
                              {totalGuests > 0 
                                ? `${adults} Adult${adults !== 1 ? 's' : ''}${kids > 0 ? `, ${kids} Kid${kids !== 1 ? 's' : ''}` : ''}${babies > 0 ? `, ${babies} Baby` : ''}`
                                : "Add Guests"
                              }
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 sm:w-80 p-4 bg-background border-border" align="start">
                          <div className="space-y-1">
                            <GuestCounter
                              label="Adults"
                              description="Ages 13 or above"
                              value={adults}
                              onChange={setAdults}
                              min={1}
                            />
                            <div className="border-t border-border" />
                            <GuestCounter
                              label="Children"
                              description="Ages 2-12"
                              value={kids}
                              onChange={setKids}
                            />
                            <div className="border-t border-border" />
                            <GuestCounter
                              label="Infants"
                              description="Under 2"
                              value={babies}
                              onChange={setBabies}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Beds */}
                    <div className="sm:col-span-2 md:col-span-1">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Beds
                      </label>
                      <Input 
                        placeholder="Add Beds" 
                        className="h-11 border-border bg-muted/30"
                      />
                    </div>

                    {/* Amenities - Full width */}
                    <div className="sm:col-span-2 md:col-span-3">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Amenities
                      </label>
                      <Input 
                        placeholder="WiFi, Pool, Parking, Pet Friendly..." 
                        className="h-11 border-border bg-muted/30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 pb-4 md:pb-10">
        <div className="flex justify-center items-center gap-3 sm:gap-6 md:gap-12 lg:gap-20 px-3">
          {[
            { value: "10K+", label: "Properties" },
            { value: "50K+", label: "Happy Guests" },
            { value: "100+", label: "Cities" },
            { value: "4.9★", label: "Rating" },
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center group cursor-default"
            >
              <div className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-[9px] sm:text-xs md:text-sm text-white/70 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default HeroBanner;
