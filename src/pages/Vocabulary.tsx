import React, { useState, useEffect } from 'react';
import { Shuffle, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Word synonyms mapping - easily editable
const wordSynonyms = {
   // Emotions & Feelings
  "happy": ["joyful", "cheerful", "content", "delighted", "gleeful"],
  "sad": ["unhappy", "sorrowful", "miserable", "downcast", "forlorn"],
  "angry": ["furious", "irate", "mad", "outraged", "wrathful"],
  "calm": ["peaceful", "serene", "tranquil", "relaxed", "placid"],
  "nervous": ["anxious", "restless", "jittery", "tense", "uneasy"],
  "excited": ["thrilled", "eager", "elated", "ecstatic", "overjoyed"],
  "bored": ["weary", "apathetic", "indifferent", "listless", "spiritless"],
  "hopeful": ["optimistic", "encouraged", "buoyant", "positive", "confident"],
  "hopeless": ["despairing", "defeated", "pessimistic", "downhearted", "despondent"],
  "lonely": ["isolated", "forsaken", "abandoned", "friendless", "desolate"],
  "jealous": ["envious", "covetous", "resentful", "begrudging", "green-eyed"],
  "grateful": ["thankful", "appreciative", "obliged", "indebted", "recognizing"],
  "confident": ["self-assured", "bold", "secure", "poised", "certain"],
  "insecure": ["uncertain", "self-doubting", "hesitant", "shaky", "timid"],
  "curious": ["inquisitive", "nosy", "interested", "questioning", "probing"],
  "ashamed": ["embarrassed", "humiliated", "mortified", "sheepish", "regretful"],
  "proud": ["dignified", "honored", "self-respecting", "vain", "haughty"],
  "relieved": ["comforted", "consoled", "soothed", "reassured", "calmed"],
  "disgusted": ["repulsed", "revolted", "appalled", "sickened", "grossed out"],
  "surprised": ["astonished", "amazed", "startled", "shocked", "stunned"],
  "fearful": ["afraid", "timid", "cowardly", "anxious", "terrified"],
  "content": ["satisfied", "pleased", "fulfilled", "happy", "at ease"],
  "frustrated": ["exasperated", "irritated", "annoyed", "vexed", "bothered"],
  "peaceful": ["harmonious", "restful", "placid", "quiet", "serene"],
  "stressed": ["strained", "overwhelmed", "tense", "frazzled", "pressured"],
  "guilty": ["remorseful", "regretful", "ashamed", "repentant", "penitent"],
  "hurt": ["injured", "wounded", "bruised", "pained", "aching"],
  "overwhelmed": ["swamped", "flooded", "overloaded", "burdened", "engulfed"],
  "ecstatic": ["euphoric", "blissful", "exhilarated", "rapturous", "thrilled"],
  "melancholy": ["wistful", "blue", "depressed", "mournful", "pensive"],
  "resentful": ["bitter", "grudging", "spiteful", "envious", "ill-tempered"],
  "passionate": ["ardent", "intense", "fervent", "zealous", "devoted"],
  "apathetic": ["indifferent", "uninterested", "detached", "spiritless", "emotionless"],
  "compassionate": ["empathetic", "sympathetic", "caring", "kindhearted", "tender"],
  "angsty": ["brooding", "moody", "restless", "troubled", "tense"],
  "delighted": ["overjoyed", "ecstatic", "glad", "thrilled", "jubilant"],
  "anxious": ["worried", "apprehensive", "concerned", "unsettled", "nervy"],

  // Personality & Traits
  "kind": ["gentle", "caring", "generous", "warmhearted", "thoughtful"],
  "mean": ["cruel", "harsh", "unkind", "spiteful", "vicious"],
  "arrogant": ["conceited", "haughty", "pompous", "egotistical", "vain"],
  "humble": ["modest", "unassuming", "meek", "down-to-earth", "reserved"],
  "serious": ["solemn", "grave", "earnest", "stern", "formal"],
  "silly": ["goofy", "ridiculous", "absurd", "foolish", "clownish"],
  "charismatic": ["magnetic", "captivating", "charming", "alluring", "engaging"],
  "dull": ["dreary", "colorless", "monotonous", "lifeless", "uninspiring"],
  "moody": ["temperamental", "sullen", "irritable", "volatile", "brooding"],
  "cheerful": ["upbeat", "sunny", "lighthearted", "merry", "joyful"],
  "brutal": ["savage", "vicious", "merciless", "barbaric", "ruthless"],
  "stubborn": ["headstrong", "obstinate", "pigheaded", "unyielding", "willful"],
  "generous": ["giving", "charitable", "philanthropic", "openhanded", "benevolent"],
  "selfish": ["egocentric", "narcissistic", "self-centered", "greedy", "grasping"],

  // Appearance & Looks
  "beautiful": ["gorgeous", "stunning", "pretty", "lovely", "attractive"],
  "ugly": ["unsightly", "hideous", "repellent", "vile", "grotesque"],
  "plain": ["average", "ordinary", "unremarkable", "bland", "modest"],
  "stylish": ["fashionable", "trendy", "elegant", "chic", "classy"],
  "glamorous": ["dazzling", "sparkling", "radiant", "opulent", "luxurious"],
  "handsome": ["dashing", "striking", "well-built", "attractive", "appealing"],
  "shabby": ["scruffy", "worn", "ragged", "unkempt", "tattered"],
  "elegant": ["refined", "graceful", "sophisticated", "chic", "polished"],

  // Size, Shape & Amount
  "big": ["large", "huge", "immense", "gigantic", "enormous"],
  "small": ["tiny", "minute", "miniature", "little", "petite"],
  "gigantic": ["colossal", "mammoth", "immense", "enormous", "massive"],
  "tiny": ["itsy-bitsy", "teeny", "minute", "microscopic", "mini"],
  "round": ["circular", "spherical", "orb-like", "curved", "ring-shaped"],
  "square": ["boxy", "angular", "rectangular", "blocky", "cubed"],
  "thin": ["slender", "slim", "narrow", "lean", "svelte"],
  "thick": ["dense", "bulky", "hefty", "substantial", "solid"],

  // Strength, Power & Energy
  "powerful": ["dominant", "commanding", "influential", "authoritative", "strong"],
  "weak": ["frail", "feeble", "infirm", "debilitated", "fragile"],
  "energetic": ["peppy", "zippy", "vigorous", "sprightly", "active"],
  "lethargic": ["slothful", "torpid", "inactive", "apathetic", "listless"],
  "strong": ["sturdy", "muscular", "brawny", "solid", "hardy"],
  "fragile": ["delicate", "breakable", "frail", "vulnerable", "brittle"],

  // Intelligence & Thought
  "intelligent": ["bright", "clever", "knowledgeable", "quick-witted", "sharp"],
  "stupid": ["dim-witted", "dull", "simple-minded", "slow", "dense"],
  "thoughtful": ["pensive", "contemplative", "reflective", "considerate", "caring"],
  "ignorant": ["clueless", "uninformed", "illiterate", "naïve", "uneducated"],

  // Time & Frequency
  "instant": ["immediate", "sudden", "abrupt", "rapid", "swift"],
  "eternal": ["everlasting", "timeless", "perpetual", "infinite", "immortal"],
  "brief": ["fleeting", "momentary", "short-lived", "transient", "passing"],
  "endless": ["limitless", "boundless", "interminable", "unending", "infinite"],

  // Quality & Value
  "precious": ["valuable", "cherished", "priceless", "treasured", "rare"],
  "cheap": ["shoddy", "inferior", "second-rate", "trashy", "budget"],
  "luxurious": ["lavish", "sumptuous", "extravagant", "opulent", "deluxe"],
  "basic": ["ordinary", "standard", "average", "commonplace", "plain"],

  // Speed & Urgency
  "urgent": ["pressing", "critical", "imperative", "dire", "crucial"],
  "lazy": ["sluggish", "slow-moving", "idle", "slothful", "apathetic"],
  "hasty": ["rash", "reckless", "hurried", "impulsive", "speedy"],

  // Colors & Visual Descriptors
  "red": ["scarlet", "crimson", "ruby", "cherry", "vermilion"],
  "blue": ["cerulean", "turquoise", "teal", "indigo", "navy"],
  "green": ["verdant", "leafy", "mossy", "olive", "emerald"],
  "yellow": ["golden", "amber", "lemon", "sunny", "blonde"],
  "purple": ["violet", "lavender", "plum", "mauve", "indigo"],
  "gold": ["gilded", "lustrous", "shimmering", "gleaming", "glittering"],
  "silver": ["metallic", "shiny", "sparkling", "glittering", "polished"],

  // Weather & Nature
  "hot": ["blazing", "sizzling", "fiery", "searing", "scorching"],
  "cold": ["icy", "chilly", "frosty", "nippy", "frigid"],
  "windy": ["gusty", "howling", "tempestuous", "blustery", "breezy"],
  "rainy": ["showery", "pouring", "drizzling", "misty", "stormy"],

  // Misc / Catch-All
  "weird": ["strange", "odd", "peculiar", "bizarre", "quirky"],
  "normal": ["regular", "standard", "typical", "ordinary", "conventional"],
  "rare": ["scarce", "unusual", "exceptional", "extraordinary", "unique"],
  "common": ["usual", "frequent", "prevailing", "familiar", "standard"],

   // States & Conditions
  "alive": ["living", "animated", "breathing", "vital", "sentient"],
  "dead": ["lifeless", "deceased", "departed", "defunct", "extinct"],
  "awake": ["alert", "conscious", "watchful", "aware", "attentive"],
  "asleep": ["dormant", "slumbering", "dozing", "napping", "unconscious"],
  "healthy": ["fit", "well", "robust", "vigorous", "hardy"],
  "sick": ["ill", "ailing", "unwell", "feverish", "diseased"],
  "clean": ["spotless", "pure", "immaculate", "sterile", "hygienic"],
  "dirty": ["filthy", "grimy", "soiled", "muddy", "stained"],
  "wet": ["damp", "moist", "soaked", "soggy", "saturated"],
  "dry": ["arid", "parched", "withered", "dehydrated", "barren"],
  "empty": ["vacant", "hollow", "bare", "deserted", "unfilled"],
  "full": ["packed", "stuffed", "crammed", "loaded", "overflowing"],
  "open": ["exposed", "uncovered", "accessible", "ajar", "unsealed"],
  "closed": ["shut", "sealed", "barred", "locked", "fastened"],

  // Extremes (intense descriptors)
  "loud": ["noisy", "boisterous", "rowdy", "deafening", "clamorous"],
  "quiet": ["silent", "hushed", "mute", "soft-spoken", "peaceful"],
  "bright": ["luminous", "radiant", "glowing", "vivid", "brilliant"],
  "dark": ["dim", "shadowy", "gloomy", "dusky", "murky"],
  "rich": ["wealthy", "affluent", "prosperous", "opulent", "lavish"],
  "poor": ["destitute", "impoverished", "needy", "penniless", "indigent"],
  "easy": ["simple", "effortless", "straightforward", "painless", "uncomplicated"],
  "hard": ["difficult", "challenging", "arduous", "tough", "strenuous"],

  // Abstract Qualities
  "honest": ["truthful", "sincere", "genuine", "upright", "candid"],
  "dishonest": ["deceitful", "fraudulent", "lying", "corrupt", "insincere"],
  "loyal": ["faithful", "devoted", "trustworthy", "dependable", "steadfast"],
  "disloyal": ["unfaithful", "traitorous", "treacherous", "fickle", "unreliable"],
  "brave": ["courageous", "fearless", "valiant", "bold", "heroic"],
  "cowardly": ["fearful", "timid", "gutless", "spineless", "craven"],
  "fair": ["just", "equitable", "impartial", "reasonable", "unbiased"],
  "unfair": ["biased", "partial", "prejudiced", "unjust", "one-sided"],
  "wise": ["sage", "prudent", "judicious", "knowledgeable", "enlightened"],
  "foolish": ["silly", "reckless", "irrational", "senseless", "unwise"],

  // Contrasts & Comparisons
  "new": ["fresh", "recent", "novel", "modern", "brand-new"],
  "old": ["ancient", "aged", "elderly", "antique", "archaic"],
  "young": ["juvenile", "immature", "youthful", "adolescent", "tender"],
  "mature": ["grown", "adult", "developed", "ripe", "seasoned"],
  "fast": ["quick", "speedy", "rapid", "swift", "fleet"],
  "slow": ["sluggish", "unhurried", "deliberate", "lethargic", "lagging"],
  "near": ["close", "adjacent", "proximal", "neighboring", "handy"],
  "far": ["distant", "remote", "faraway", "outlying", "secluded"],

  // Atmosphere & Mood
  "friendly": ["amiable", "cordial", "sociable", "pleasant", "welcoming"],
  "unfriendly": ["hostile", "cold", "aloof", "distant", "antagonistic"],
  "joyful": ["merry", "jubilant", "ecstatic", "exuberant", "radiant"],
  "miserable": ["wretched", "depressed", "gloomy", "sorrowful", "despondent"],
  "hopeful2": ["optimistic", "positive", "encouraged", "bright", "upbeat"],
  "hopeless2": ["despairing", "bleak", "pessimistic", "forlorn", "defeated"],
  "tense": ["strained", "stiff", "rigid", "uptight", "jittery"],
  "relaxed": ["calm", "chill", "laid-back", "easygoing", "serene"],

  // Texture & Material
  "soft": ["plush", "cushy", "smooth", "gentle", "silky"],
  "rigid": ["solid", "firm", "unyielding", "tough", "stiff"],
  "rough": ["coarse", "jagged", "gritty", "scratchy", "rugged"],
  "smooth": ["sleek", "polished", "glossy", "velvety", "fluid"],
  "sticky": ["tacky", "adhesive", "gummy", "gluey", "clammy"],
  "slippery": ["slick", "greasy", "oily", "slimy", "glazed"],

  // Taste & Smell
  "sweet": ["sugary", "honeyed", "syrupy", "saccharine", "candied"],
  "sour": ["tart", "acidic", "vinegary", "zesty", "piquant"],
  "bitter": ["sharp", "harsh", "astringent", "caustic", "acrid"],
  "salty": ["briny", "savory", "seasoned", "piquant", "saline"],
  "fragrant": ["aromatic", "perfumed", "scented", "odorous", "redolent"],
  "stinky": ["smelly", "foul", "rank", "putrid", "rancid"],

  // Temperature Nuances
  "warm": ["toasty", "balmy", "mild", "pleasant", "heated"],
  "cool": ["refreshing", "crisp", "brisk", "chilly", "temperate"],
  "freezing": ["icy", "frosty", "glacial", "arctic", "nippy"],
  "boiling": ["steaming", "scalding", "sizzling", "torrid", "sweltering"],

  // Light & Darkness
  "glowing": ["radiant", "beaming", "shining", "brilliant", "illuminated"],
  "dim": ["faint", "shadowy", "murky", "dusky", "subdued"],
  "sparkling": ["twinkling", "glittering", "shimmering", "dazzling", "gleaming"],
  "lackluster": ["flat", "drab", "lifeless", "colorless", "boring"],

  // Random Useful Adjectives
  "important": ["vital", "critical", "essential", "significant", "necessary"],
  "unimportant": ["trivial", "insignificant", "minor", "petty", "meaningless"],
  "robust": ["sturdy", "resilient", "tough", "durable", "hardy"],
  "frail": ["feeble", "fragile", "delicate", "powerless", "brittle"],
  "safe": ["secure", "protected", "guarded", "harmless", "shielded"],
  "dangerous": ["hazardous", "risky", "perilous", "treacherous", "unsafe"],

  // Everyday Positives & Common Words
  "fun": ["enjoyable", "entertaining", "amusing", "pleasant", "delightful"],
  "nice": ["pleasant", "kind", "friendly", "agreeable", "charming"],
  "bad": ["awful", "terrible", "horrible", "poor", "dreadful"],
  "dumb": ["stupid", "foolish", "silly", "clueless", "ignorant"],
  "boring": ["dull", "tedious", "uninteresting", "monotonous", "dreary"],
  "gross": ["disgusting", "nasty", "repulsive", "foul", "revolting"],
  "rude": ["impolite", "disrespectful", "offensive", "ill-mannered", "harsh"],
  "fake": ["false", "phony", "counterfeit", "pretend", "artificial"],
  "long": ["lengthy", "extended", "drawn-out", "prolonged", "tall"],
  "short": ["brief", "mini", "tiny", "petite", "stubby"],
  "fat": ["chubby", "overweight", "plump", "heavy", "round"],
  "skinny": ["thin", "slender", "slim", "lean", "slight"],
  "early": ["prompt", "on-time", "ahead", "timely", "precocious"],
  "late": ["tardy", "delayed", "behind", "overdue", "belated"],

  // Daily Life Descriptions
  "hungry": ["starving", "famished", "empty", "ravenous", "peckish"],
  "tired": ["sleepy", "exhausted", "drowsy", "drained", "fatigued"],
  "thirsty": ["parched", "dry", "dehydrated", "craving", "arid"],
  "messy": ["untidy", "disorganized", "cluttered", "chaotic", "dirty"],
  "smart": ["clever", "bright", "intelligent", "brainy", "sharp"],
  "shy": ["timid", "introverted", "reserved", "bashful", "quiet"],
  "funny": ["hilarious", "amusing", "witty", "comical", "silly"],
  "scared": ["afraid", "frightened", "terrified", "anxious", "nervous"],

  // Advanced Emotions & Character Traits
  "despondent": ["hopeless", "discouraged", "disheartened", "melancholy", "forlorn"],
  "vindictive": ["vengeful", "spiteful", "malicious", "resentful", "bitter"],
  "zealous": ["fervent", "passionate", "ardent", "devoted", "fanatical"],
  "elated": ["exultant", "thrilled", "overjoyed", "delighted", "jubilant"],
  "morose": ["sullen", "gloomy", "downcast", "glum", "dismal"],
  "noble": ["dignified", "honorable", "lofty", "virtuous", "majestic"],
  "cunning": ["sly", "crafty", "shrewd", "wily", "devious"],
  "gullible": ["naive", "credulous", "trusting", "unsuspecting", "simpleminded"],
  "pragmatic": ["practical", "realistic", "rational", "sensible", "logical"],
  "eccentric": ["quirky", "odd", "peculiar", "idiosyncratic", "unconventional"],
  "stoic": ["unemotional", "impassive", "detached", "calm", "indifferent"],
  "stingy": ["miserly", "tightfisted", "cheap", "parsimonious", "frugal"],

  // Abstract & Literary Descriptors
  "ominous": ["threatening", "menacing", "sinister", "foreboding", "dark"],
  "radiant": ["shining", "glowing", "brilliant", "luminous", "beaming"],
  "bleak": ["grim", "desolate", "gloomy", "dreary", "hopeless"],
  "splendid": ["magnificent", "glorious", "superb", "grand", "majestic"],
  "dreary": ["dull", "lifeless", "gloomy", "bleak", "tedious"],
  "serene": ["peaceful", "tranquil", "calm", "placid", "undisturbed"],
  "majestic": ["regal", "noble", "grand", "imposing", "stately"],
  "mysterious": ["enigmatic", "cryptic", "obscure", "puzzling", "arcane"],

  // Degree & Intensity
  "severe": ["harsh", "intense", "extreme", "serious", "grave"],
  "subtle": ["delicate", "slight", "nuanced", "understated", "refined"],
  "drastic": ["radical", "extreme", "severe", "serious", "intense"],
  "faint": ["dim", "weak", "slight", "feeble", "delicate"],
  "overwhelming": ["immense", "crushing", "staggering", "unbearable", "devastating"],
  "enduring": ["lasting", "permanent", "sustained", "persistent", "timeless"],
  "fleeting": ["brief", "momentary", "transient", "passing", "short-lived"],

  // Sensory & Environmental
  "arid": ["dry", "parched", "desiccated", "barren", "waterless"],
  "lush": ["verdant", "luxuriant", "flourishing", "thriving", "opulent"],
  "noisy": ["loud", "boisterous", "raucous", "clamorous", "rowdy"],
  "silent": ["hushed", "mute", "quiet", "soundless", "speechless"],
  "gleaming": ["shiny", "sparkling", "glittering", "lustrous", "polished"],
  "murky": ["cloudy", "hazy", "dim", "unclear", "shadowy"],
  "vivid": ["bright", "intense", "graphic", "clear", "lively"],
  "muted": ["soft", "subdued", "dull", "faint", "toned-down"],

  // Social & Cultural
  "traditional": ["conventional", "established", "customary", "classic", "orthodox"],
  "modern": ["contemporary", "up-to-date", "innovative", "cutting-edge", "current"],
  "outdated": ["obsolete", "archaic", "antiquated", "old-fashioned", "expired"],
  "progressive": ["forward-thinking", "advanced", "liberal", "innovative", "modernist"],
  "conservative": ["cautious", "traditional", "orthodox", "moderate", "right-leaning"],
  "rebellious": ["defiant", "disobedient", "resistant", "insubordinate", "revolutionary"],
  "patriotic": ["nationalistic", "loyal", "devoted", "proud", "allegiant"],
  "tolerant": ["open-minded", "forgiving", "accepting", "understanding", "patient"],

  // Evaluation & Quality
  "excellent": ["superb", "outstanding", "exceptional", "magnificent", "wonderful"],
  "mediocre": ["average", "ordinary", "uninspired", "unremarkable", "middling"],
  "terrible": ["horrible", "awful", "atrocious", "dreadful", "abysmal"],
  "glorious": ["magnificent", "splendid", "majestic", "superb", "resplendent"],
  "pitiful": ["pathetic", "wretched", "lamentable", "miserable", "sorry"],
  "brilliant": ["genius", "outstanding", "exceptional", "superb", "remarkable"],
  "worthless": ["valueless", "useless", "insignificant", "pointless", "trivial"],
  "valuable": ["precious", "priceless", "treasured", "esteemed", "invaluable"],

  // Basic Common Adjectives
  "good": ["excellent", "wonderful", "fantastic", "superb", "outstanding"],
  "great": ["amazing", "fantastic", "wonderful", "terrific", "marvelous"],
  "okay": ["acceptable", "decent", "adequate", "satisfactory", "reasonable"],
  "fine": ["excellent", "superb", "satisfactory", "acceptable", "decent"],
  
  "awful": ["terrible", "horrible", "dreadful", "atrocious", "appalling"],
  "pretty": ["beautiful", "lovely", "attractive", "charming", "gorgeous"],
  "cute": ["adorable", "sweet", "charming", "endearing", "lovely"],
  
  "fancy": ["elaborate", "ornate", "elegant", "luxurious", "sophisticated"],
  
  "expensive": ["costly", "pricey", "dear", "high-priced", "extravagant"],
  "free": ["complimentary", "gratis", "costless", "unpaid", "unrestricted"],

  // Everyday Physical Descriptions
  "tall": ["towering", "lofty", "elevated", "lanky", "statuesque"],
  "wide": ["broad", "expansive", "extensive", "spacious", "vast"],
  "narrow": ["tight", "constricted", "slim", "confined", "cramped"],
  "deep": ["profound", "bottomless", "cavernous", "abysmal", "fathomless"],
  "shallow": ["superficial", "surface-level", "slight", "cursory", "skin-deep"],
  "heavy": ["weighty", "massive", "burdensome", "substantial", "ponderous"],
  "light": ["weightless", "feathery", "airy", "delicate", "buoyant"],
  "sharp": ["keen", "pointed", "cutting", "piercing", "razor-like"],
  
  
  "bumpy": ["rough", "uneven", "lumpy", "jarring", "choppy"],
  
  "tight": ["snug", "constricted", "cramped", "compressed", "secure"],
  "loose": ["slack", "baggy", "relaxed", "unfastened", "free"],

  // Simple Emotions Everyone Uses
  "mad": ["furious", "enraged", "livid", "irate", "incensed"],
  "glad": ["delighted", "pleased", "cheerful", "joyful", "elated"],
  "upset": ["distressed", "troubled", "disturbed", "agitated", "distraught"],
  "worried": ["anxious", "concerned", "troubled", "apprehensive", "uneasy"],
  
  
  "shocked": ["stunned", "amazed", "astounded", "flabbergasted", "dumbfounded"],
  
  "confused": ["puzzled", "bewildered", "perplexed", "baffled", "mystified"],
  "sure": ["certain", "confident", "positive", "convinced", "definite"],
  "unsure": ["uncertain", "doubtful", "hesitant", "indecisive", "wavering"],

  // Weather & Environment
  "sunny": ["bright", "radiant", "brilliant", "dazzling", "luminous"],
  "cloudy": ["overcast", "gray", "gloomy", "dreary", "hazy"],
  "stormy": ["turbulent", "tempestuous", "wild", "violent", "chaotic"],
  "foggy": ["misty", "hazy", "murky", "cloudy", "obscured"],
  
  "humid": ["muggy", "sticky", "steamy", "moist", "oppressive"],
  
  
  "icy": ["frozen", "frigid", "glacial", "arctic", "frosty"],
  "muddy": ["mucky", "sloppy", "grimy", "filthy", "messy"],

  // Food & Taste
  "tasty": ["delicious", "flavorful", "scrumptious", "appetizing", "savory"],
  "yummy": ["delicious", "tasty", "delectable", "mouth-watering", "scrumptious"],
  "bland": ["flavorless", "tasteless", "dull", "insipid", "plain"],
  "spicy": ["hot", "fiery", "burning", "peppery", "piquant"],
  "fresh": ["crisp", "new", "recent", "unspoiled", "invigorating"],
  "stale": ["old", "musty", "flat", "expired", "lifeless"],
  "rotten": ["spoiled", "putrid", "decayed", "foul", "rank"],
  "crispy": ["crunchy", "brittle", "crackling", "snappy", "crisp"],
  "creamy": ["smooth", "rich", "velvety", "silky", "luxurious"],
  "greasy": ["oily", "fatty", "slick", "buttery", "slippery"],
  
  "sugary": ["sweet", "syrupy", "candy-like", "honeyed", "saccharine"],

  // Common Actions & Behaviors
  "busy": ["occupied", "swamped", "hectic", "frantic", "overwhelmed"],
  
  "ready": ["prepared", "set", "equipped", "primed", "willing"],
  "done": ["finished", "completed", "accomplished", "concluded", "over"],
  "lost": ["missing", "misplaced", "confused", "bewildered", "astray"],
  "found": ["discovered", "located", "uncovered", "retrieved", "spotted"],
  "broken": ["damaged", "shattered", "cracked", "ruined", "destroyed"],
  "fixed": ["repaired", "mended", "restored", "corrected", "resolved"],
  "stuck": ["trapped", "jammed", "immobile", "wedged", "stranded"],
  "moving": ["traveling", "shifting", "relocating", "progressing", "mobile"],
  "sitting": ["seated", "resting", "perched", "positioned", "settled"],
  "standing": ["upright", "erect", "vertical", "positioned", "waiting"],
  "walking": ["strolling", "striding", "pacing", "marching", "wandering"],
  "running": ["sprinting", "jogging", "dashing", "racing", "rushing"],

  // Time & Frequency
  "quick": ["rapid", "swift", "speedy", "prompt", "immediate"],
  "sudden": ["abrupt", "unexpected", "instant", "immediate", "surprising"],
  "gradual": ["slow", "steady", "progressive", "incremental", "step-by-step"],
  "frequent": ["regular", "common", "repeated", "constant", "recurring"],
  
  "constant": ["continuous", "steady", "persistent", "unending", "perpetual"],
  "temporary": ["brief", "short-term", "fleeting", "provisional", "momentary"],
  "permanent": ["lasting", "enduring", "fixed", "eternal", "unchanging"],
  "recent": ["latest", "current", "fresh", "new", "up-to-date"],
  "ancient": ["old", "archaic", "prehistoric", "antiquated", "timeless"],

  // Work & School Related
  
  "creative": ["imaginative", "artistic", "innovative", "original", "inventive"],
  "helpful": ["useful", "beneficial", "supportive", "handy", "valuable"],
  
  
  "careful": ["cautious", "attentive", "meticulous", "thorough", "precise"],
  "careless": ["reckless", "negligent", "sloppy", "thoughtless", "hasty"],
  "patient": ["tolerant", "calm", "understanding", "persistent", "enduring"],
  "impatient": ["restless", "eager", "hurried", "frustrated", "anxious"],
  "polite": ["courteous", "respectful", "well-mannered", "civil", "gracious"],

  // Home & Family
  "cozy": ["comfortable", "snug", "homey", "intimate", "warm"],
  
  
  
  "comfortable": ["cozy", "relaxing", "pleasant", "restful", "luxurious"],
  "uncomfortable": ["awkward", "unpleasant", "painful", "distressing", "cramped"],
  "crowded": ["packed", "congested", "jammed", "overflowing", "swarming"],
  
  
  

  // Social Situations
  "popular": ["well-liked", "famous", "trendy", "fashionable", "celebrated"],
  "unpopular": ["disliked", "unfashionable", "rejected", "scorned", "avoided"],
  "social": ["outgoing", "friendly", "gregarious", "sociable", "extroverted"],
  
  
  "awkward": ["clumsy", "uncomfortable", "embarrassing", "ungainly", "stiff"],
  
  
  
  "different": ["unique", "distinct", "unusual", "varied", "diverse"],

  // Health & Body
  
  
  
  
  "sleepy": ["drowsy", "tired", "groggy", "lethargic", "sluggish"],
  
  
  
  "sore": ["painful", "aching", "tender", "throbbing", "stiff"],
  "dizzy": ["lightheaded", "woozy", "unsteady", "faint", "spinning"],

  // Technology & Modern Life
  
  
  
  
  
  "working": ["functioning", "operational", "active", "running", "effective"],
  "simple": ["easy", "basic", "straightforward", "uncomplicated", "plain"],
  "complicated": ["complex", "difficult", "intricate", "confusing", "involved"],
  "useful": ["helpful", "handy", "practical", "beneficial", "valuable"],
  "useless": ["pointless", "worthless", "ineffective", "futile", "impractical"],

  // Animals & Pets
  
  "wild": ["untamed", "savage", "fierce", "uncontrolled", "natural"],
  "tame": ["domesticated", "gentle", "trained", "docile", "obedient"],
  "playful": ["frisky", "lively", "spirited", "energetic", "mischievous"],
  
  "aggressive": ["hostile", "violent", "fierce", "threatening", "combative"],
  
  "scary": ["frightening", "terrifying", "intimidating", "menacing", "spooky"],

  // School Subjects & Learning
  "difficult": ["challenging", "tough", "hard", "complex", "demanding"],
  
  "interesting": ["fascinating", "engaging", "captivating", "intriguing", "absorbing"],
  
  
  
  "right": ["correct", "accurate", "proper", "true", "exact"],
  "wrong": ["incorrect", "mistaken", "false", "erroneous", "inaccurate"],
  "clear": ["obvious", "evident", "plain", "understandable", "transparent"],
  "confusing": ["puzzling", "baffling", "unclear", "bewildering", "perplexing"],

  // Transportation & Travel
  
  
  "straight": ["direct", "linear", "unbending", "level", "upright"],
  "crooked": ["bent", "curved", "twisted", "angled", "warped"],
  
  
  
  

  // Money & Shopping
  
  "broke": ["penniless", "poor", "bankrupt", "impoverished", "destitute"],
  
  "pricey": ["expensive", "costly", "dear", "high-priced", "steep"],
  "worth": ["valuable", "worthwhile", "beneficial", "profitable", "useful"],


  // Sports & Activities
  "competitive": ["driven", "ambitious", "aggressive", "determined", "fierce"],
  "athletic": ["sporty", "fit", "active", "physical", "agile"],
  "clumsy": ["awkward", "uncoordinated", "ungainly", "bumbling", "graceless"],
  "graceful": ["elegant", "fluid", "smooth", "refined", "poised"],
  "tough": ["strong", "resilient", "hardy", "durable", "robust"],
  "gentle": ["soft", "mild", "tender", "kind", "delicate"],

  // Entertainment & Fun
  
  "exciting": ["thrilling", "exhilarating", "stimulating", "electrifying", "gripping"],
  "relaxing": ["calming", "peaceful", "soothing", "restful", "tranquil"],
  "stressful": ["overwhelming", "pressured", "tense", "demanding", "taxing"],
  "annoying": ["irritating", "bothersome", "vexing", "aggravating", "irksome"],
  "satisfying": ["fulfilling", "gratifying", "rewarding", "pleasing", "contentment"],
};

const Vocabulary = () => {
  const [currentWord, setCurrentWord] = useState('amazing');
  const [currentSynonym, setCurrentSynonym] = useState('staggering');
  const [searchTerm, setSearchTerm] = useState('');
  const [inputWord, setInputWord] = useState('');

  // Set meta description for SEO
  useEffect(() => {
    document.title = "Vocabulary Builder - Replace 'Very' with Powerful Words | EverythingEnglish";
    
    // Check if meta description exists and update or create it
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Improve your English vocabulary by replacing weak "very + adjective" phrases with powerful synonyms. Essential vocabulary building tool for students.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Improve your English vocabulary by replacing weak "very + adjective" phrases with powerful synonyms. Essential vocabulary building tool for students.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  const getRandomSynonym = (word: string) => {
    const synonyms = wordSynonyms[word as keyof typeof wordSynonyms];
    if (!synonyms) return '';
    return synonyms[Math.floor(Math.random() * synonyms.length)];
  };

  const handleRefresh = () => {
    setCurrentSynonym(getRandomSynonym(currentWord));
  };

  const handleRandomWord = () => {
    const words = Object.keys(wordSynonyms);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setInputWord(randomWord);
    setCurrentSynonym(getRandomSynonym(randomWord));
  };

  const handleWordSelect = (word: string) => {
    setCurrentWord(word);
    setCurrentSynonym(getRandomSynonym(word));
    setInputWord(word);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(e.target.value);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputWord.trim()) {
      const word = inputWord.trim().toLowerCase();
      setCurrentWord(word);
      setCurrentSynonym(getRandomSynonym(word) || 'No synonyms found');
    }
  };

  const filteredWords = Object.keys(wordSynonyms).filter(word =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 animate-pulse opacity-50"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 drop-shadow-sm">
          Replace "Very" with Better Words
        </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform weak "very + adjective" expressions into strong, precise vocabulary. Essential tool for English language learners and writers.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Demonstration Card */}
          <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-background/90 to-primary/5 backdrop-blur-md shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
            <CardContent className="p-8 relative z-10">
              <div className="text-center space-y-6">
                <h2 className="text-muted-foreground text-lg font-semibold">
                  Type Any Adjective & Press Enter
                </h2>
                
                <div className="space-y-6">
                  <div className="text-2xl font-medium text-muted-foreground line-through decoration-2">
                    very
                  </div>
                  
                  <div className="relative">
                  <div 
                    ref={(el) => {
                      if (el && inputWord) {
                        // Set cursor to end of text
                        const range = document.createRange();
                        const sel = window.getSelection();
                        if (el.childNodes.length > 0) {
                          range.setStartAfter(el.childNodes[el.childNodes.length - 1]);
                        } else {
                          range.setStart(el, 0);
                        }
                        range.collapse(true);
                        sel?.removeAllRanges();
                        sel?.addRange(range);
                      }
                    }}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={(e) => {
                      const text = e.currentTarget.textContent || '';
                      setInputWord(text);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const text = e.currentTarget.textContent?.trim() || '';
                        if (text) {
                          const word = text.toLowerCase();
                          setCurrentWord(word);
                          setCurrentSynonym(getRandomSynonym(word) || 'No synonyms found');
                        }
                      }
                    }}
                    className="text-7xl font-bold text-center min-h-[8rem] px-4 py-8 bg-transparent border-none outline-none focus:outline-none text-gray-800"
                    style={{
                      minHeight: '8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {inputWord || ''}
                  </div>
                  {!inputWord && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-7xl font-bold text-muted-foreground/50">
                      type here
                    </div>
                  )}
                    <div className="absolute -top-4 left-6 text-gray-600 text-2xl font-bold">
                      +
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-muted-foreground animate-pulse">
                    ↓
                  </div>
                  <div className="text-4xl font-bold text-foreground min-h-[3rem] flex items-center justify-center transition-all duration-500 animate-in slide-in-from-bottom-2">
                    {currentSynonym}
                  </div>
                </div>

                <div className="flex gap-3 justify-center mt-8">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRefresh}
                    className="gap-2 bg-background/80 hover:bg-primary/10 border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <RefreshCw className="h-4 w-4" />
                    New Synonym
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRandomWord}
                    className="gap-2 bg-background/80 hover:bg-accent/10 border-accent/30 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <Shuffle className="h-4 w-4" />
                    Random Word
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Word Selection */}
          <Card className="border-primary/20 bg-gradient-to-br from-background/90 to-accent/5 backdrop-blur-md shadow-xl">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Choose Vocabulary Words to Improve</h3>
                  <Input
                    placeholder="Search for words to replace..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                    aria-label="Search vocabulary words"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                  {filteredWords.map((word) => (
                    <Button
                      key={word}
                      variant={currentWord === word ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleWordSelect(word)}
                      className="justify-start capitalize"
                    >
                      {word}
                    </Button>
                  ))}
                </div>

                {filteredWords.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No words found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Synonyms Display */}
        <Card className="mt-8 border-primary/10 bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 capitalize">
              Alternatives for "very {currentWord}"
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {wordSynonyms[currentWord as keyof typeof wordSynonyms]?.map((synonym) => (
                <div
                  key={synonym}
                  className={`p-3 rounded-lg border text-center transition-all duration-200 hover:scale-105 cursor-pointer ${
                    synonym === currentSynonym
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background/50 border-border hover:border-primary/50'
                  }`}
                  onClick={() => {
                    setCurrentSynonym(synonym);
                    setInputWord(synonym);
                  }}
                >
                  <span className="font-medium capitalize">{synonym}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Writing Tips Section */}
        <Card className="mt-8 border-muted/50 bg-muted/20">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h4 className="font-semibold text-muted-foreground">💡 Writing Improvement Tips</h4>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  These synonyms enhance your vocabulary, but context matters. Consider the tone, formality, and precise meaning before choosing your replacement word.
                </p>
                <div className="text-xs text-muted-foreground/80">
                  <span className="font-medium">Remember:</span> Strong vocabulary improves writing clarity and impact for academic essays, creative writing, and professional communication.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vocabulary;
