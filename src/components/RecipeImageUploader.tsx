import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Check, 
  RefreshCw
} from 'lucide-react';
import { Language } from '../utils/i18n';

export const FOOD_IMAGE_PRESETS = [
  {
    id: 'kanda_poha',
    labelHi: 'कांदा पोहा',
    labelEn: 'Kanda Poha',
    url: '/src/assets/images/kanda_poha_1792898120761.jpg',
  },
  {
    id: 'dal_tadka',
    labelHi: 'दाल तड़का / दाल मखनी',
    labelEn: 'Dal Tadka / Lentils',
    url: '/src/assets/images/dal_tadka_1792898143890.jpg',
  },
  {
    id: 'paneer_curry',
    labelHi: 'शाही / बटर पनीर',
    labelEn: 'Paneer Butter Masala',
    url: '/src/assets/images/recipe_paneer_curry_1792785764650.jpg',
  },
  {
    id: 'palak_paneer',
    labelHi: 'पालक पनीर',
    labelEn: 'Palak Paneer',
    url: '/src/assets/images/palak_paneer_1792898173941.jpg',
  },
  {
    id: 'chana_masala',
    labelHi: 'छोले / चना मसाला',
    labelEn: 'Chana Masala / Chole',
    url: '/src/assets/images/chana_masala_1792898159327.jpg',
  },
  {
    id: 'pav_bhaji',
    labelHi: 'मुंबई पाव भाजी',
    labelEn: 'Mumbai Pav Bhaji',
    url: '/src/assets/images/pav_bhaji_1792898211659.jpg',
  },
  {
    id: 'biryani_pulao',
    labelHi: 'बिरयानी / पुलाव',
    labelEn: 'Biryani / Pulao',
    url: '/src/assets/images/recipe_biryani_pulao_1792785764334.jpg',
  },
  {
    id: 'aloo_paratha',
    labelHi: 'आलू पराठा / रोटी',
    labelEn: 'Aloo Paratha / Roti',
    url: '/src/assets/images/recipe_aloo_paratha_1792785765531.jpg',
  },
  {
    id: 'masala_dosa',
    labelHi: 'मसाला डोसा',
    labelEn: 'Masala Dosa',
    url: '/src/assets/images/recipe_masala_dosa_1792785765519.jpg',
  },
  {
    id: 'idli_sambar',
    labelHi: 'इडली / सांभर',
    labelEn: 'Idli / Sambar',
    url: '/src/assets/images/idli_sambar_1792898191876.jpg',
  },
  {
    id: 'pakora',
    labelHi: 'पकोड़े / भजिया',
    labelEn: 'Pakora / Bhajiya',
    url: '/src/assets/images/vegetable_pakora_1792898264058.jpg',
  },
  {
    id: 'dessert_kheer',
    labelHi: 'खीर / हलवा / मीठा',
    labelEn: 'Kheer / Halwa / Dessert',
    url: '/src/assets/images/rice_kheer_1792898460461.jpg',
  },
  {
    id: 'masala_chai',
    labelHi: 'मसाला चाय',
    labelEn: 'Masala Chai',
    url: '/src/assets/images/masala_chai_1792898231346.jpg',
  },
  {
    id: 'chimichurri',
    labelHi: 'चिमिचुरी / ग्रीन सॉस',
    labelEn: 'Chimichurri / Herb Sauce',
    url: '/src/assets/images/recipe_chimichurri_sauce_1792790482840.jpg',
  },
  {
    id: 'egg_paratha',
    labelHi: 'मुगलई अंडा पराठा',
    labelEn: 'Mughlai Egg Paratha',
    url: '/src/assets/images/egg_paratha_1792900020285.jpg',
  },
  {
    id: 'gobi_manchurian',
    labelHi: 'गोभी मंचूरियन',
    labelEn: 'Gobi Manchurian',
    url: '/src/assets/images/gobi_manchurian_1792900050099.jpg',
  },
  {
    id: 'french_beans_sabzi',
    labelHi: 'आलू बीन्स सब्ज़ी',
    labelEn: 'French Beans Sabzi',
    url: '/src/assets/images/french_beans_sabzi_1792900050624.jpg',
  },
  {
    id: 'mixed_veg_uttapam',
    labelHi: 'वेज उत्तपम',
    labelEn: 'Mixed Veg Uttapam',
    url: '/src/assets/images/mixed_veg_uttapam_1792900593682.jpg',
  },
  {
    id: 'moong_dal_chilla',
    labelHi: 'मूंग दाल चीला',
    labelEn: 'Moong Dal Chilla',
    url: '/src/assets/images/moong_dal_chilla_1792900595388.jpg',
  },
  {
    id: 'shahi_paneer',
    labelHi: 'शाही पनीर',
    labelEn: 'Shahi Paneer',
    url: '/src/assets/images/shahi_paneer_1792900594825.jpg',
  },
  {
    id: 'kadai_paneer',
    labelHi: 'कड़ाही पनीर',
    labelEn: 'Kadai Paneer',
    url: '/src/assets/images/kadai_paneer_1792900574276.jpg',
  },
  {
    id: 'paneer_pulao',
    labelHi: 'पनीर पुलाव',
    labelEn: 'Paneer Pulao',
    url: '/src/assets/images/paneer_pulao_1792900574687.jpg',
  },
  {
    id: 'aloo_matar',
    labelHi: 'आलू मटर रसेदार',
    labelEn: 'Aloo Matar Rasedar',
    url: '/src/assets/images/aloo_matar_curry_1792900594873.jpg',
  },
  {
    id: 'methi_matar_malai',
    labelHi: 'मेथी मटर मलाई',
    labelEn: 'Methi Matar Malai',
    url: '/src/assets/images/methi_matar_malai_1792900573269.jpg',
  },
  {
    id: 'egg_fried_rice',
    labelHi: 'एग फ्राइड राइस',
    labelEn: 'Egg Fried Rice',
    url: '/src/assets/images/egg_fried_rice_1792900573221.jpg',
  },
];

