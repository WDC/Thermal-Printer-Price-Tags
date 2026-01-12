import { useState, useEffect } from "react";
import { LabelForm } from "./components/LabelForm";
import { LabelPreview } from "./components/LabelPreview";
import { PrintQueue } from "./components/PrintQueue";
import { type LabelData } from "./lib/zpl";
import { Printer, Package, Moon, Sun } from "lucide-react";
import { useTheme } from "./hooks/useTheme";
import { Button } from "./components/ui/button";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [queue, setQueue] = useState<LabelData[]>([]);
  const [currentPreview, setCurrentPreview] = useState<LabelData | null>(null);
  const [editingLabel, setEditingLabel] = useState<LabelData | null>(null);

  // Load queue from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("labelQueue");
    if (saved) {
      try {
        setQueue(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load queue:", e);
      }
    }
  }, []);

  // Save queue to localStorage
  useEffect(() => {
    localStorage.setItem("labelQueue", JSON.stringify(queue));
  }, [queue]);

  const handleAddToQueue = (label: LabelData) => {
    setQueue((prev) => [...prev, label]);
    setEditingLabel(null);
  };

  const handleRemoveFromQueue = (id: string) => {
    setQueue((prev) => prev.filter((label) => label.id !== id));
  };

  const handleEditLabel = (label: LabelData) => {
    setEditingLabel(label);
    handleRemoveFromQueue(label.id);
  };

  const handleClearQueue = () => {
    setQueue([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 animate-fade-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Printer className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">ZPL Label Printer</h1>
                <p className="text-sm text-muted-foreground">
                  Create and print thermal labels with Zebra Browser Print
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">
                  {queue.length} in queue
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form and Preview */}
          <div className="space-y-6">
            <LabelForm
              onAddToQueue={handleAddToQueue}
              onPreviewChange={setCurrentPreview}
              editingLabel={editingLabel}
            />
            <LabelPreview label={currentPreview} />
          </div>

          {/* Right Column - Queue */}
          <div>
            <PrintQueue
              queue={queue}
              onRemove={handleRemoveFromQueue}
              onEdit={handleEditLabel}
              onClear={handleClearQueue}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg border shadow-sm animate-fade-in">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Getting Started
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>
                Download and install{" "}
                <a
                  href="https://www.zebra.com/us/en/support-downloads/software/printer-software/browser-print.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Zebra Browser Print
                </a>{" "}
                for your operating system
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>Connect your Zebra printer and ensure it's powered on</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>Fill out the label form with your product details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">4.</span>
              <span>
                Add multiple labels to the queue and print them all at once
              </span>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Built with React, TypeScript, Tailwind CSS, and Zebra Browser Print
          </p>
        </div>
      </footer>
    </div>
  );
}

function AlertCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default App;
