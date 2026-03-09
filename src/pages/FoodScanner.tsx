import { useState, useRef, ChangeEvent } from "react";
import { Camera, Upload, X, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import axios from "axios";

interface NutritionData {
  foodName: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  confidence: number;
}

interface ScanResult {
  id: number;
  foodName: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  timestamp: string;
}

export default function FoodScanner() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setNutritionData(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScanImage = async () => {
    if (!selectedImage) return;

    setIsScanning(true);
    try {
      const token = localStorage.getItem("token");
      
      // Convert base64 to blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      
      // Create form data
      const formData = new FormData();
      formData.append("image", blob, "food.jpg");

      const result = await axios.post(
        "http://localhost:3000/api/nutrition/scan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      setNutritionData(result.data.nutrition);
      
      // Add to history
      setScanHistory((prev) => [
        {
          id: Date.now(),
          foodName: result.data.nutrition.foodName,
          calories: result.data.nutrition.calories,
          carbs: result.data.nutrition.carbs,
          protein: result.data.nutrition.protein,
          fat: result.data.nutrition.fat,
          timestamp: new Date().toISOString(),
        },
        ...prev.slice(0, 9), // Keep last 10 scans
      ]);

      toast.success("Food scanned successfully!");
    } catch (error: any) {
      console.error("Scan error:", error);
      toast.error(error.response?.data?.error || "Failed to scan food");
    } finally {
      setIsScanning(false);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setNutritionData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Food Scanner</h1>
        <p className="mt-2 text-gray-600">
          Upload a photo of your food to get instant nutrition estimates
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!selectedImage ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors"
              >
                <div className="flex flex-col items-center gap-3">
                  <Upload className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="text-lg font-medium text-gray-700">Upload Photo</p>
                    <p className="text-sm text-gray-500">Click to browse files</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  // In a real app, this would open camera
                  toast.info("Camera feature coming soon!");
                }}
                className="flex-1 py-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors"
              >
                <div className="flex flex-col items-center gap-3">
                  <Camera className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="text-lg font-medium text-gray-700">Take Photo</p>
                    <p className="text-sm text-gray-500">Use device camera</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm textblue-800">
                <strong>Tips:</strong> For best results, take clear photos with good lighting.
                Images should be less than 5MB.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Image Preview */}
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected food"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={handleClearImage}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scan Button */}
            {!nutritionData && (
              <button
                onClick={handleScanImage}
                disabled={isScanning}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isScanning ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing food...
                  </span>
                ) : (
                  "Scan Food"
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Nutrition Results */}
      <AnimatePresence>
        {nutritionData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  {nutritionData.foodName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Confidence: {Math.round(nutritionData.confidence * 100)}%
                </p>
              </div>
            </div>

            {/* Nutrition Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Calories</p>
                <p className="text-2xl font-bold text-orange-600">
                  {nutritionData.calories}
                </p>
                <p className="text-xs text-gray-500">kcal</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Carbs</p>
                <p className="text-2xl font-bold text-blue-600">
                  {nutritionData.carbs}g
                </p>
                <p className="text-xs text-gray-500">carbohydrates</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Protein</p>
                <p className="text-2xl font-bold text-purple-600">
                  {nutritionData.protein}g
                </p>
                <p className="text-xs text-gray-500">protein</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Fat</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {nutritionData.fat}g
                </p>
                <p className="text-xs text-gray-500">total fat</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Fiber</p>
                <p className="text-2xl font-bold text-green-600">
                  {nutritionData.fiber}g
                </p>
                <p className="text-xs text-gray-500">dietary fiber</p>
              </div>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Sugar</p>
                <p className="text-2xl font-bold text-pink-600">
                  {nutritionData.sugar}g
                </p>
                <p className="text-xs text-gray-500">total sugars</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Sodium</p>
                <p className="text-2xl font-bold text-red-600">
                  {nutritionData.sodium}mg
                </p>
                <p className="text-xs text-gray-500">salt content</p>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Net Carbs</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {nutritionData.carbs - nutritionData.fiber}g
                </p>
                <p className="text-xs text-gray-500">carbs - fiber</p>
              </div>
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Nutrition values are estimates based on image recognition.
                Actual values may vary based on preparation method and portion size.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scan History */}
      {scanHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Scans</h3>
          <div className="space-y-3">
            {scanHistory.map((scan) => (
              <div
                key={scan.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{scan.foodName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(scan.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-600">
                    {scan.calories} kcal
                  </p>
                  <p className="text-xs text-gray-500">
                    C: {scan.carbs}g • P: {scan.protein}g • F: {scan.fat}g
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
