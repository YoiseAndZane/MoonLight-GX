import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/UserContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";
import Assistant from "@/pages/Assistant";
import Developer from "@/pages/Developer";
import ProxyNetwork from "@/pages/Proxy"; 
import Profile from "@/pages/Profile";
import BrowserToolBox from "@/pages/BrowserToolBox";
import Games from "@/pages/Games";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/assistant" component={Assistant}/>
      <Route path="/developer" component={Developer}/>
      <Route path="/proxy" component={ProxyNetwork}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/toolbox" component={BrowserToolBox}/>
      <Route path="/games" component={Games}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router />
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