interface RecipeImageUploaderProps {
  currentImage: string;
  onImageChange: (newImageUrl: string) => void;
  language: Language;
}

export const RecipeImageUploader: React.FC<RecipeImageUploaderProps> = ({
  currentImage,
  onImageChange,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'url'>('presets');
  const [customUrl, setCustomUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress & convert file to light Base64 data URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError(language === 'hi' ? 'कृपया केवल इमेज फ़ाइल चुनें।' : 'Please select an image file.');
      return;
    }

    setIsProcessing(true);
    setUploadError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to resize to max 800px width
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          onImageChange(compressedDataUrl);
          setIsProcessing(false);
        } else {
          onImageChange(event.target?.result as string);
          setIsProcessing(false);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onImageChange(customUrl.trim());
      setCustomUrl('');
    }
  };

  return (
    <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E1D5] space-y-3">
      {/* Current Preview Banner */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-36 h-28 sm:h-24 rounded-xl overflow-hidden border-2 border-stone-200 bg-stone-100 shrink-0 shadow-xs group">
          <img
            src={currentImage}
            alt="Recipe Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/src/assets/images/recipe_biryani_pulao_1792785764334.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
            Selected Photo
          </div>
        </div>

        <div className="flex-1 space-y-1 text-center sm:text-left w-full">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Camera className="w-4 h-4 text-[#E76F51]" />
            <h4 className="text-xs font-bold text-stone-900">
              {language === 'hi' ? 'रेसिपी की फ़ोटो (Recipe Photo)' : 'Recipe Photo'}
            </h4>
          </div>
          <p className="text-[11px] text-stone-500">
            {language === 'hi' 
              ? 'फ़ोन गैलरी से अपलोड करें, तैयार फ़ोटो चुनें, या लिंक डालें' 
              : 'Upload from camera/gallery, pick a delicious preset, or paste a URL'}
          </p>

          {/* Quick Upload Button */}
          <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-[#1B4332] hover:bg-[#235842] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'गैलरी/फ़ोन से फ़ोटो चुनें' : 'Upload from Phone'}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {isProcessing && (
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800 text-xs font-semibold text-center animate-pulse">
          ⏳ {language === 'hi' ? 'फ़ोटो प्रोसेस हो रही है...' : 'Processing image...'}
        </div>
      )}

      {uploadError && (
        <div className="p-2 bg-red-50 text-red-700 text-xs rounded-lg font-medium">
          {uploadError}
        </div>
      )}

      {/* Selector Tabs: Presets / Web URL */}
      <div className="pt-2 border-t border-[#E8E1D5]">
        <div className="flex items-center gap-2 mb-2">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
              activeTab === 'presets'
                ? 'bg-stone-800 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {language === 'hi' ? 'तैयार फ़ोटो में से चुनें (Presets)' : 'Choose Preset'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
              activeTab === 'url'
                ? 'bg-stone-800 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {language === 'hi' ? 'वेब इमेज लिंक (URL)' : 'Paste Image URL'}
          </button>
        </div>

        {/* Tab 1: Presets Grid */}
        {activeTab === 'presets' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {FOOD_IMAGE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onImageChange(preset.url)}
                className={`group relative rounded-xl overflow-hidden border-2 text-left p-1 transition-all cursor-pointer ${
                  currentImage === preset.url
                    ? 'border-[#1B4332] ring-2 ring-[#1B4332]/30 shadow-xs'
                    : 'border-transparent hover:border-stone-300'
                }`}
              >
                <div className="h-16 w-full rounded-lg overflow-hidden bg-stone-200 relative">
                  <img
                    src={preset.url}
                    alt={preset.labelEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {currentImage === preset.url && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <span className="block text-[10px] font-bold text-stone-800 mt-1 truncate">
                  {language === 'hi' ? preset.labelHi : preset.labelEn}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Tab 2: Custom URL Form */}
        {activeTab === 'url' && (
          <form onSubmit={handleApplyUrl} className="flex gap-2 pt-1">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://images.unsplash.com/...jpg"
              className="flex-1 px-3 py-1.5 bg-white border border-[#E8E1D5] rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#1B4332]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#1B4332] text-white font-bold text-xs rounded-lg hover:bg-[#235842] transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'सेट करें' : 'Set Image'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
