"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  ShoppingCart, 
  Calendar, 
  Book,
  Settings,
  Bell,
  User,
  Search
} from "lucide-react"

const routes = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Grocery", path: "/grocery", icon: ShoppingCart },
  { name: "Meal Plan", path: "/meal-plan", icon: Calendar },
  { name: "Recipes", path: "/recipes", icon: Book },
  { name: "Explore", path: "/explore", icon: Search },
  { name: "Profile", path: "/profile", icon: User },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Settings", path: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-full bg-card border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold">DishyPal</h1>
      </div>
      <nav className="space-y-1">
        {routes.map((route) => {
          const Icon = route.icon
          return (
            <Link
              key={route.path}
              href={route.path}
              className={`flex items-center px-6 py-3 text-sm hover:bg-accent ${
                pathname === route.path ? "bg-accent" : ""
              }`}
            >
              <Icon className="mr-3 h-4 w-4" />
              {route.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

