import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Printer, Trash2, Eye, AlertCircle, Copy, Check, Pencil } from "lucide-react";
import { type LabelData, generateZPL } from "@/lib/zpl";
import { printerService } from "@/lib/browserPrint";

interface PrintQueueProps {
  queue: LabelData[];
  onRemove: (id: string) => void;
  onEdit: (label: LabelData) => void;
  onClear: () => void;
}

export function PrintQueue({ queue, onRemove, onEdit, onClear }: PrintQueueProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printerStatus, setPrinterStatus] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<LabelData | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const zplPreRef = useRef<HTMLPreElement>(null);

  const handlePrintAll = async () => {
    if (queue.length === 0) return;

    setIsPrinting(true);
    setPrinterStatus("Initializing printer...");

    try {
      // Get default printer
      const printer = await printerService.getDefaultPrinter();
      setPrinterStatus(`Connected to ${printer.name}`);

      // Generate ZPL for all labels
      const zplCommands = queue.map(label => generateZPL(label));

      setPrinterStatus(`Printing ${queue.length} label(s)...`);
      await printerService.printMultipleLabels(zplCommands);

      setPrinterStatus(`Successfully printed ${queue.length} label(s)!`);

      // Clear queue after successful print
      setTimeout(() => {
        onClear();
        setPrinterStatus("");
      }, 2000);
    } catch (error) {
      setPrinterStatus(`Error: ${(error as Error).message}`);
      console.error("Print error:", error);
    } finally {
      setIsPrinting(false);
    }
  };

  const handleViewZPL = (label: LabelData) => {
    setSelectedLabel(label);
    setIsCopied(false);
  };

  const handleCopyZPL = async () => {
    if (!selectedLabel) return;

    const zplCode = generateZPL(selectedLabel);

    try {
      await navigator.clipboard.writeText(zplCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleSelectZPL = () => {
    if (zplPreRef.current) {
      const range = document.createRange();
      range.selectNodeContents(zplPreRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <>
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl">Print Queue</CardTitle>
          {queue.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {queue.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Printer className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No labels in queue</p>
              <p className="text-sm mt-1">Add labels to start printing</p>
            </div>
          ) : (
            <>
              <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
                {queue.map((label, index) => (
                  <div
                    key={label.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-all animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {label.productName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${label.price} • {label.features.filter(f => f.trim()).length} features
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(label)}
                        title="Edit label"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewZPL(label)}
                        title="View ZPL code"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(label.id)}
                        className="text-destructive hover:text-destructive"
                        title="Remove from queue"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
                size="lg"
                onClick={handlePrintAll}
                disabled={isPrinting}
              >
                <Printer className="mr-2 h-5 w-5" />
                {isPrinting ? "Printing..." : `Print All (${queue.length})`}
              </Button>

              {printerStatus && (
                <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 animate-fade-in ${
                  printerStatus.includes("Error")
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary/10 text-primary"
                }`}>
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{printerStatus}</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* ZPL Preview Modal */}
      {selectedLabel && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelectedLabel(null)}
        >
          <Card
            className="max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>ZPL Code Preview</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyZPL}
                className="transition-all"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <pre
                ref={zplPreRef}
                className="bg-muted p-4 rounded-lg overflow-auto text-xs max-h-96 cursor-text select-text"
                onClick={handleSelectZPL}
              >
                {generateZPL(selectedLabel)}
              </pre>
              <Button
                className="w-full mt-4"
                onClick={() => setSelectedLabel(null)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
