import { Sidebar } from "@/components/sidebar"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import "./globals.css"
import { SupabaseProvider } from '@/contexts/SupabaseContext'
import { Suspense } from 'react'
import AuthCheck from '@/components/AuthCheck'
import Providers from "@/components/providers/query-provider"
// Simple spinner component
function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-background">
        <Providers>
          <Suspense fallback={<Spinner />}>
            <AuthCheck>
              <div className="flex w-full">
                <Sidebar />
                <main className="flex-1 flex flex-col min-h-screen">
                  <div className="flex-1 overflow-y-auto p-4">
                    {children}
                  </div>
                  <footer className="sticky bottom-0 border-t p-4 bg-background">
                    <div className="container mx-auto max-w-3xl">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="What would you like to prepare today..." 
                          className="pl-8 w-full"
                        />
                      </div>
                    </div>
                  </footer>
                </main>
              </div>
            </AuthCheck>
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}