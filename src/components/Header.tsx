import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { DiscordButton } from "@/components/DiscordButton";
const Header = () => {
  const {
    user,
    signOut
  } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigationItems = [{
    name: "Syllabus",
    path: "/syllabus"
  }, {
    name: "Resources",
    path: "/resources"
  }, {
    name: "Practice",
    path: "/practice"
  }, {
    name: "Vocabulary",
    path: "/vocabulary"
  }, {
    name: "AI Marking",
    path: "/ai-marking"
  }];
  return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      
      <div className="container relative flex h-14 items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105">
          <div className="relative">
            <img src="https://ik.imagekit.io/lqf8a8nmt/logo-modified.png?updatedAt=1752578868143" alt="EverythingEnglish Logo" className="h-8 w-8 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
            <span className="text-xs text-muted-foreground hidden sm:block">   English   Made   Effortless</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList className="space-x-1">
              {navigationItems.map(item => <NavigationMenuItem key={item.name}>
                  <Link to={item.path} className="group inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-5 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden">
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </NavigationMenuItem>)}

              {/* Profile link for authenticated users */}
              {user && <NavigationMenuItem>
                  <Link to="/profile" className="group inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-5 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden">
                    <span className="relative z-10">Profile</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </NavigationMenuItem>}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu and User Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col space-y-6 mt-6">
                  {/* User Profile Section */}
                  {user && <div className="flex items-center space-x-3 p-3 border-b border-border/50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || "Avatar"} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                          {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {user?.user_metadata?.full_name || "User"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user?.email}
                        </span>
                      </div>
                    </div>}

                  {/* Navigation Items */}
                  <nav className="flex flex-col space-y-2">
                    {navigationItems.map(item => <Link key={item.name} to={item.path} onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent/50 transition-colors duration-200">
                        <span>{item.name}</span>
                      </Link>)}

                    {user && <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent/50 transition-colors duration-200">
                        <span>Profile</span>
                      </Link>}
                  </nav>

                  {/* Discord Button - Full width container */}
                  <div className="px-3">
                    <div className="w-full flex justify-center">
                      <DiscordButton />
                    </div>
                  </div>

                  {/* Auth Actions */}
                  <div className="px-3 pt-4 border-t border-border/50">
                    {user ? <Button onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }} variant="outline" className="w-full">
                        Sign Out
                      </Button> : <Link to="/auth-resources" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Discord Button */}
          <div className="hidden lg:block">
            <DiscordButton />
          </div>
          
          {/* Desktop User Profile */}
          {user ? <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-accent/50 transition-all duration-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200" />
                    <Avatar className="h-8 w-8 border-2 border-primary/20 shadow-lg">
                      <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || "Avatar"} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-sm">
                        {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl" align="end" forceMount>
                  <div className="flex items-center space-x-3 p-3 border-b border-border/50">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || "Avatar"} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                        {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {user?.user_metadata?.full_name || "User"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  
                  <DropdownMenuItem asChild className="cursor-pointer mt-2">
                    <Link to="/profile" className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-accent/50 transition-colors duration-200">
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="my-2" />
                  
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer p-2 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors duration-200">
                    <span>Sign out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> : <div className="hidden lg:block">
              <Link to="/auth-resources">
                <Button variant="outline" size="sm" className="relative overflow-hidden bg-transparent border-primary/30 hover:border-primary/50 text-foreground hover:text-primary transition-all duration-300 h-9 px-4 font-medium shadow-sm">
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </div>}
        </div>
      </div>
    </header>;
};
export default Header;