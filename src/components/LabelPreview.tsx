import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { type LabelData } from "@/lib/zpl";

interface LabelPreviewProps {
  label: LabelData | null;
}

export function LabelPreview({ label }: LabelPreviewProps) {
  if (!label) {
    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl">Live Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Start typing to see preview</p>
        </CardContent>
      </Card>
    );
  }

  const priceString = `$${label.price || 0}`;
  const priceDigits = Math.floor(label.price).toString().length;

  // Determine text size and positioning based on digit count
  let priceTextSize = "text-5xl";
  let priceMarginLeft = "ml-0";

  if (priceDigits === 1) {
    priceTextSize = "text-6xl";
    priceMarginLeft = "ml-4";
  } else if (priceDigits === 2) {
    priceTextSize = "text-5xl";
    priceMarginLeft = "ml-2";
  } else if (priceDigits === 3) {
    priceTextSize = "text-4xl";
    priceMarginLeft = "ml-0";
  } else if (priceDigits >= 4) {
    priceTextSize = "text-3xl";
    priceMarginLeft = "-ml-2";
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Live Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[2/1] border-2 border-dashed border-border rounded-lg bg-white overflow-hidden">
          {/* Label mockup - simulating 4x2 label */}
          <div className="absolute inset-0 p-4 scale-75 origin-top-left">
            {/* Product Name */}
            <div className="text-xs font-medium text-black mb-8 leading-tight">
              {label.productName || "Product Name"}
            </div>

            <div className="flex items-start justify-between">
              {/* Left side - Logo placeholder */}
              <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded flex items-center justify-center text-white text-xs">
                LOGO
              </div>

              {/* Right side - Content */}
              <div className="flex-1 ml-8">
                {/* Features */}
                <div className="space-y-1 mb-8">
                  {label.features.map((feature, index) => (
                    feature.trim() && (
                      <div key={index} className="text-[10px] text-black">
                        - {feature}
                      </div>
                    )
                  ))}
                </div>

                {/* Price */}
                <div className="mt-8">
                  <div
                    className={`${priceTextSize} font-bold text-black transition-all duration-300 ${priceMarginLeft}`}
                  >
                    {priceString}
                  </div>
                  <div className="text-[10px] text-black mt-2 ml-16">
                    Sales Tax Incl.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Label info */}
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Label ID: {label.id}</p>
          <p className="text-xs mt-1">4" x 2" Thermal Label</p>
        </div>
      </CardContent>
    </Card>
  );
}
