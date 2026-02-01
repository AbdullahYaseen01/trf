import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, LogOut, X, Home, Info, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import trefLogo from "@/assets/tref-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
    navigate("/");
  };

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Empty logo area */}
          <div className="w-8" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              to="/" 
              className="text-white font-medium hover:text-primary transition-colors"
            >
              Properties
            </Link>
            <Link 
              to="/auth" 
              className="text-white/80 hover:text-primary transition-colors"
            >
              List Your Property
            </Link>
            <Link 
              to="/" 
              className="text-white/80 hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10 gap-2">
                    <User className="h-4 w-4" />
                    {user.email?.split("@")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:text-primary hover:bg-white/10"
                  onClick={() => navigate("/auth")}
                >
                  Login
                </Button>
                <Button 
                  size="sm" 
                  className="bg-primary text-primary-foreground hover:bg-tref-blue-hover"
                  onClick={() => navigate("/auth")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            {!user && (
              <Button 
                size="sm" 
                className="bg-primary text-primary-foreground hover:bg-tref-blue-hover text-xs px-3"
                onClick={() => navigate("/auth")}
              >
                Sign Up
              </Button>
            )}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <img src={trefLogo} alt="Tref" className="h-8 w-auto" />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-6">
                  <button
                    onClick={() => handleNavClick("/")}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <Home className="h-5 w-5 text-primary" />
                    <span className="font-medium">Properties</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("/auth")}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <PlusCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium">List Your Property</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("/")}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <Info className="h-5 w-5 text-primary" />
                    <span className="font-medium">About</span>
                  </button>
                  
                  <div className="border-t border-border my-4" />
                  
                  {user ? (
                    <>
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        Signed in as {user.email}
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors text-left text-destructive"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavClick("/auth")}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <User className="h-5 w-5 text-primary" />
                      <span className="font-medium">Login / Sign Up</span>
                    </button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
