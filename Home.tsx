import { StarBackground } from '@/components/StarBackground'
import { Sidebar } from '@/components/Sidebar'
import { GreetingHeader } from '@/components/GreetingHeader'
import { SearchBar } from '@/components/SearchBar'
import { QuickAccessTiles } from '@/components/QuickAccessTiles'
import { ControlsSection } from '@/components/ControlsSection'
import { SuggestionsSection } from '@/components/SuggestionsSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <StarBackground />
      
      <div className="min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1 pl-16 md:pl-20">
          <div className="container mx-auto px-4 py-8">
            <GreetingHeader />
            <SearchBar />
            <QuickAccessTiles />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <ControlsSection />
              <SuggestionsSection />
            </div>
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
