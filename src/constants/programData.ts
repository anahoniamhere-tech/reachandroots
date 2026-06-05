import { Users, Mic, Mic2, Zap, Grid, PlayCircle, Activity, Coffee, Share2, Radio, Smartphone, Video, Camera } from 'lucide-react';

export interface Session {
  time: string;
  title: string;
  arabicTitle?: string;
  type: 'Panel' | 'TED Talk' | 'Workshop' | 'Live' | 'Break' | 'Opening' | 'Closing' | 'Networking';
  speakers: { 
    name: string; 
    handle?: string; 
    link?: string;
    platform?: 'instagram' | 'tiktok' | 'twitter' 
  }[];
  stage: string;
  featured?: boolean;
}

export interface DayProgram {
  id: string;
  date: string;
  theme: string;
  opening: string;
  programStarts?: string;
  atmosphere: string;
  topics: string[];
  sessions: Session[];
}

export const PROGRAM_DATA: DayProgram[] = [
  {
    id: 'Friday',
    date: 'July 10, 2026',
    theme: 'Food · Beauty & Fashion · Comedy',
    opening: '2:00 PM',
    programStarts: '3:30 PM',
    atmosphere: 'Opening narratives and sensory discovery.',
    topics: ['Gastronomy', 'Aesthetics', 'Humor'],
    sessions: [
      {
        time: '2:00 PM – 3:30 PM',
        title: 'Opening Ceremony',
        type: 'Opening',
        speakers: [{ name: 'Roots & Reach Collective' }],
        stage: 'Sanctuary Main',
        featured: true
      },
      {
        time: '3:30 PM – 4:20 PM',
        title: 'Food Panel: The Culinary Identity',
        arabicTitle: 'حين يتحوّل الأكل إلى تجربة تُروى',
        type: 'Panel',
        speakers: [
          { name: 'Hussein Fayyad', handle: '@husenfayad', link: 'https://www.instagram.com/husenfayad/' },
          { name: 'Yasmin Nasir', handle: '@yasmin.nasir', link: 'https://www.instagram.com/yasmin.nasir/' },
          { name: 'Chadi Maatouk', handle: '@cckchadymaatouk', link: 'https://www.instagram.com/cckchadymaatouk/' },
          { name: 'Chef Hammoud', handle: '@hammoud.og', link: 'https://www.instagram.com/hammoud.og/' }
        ],
        stage: 'Indoor Stage 1'
      },
      {
        time: '4:20 PM – 4:50 PM',
        title: 'Mid-Afternoon Break',
        type: 'Break',
        speakers: [],
        stage: 'Networking Lounge'
      },
      {
        time: '4:50 PM – 5:25 PM',
        title: 'The Art of Plating — TED Talk',
        type: 'TED Talk',
        speakers: [{ name: 'Abir Al Saghir', handle: '@abiresag', link: 'https://www.instagram.com/abiresag/' }],
        stage: 'Indoor Stage 1',
        featured: true
      },
      {
        time: '5:25 PM – 6:00 PM',
        title: 'Live Cooking Station',
        type: 'Live',
        speakers: [
          { name: 'May Bsat', handle: '@maybsatcooks', link: 'https://www.instagram.com/maybsatcooks/' },
          { name: 'Elie Harb', handle: '@foodwar.lb', link: 'https://www.instagram.com/foodwar.lb/' }
        ],
        stage: 'Outdoor / Chill Zone'
      },
      {
        time: '6:00 PM – 6:35 PM',
        title: 'Live Makeup Station / Workshop',
        type: 'Workshop',
        speakers: [{ name: 'Beauty by Lama', handle: '@beautyby.lama', link: 'https://www.instagram.com/beautyby.lama/' }],
        stage: 'Outdoor / Chill Zone'
      },
      {
        time: '6:35 PM – 7:25 PM',
        title: 'Beauty & Fashion Panel: The Image of Self',
        arabicTitle: 'الجمال بين الحقيقة والصورة',
        type: 'Panel',
        speakers: [
          { name: 'Fatima Jaafar', handle: '@fatema.y.jaafar', link: 'https://www.instagram.com/fatema.y.jaafar' },
          { name: 'Darine Jaafar', handle: '@darinejaafar', link: 'https://www.instagram.com/darinejaafar' },
          { name: 'Afaf Lazkani', handle: '@afaflz', link: 'https://www.instagram.com/afaflz/' }
        ],
        stage: 'Indoor Stage 1'
      },
      {
        time: '6:35 PM – 7:25 PM',
        title: 'Comedy Panel: The Digital Laugh',
        arabicTitle: 'الضحك في زمن المنصّات',
        type: 'Panel',
        speakers: [
          { name: 'Ahmad Al Khatib', handle: '@itskhateb', link: 'https://www.instagram.com/itskhateb/' },
          { name: 'Zein Al Dakane', handle: '@zein_aldkane_a1', link: 'https://www.instagram.com/zein_aldkane_a1/' },
          { name: 'Ammar Najjar', handle: '@ammarnajjar1_', link: 'https://www.instagram.com/ammarnajjar1_/' }
        ],
        stage: 'Indoor Stage 2'
      },
      {
        time: '7:25 PM – 7:55 PM',
        title: 'Evening Break',
        type: 'Break',
        speakers: [],
        stage: 'Networking Lounge'
      },
      {
        time: '7:55 PM – 8:30 PM',
        title: 'Global Influence — TED Talk',
        type: 'TED Talk',
        speakers: [{ name: 'Karen Wazen', handle: '@karenwazen', link: 'https://www.instagram.com/karenwazen/' }],
        stage: 'Indoor Stage 1',
        featured: true
      },
      {
        time: '7:55 PM – 8:30 PM',
        title: 'Comedy & Continuity — TED Talk',
        type: 'TED Talk',
        speakers: [{ name: 'Kamal Mohammad', handle: '@kamalsailos', link: 'https://www.instagram.com/kamalsailos/' }],
        stage: 'Indoor Stage 2'
      },
      {
        time: '8:30 PM – 9:05 PM',
        title: 'Double Trouble: Creating Humor — TED Talk',
        type: 'TED Talk',
        speakers: [{ name: 'Shashtari Twins', handle: '@shashtaritwinss', link: 'https://www.instagram.com/shashtaritwinss/' }],
        stage: 'Indoor Stage 2'
      },
      {
        time: '9:05 PM+',
        title: 'Friday Closing & Networking',
        type: 'Closing',
        speakers: [],
        stage: 'Outdoor Chill Zone'
      }
    ]
  },
  {
    id: 'Saturday',
    date: 'July 11, 2026',
    theme: 'Informative · Content · Sports · Tourism · Adventures',
    opening: '1:45 PM',
    atmosphere: 'Technical mastery and regional narratives.',
    topics: ['Digital Content', 'Tourism', 'Sports Media'],
    sessions: [
      {
        time: '1:45 PM – 2:00 PM',
        title: 'Opening: Saturday Protocol',
        type: 'Opening',
        speakers: [{ name: 'Event Leads' }],
        stage: 'Indoor Stage 1'
      },
      {
        time: '2:00 PM – 2:50 PM',
        title: 'Informative Panel: Value in Content',
        arabicTitle: 'هل المحتوى المفيد ينجح فعلًا؟',
        type: 'Panel',
        speakers: [
          { name: 'Eisa Al Habib', handle: '@eisayo', link: 'https://www.instagram.com/eisayo/?hl=en' },
          { name: 'Farah Kordy', handle: '@farahelkordyy', link: 'https://www.tiktok.com/@farahelkordyy', platform: 'tiktok' },
          { name: 'Omar Abo Rob', handle: '@omaar', link: 'https://www.instagram.com/omaar/' }
        ],
        stage: 'Indoor Stage 1'
      },
      {
        time: '2:00 PM – 2:50 PM',
        title: 'YouTube Panel: The New Broadcasters',
        type: 'Panel',
        speakers: [
          { name: 'Osama Marwah', handle: '@ossymarwah', link: 'https://www.instagram.com/ossymarwah/?hl=en' },
          { name: 'Ibrahim Maarawi', handle: '@barhom', link: 'https://www.instagram.com/barhom/' },
          { name: 'Ghaith Marwan', handle: '@ghaith_marwan', link: 'https://www.instagram.com/ghaith_marwan/?hl=en' },
          { name: 'Ahmad Abo Rob', handle: '@aburob', link: 'https://www.instagram.com/aburob/' }
        ],
        stage: 'Indoor Stage 2'
      },
      {
        time: '2:50 PM – 3:20 PM',
        title: 'Afternoon Break',
        type: 'Break',
        speakers: [],
        stage: 'Lounge'
      },
      {
        time: '2:50 PM – 3:20 PM',
        title: 'Information Retrieval — TED Talk',
        type: 'TED Talk',
        speakers: [{ name: 'Raed Hamdan', handle: '@raedhamdan', link: 'https://www.instagram.com/raedhamdan/' }],
        stage: 'Indoor Stage 1'
      },
      {
        time: '3:20 PM – 4:10 PM',
        title: 'Content Creation Panel: From Idea to Viral',
        arabicTitle: 'المحتوى: فكرة أم تنفيذ؟',
        type: 'Panel',
        speakers: [
          { name: 'Patrick Daoud', handle: '@patrickdaoud', link: 'https://www.instagram.com/patrickdaoud/' },
          { name: 'Yara Bou Monsef', handle: '@yaraboumonsef', link: 'https://www.instagram.com/yaraboumonsef/' },
          { name: 'Hasan Raad', handle: '@hasanraad4', link: 'https://www.instagram.com/hasanraad4/' }
        ],
        stage: 'Indoor Stage 2'
      },
      {
        time: '4:10 PM – 4:25 PM',
        title: 'Short Transition',
        type: 'Break',
        speakers: [],
        stage: 'Transit Area'
      },
      {
        time: '4:25 PM – 5:00 PM',
        title: 'Deep Logic — TED Talk',
        type: 'TED Talk',
        speakers: [{ name: 'Hassan Hashem', handle: '@alhashimhasan', link: 'https://www.instagram.com/alhashimhasan/' }],
        stage: 'Indoor Stage 1',
        featured: true
      },
      {
        time: '4:25 PM – 5:00 PM',
        title: 'Basketball Activation',
        type: 'Live',
        speakers: [
          { name: 'Ali Mansour', handle: '@alimansour_10', link: 'https://www.instagram.com/alimansour_10/' },
          { name: 'Karim Zainoun', handle: '@karimzeinoun7', link: 'https://www.instagram.com/karimzeinoun7/' }
        ],
        stage: 'Outdoor'
      },
      {
        time: '4:40 PM – 5:15 PM',
        title: 'Voice of a Generation — TED Talk',
        type: 'TED Talk',
        speakers: [{ name: 'Raghda K', handle: '@raghda.k', link: 'https://www.instagram.com/raghda.k/' }],
        stage: 'Indoor Stage 2'
      },
      {
        time: '5:15 PM – 5:50 PM',
        title: 'Content Editing Workshop',
        type: 'Workshop',
        speakers: [{ name: 'Bob Jaalouk', handle: '@bobjaalouk', link: 'https://www.instagram.com/bobjaalouk/' }],
        stage: 'Indoor Stage 2'
      },
      {
        time: '5:30 PM – 6:20 PM',
        title: 'Sports Media Panel',
        arabicTitle: 'الرياضة تحت المجهر',
        type: 'Panel',
        speakers: [
          { name: 'Bilal Haddad', handle: '@bilalhd91', link: 'https://www.instagram.com/bilalhd91/' },
          { name: 'Mohamad Adnan', handle: '@mohdadnan23', link: 'https://www.instagram.com/mohdadnan23/' },
          { name: 'Eslam Mahdi', handle: '@eslam_mahdii', link: 'https://www.instagram.com/eslam_mahdii/' }
        ],
        stage: 'Indoor Stage 1'
      },
      {
        time: '6:20 PM – 6:50 PM',
        title: 'Evening Refreshment',
        type: 'Break',
        speakers: [],
        stage: 'Lounge'
      },
      {
        time: '6:50 PM – 7:25 PM',
        title: 'Athlete Narrative — TED Talk',
        type: 'TED Talk',
        speakers: [{ name: 'Wael Arakji', handle: '@waelarakji', link: 'https://www.instagram.com/waelarakji/' }],
        stage: 'Indoor Stage 1',
        featured: true
      },
      {
        time: '7:25 PM – 8:00 PM',
        title: 'Transition to Evening Narrative',
        type: 'Break',
        speakers: [],
        stage: 'Main Hall'
      },
      {
        time: '8:00 PM – 8:50 PM',
        title: 'Tourism Panel: Selling the Levant',
        arabicTitle: 'كيف نروي المدن؟',
        type: 'Panel',
        speakers: [
          { name: 'Mariam Bachat', handle: '@mariam.bachat', link: 'https://www.instagram.com/mariam.bachat/' },
          { name: 'Osman Taleb', handle: '@osmantaleb10', link: 'https://www.instagram.com/osmantaleb10/' },
          { name: 'Abed Bouchiye' },
          { name: 'Life with Jad', handle: '@lifewithjad', link: 'https://www.instagram.com/lifewithjad/' }
        ],
        stage: 'Indoor Stage 1'
      },
      {
        time: '8:50 PM – 9:00 PM',
        title: 'Final Shift',
        type: 'Break',
        speakers: [],
        stage: 'Main Hall'
      },
      {
        time: '9:00 PM – 9:50 PM',
        title: 'Adventures Panel: The Extreme Story',
        arabicTitle: 'صناعة المغامرة',
        type: 'Panel',
        speakers: [
          { name: 'Mohamad Sabbagh', handle: '@sabbaggh', link: 'https://www.instagram.com/sabbaggh/' },
          { name: 'Tarazan', handle: '@thestrollingtarzan', link: 'https://www.instagram.com/thestrollingtarzan/' },
          { name: 'Aseel Awwad', handle: '@aseelawwad_', link: 'https://www.instagram.com/aseelawwad_/' },
          { name: 'Amr Tarazan', handle: '@amrtarazan', link: 'https://www.instagram.com/amrtarazan/' }
        ],
        stage: 'Indoor Stage 1'
      },
      {
        time: '9:50 PM+',
        title: 'Saturday Closing & Networking',
        type: 'Closing',
        speakers: [],
        stage: 'Outdoor'
      }
    ]
  },
  {
    id: 'Sunday',
    date: 'July 12, 2026',
    theme: 'Family · Story · Mom’s Content · Influence · War & Impact',
    opening: '1:45 PM',
    atmosphere: 'Heart, impact, and collective future.',
    topics: ['Family Dynamics', 'Motherhood', 'Geopolitical Impact'],
    sessions: [
      {
        time: '1:45 PM – 2:00 PM',
        title: 'Opening: Sunday Resilience',
        type: 'Opening',
        speakers: [],
        stage: 'Indoor Stage 1'
      },
      {
        time: '2:00 PM – 2:50 PM',
        title: 'Family Content Panel: Sharing the Private',
        arabicTitle: 'الظهور المشترك: نجاح أم تحدٍّ؟',
        type: 'Panel',
        speakers: [
          { name: 'The Rahal', handle: '@the.rahal', link: 'https://www.instagram.com/the.rahal/' },
          { name: 'Ammar and Reem', handle: '@amarandrim', link: 'https://www.instagram.com/amarandrim/#' }
        ],
        stage: 'Indoor Stage 1'
      },
      {
        time: '2:00 PM – 2:50 PM',
        title: 'Storytelling Panel: Crafting Narratives',
        type: 'Panel',
        speakers: [
          { name: 'Bob Harkal', handle: '@bob_harkal', link: 'https://www.instagram.com/bob_harkal/' },
          { name: 'Karakib', handle: '@karakib.channel', link: 'https://www.instagram.com/karakib.channel/' }
        ],
        stage: 'Indoor Stage 2'
      },
      {
        time: '2:50 PM – 3:20 PM',
        title: 'Mid-Day Pause',
        type: 'Break',
        speakers: [],
        stage: 'Creator Pass Garden'
      },
      {
        time: '3:20 PM – 3:55 PM',
        title: 'Generation Gap — TED Talk',
        type: 'TED Talk',
        speakers: [
          { name: 'Hasan Raad', handle: '@hasanraad4', link: 'https://www.instagram.com/hasanraad4/' },
          { name: 'Em Raad' }
        ],
        stage: 'Indoor Stage 1'
      },
      {
        time: '3:55 PM – 4:25 PM',
        title: 'Reflection Break',
        type: 'Break',
        speakers: [],
        stage: 'Creator Pass Garden'
      },
      {
        time: '4:25 PM – 5:15 PM',
        title: 'Mom’s Content Panel: Motherhood in Public',
        arabicTitle: 'الأمومة تحت الضوء',
        type: 'Panel',
        speakers: [
          { name: 'Denise Al Shaloohy', handle: '@denise.joee', link: 'https://www.instagram.com/denise.joee/' },
          { name: 'Mira Ghamrawi (Em Roben)', handle: '@miraghcharles', link: 'https://www.instagram.com/miraghcharles/?hl=en' },
          { name: 'Liliane Mokhalalty', handle: '@lilianemoukhalalati', link: 'https://www.instagram.com/lilianemoukhalalati/?hl=en' }
        ],
        stage: 'Indoor Stage 1'
      },
      {
        time: '5:15 PM – 5:45 PM',
        title: 'Short Transition',
        type: 'Break',
        speakers: [],
        stage: 'Main Hall'
      },
      {
        time: '4:09 PM – 6:20 PM',
        title: 'Navigating Influence — TED Talk',
        type: 'TED Talk',
        speakers: [{ name: 'Christiane AlKhoury Abboud', handle: '@the.abbouds', link: 'https://www.instagram.com/the.abbouds/' }],
        stage: 'Indoor Stage 1'
      },
      {
        time: '5:15 PM – 7:40 PM',
        title: 'Main Break & Evening Setup',
        type: 'Break',
        speakers: [],
        stage: 'Whole Sanctuary Area'
      },
      {
        time: '7:40 PM – 8:15 PM',
        title: 'Influence Panel: Responsibility & Reach',
        arabicTitle: 'التأثير: حضور أم مسؤولية؟',
        type: 'Panel',
        speakers: [
          { name: 'Wessam Quotob', handle: '@wessamq', link: 'https://www.instagram.com/wessamq/' },
          { name: 'Saleh Al Nawawy', handle: '@salehelnawawy', link: 'https://www.instagram.com/salehelnawawy/' },
          { name: 'Tarek Sakik', handle: '@tareksakik', link: 'https://www.instagram.com/tareksakik/' },
          { name: 'Munzer Al Herani', handle: '@drmuntheralherani', link: 'https://www.instagram.com/drmuntheralherani/' }
        ],
        stage: 'Indoor Stage 1'
      },
      {
        time: '8:15 PM – 8:25 PM',
        title: 'Final Transition',
        type: 'Break',
        speakers: [],
        stage: 'Main Stage'
      },
      {
        time: '8:25 PM – 9:00 PM',
        title: 'The Future Protocol — TED Talk',
        type: 'TED Talk',
        speakers: [{ name: 'Yazeed Moussa', handle: '@dr.yazedmousa', link: 'https://www.instagram.com/dr.yazedmousa/' }],
        stage: 'Indoor Stage 1',
        featured: true
      },
      {
        time: '8:35 PM – 9:25 PM',
        title: 'Influence During War Panel: Truth & Media',
        arabicTitle: 'بين الحقيقة والتأثير',
        type: 'Panel',
        speakers: [
          { name: 'Chef Hammoud', handle: '@hammoud.og', link: 'https://www.instagram.com/hammoud.og/' },
          { name: 'Tarazan', handle: '@thestrollingtarzan', link: 'https://www.instagram.com/thestrollingtarzan/' },
          { name: 'Hasan Raad', handle: '@hasanraad4', link: 'https://www.instagram.com/hasanraad4/' },
          { name: 'Hassan Hashem', handle: '@alhashimhasan', link: 'https://www.instagram.com/alhashimhasan/' }
        ],
        stage: 'Indoor Stage 2',
        featured: true
      },
      {
        time: '9:25 PM+',
        title: 'Grand Closing',
        type: 'Closing',
        speakers: [],
        stage: 'Creator Pass Main'
      }
    ]
  }
];
