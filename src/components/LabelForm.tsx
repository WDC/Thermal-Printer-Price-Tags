import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Plus } from "lucide-react";
import { createLabelData, type LabelData } from "@/lib/zpl";

interface LabelFormProps {
  onAddToQueue: (label: LabelData) => void;
  onPreviewChange?: (label: LabelData | null) => void;
  editingLabel?: LabelData | null;
}

export function LabelForm({ onAddToQueue, onPreviewChange, editingLabel }: LabelFormProps) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [feature1, setFeature1] = useState("");
  const [feature2, setFeature2] = useState("");
  const [feature3, setFeature3] = useState("");
  const [errors, setErrors] = useState({ productName: false, price: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = parseFloat(price);
    const hasValidPrice = !isNaN(priceNum) && priceNum > 0;
    const hasValidProductName = productName.trim().length > 0;

    // Update error states
    setErrors({
      productName: !hasValidProductName,
      price: !hasValidPrice,
    });

    // If there are errors, don't submit
    if (!hasValidPrice || !hasValidProductName) {
      return;
    }

    const label = createLabelData(
      productName,
      priceNum,
      [feature1, feature2, feature3].filter(f => f.trim())
    );

    onAddToQueue(label);

    // Reset form
    setProductName("");
    setPrice("");
    setFeature1("");
    setFeature2("");
    setFeature3("");
    setErrors({ productName: false, price: false });
  };

  const getCurrentLabel = (): LabelData | null => {
    const priceNum = parseFloat(price);
    if (!productName.trim() && !price.trim()) return null;

    return createLabelData(
      productName || "Product Name",
      isNaN(priceNum) ? 0 : priceNum,
      [feature1, feature2, feature3]
    );
  };

  // Populate form when editing a label
  useEffect(() => {
    if (editingLabel) {
      setProductName(editingLabel.productName);
      setPrice(editingLabel.price.toString());
      setFeature1(editingLabel.features[0] || "");
      setFeature2(editingLabel.features[1] || "");
      setFeature3(editingLabel.features[2] || "");
      setErrors({ productName: false, price: false });
    }
  }, [editingLabel]);

  // Clear errors when user types
  useEffect(() => {
    if (errors.productName && productName.trim()) {
      setErrors(prev => ({ ...prev, productName: false }));
    }
  }, [productName]);

  useEffect(() => {
    if (errors.price && price && !isNaN(parseFloat(price)) && parseFloat(price) > 0) {
      setErrors(prev => ({ ...prev, price: false }));
    }
  }, [price]);

  // Update preview when form changes
  useEffect(() => {
    if (onPreviewChange) {
      onPreviewChange(getCurrentLabel());
    }
  }, [productName, price, feature1, feature2, feature3]);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Create Label</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName" className={errors.productName ? "text-destructive" : ""}>
              Product Name {errors.productName && <span className="text-xs">(required)</span>}
            </Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Federal 9mm 124gr Ammunition (1,000 Rounds)"
              className={`transition-all focus:scale-[1.01] ${
                errors.productName
                  ? "border-destructive animate-error-flash"
                  : ""
              }`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className={errors.price ? "text-destructive" : ""}>
              Price {errors.price && <span className="text-xs">(required)</span>}
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="250"
              className={`transition-all focus:scale-[1.01] ${
                errors.price
                  ? "border-destructive animate-error-flash"
                  : ""
              }`}
            />
          </div>

          <div className="space-y-2">
            <Label>Features (up to 3)</Label>
            <Input
              value={feature1}
              onChange={(e) => setFeature1(e.target.value)}
              placeholder="1,200 Feet Per Second (FPS)"
              className="transition-all focus:scale-[1.01]"
            />
            <Input
              value={feature2}
              onChange={(e) => setFeature2(e.target.value)}
              placeholder="Full Metal Jacket (FMJ)"
              className="transition-all focus:scale-[1.01]"
            />
            <Input
              value={feature3}
              onChange={(e) => setFeature3(e.target.value)}
              placeholder="Third Line"
              className="transition-all focus:scale-[1.01]"
            />
          </div>

          <Button
            type="submit"
            className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add to Queue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
