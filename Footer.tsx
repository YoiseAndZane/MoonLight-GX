import { Link } from 'wouter'

export function Footer() {
  return (
    <footer className="py-6 text-center text-foreground/50 text-sm">
      <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
        <Link href="/privacy">
          <div className="hover:text-primary transition-colors cursor-pointer">Privacy</div>
        </Link>
        <Link href="/terms">
          <div className="hover:text-primary transition-colors cursor-pointer">Terms</div>
        </Link>
        <Link href="/settings">
          <div className="hover:text-primary transition-colors cursor-pointer">Settings</div>
        </Link>
        <a 
          href="https://discord.gg/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors flex items-center"
        >
          <i className="fab fa-discord mr-1"></i> Join our Discord
        </a>
      </div>
      <p>© {new Date().getFullYear()} MoonLight GX Browser · Designed with <span className="text-destructive">♥</span> for gamers</p>
    </footer>
  )
}
