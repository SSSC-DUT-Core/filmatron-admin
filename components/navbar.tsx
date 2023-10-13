"use client"
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
      setLoggedIn(Boolean(localStorage?.getItem('access_token')));
  })
  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        
        <div className="ml-auto flex items-center space-x-4">
        {isLoggedIn ? (<ThemeToggle />) : (<Button>Login</Button>)}
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;
