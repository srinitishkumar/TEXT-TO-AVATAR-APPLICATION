import React, { useState } from 'react';
import { Send, Loader2, RefreshCw, Download, Sparkles, Image as ImageIcon, Wand2 } from 'lucide-react';

const styles = [
  { id: 'professional', name: 'Professional', icon: '👔' },
  { id: 'casual', name: 'Casual', icon: '👕' },
  { id: 'creative', name: 'Creative', icon: '🎨' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'tech', name: 'Tech', icon: '💻' },
  { id: 'artistic', name: 'Artistic', icon: '🎭' }
];

const examples = [
  {
    text: "A confident female CEO with short black hair, wearing a navy blazer and minimal makeup, radiating leadership",
    category: "Professional"
  },
  {
    text: "A male tech entrepreneur wearing a black turtleneck and modern glasses",
    category: "Tech"
  },
  {
    text: "A creative female artist with vibrant blue hair and a friendly smile",
    category: "Creative"
  },
  {
    text: "A distinguished male professor with salt and pepper beard and round glasses",
    category: "Academic"
  }
];

// Separate male and female avatar images
const maleAvatars = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
];

const femaleAvatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'
];

function App() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('professional');
  const [generatedAvatars, setGeneratedAvatars] = useState<string[]>([]);

  const detectGender = (text: string): 'male' | 'female' => {
    const lowerText = text.toLowerCase();
    const maleKeywords = ['man', 'male', 'guy', 'boy', 'gentleman', 'businessman', 'father', 'dad'];
    const femaleKeywords = ['woman', 'female', 'girl', 'lady', 'businesswoman', 'mother', 'mom'];

    const hasMaleKeyword = maleKeywords.some(keyword => lowerText.includes(keyword));
    const hasFemaleKeyword = femaleKeywords.some(keyword => lowerText.includes(keyword));

    return hasFemaleKeyword ? 'female' : 'male'; // Default to male if no gender is detected
  };

  const generateAvatars = async () => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const gender = detectGender(description);
      const avatarSet = gender === 'female' ? femaleAvatars : maleAvatars;
      
      // Generate 4 unique avatars from the gender-specific set
      const shuffled = [...avatarSet].sort(() => Math.random() - 0.5);
      setGeneratedAvatars(shuffled.slice(0, 4));
    } catch (err) {
      setError('Failed to generate avatars. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Avatar Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create stunning, professional avatars in seconds using AI. Perfect for social media, 
            business profiles, and personal branding.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Choose Your Style
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedStyle === style.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{style.icon}</div>
                      <div className="text-sm font-medium">{style.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label 
                  htmlFor="description" 
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Describe Your Avatar
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe how you want your avatar to look (e.g., 'A professional woman with short hair' or 'A male entrepreneur in a suit')..."
                  className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wand2 size={16} className="text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Quick Prompts:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setDescription(example.text)}
                      className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors"
                    >
                      {example.category}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateAvatars}
                disabled={!description.trim() || loading}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
              >
                {loading ? (
                  <><Loader2 className="animate-spin" size={20} /> Generating Your Avatars...</>
                ) : (
                  <><ImageIcon size={20} /> Generate 4 Variations</>
                )}
              </button>
            </div>

            <div>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              {generatedAvatars.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {generatedAvatars.map((avatar, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={avatar} 
                        alt={`Generated avatar ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <button 
                            className="p-2 bg-white rounded-full hover:bg-gray-100"
                            onClick={() => window.open(avatar, '_blank')}
                          >
                            <Download size={20} className="text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!generatedAvatars.length && !loading && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium">Your avatars will appear here</p>
                    <p className="text-sm">Choose a style and describe your avatar to get started</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;