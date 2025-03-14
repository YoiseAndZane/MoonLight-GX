import { StarBackground } from '@/components/StarBackground'
import { Sidebar } from '@/components/Sidebar'
import { Footer } from '@/components/Footer'
import { AIAssistant } from '@/components/AIAssistant'

export default function Assistant() {
  return (
    <div className="min-h-screen">
      <StarBackground />
      
      <div className="min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1 pl-16 md:pl-20">
          <div className="container mx-auto px-4 py-8">
            <div className="py-6 mb-6">
              <h1 className="font-orbitron text-3xl font-bold mb-2">MoonLight AI Companion</h1>
              <p className="text-foreground/70">Your personal gaming assistant for recommendations, optimization, and help</p>
            </div>
            
            <div className="mb-12">
              <AIAssistant />
            </div>
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
