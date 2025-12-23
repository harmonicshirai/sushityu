import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

/*
 * Design Philosophy: 陰翳礼讃モダン (Inyei Raisan Modernism)
 * 
 * This design is inspired by Junichiro Tanizaki's "In Praise of Shadows"
 * - Dark lacquer backgrounds to highlight food photography
 * - Warm lantern-like gold accents
 * - Vermillion red for traditional Japanese aesthetics
 * - Subtle animations that evoke candlelight flickering
 * 
 * Typography:
 * - Noto Serif JP for headings (tradition & dignity)
 * - Noto Sans JP for body text (readability)
 * - Cormorant Garamond for prices/numbers (elegance)
 */

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
