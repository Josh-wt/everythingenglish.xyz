import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  BookOpen, GraduationCap, Target, Bookmark, Search, X, Play, Save, 
  LogOut, Plus, Trash2, Edit2, Calendar, Check, FolderPlus, Folder, 
  ChevronDown, ChevronRight, Award, FileText, Globe, ArrowLeft, Menu, Eye, MessageCircle 
} from 'lucide-react';
import { User as UserIcon } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { PdfModal } from '@/components/practice/PdfModal';

// Base URL for PDF files
const BASE_URL = "https://bf1fb7b3-ab34-4d3d-b21a-c8150a7a92a1.usrfiles.com/ugd/bf1fb7_";

// Exam level definitions
const EXAM_LEVELS = {
  home: { title: "All Levels", description: "Select your exam level" },
  igcse: { title: "Cambridge IGCSE 0500", description: "IGCSE English Language resources" },
  alevel: { title: "A-Level Resources", description: "Advanced level English resources" },
  cambridge9093: { title: "Cambridge A-Level 9093", description: "Cambridge A-Level English Language" },
  generalPaper: { title: "Cambridge General Paper", description: "Cambridge General Paper (EGP)" },
  edexcel: { title: "Edexcel A-Level", description: "Edexcel A-Level English Language" },
  ib: { title: "IB Language & Literature", description: "IB Language and Literature resources" }
};

// URL mapping for routing
const URL_TO_LEVEL_MAP = {
  'all': 'home',
  'igcse': 'igcse', 
  'alevel': 'cambridge9093',
  'alevels': 'cambridge9093',
  'generalpaper': 'generalPaper',
  'edexcel': 'edexcel',
  'ib': 'ib'
};

const LEVEL_TO_URL_MAP = {
  'home': 'all',
  'igcse': 'igcse',
  'cambridge9093': 'alevel', 
  'generalPaper': 'generalpaper',
  'edexcel': 'edexcel',
  'ib': 'ib'
};

const CATEGORY_URL_MAP = {
  'examNotes': 'notes',
  'examples': 'examples', 
  'structure': 'structure',
  'structureGuides': 'structure-guides',
  'vocabulary': 'vocabulary',
  'additional': 'additional',
  'additionalResources': 'additional-resources',
  'courseFramework': 'course-framework',
  'literaryAnalysis': 'literary-analysis',
  'prescribedTexts': 'prescribed-texts',
  'assessmentTools': 'assessment-tools'
};

const URL_TO_CATEGORY_MAP = {
  'notes': 'examNotes',
  'examples': 'examples',
  'structure': 'structure',
  'structure-guides': 'structureGuides',
  'vocabulary': 'vocabulary',
  'additional': 'additional',
  'additional-resources': 'additionalResources',
  'course-framework': 'courseFramework',
  'literary-analysis': 'literaryAnalysis',
  'prescribed-texts': 'prescribedTexts',
  'assessment-tools': 'assessmentTools'
};

// Section slug mappings for deep routing
const SECTION_URL_MAP = {
  paper1: 'p1',
  paper2: 'p2',
  paper3: 'p3',
  paper4: 'p4',
  general: 'general',
  essayEvidences: 'essay-evidences',
  writingStructure: 'writing-structure',
  textFormats: 'text-formats',
  languageResources: 'language-resources',
  edexcelResources: 'edexcel-resources',
  wenScripts: 'wen-scripts',
  unitExemplars: 'unit-exemplars',
  generalPaperExamples: 'general-paper-examples',
  studentWork: 'student-work',
  paper1StudentWork: 'paper1-student-work',
  paper2StudentWork: 'paper2-student-work',
  edexcelVocabulary: 'edexcel-vocabulary',
  // Additional Resources sections
  writingSkills: 'writing-skills',
  studyGuides: 'study-guides',
  summaryWriting: 'summary-writing',
  descriptiveWriting: 'descriptive-writing',
  narrativeWriting: 'narrative-writing',
  textFormatsAdditional: 'text-formats-additional',
  directedWriting: 'directed-writing',
  paperTips: 'paper-tips',
  practiceMaterials: 'practice-materials',
  additionalResourcesFinal: 'additional-resources-final',
  // IB sections
  combinedPapers: 'combined-papers',
  ioOral: 'io-oral',
  hlEssay: 'hl-essay',
  bodiesOfWork: 'bodies-of-work',
  courseGuides: 'course-guides',
  literaryTerms: 'literary-terms',
  nonLiteraryFeatures: 'non-literary-features',
  vocabularyGuides: 'vocabulary-guides',
  writingExamples: 'writing-examples',
  extendedEssays: 'extended-essays',
  textGuides: 'text-guides',
  practiceExercises: 'practice-exercises',
  questionTypeExamples: 'question-type-examples'
};

const URL_TO_SECTION_MAP = Object.fromEntries(
  Object.entries(SECTION_URL_MAP).map(([k, v]) => [v, k])
);

// Helper function to generate URL-friendly slugs
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

// Sample resources structure (complete from document)
const RESOURCES = {
  igcse: {
    title: "Cambridge IGCSE 0500",
    categories: {
      examNotes: {
        title: "Exam Notes",
        icon: FileText,
        description: "Comprehensive exam preparation notes",
        sections: {
          paper1: {
            title: "Paper 1 Notes (7 PDFs)",
            resources: [{
              id: "f963ca55371548c0ac16188939a91525",
              title: "Detailed Walkthrough"
            }, {
              id: "0be11716ffe543fba4fe367c41e4f0e0",
              title: "General Question Specific Notes"
            }, {
              id: "d7d14e69c4b443639a15643ebfe1d0c9",
              title: "Paper 1 Exam Guide"
            }, {
              id: "4dce5aa467da4f07bc165fa21f2eff86",
              title: "Summary Writing [P1Q1(f)]"
            }, {
              id: "640ff59ecff8497394281efaeaf146b5",
              title: "Writers Effect [P1Q2(d)]"
            }, {
              id: "9e80bfcf174249e6bcb2368f22d1e3f5",
              title: "Descriptive Writing [P1Q2-3]"
            }, {
              id: "2d284ac76d1042c899b910b17a05585c",
              title: "Extended Writing Response"
            }]
          },
          paper2: {
            title: "Paper 2 Notes (6 PDFs)",
            resources: [{
              id: "7d19db19ea1549cdbd55e3fb2c1d0b87",
              title: "Narrative Opening Options"
            }, {
              id: "b255b4991da24bf78dcae669a4769066",
              title: "General Guide (Narrative)"
            }, {
              id: "a0dc8405d7204ed3865856c902a8ddcb",
              title: "Detailed Guide (Narrative)"
            }, {
              id: "c699f723e29a4203b145c37cd2a52ac2",
              title: "Detailed Guide (Descriptive)"
            }, {
              id: "20639cc4a55b40c9aaeb7f7e0bf9c42e",
              title: "General Guide (Descriptive)"
            }, {
              id: "dbf4303909634d5c8d23ddd61b1d6612",
              title: "Narrative Writing [P2Q4-5]"
            }]
          },
          general: {
            title: "General Notes (2 PDFs)",
            resources: [{
              id: "b2d6065248234c64a8e5fd1c23f0a27a",
              title: "Composition"
            }, {
              id: "de13142951c54d4184987083ba56e47b",
              title: "Learners Guide"
            }]
          }
        }
      },
      examples: {
        title: "Examples",
        icon: Globe,
        description: "Sample papers and examples",
        sections: {
          paper1: {
            title: "Paper 1 Examples (2 PDFs)",
            resources: [{
              id: "bffb2464336f48aa86207c02f7ca2688",
              title: "IGCSE Paper 1 Example 2020"
            }, {
              id: "50bce4a36fc444b2ab61ff2f51d82669",
              title: "IGCSE Paper 1 Example 2021"
            }]
          },
          paper2: {
            title: "Paper 2 Examples (2 PDFs)",
            resources: [{
              id: "8904fa3b03db4d82934c186155fa3907",
              title: "IGCSE Paper 2 Example 2015"
            }, {
              id: "bc59e6e129d447169b744880f962fa4e",
              title: "IGCSE Paper 2 Example 2020"
            }]
          },
          questionTypeExamples: {
            title: "Question Type High Mark Examples (3 PDFs)",
            resources: [{
              id: "5d5b0ba8d2934f289c61cb1eb166edd7",
              title: "Descriptive Writing Examples"
            }, {
              id: "c9d3ac1fbf19493e8d6499625375cf4d",
              title: "Narrative Writing Examples"
            }, {
              id: "e10f1f9357bb432bb31a1f5af0c5a289",
              title: "Letter Writing Examples"
            }]
          }
        }
      },
      structureGuides: {
        title: "Structure Guides",
        icon: Award,
        description: "Writing structure and formatting guides",
        sections: {
          writingStructure: {
            title: "Writing Structure (3 PDFs)",
            resources: [{
              id: "9fed9247dd32492dacd3ee8dfb9604d1",
              title: "Argument Writing"
            }, {
              id: "82cc146a8ade474cb6a621991efd5fcb",
              title: "Descriptive Writing"
            }, {
              id: "ef516f10de30438b9876df63657ec45b",
              title: "Summary Writing"
            }]
          },
          textFormats: {
            title: "Text Formats (4 PDFs)",
            resources: [{
              id: "0e276f92a4c44bef8ddd7278274c0a03",
              title: "Formal Letter"
            }, {
              id: "b761876544364afb8631f921ecfe8f2e",
              title: "Formal Report"
            }, {
              id: "6b33f7cdcfbd430694d0aadff1e8bfa5",
              title: "Narrative Report"
            }, {
              id: "f85631cea01d429cb23bb337b4da3c9c",
              title: "News Report"
            }]
          }
        }
      },
      vocabulary: {
        title: "Vocabulary",
        icon: BookOpen,
        description: "Language and vocabulary resources",
        sections: {
          general: {
            title: "General Vocabulary (5 PDFs)",
            resources: [{
              id: "11039e8149fc49109745e18be0a670a8",
              title: "Literary Analysis Guide"
            }, {
              id: "5f69096897a5476880a7b8bb9122a5c0",
              title: "Positive & Negative Feelings"
            }, {
              id: "8bea661edeeb42939a1b0913a0f79be6",
              title: "Grammar Improvement"
            }, {
              id: "50361b73a41d498abef26f8d2f00f161",
              title: "Punctuation Guide"
            }, {
              id: "6d51f944010c4c309c1ae9aed1dba13e",
              title: "Glossary of Terms"
            }]
          }
        }
      },
      additionalResources: {
        title: "Additional Resources",
        icon: Target,
        description: "Supplementary study materials",
        sections: {
          writingSkills: {
            title: "Writing Skills (4 PDFs)",
            resources: [{
              id: "4e0d05ad566141bca51a4377e4a2e766",
              title: "Essential Writing Skills & Perfect Notes"
            }, {
              id: "dc4a46a3b44f4661bdb49fcfc98f43dc",
              title: "Essential Agreements for Writing"
            }, {
              id: "1404281045b2481e8deff5a32c136c9a",
              title: "General Writing Tips"
            }, {
              id: "b567e7f8a1a34bd89c3c5ff45c1eba42",
              title: "Writing Skills Reference"
            }]
          },
          studyGuides: {
            title: "Study Guides (6 PDFs)",
            resources: [{
              id: "da8ce8b7e1dd418d85c69465aafa2a1d",
              title: "IGCSE 0500 English: Personal Study Notes"
            }, {
              id: "54764b092815429da0d3d969f5cd5b86",
              title: "First Language English Revision Guide"
            }, {
              id: "c2a578b9acc743299c0d3a6b3111f572",
              title: "IGCSE English Revision Guide Extended [Old Syllabus]"
            }, {
              id: "0d05d3674e614172812424b46e8d0b08",
              title: "Learner Guide (For Examination from 2020)"
            }, {
              id: "669f9edcc909403680d2a40b79d11ec5",
              title: "First Language English: Tips & Advice (Compiled)"
            }, {
              id: "469cb0cd9af842b085da8368d304ab55",
              title: "GuidedIGCSE's Advice for FLE"
            }]
          },
          summaryWriting: {
            title: "Summary Writing (3 PDFs)",
            resources: [{
              id: "c6b1cae8f3ac4431818f6a9c42f397aa",
              title: "Summary Writing: To Be Precise (Modified Guide)"
            }, {
              id: "09a4aece552c4d9ab118593a3e758429",
              title: "Summary Writing Guide"
            }, {
              id: "77db176ae3134b13a6afd2756ff8fff2",
              title: "Summary Writing for Examination (From 2020)"
            }]
          },
          descriptiveWriting: {
            title: "Descriptive Writing (8 PDFs)",
            resources: [{
              id: "b4ea3326ca324096b256ca3b9bcddf87",
              title: "Descriptive Essays Guide"
            }, {
              id: "02fab5eeb7154b6bac186197e010293e",
              title: "Descriptive Writing Techniques"
            }, {
              id: "76a0e9de2b6549b896f134bcb06dc06e",
              title: "Advanced Descriptive Writing"
            }, {
              id: "01b7c5a939f645e9a81272701f0dc0ad",
              title: "Descriptive Writing Fundamentals"
            }, {
              id: "fcecc9f6f0a941bdb4d7bbd1fea6fdac",
              title: "Descriptive Pieces Compilation"
            }, {
              id: "89ddb90c195a47fab2c2cbc1bee44b69",
              title: "Descriptive Writing Presentation"
            }, {
              id: "3ce1fd3ebb144b65ad33dac7358ed782",
              title: "Descriptive Writing Model Answers"
            }, {
              id: "69bed5a2314c41df815af99afe9fdb9a",
              title: "Descriptive Essay: High-Scoring Sample (32/40 marks)"
            }]
          },
          narrativeWriting: {
            title: "Narrative Writing (5 PDFs)",
            resources: [{
              id: "fafd8e241056428688504e45682acd6d",
              title: "Key Features: Describe & Narrate"
            }, {
              id: "5200acdfe8354114afd6642e3870375e",
              title: "IGCSE Describe & Narrate Guide"
            }, {
              id: "91143e7cfb1844c4911d11ef2f0547b4",
              title: "Narrative Writing Sample 1"
            }, {
              id: "cc96cd59c7734a46a68c0dc17b614c76",
              title: "Narrative Writing Sample 2"
            }, {
              id: "9311807f3dd04d57a98f52b6169273b4",
              title: "Narrative Writing Presentation Guide"
            }]
          },
          textFormatsAdditional: {
            title: "Text Formats (12 PDFs)",
            resources: [{
              id: "859bf22e5fdc46768bc138337b0e02fa",
              title: "Formal Report: Sample Plan"
            }, {
              id: "a868aaef4c3b451d9885bbe73423ddad",
              title: "Formal Report: Structure & Planning Template"
            }, {
              id: "2fc11cf9f9da48caa39e0a78af57038e",
              title: "Report Writing: Model Answer 1"
            }, {
              id: "89db41610eeb41c0a070f0f2207c55d5",
              title: "Report Writing: Model Answer 2"
            }, {
              id: "b00fefc1eb28440399cc9903a4c9ab8e",
              title: "Newspaper Report Writing Guide"
            }, {
              id: "1f1718c1ad7a4662a760a54f697b6f3e",
              title: "Speech Writing Guide"
            }, {
              id: "451bece1c3c14163b3f4b7faa5cc84cc",
              title: "Argumentative Speech Sample"
            }, {
              id: "d151d864f0e0427fb3960d989e26a005",
              title: "Interview Writing: Sample 2"
            }, {
              id: "3398bfe0f02548ba86e5e622843a9671",
              title: "Interview Sample Answer"
            }, {
              id: "e203d515ae0343f194de624abb57f3be",
              title: "Letter Writing Guide"
            }, {
              id: "a500a3ad31474cdaa1665e5159118005",
              title: "School Magazine Article Writing Guide"
            }, {
              id: "c2586d2e7e9e417fa8eddb2f4f939605",
              title: "Argumentative Essay Examples"
            }]
          },
          directedWriting: {
            title: "Directed Writing (13 PDFs)",
            resources: [{
              id: "8b2ecc8c397a4e4196077a82c469b80e",
              title: "Directed Writing: Genre Conventions"
            }, {
              id: "25dd9852abd14a5fad13b54723435bcd",
              title: "Paper 2: Directed Writing Workshop Guide"
            }, {
              id: "1258eb2da8c04782ba886b166d467a15",
              title: "Extended Response: Writing Conventions"
            }, {
              id: "0cf74626d158474cbbba22258df2075c",
              title: "Creative Writing Guide"
            }, {
              id: "25d7a4cd767c4292919345d3367b7cc8",
              title: "Extended Response: Genre Vocabulary Bank"
            }, {
              id: "d16d1ba2faeb4353b40a5ecda049b37b",
              title: "Writing the Six Text Types"
            }, {
              id: "ebf502605089403a8d6f7f59956bbdd8",
              title: "Directed Writing: Introduction & Revision"
            }, {
              id: "413d6c9a7a5549eab119b82a7b99db3c",
              title: "Directed Writing: Text Formats"
            }, {
              id: "417dc31764c8425caf47e2aaeed42bd9",
              title: "Text Formats and Structures Guide"
            }, {
              id: "f0afbf7377a64243831cbaf73746edf1",
              title: "Text Formats Guide (A)"
            }, {
              id: "505cfdcc87ff45a59adbc5ebd9f94fa2",
              title: "Text Formats Guide (B)"
            }, {
              id: "f6dd22f7338f47c281722b5ecd6ae1f1",
              title: "First Language English Formats Collection"
            }, {
              id: "066e06b44f894972bea822e00c2bd2d3",
              title: "Directed Writing Formats Reference"
            }]
          },
          paperTips: {
            title: "Paper Tips (4 PDFs)",
            resources: [{
              id: "030403d7f50346aca03f9219bcccb8e8",
              title: "Paper 1 Q2d: Language Task Tips"
            }, {
              id: "2901d3da5b0d4b9e95dd93f1b0f72822",
              title: "Paper 1 Walkthrough by Knuckleducky"
            }, {
              id: "34e2bfcd03f04a08af55d9c2b86642d4",
              title: "Paper 2 Walkthrough by Knuckleducky"
            }, {
              id: "ce202b0084724bafbac6bd71093d1b96",
              title: "Paper 2 PowerPoint Presentation"
            }]
          },
          practiceMaterials: {
            title: "Practice Materials (3 PDFs)",
            resources: [{
              id: "468dd31196a943c0b4f32c82a7d78f5b",
              title: "Extra Practice: Paper 2 Question Paper"
            }, {
              id: "a4b8e5e87fff4ebda33ebb6a30b7aa1c",
              title: "Extra Practice: Paper 2 Insert Material"
            }, {
              id: "feb274043c2e4e7194ef150ea7bd69ce",
              title: "Top IGCSE 0500 Articles Collection"
            }]
          },
          additionalResourcesFinal: {
            title: "Additional Resources (4 PDFs)",
            resources: [{
              id: "4fbee7bc404445c7af71018de048d992",
              title: "Coursework Handbook (Component 3)"
            }, {
              id: "fafcc384115a4763ac8c1c45a134e8d5",
              title: "Extended Writing Workbook"
            }, {
              id: "05b09097ce3c4e96b2edfc87ef1107a2",
              title: "Additional Writing Resources"
            }, {
              id: "1fccf84f74a144948a2a0fdb25bd4155",
              title: "Comprehensive Study Resource Collection"
            }]
          }
        }
      }
    }
  },
  cambridge9093: {
    title: "Cambridge English Language (9093)",
    categories: {
      examNotes: {
        title: "Exam Notes",
        icon: FileText,
        description: "Comprehensive exam preparation notes",
        sections: {
          paper1: {
            title: "Paper 1 Notes (1 PDF)",
            resources: [{
              id: "61c32a7db2e2427fa4064bfcdaa7ec64",
              title: "Detailed Guide"
            }]
          },
          paper2: {
            title: "Paper 2 Notes (2 PDFs)",
            resources: [{
              id: "62f318ad9bd640379dd77d093e10a5b2",
              title: "Detailed Guide"
            }, {
              id: "534246d0681e4f36a8ddeb18a8992738",
              title: "General Guide"
            }]
          },
          paper3: {
            title: "Paper 3 Notes (2 PDFs)",
            resources: [{
              id: "d0f8f8d81257425481a5b2d061c070f6",
              title: "Child Language Acquisition (CLA)"
            }, {
              id: "0a3411cfdc874a1d9acfadcafd476e15",
              title: "Language Change Framework and Theories"
            }]
          },
          paper4: {
            title: "Paper 4 Notes (2 PDFs)",
            resources: [{
              id: "75921c2f801a4b188647474b8bc0f458",
              title: "Language and the Self"
            }, {
              id: "3cdef77132504ce6bd3a24b894b0a0fe",
              title: "English in the World"
            }]
          },
          general: {
            title: "General Notes (3 PDFs)",
            resources: [{
              id: "7a9fba2cc036497e861365988c4dd1df",
              title: "AS Level Notes"
            }, {
              id: "783f9d9597d049a29e6f87f06dd2ec41",
              title: "Literary Techniques"
            }, {
              id: "5318cad664b34c7f91d9b3392ab24713",
              title: "A Level Notes"
            }]
          }
        }
      },
      examples: {
        title: "Examples",
        icon: Globe,
        description: "Sample papers and examples",
        sections: {
          paper1: {
            title: "Paper 1 Examples (4 PDFs)",
            resources: [{
              id: "73046f346cad49d7bb46f6452f7d9c29",
              title: "A Level English Language Paper 1 - 2015"
            }, {
              id: "07bb6fcf576e49fe94f986b72b9e100c",
              title: "A Level English Language Paper 1 - 2016"
            }, {
              id: "a7d45e7acb4645c7a663aae1d8cbaf2c",
              title: "A Level English Language Paper 1 - 2019"
            }, {
              id: "0f62df7e96674ef6b997e57924c9fa48",
              title: "A Level English Language Paper 1 - 2024"
            }]
          },
          paper2: {
            title: "Paper 2 Examples (3 PDFs)",
            resources: [{
              id: "c3cfcdd79df046e495dfc5cecd6d88fc",
              title: "A Level English Language Paper 2 - 2015"
            }, {
              id: "beec40f8a9c14822bbdb16a18112f21f",
              title: "A Level English Language Paper 2 - 2021 Specimen"
            }, {
              id: "ed238c9893f9486eb0eea20a9f11e1cd",
              title: "A Level English Language Paper 2 - 2021"
            }]
          },
          paper3: {
            title: "Paper 3 Examples (5 PDFs)",
            resources: [{
              id: "f8761d0899f34dc0a4cf0fdc6593cbc2",
              title: "A Level English Language Paper 3 - 2015"
            }, {
              id: "5744334da07e4d0f9c12d759d9cd6589",
              title: "A Level English Language Paper 3 - 2016"
            }, {
              id: "a77e3ca234b34f0eafe349a95ee43353",
              title: "A Level English Language Paper 3 - 2021 Specimen"
            }, {
              id: "36ff2d581c78437db0b71b0c73b9b3ea",
              title: "A Level English Language Paper 3 - 2021"
            }, {
              id: "5e344ba0ba06484bbc7a87a485fbe6b2",
              title: "A Level English Language Paper 3 - 2024"
            }]
          },
          paper4: {
            title: "Paper 4 Examples (4 PDFs)",
            resources: [{
              id: "5350718a73e840c8a7e3978265a336dc",
              title: "A Level English Language Paper 4 - 2015"
            }, {
              id: "23ed5cfaec5a486c8fc3e188926f02cd",
              title: "A Level English Language Paper 4 - 2021 Specimen"
            }, {
              id: "73de4332dc5e4cf0a1b44f8697e5c7ed",
              title: "A Level English Language Paper 4 - 2021"
            }, {
              id: "64e7ae01e6534933a5a33333ad7cd13d",
              title: "A Level English Language Paper 4 - 2024"
            }]
          },
          studentWork: {
            title: "Student Work (3 PDFs)",
            resources: [{
              id: "8779acf62fda492abf46f2c868c2682a",
              title: "Student Work: Marking & Feedback"
            }, {
              id: "cc5e81f9ef72418a888ecedc18bc1caa",
              title: "Student Paper 1 Answers"
            }, {
              id: "e125c2ec376e44d68445108c52d4e3ee",
              title: "Student Paper 2 Answers"
            }]
          },
          paper1StudentWork: {
            title: "Paper 1 Student Work (1 PDF)",
            resources: [{
              id: "73d0835b50d844a29ecd84e89af753a4",
              title: "Paper 1 Question Paper"
            }]
          },
          paper2StudentWork: {
            title: "Paper 2 Student Work (1 PDF)",
            resources: [{
              id: "d6523b46bbbd4e3fb191549f3ddf31f5",
              title: "Paper 2 Question Paper"
            }]
          }
        }
      },
      vocabulary: {
        title: "Vocabulary",
        icon: BookOpen,
        description: "Language and vocabulary resources",
        sections: {
          languageResources: {
            title: "Language Resources (5 PDFs)",
            resources: [{
              id: "11039e8149fc49109745e18be0a670a8",
              title: "Literary Analysis Guide"
            }, {
              id: "5f69096897a5476880a7b8bb9122a5c0",
              title: "Positive & Negative Feelings"
            }, {
              id: "8bea661edeeb42939a1b0913a0f79be6",
              title: "Grammar Improvement"
            }, {
              id: "50361b73a41d498abef26f8d2f00f161",
              title: "Punctuation Guide"
            }, {
              id: "6d51f944010c4c309c1ae9aed1dba13e",
              title: "Glossary of Terms"
            }]
          }
        }
      }
    }
  },
  generalPaper: {
    title: "Cambridge General Paper",
    categories: {
      examNotes: {
        title: "Exam Notes",
        icon: FileText,
        description: "Comprehensive exam preparation notes",
        sections: {
          paper1: {
            title: "Paper 1 (Essay notes - 2 PDFs)",
            resources: [{
              id: "d57991c9eb1f4bbe8451327e00e17d76",
              title: "Essay Structuring"
            }, {
              id: "b97dbffd918f4df59b82a78ded432db1",
              title: "Detailed Essay Notes"
            }]
          },
          paper2: {
            title: "Paper 2 (General guides - 2 PDFs)",
            resources: [{
              id: "e84c324da15a4d05912ae298b70a5f91",
              title: "General Guide"
            }, {
              id: "005ebed720bd49d9a2b566c8b6de6725",
              title: "Detailed Guide"
            }]
          },
          essayEvidences: {
            title: "Essay evidences (3 PDFs)",
            resources: [{
              id: "a401014f219348929ea1898a5ffc963b",
              title: "Essay Evidences"
            }, {
              id: "5a6b409d3c6c4818b7c4fe3b1e5d945c",
              title: "Definitions Guide"
            }, {
              id: "40d028ecdc0a4fe2bc3348ed1799d844",
              title: "Examples of Essay Evidences"
            }]
          },
          general: {
            title: "General Notes (2 PDFs)",
            resources: [{
              id: "82cef0f35426475da34734f8f3d82abb",
              title: "Scheme Of Work"
            }, {
              id: "de13142951c54d4184987083ba56e47b",
              title: "Learner's Guide"

            }, {
              id: "87bfa81d255b4e49a08461915e1dd80c",
              title: "Essay Hooks"
            }]
          }
        }
      },
      examples: {
        title: "Examples",
        icon: Globe,
        description: "Sample papers and examples",
        sections: {
          paper1: {
            title: "Paper 1 Examples (2 PDFs)",
            resources: [{
              id: "a4d33f76e9c74c67b08c497252f0e9d9",
              title: "General Paper 2019"
            }, {
              id: "169ae0ce7ebe4ec38e1f3b58f90142e8",
              title: "General Paper 2023"
            }]
          },
          paper2: {
            title: "Paper 2 Examples (2 PDFs)",
            resources: [{
              id: "3393780b82784cd6aeab3289ba339f62",
              title: "General Paper 2019"
            }, {
              id: "93929a4048874a2abb4098268b443197",
              title: "Sample Answers"
            }]
          }
        }
      },
      vocabulary: {
        title: "Vocabulary",
        icon: BookOpen,
        description: "Language and vocabulary resources",
        sections: {
          languageResources: {
            title: "Language Resources (5 PDFs)",
            resources: [{
              id: "11039e8149fc49109745e18be0a670a8",
              title: "Literary Analysis Guide"
            }, {
              id: "5f69096897a5476880a7b8bb9122a5c0",
              title: "Positive & Negative Feelings"
            }, {
              id: "8bea661edeeb42939a1b0913a0f79be6",
              title: "Grammar Improvement"
            }, {
              id: "50361b73a41d498abef26f8d2f00f161",
              title: "Punctuation Guide"
            }, {
              id: "6d51f944010c4c309c1ae9aed1dba13e",
              title: "Glossary of Terms"
            }]
          }
        }
      }
    }
  },
  edexcel: {
    title: "Edexcel A Level English Language",
    categories: {
      examNotes: {
        title: "Exam Notes",
        icon: FileText,
        description: "Comprehensive exam preparation notes",
        sections: {
          edexcelResources: {
            title: "Edexcel Resources (12 PDFs)",
            resources: [{
              id: "7a8712cc4de7466da111488f97a523e2",
              title: "Edexcel English Language Syllabus"
            }, {
              id: "dc6794ef27f9493b84cb5987d888ac2a",
              title: "Edexcel English Language Specifications"
            }, {
              id: "b221d5ab7c9c42ec91f5e5beb33d12ad",
              title: "Complete Syllabus Notes & Resources"
            }, {
              id: "034c0b6c53e64c9ca34ba84faadced69",
              title: "Edexcel A Level English Language Unit 1 Notes"
            }, {
              id: "48cb2650d6624986a7063984d560f599",
              title: "IAL Language Unit 1 Section A: Teaching Notes"
            }, {
              id: "ce4fbdbc5e404243853bab918d54328e",
              title: "English IAS Pearson Edexcel Notes"
            }, {
              id: "ff2a1384708e46f695628d4ca6e377d8",
              title: "English IAS Level 15 Mark Question: Exemplar Notes"
            }, {
              id: "116978d136d446f39939bf8b9e6982a2",
              title: "IAL Getting Started Teaching Guide"
            }, {
              id: "d8a407e8fd254278abe3c7fd2b12f46e",
              title: "IAL Language Unit 1 Section B: Marking Grid"
            }, {
              id: "04e7491783954ebbb562b8e85c91e7dd",
              title: "Sample Assessment: English Language"
            }, {
              id: "5bb6531ada534d4d8c5d859eecf134a9",
              title: "Edexcel English Language Student Reference Book"
            }, {
              id: "a90ca43349cf437ea3464e9120a0cb3c",
              title: "IAL English Language Resource Collection"
            }]
          }
        }
      },
      examples: {
        title: "Examples",
        icon: Globe,
        description: "Sample papers and examples",
        sections: {
          wenScripts: {
            title: "WEN Scripts & Commentaries (3 PDFs)",
            resources: [{
              id: "1e8f6608926e4e26b040ee1ccc71e273",
              title: "WEN01: Scripts & Commentaries"
            }, {
              id: "ba5bb6c74254444e8bcb1016a15babf1",
              title: "WEN02: Scripts & Commentaries"
            }, {
              id: "6988bebde12c4c20b5c3c96ddc741a2d",
              title: "WEN03: Scripts & Commentaries"
            }]
          },
          unitExemplars: {
            title: "Unit Exemplars (9 PDFs)",
            resources: [{
              id: "25f138d49801495abf4d276cdbb1811b",
              title: "Unit 1 WEN01: Exemplars"
            }, {
              id: "62c17359480f473088728e3dd4b7bc39",
              title: "Unit 3 WEN03: Exemplars"
            }, {
              id: "08d5fc24aaaf493a9bdbc30838ef7a3e",
              title: "IAL Unit 4 Investigating Language: Section B Exemplars"
            }, {
              id: "2475742b141b4157b5c14b4784dbf9ae",
              title: "IAL Unit 4 Investigating Language: Section A Exemplars"
            }, {
              id: "b2b08ef2a4444d1bb4b3825b4548d08e",
              title: "IAS Unit 1 Context & Identity: WEN01 Exemplars"
            }, {
              id: "d879dd315d4d4fa483a20bfd4e2353b2",
              title: "IAS Unit 1 Language Context & Identity: Section A Exemplars"
            }, {
              id: "9fe86a51ba1f4e6cbcde1249d181f27f",
              title: "IAS Unit 1 Language Context Identity: 35 Mark Question Answers"
            }, {
              id: "77bdba79e9204008b04bbe7e0791f21f",
              title: "A Level Paper 1 Section A: Exemplars Pack"
            }, {
              id: "a1fbc7ef59a84964984e9bd0e5ff8530",
              title: "IAL Language Unit 1 Sections A & B: Exemplars"
            }]
          }
        }
      },
      vocabulary: {
        title: "Vocabulary",
        icon: BookOpen,
        description: "Language and vocabulary resources",
        sections: {
          edexcelVocabulary: {
            title: "Edexcel Vocabulary (1 PDF)",
            resources: [{
              id: "fa657cea629343b58d9e2c89dfb94761",
              title: "Edexcel A Level English Language: Glossary of Terms"
            }]
          }
        }
      }
    }
  },
  ib: {
    title: "IB Language & Literature",
    categories: {
      examNotes: {
        title: "Assessment Preparation",
        icon: FileText,
        description: "Exam and assessment preparation materials",
        sections: {
          paper1: {
            title: "Paper 1 - Guided Textual Analysis (12 PDFs)",
            resources: [
              { id: "461b73068ce642cd8a1e46d1bf8f7319", title: "Paper 1 Notes - HL Lang and Lit" },
              { id: "efe2fdfc928a4448bbcc431de9bdcbfc", title: "How to Write an Essay Paper 1" },
              { id: "c4fa7017dee045deb448b858eb52114b", title: "How to Develop Analysis Paper 1" },
              { id: "7cd2f650db6c4df992db3143ddf69c19", title: "Paper 1 Example - Magazine Gun Laws" },
              { id: "dd523148607042bba2aefe55b9a47d6a", title: "Paper 1 Text Types and Their Features" },
              { id: "52b5d47db74549af8a981947dc96e227", title: "How to Write a Textual Analysis" },
              { id: "092c8ea95c2e45078818751b3129bbba", title: "IB Lang Lit Cheat Sheet - Paper 1" },
              { id: "b43df1b92600467f85ac71104f00a44c", title: "Paper 1 Review and Tips" },
              { id: "6ffd5c170f704211a02c720c74cb6083", title: "P1 Criterion Wise" },
              { id: "d39081ad047b41089c47e00e0f5edf55", title: "General Tips and Advice - IBDP English LAL P1" },
              { id: "23225560c9ff42dcba988ebdb20be713", title: "Paper 1 Practice SL" },
              { id: "7203d856d6e74d5fa84081d88d8afdf5", title: "Paper 1 Practice HL" }
            ]
          },
          paper2: {
            title: "Paper 2 - Comparative Essay (3 PDFs)",
            resources: [
              { id: "838ff7b50c6840edafa8ed5a420b1875", title: "Paper 2 Notes - HL Lang and Lit" },
              { id: "1d24fc32e8ac40de9ac4e6d10fc07bd3", title: "Paper 2 Quotes Summary - HL Lang and Lit" },
              { id: "73b06a008ebb42258cb3d3d019fe06a3", title: "How to Write a Comparative Literature Essay" }
            ]
          },
          combinedPapers: {
            title: "Combined Paper 1 & 2 Resources (3 PDFs)",
            resources: [
              { id: "f893a0776a0f4bc08931244710c13e1a", title: "Practice for Paper 1 and 2 - HL Lang and Lit" },
              { id: "592e91e21d1a42e5a4fb382650c4e57f", title: "Exam Study Guide - Paper 1 and 2" },
              { id: "0f739e9c5a634853bb4369018daf2136", title: "Paper 1 & 2 Notes" }
            ]
          },
          ioOral: {
            title: "Individual Oral (IO) Preparation (10 Resources)",
            resources: [
              { id: "a3d03e25fb8848feb459d0dade244c60", title: "Checklist for Success - IBDP ENGLISH L&L IO" },
              { id: "0b1d41f964594c12a84042c9b6ae9136", title: "Final IO Comprehensive Document" },
              { id: "5ff4fe1484564d6cac00c89bfcbad535", title: "Final IO Outline" },
              { id: "d44fc4a9fbae46af90b009c4cecb807d", title: "Final IO Script" },
              { id: "d97301dbbfed4cb6868c7d20921a4975", title: "L&L Oral Commentary Guide" },
              { id: "a158820d94934816ab42fd0fbbb05c30", title: "Sample A Audio - Lang Lit Individual Oral" },
              { id: "7be7c0b65934426e8219b4f52ed19e27", title: "Sample B Audio - Lang Lit Individual Oral" },
              { id: "a70237d572d24790bb421643d36f43c8", title: "Sample C Audio - Lang Lit Individual Oral" },
              { id: "e9ad90e78ec24194850a727250a23ca0", title: "Sample D Audio - Lang Lit Individual Oral" },
              { id: "f0d751cb4eb444c89671c1a68ff8ca9a~mv2", title: "IO Visual Guide" }
            ]
          },
          hlEssay: {
            title: "HL Essay Resources (12 PDFs)",
            resources: [
              { id: "5a713dd0b907484ea33828a8cff2d941", title: "Higher Level Essay - Whole School Resource" },
              { id: "eb3e9a444adf46ba955e29018ec4325c", title: "English Higher Level Essay Final" },
              { id: "f3e1452c33cd4dec9893cdb84c9e97f0", title: "Higher Level Essay" },
              { id: "93b2259a55a74abf83ce376a4dad7f78", title: "HL Essay" },
              { id: "e51334b0760b4f60a726fe324620a853", title: "Jana's HL Essay" },
              { id: "801ee8febe2b4bd3806699702a6a030e", title: "HL Essay Example A Commentary" },
              { id: "8830589c1bc544b19b1f96a921a7f2a6", title: "HL Essay Example C Commentary" },
              { id: "b50abf120f414a3fa5aa442993805d60", title: "HL Essay Example A" },
              { id: "fd50cfd9d2164443a74d7dbf1d496696", title: "HL Essay Example C" },
              { id: "25f23b3191f347c882befed46cb9094d", title: "HL Essay Example A (Alt)" },
              { id: "c3bc5373bf954e75a01e9d1739bf5d03", title: "HL Essay Sample B Category 2" },
              { id: "6c114946985e41599eeaff8fd6861907", title: "HL Essay Sample B Commentary Category 2" }
            ]
          },
          bodiesOfWork: {
            title: "Bodies of Work (BOW) Materials (5 Resources)",
            resources: [
              { id: "25e39bc8581e4938a734b87b12143336", title: "Mental Health - BOW" },
              { id: "d1e6e099914142e684861570d267a775", title: "BOWs - Anger Leading to Violence" },
              { id: "20d95f0b2c72454c8c4797b4911d0fe5", title: "Street Art" },
              { id: "31fb45c6e0ae457bac7cc9487ab7a085", title: "Film Mini-Unit" },
              { id: "08c4e8662a474303b0dd844e1d5fbe22", title: "Parental Neglect - Photographs" }
            ]
          }
        }
      },
      courseFramework: {
        title: "Course Framework & Guides",
        icon: BookOpen,
        description: "IB course structure and core concepts",
        sections: {
          courseGuides: {
            title: "Course Guides & Syllabus (5 Resources)",
            resources: [
              { id: "e62ebb3cb4784867a8fa3736b51d0a23", title: "English Language and Literature Guide 2021" },
              { id: "80c90c0c90324007b543facd516b07a4", title: "English A Language and Literature - Brad Philpot" },
              { id: "e9c56b736e764fa2b4af1a5b929881db", title: "Introduction Presentation" },
              { id: "6aaaeb160adc4a0190fb998502572b5c", title: "ENGLISH A L&L ALL Topics" },
              { id: "15e6618377394756b084cee0678552da", title: "English A&B" }
            ]
          }
        }
      },
      literaryAnalysis: {
        title: "Literary Analysis Tools",
        icon: Award,
        description: "Literary terms and analytical frameworks",
        sections: {
          literaryTerms: {
            title: "Literary Terms & Devices (130+ PDFs)",
            resources: [
              { id: "07138dc2621345acb5ccde062e36ac91", title: "Complete Linguistic and Literary Features List" },
              { id: "9092ca0eb9804f949f430128961badbb", title: "Literary Terms And Devices Quick Reference" },
              { id: "d9459124a7934e828cb1b78bb14eb3f6", title: "The Bread and Butter of Literature" },
              { id: "4b69c6153f7947a296eee98d41ba8b9b", title: "Glossary of Drama Terms" },
              { id: "97404db0957145f5a350fbd7ac7265fd", title: "Alliteration-LitChart" },
              { id: "3137c26e9fb04e43a29a4bddf47404b0", title: "Allegory-LitChart" },
              { id: "8982ceea568d42f39dfe8ca4d833c03a", title: "Allusion-LitChart" },
              { id: "2a500dcceb66466f9a13b0254da7dbfb", title: "Alliteration Analysis Chart" },
              { id: "13ea41c2aed645f4b3f82d2a7705c61d", title: "Anapest-LitChart" },
              { id: "b50604ead4644f5ca6ed2a6d1f6c6abe", title: "Anadiplosis-LitChart" },
              { id: "5aa0a614c40349439f9060f3dc5f0341", title: "Anachronism-LitChart" },
              { id: "7282b9250ac9479c82319ce1398c4117", title: "Analogy-LitChart" },
              { id: "66378c434396436cb6dac96810df306b", title: "Anaphora-LitChart" },
              { id: "a5155ac74d684134848ffda5f762b3cf", title: "Antagonist-LitChart" },
              { id: "ea0941d5df494812a3d760e3547af821", title: "Antanaclasis-LitChart" },
              { id: "02f618c164ae431085a05c2b22aaf6fb", title: "Antimetabole-LitChart" },
              { id: "ed202ea1bdf4402287ba37a4f64f9280", title: "Anthropomorphism-LitChart" },
              { id: "28d89f25859240348933e46eb05154e2", title: "Antithesis-LitChart" },
              { id: "022e295437af42c2b1b654f7518de79c", title: "Aphorism-LitChart" },
              { id: "994aa00d4ec243e1b76b6e80dcd21829", title: "Aphorismus-LitChart" },
              { id: "d8b09cfcd4a84e1f91dff7fbfc1140b4", title: "Aporia-LitChart" },
              { id: "0963116c80ae4bfa9435c3d44faa8e74", title: "Apostrophe-LitChart" },
              { id: "4072de44a5b2431eb0c9b906530e4519", title: "Assonance-LitChart" },
              { id: "542fe63b66384672a2112d2f387df9ba", title: "Asyndeton-LitChart" },
              { id: "314628e7d93c4f27a9527198931240be", title: "Ballad-LitChart" },
              { id: "9a198ead510d4d3799e17fc1c0f6e60f", title: "Ballade-LitChart" },
              { id: "c663ec72bdd64d1f8be1d4b50aaeeeae", title: "Bildungsroman-LitChart" },
              { id: "913e2e23a92e43eebc1ac94cb34a2cf5", title: "Blank Verse-LitChart" },
              { id: "5931a97e303a434dbf43d7be2f746c2d", title: "Cacophony-LitChart" },
              { id: "f04b3d2857c64980afa061fb7ef2b3eb", title: "Caesura-LitChart" },
              { id: "9ad9494f15094226b3487f87173ac902", title: "Catharsis-LitChart" },
              { id: "3f0599cd26844c47a18b0fd85cfb4f1d", title: "Characterization-LitChart" },
              { id: "7c21df4ee87e486cb49c2ab3a7cdc12e", title: "Chiasmus-LitChart" },
              { id: "159616903e2543ada136b7905b686650", title: "Cinquain-LitChart" },
              { id: "ba9445b84ef94ea1b23a835780022518", title: "Cliché-LitChart" },
              { id: "cbab08aa921642cea2e4833ec698d44e", title: "Climax (Figure of Speech)-LitChart" },
              { id: "a0ff8ee68a3e4849be4519e4bd0c0d65", title: "Climax (Plot)-LitChart" },
              { id: "8726defc78204e268a8de0c14da5fdd3", title: "Colloquialism-LitChart" },
              { id: "00c220d64fe94d92b1d5246d29c91ca3", title: "Common Meter-LitChart" },
              { id: "bced8780520244a2a2fee55ba28b5d9b", title: "Conceit-LitChart" },
              { id: "e007e2deda6e42a496e5d952c0cbb184", title: "Connotation-LitChart" },
              { id: "474cfd760a424f9fa6d69d37ae288b43", title: "Consonance-LitChart" },
              { id: "3f7408e04120441a91d926c4959c96cf", title: "Couplet-LitChart" },
              { id: "e2ced64edff64858908a0c5607253b2c", title: "Dactyl-LitChart" },
              { id: "4d9aec2c1bb24e36adabbebe4629f0fa", title: "Denotation-LitChart" },
              { id: "da7076e9bbf24bcc9efdcf6d094dfb9e", title: "Deus Ex Machina-LitChart" },
              { id: "3f36cdfefe9a4dd5870af0153fa8b673", title: "Dialogue-LitChart" },
              { id: "adc8d23ac711482a950dd0d6a9f2a40a", title: "Diacope-LitChart" },
              { id: "e48e673994904b95be6a0366a5dd2988", title: "Diction-LitChart" },
              { id: "a40ac73de78f4648a4b9122be564c1b6", title: "Dénouement-LitChart" },
              { id: "129997a8616b4cce964909a5fdeb6a87", title: "Dramatic Irony-LitChart" },
              { id: "bdd41062ef9c48d996981eb638b234f5", title: "Dynamic Character-LitChart" },
              { id: "2112707108ac4b3a83f6997287a87435", title: "Elegy-LitChart" },
              { id: "25f7c96c307f43118e474846b152030d", title: "End Rhyme-LitChart" },
              { id: "f13f3a42b3e54e2bb85382148078fef2", title: "End-Stopped Line-LitChart" },
              { id: "23e915267011490baec03a6631efcad2", title: "Enjambment-LitChart" },
              { id: "dd2801387ac04b7b8c521604bbafd375", title: "Epanalepsis-LitChart" },
              { id: "3916e8be77fe49ae99b98eba9c065ea4", title: "Epigram-LitChart" },
              { id: "daa35f90c0b64366ad729fa5e348d9b0", title: "Epigraph-LitChart" },
              { id: "ee62d2108ccc4809b9913ac8bca1c589", title: "Epistrophe-LitChart" },
              { id: "acb9e37d395848d5a4ec902552144973", title: "Epizeuxis-LitChart" },
              { id: "27b7406cb97d436ba5c02ea203e0eee1", title: "Envoi-LitChart" },
              { id: "ca3a0d841a084f23a3d6e685fc236620", title: "Ethos-LitChart" },
              { id: "2271c62163dc4660b191af1a9d39085f", title: "Euphony-LitChart" },
              { id: "5aba4e960b38470db2a8eeb01857c21d", title: "Exposition-LitChart" },
              { id: "c88b527a8d3a498f8251d34f9c40907d", title: "Extended Metaphor-LitChart" },
              { id: "806e300d263a4703b634859cdf2a0be1", title: "External Conflict-LitChart" },
              { id: "554ac1e5e19740199b0ca043332df249", title: "Falling Action-LitChart" },
              { id: "1b90080125314fc8ba2022b87a38cc2e", title: "Figure of Speech-LitChart" },
              { id: "07d441256ae24e5cb84dae0b69f90a83", title: "Figurative Language-LitChart" },
              { id: "a48f264d29ce44a38a7c9cc13c1aa941", title: "Flat Character-LitChart" },
              { id: "f53a2e4b50834c5c8c8995321597824d", title: "Formal Verse-LitChart" },
              { id: "46983410ea634768962b7c94c59ccc03", title: "Foreshadowing-LitChart" },
              { id: "fa86215a32294f7eaf8c74cede730c8d", title: "Free Verse-LitChart" },
              { id: "81462fe4ff61414c9a961647108984f1", title: "Hamartia-LitChart" },
              { id: "6ac14f0c5d054814b88fde81b4d4fd15", title: "Hubris-LitChart" },
              { id: "186486a7e0d049f0a723a3373d67e8a9", title: "Hyperbole-LitChart" },
              { id: "b2010a78797043829978813356adc52d", title: "Iamb-LitChart" },
              { id: "6e4f519369c349d7bb307a9c851ea35c", title: "Idiom-LitChart" },
              { id: "8c5bad6a30e34b739e5c5a9f01025ff3", title: "Imagery-LitChart" },
              { id: "d1b117d5e96c4f0697ace6c82f70c501", title: "Internal Rhyme-LitChart" },
              { id: "b2ffd245c9f0495c83bb95e3f8f64ab0", title: "Irony-LitChart" },
              { id: "f824874064e64596a9c6222ec465866a", title: "Juxtaposition-LitChart" },
              { id: "31dc324bbc054479bc9da9adc0ee5b93", title: "Kenning-LitChart" },
              { id: "6be82b6c46054bf1a7e74d9011348f6b", title: "Line Break-LitChart" },
              { id: "ddf58b3106a24333b967d3d2324a23bf", title: "Litotes-LitChart" },
              { id: "84323019e18b4bcea4bd943abb099225", title: "Logos-LitChart" },
              { id: "5c08c5c6b93f4da8ab6b6857026f8ee4", title: "Metaphor-LitChart" },
              { id: "54448e4426f94688b6b412861e032968", title: "Meter-LitChart" },
              { id: "7fd7d48c01074040b958fa43833eee8e", title: "Metonymy-LitChart" },
              { id: "9618fbca0ba448d9a1b74b3323dd54ae", title: "Mood-LitChart" },
              { id: "c509f5a267bc4a5d93eefd0cdc26506c", title: "Motif-LitChart" },
              { id: "8da8be74b1d4470ab67a664304bc08f5", title: "Narrative-LitChart" },
              { id: "86e17136f55c481bb7e00d7249a1630f", title: "Onomatopoeia-LitChart" },
              { id: "26dd7ca672e544a4a38a64f80d394a0a", title: "Oxymoron-LitChart" },
              { id: "0e5dc5debed84b00a901eb87e6dda35f", title: "Parallelism-LitChart" },
              { id: "0b9589e0a2c14bd28edd96d4b4e62eeb", title: "Paradox-LitChart" },
              { id: "587bfc1762604b4ba0de546bed78fd91", title: "Parataxis-LitChart" },
              { id: "8b46302900b343b7a2f66558106409f7", title: "Parody-LitChart" },
              { id: "5ec5fd1798d3437a8a8355d8967ab696", title: "Pathetic Fallacy-LitChart" },
              { id: "8b80806572bd4ff994d1029ac5208bfe", title: "Pathos-LitChart" },
              { id: "1575a0b0a8b44f6eaa20bad50c071ae5", title: "Personification-LitChart" },
              { id: "841a9a4057ba49d6a7ba04d4412f093b", title: "Plot-LitChart" },
              { id: "fbf7e5a88c804b8a9adadac94835cb6f", title: "Point of View-LitChart" },
              { id: "f01a0baed58e4eb3a376bf433d80df8b", title: "Polysyndeton-LitChart" },
              { id: "4077fdf24ae442e28fd7718ad26ff054", title: "Polyptoton-LitChart" },
              { id: "f99f82f7aa1544f698722227efeeab78", title: "Protagonist-LitChart" },
              { id: "53f1fdf3de014d59930921d7a1a88184", title: "Pun-LitChart" },
              { id: "0ce7d9459659420aad82db5ad3d1a22d", title: "Quatrain-LitChart" },
              { id: "34b53d60388749d083275f84756bf93d", title: "Red Herring-LitChart" },
              { id: "0887a5879c4843439ce962d06821b45d", title: "Refrain-LitChart" },
              { id: "047f208d087e4b4ab2020661ac2908bf", title: "Repetition-LitChart" },
              { id: "6e24b48d3aa743768daad5cfe830a2ab", title: "Rhetorical Question-LitChart" },
              { id: "9968f7b620204f52a6542be201e00212", title: "Rhyme-LitChart" },
              { id: "f9cb20a97eac44969b1608da367dfe28", title: "Rhyme Scheme-LitChart" },
              { id: "a7020396ffec4a77bff32f4b40214566", title: "Rising Action-LitChart" },
              { id: "8575d52a8b13461e91800940e12a7116", title: "Round Character-LitChart" },
              { id: "ce4e96c496204a80807f3f802f4a85a0", title: "Satire-LitChart" },
              { id: "8698d794c100411d9fc385f7de8fa313", title: "Sestet-LitChart" },
              { id: "b20b449eb4404a3084f20d1730a1825e", title: "Setting-LitChart" },
              { id: "8b3fbf446e904211bd16361beba57b86", title: "Sibilance-LitChart" },
              { id: "d847b82e8b884e209686bd5bd6e078fb", title: "Simile-LitChart" },
              { id: "4d55597c81724f908853f50dfa21b408", title: "Slant Rhyme-LitChart" },
              { id: "419331b87ccd4852bcf597353402a1a0", title: "Soliloquy-LitChart" },
              { id: "269793b23d414216b4ded25d6ba54f63", title: "Sonnet-LitChart" },
              { id: "d63945f0899e46a3a85b2d8f8d8daa1b", title: "Spondee-LitChart" },
              { id: "f9d66b009a9d4a62a5850056777db42f", title: "Stanza-LitChart" },
              { id: "e952946d6a824b19b6815e5bee53d597", title: "Static Character-LitChart" },
              { id: "fb568323c8d9450093f6e95aecddca96", title: "Stream of Consciousness-LitChart" },
              { id: "96112b36bc054b31a206faa18346c8cb", title: "Syllogism-LitChart" },
              { id: "d6c48c93b4554648a64583d9f167cedf", title: "Symbolism-LitChart" },
              { id: "900aff6d30964d288cfc986212e7f76a", title: "Synecdoche-LitChart" },
              { id: "9779370fb1554cb8b9bf733a0ce16d90", title: "Theme-LitChart" },
              { id: "90e7b2e451b94b449afee3a95aef0d6f", title: "Tone-LitChart" },
              { id: "e47d28c5fbd942b39ff17f187dca868c", title: "Tragic Hero-LitChart" },
              { id: "d05f65cb4b5c486a88acc36431f0095e", title: "Trochee-LitChart" },
              { id: "d3f105d61f1f425db651bd00f8fb04c8", title: "Understatement-LitChart" },
              { id: "74cc6eb373614a6796955e172518f677", title: "Verbal Irony-LitChart" },
              { id: "de7d7a2c6a8a41e1a79f9883b7712888", title: "Villanelle-LitChart" },
              { id: "323bc8cd91ec4d589f0df050cbc0491a", title: "Zeugma-LitChart" }
            ]
          },
          nonLiteraryFeatures: {
            title: "Non-Literary Text Analysis (20 Resources)",
            resources: [
              { id: "8258ac6b3dd74e2d90bf84193047a95b", title: "Formal Features Text Type Comprehensive" },
              { id: "f0276253e5c442a3a50fd4f4a30ba529", title: "Skills - Non-Literary - ADS Techniques" },
              { id: "b7f1bee5b8cc434a889cbd7ce684bec7", title: "How to Analyze Advertisements" },
              { id: "e0df6377bcf744e285f0b828325e3519", title: "How to Read an Advertisement Mnemonic" },
              { id: "e20c7765c8d2427ea38b43223dc73178", title: "How To Read a Website - Conventions" },
              { id: "c57461656a404ec981452121aaadec7d", title: "Tabloid - Conventions" },
              { id: "0c79467d663b407f91df114c4ddc1353", title: "Tabloid - Conventions Guide" },
              { id: "86ac5499556f43d39715d1e4c206cf57", title: "Brochures Conventions" },
              { id: "3f7cb18a8df3454bb2239f21d88095f6", title: "How To Read a Photograph" },
              { id: "628e2fc8b30c4a05829b469354a25a11", title: "Scientific Articles" },
              { id: "5ea16ff20c094c3d90de206b945edc20", title: "Opinion Column" },
              { id: "bd1ab863a7fa46f99958cd9f825b3c1c", title: "Comics and Cartoon Techniques" },
              { id: "1459682b29374a9ea5ca2ccd60e54165", title: "Cartoon Analysis Worksheet" },
              { id: "8872339d41b24b26a5b722b18b00f55a", title: "Persuasive Techniques" },
              { id: "985507458b304061840472262c3236a2", title: "Persuasive Techniques Definitions" },
              { id: "ee1bcd38f6c243638f07e5ccb549a313", title: "Rhetorical Devices Glossary" },
              { id: "832e198a269e468981a0aa3bb71f2d5c", title: "Language Devices and Their Effects" },
              { id: "f0b55158c25b4a5883e2abe2df68839b~mv2", title: "Color Connotations" }
            ]
          }
        }
      },
      vocabulary: {
        title: "Vocabulary & Language",
        icon: BookOpen,
        description: "Academic language and vocabulary development",
        sections: {
          vocabularyGuides: {
            title: "Vocabulary & Writing Resources (7 Resources)",
            resources: [
              { id: "95c60b1c8a8b4204a50c75e73a6e0c83", title: "Words and Phrases for Writing About a Text" },
              { id: "cb9243dac29541e49994d7d232320b7a", title: "Poetic Devices" },
              { id: "b0781f075f0e4e669eb2c8bfa83d95c6", title: "Poetry Terms Defined Describe Explained" },
              { id: "7a709e7290914ab69b7111883dcda672", title: "Voice In Writing" },
              { id: "74556597ad844582b71a51d19cdedbfd", title: "Tone Words" },
              { id: "fa4b1f14daf64274ad21c58087540ad4", title: "Poetry and Scansion (12 Poems)" },
              { id: "87bfa81d255b4e49a08461915e1dd80c", title: "Essay Hooks" }
            ]
          }
        }
      },
      examples: {
        title: "Exemplars & Sample Work",
        icon: Globe,
        description: "High-quality sample essays and analyses",
        sections: {
          writingExamples: {
            title: "Writing Exemplars (4 PDFs)",
            resources: [
              { id: "cfb4e38772f442248dddf55da23bc57a", title: "Narrative Writing Exemplars" },
              { id: "5d5b0ba8d2934f289c61cb1eb166edd7", title: "Descriptive Writing Examples" },
              { id: "e10f1f9357bb432bb31a1f5af0c5a289", title: "Letter Writing Examples" },
              { id: "35e22943b5654568b20be559f8e30c8f", title: "Writer's Effect Examples" }
            ]
          },
          extendedEssays: {
            title: "Extended Essay Examples (4 PDFs)",
            resources: [
              { id: "5eccda70750b42e59edf7ca2e455905b", title: "Extended Essay Example 1" },
              { id: "8ce65c85e2a24f9191530b4282068b1a", title: "Extended Essay Example 2" },
              { id: "27619f418e7145b280713d2915b81e6a", title: "Extended Essay Final References" },
              { id: "6f52bd302334419eb38778eb68c0c255", title: "Shrek Extended Essay Final" }
            ]
          }
        }
      },
      prescribedTexts: {
        title: "Text Study Guides",
        icon: BookOpen,
        description: "Guides for prescribed literature",
        sections: {
          textGuides: {
            title: "Literary Text Guides (13 Resources)",
            resources: [
              { id: "608bd4c539e6430998e5bcb2b7f276f5", title: "Macbeth - LitCharts Shakescleare Translation" },
              { id: "eef674bdb9224625bd9c5a26668e9a5a", title: "The Handmaid's Tale - LitChart" },
              { id: "a7519422d4a2491ba4a9770a533ef552", title: "The Handmaid's Tale Study Guide" },
              { id: "2a248f0abc8e48b78a4a3bf304830e79", title: "A Thousand Splendid Suns - LitCharts" },
              { id: "99c07033350141a88a84b12726afe21d", title: "Raisin in the Sun - LitCharts" },
              { id: "8ca937f6169048b0830092a3ec748bb9", title: "Metamorphosis - LitCharts" },
              { id: "dceae83a014e49dfb72f7e733e61fa29", title: "Medea and ADH - English Revision Mats" },
              { id: "43c973e412014a878ab5aa1843b19119", title: "Ivan Denisovich Characters" },
              { id: "036fb8273ded452ea48f0357d7a15d58", title: "Duffy Poems Themes and Contexts" },
              { id: "5fbd72e1f10d425db4faa8115b47e2f0", title: "Ode to a Grecian Urn Notes" },
              { id: "d9a56ce522d24fb78a612076b9143638", title: "Master Harold and the Boys" },
              { id: "024afdc3c2cb4a1c825afed2e1d35b3f", title: "A Streetcar Named Desire" },
              { id: "cc3dcd899dd244ee9fc68c718ba2702e", title: "Death of a Salesman" }
            ]
          }
        }
      },
      assessmentTools: {
        title: "Assessment & Practice",
        icon: Target,
        description: "Practice exercises and self-assessment",
        sections: {
          practiceExercises: {
            title: "Practice & Assessment (4 Resources)",
            resources: [
              { id: "0375b3c376404bea9c6a3556d2fdb945", title: "Evaluation Exercises" },
              { id: "5c9c8362f9ee4038bf0b2cd9a7233693", title: "Self Assessment" },
              { id: "f0642f149e634e4dbaf5f77386a161e3", title: "Questions from venice1412" },
              { id: "a5ba9de7817049adbe3bf140182abbde", title: "Themes for Commentary" }
            ]
          }
        }
      }
    }
  }
};

// Animated Book Loader Component
const BookLoader = ({ text = "Loading resources..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-pulse"></div>
        <div className="absolute inset-2 border-4 border-purple-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 font-medium">{text}</p>
    </div>
  );
};

// Success Message Component with more personality
const SuccessMessage = ({ message, subText, onClose }) => {
  return (
    <div className="bg-white border-2 border-green-200 rounded-xl shadow-xl p-4 max-w-sm">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="text-lg">🎉</div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-green-800">{message}</p>
          <p className="text-sm text-green-600 mt-1">{subText}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-green-400 hover:text-green-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Error Message Component with more personality
const ErrorMessage = ({ message, subText, onClose }) => {
  return (
    <div className="bg-white border-2 border-orange-200 rounded-xl shadow-xl p-4 max-w-sm">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="text-lg">🤔</div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-orange-800">{message}</p>
          <p className="text-sm text-orange-600 mt-1">{subText}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-orange-400 hover:text-orange-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Sign Up Modal for unauthenticated users
const SignUpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-3xl">💻</div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! You need to login to use this feature!
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            don't worry it's a click away!
          </p>
          
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 text-lg"
              onClick={() => {
                window.location.href = '/auth-resources';
              }}
            >
              Click me to login
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              Maybe later (continue browsing)
            </Button>
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            <div className="flex items-center justify-center space-x-4">
              <span>📄 Save resources</span>
              <span>🔍 Smart search</span>
              <span>📊 Track progress</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SmartSearch = ({ levelKey, onResourceSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const resource = RESOURCES[levelKey];
  
  // Get all available categories for filtering - with null safety
  const categories = (resource && resource.categories) ? Object.keys(resource.categories) : [];
  
  // Advanced search function with intelligent scoring and conflict detection
  const performSmartSearch = (query, categoryFilter = 'all') => {
    if (!resource || !query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = [];
    const originalQuery = query.toLowerCase().trim();
    const searchTerms = originalQuery.split(' ').filter(term => (term || '').length > 0);

    // Extract numbers from search query for conflict detection
    const queryNumbers = originalQuery.match(/\d+/g) || [];
    const queryNumberWords = originalQuery.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/g) || [];
    
    // Convert number words to digits
    const numberWordMap = {
      'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
      'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10'
    };
    const convertedNumbers = queryNumberWords.map(word => numberWordMap[word]);
    const allQueryNumbers = [...queryNumbers, ...convertedNumbers];

    // Enhanced synonym and context understanding
    const synonymMap = {
      'p1': ['paper 1', 'paper one'],
      'p2': ['paper 2', 'paper two'],
      'p3': ['paper 3', 'paper three'],
      'p4': ['paper 4', 'paper four'],
      'writing': ['composition', 'essay', 'narrative', 'descriptive'],
      'grammar': ['language', 'punctuation', 'syntax'],
      'vocab': ['vocabulary', 'words', 'language'],
      'guide': ['notes', 'manual', 'handbook', 'reference'],
      'example': ['sample', 'specimen', 'model', 'exemplar'],
      'tips': ['advice', 'guidance', 'help', 'suggestions'],
      'structure': ['format', 'organization', 'layout', 'framework']
    };

    // Expand query with synonyms
    let expandedTerms = [...searchTerms];
    searchTerms.forEach(term => {
      if (synonymMap[term]) {
        expandedTerms.push(...synonymMap[term]);
      }
    });

    // Search through all categories, sections, and resources
    Object.entries(resource.categories).forEach(([catKey, category]) => {
      if (categoryFilter !== 'all' && catKey !== categoryFilter) return;
      
      const categoryData = category as any;
      Object.entries(categoryData.sections || {}).forEach(([secKey, section]) => {
        const sectionData = section as any;
        (sectionData.resources || []).forEach((res: any) => {
          const titleLower = res.title.toLowerCase();
          const categoryTitle = categoryData.title.toLowerCase();
          const sectionTitle = sectionData.title.toLowerCase();
          const fullText = `${titleLower} ${categoryTitle} ${sectionTitle}`;
          
          let relevanceScore = 0;
          let matchedTerms = [];
          let conflictPenalty = 0;
          
          // CONFLICT DETECTION: Check for number conflicts
          if (allQueryNumbers.length > 0) {
            const resultNumbers = fullText.match(/\d+/g) || [];
            const resultNumberWords = fullText.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/g) || [];
            const convertedResultNumbers = resultNumberWords.map(word => numberWordMap[word]);
            const allResultNumbers = [...resultNumbers, ...convertedResultNumbers];
            
            // Check for conflicts
            const hasConflictingNumbers = allResultNumbers.some(resultNum => 
              allQueryNumbers.length > 0 && !allQueryNumbers.includes(resultNum) && resultNum !== undefined
            );
            
            if (hasConflictingNumbers) {
              conflictPenalty = 200; // Massive penalty for conflicting numbers
            }
            
            // Bonus for exact number matches
            const hasMatchingNumbers = allResultNumbers.some(resultNum => 
              allQueryNumbers.includes(resultNum)
            );
            if (hasMatchingNumbers) {
              relevanceScore += 50;
            }
          }

          // ULTRA-HIGH PRIORITY: Perfect exact phrase match
          if (titleLower === originalQuery) {
            relevanceScore += 1000;
            matchedTerms.push(originalQuery);
          }
          
          // VERY HIGH PRIORITY: Exact phrase match in title
          else if (titleLower.includes(originalQuery)) {
            relevanceScore += 500;
            matchedTerms.push(originalQuery);
          }
          
          // HIGH PRIORITY: Exact phrase in category/section
          else if (categoryTitle.includes(originalQuery) || sectionTitle.includes(originalQuery)) {
            relevanceScore += 200;
            matchedTerms.push(originalQuery);
          }
          
          // SMART PHRASE MATCHING: Handle variations and abbreviations
          else {
            // Check for smart variations (p1 = paper 1, etc.)
            const smartPatterns = [
              { pattern: /\bp(\d+)\b/g, replacement: 'paper $1' },
              { pattern: /\bq(\d+)\b/g, replacement: 'question $1' },
              { pattern: /\bsection\s*([a-z])\b/g, replacement: 'section $1' }
            ];
            
            let processedQuery = originalQuery;
            smartPatterns.forEach(({ pattern, replacement }) => {
              processedQuery = processedQuery.replace(pattern, replacement);
            });
            
            if (processedQuery !== originalQuery && titleLower.includes(processedQuery)) {
              relevanceScore += 300;
              matchedTerms.push(processedQuery);
            }
          }
          
          // CONSECUTIVE TERM ANALYSIS with word boundaries
          if (searchTerms.length > 1) {
            const consecutivePattern = searchTerms.join('\\s+');
            const consecutiveRegex = new RegExp(`\\b${consecutivePattern}\\b`, 'i');
            
            if (consecutiveRegex.test(titleLower)) {
              relevanceScore += 150;
            } else if (consecutiveRegex.test(categoryTitle)) {
              relevanceScore += 75;
            } else if (consecutiveRegex.test(sectionTitle)) {
              relevanceScore += 50;
            }
          }
          
          // ALL TERMS MUST BE PRESENT (with higher standards)
          const allTermsPresent = searchTerms.every(term => {
            const termRegex = new RegExp(`\\b${term}\\b`, 'i');
            return termRegex.test(fullText);
          });
          
          if (allTermsPresent) {
            relevanceScore += 100;
            
            // WORD BOUNDARY MATCHING with context awareness
            searchTerms.forEach(term => {
              const termRegex = new RegExp(`\\b${term}\\b`, 'i');
              
              if (termRegex.test(titleLower)) {
                const position = titleLower.search(termRegex);
                relevanceScore += position === 0 ? 40 : 25; // Higher score for terms at beginning
                matchedTerms.push(term);
              }
              
              if (termRegex.test(categoryTitle)) {
                relevanceScore += 15;
                matchedTerms.push(term);
              }
              
              if (termRegex.test(sectionTitle)) {
                relevanceScore += 10;
                matchedTerms.push(term);
              }
            });
          } else {
            // If not all terms present, apply heavy penalty
            conflictPenalty += 100;
          }
          
          // SEMANTIC UNDERSTANDING: Check for synonyms and related terms
          expandedTerms.forEach(term => {
            if (!searchTerms.includes(term)) { // Only check synonyms, not original terms
              const termRegex = new RegExp(`\\b${term}\\b`, 'i');
              if (termRegex.test(titleLower)) {
                relevanceScore += 20;
                matchedTerms.push(term);
              }
            }
          });
          
          // ORDER IMPORTANCE: Terms should appear in similar order
          if (searchTerms.length > 1 && allTermsPresent) {
            const titleWords = titleLower.split(/\s+/);
            let orderScore = 0;
            let lastIndex = -1;
            
            for (const term of searchTerms) {
              const currentIndex = titleWords.findIndex((word, idx) => idx > lastIndex && word.includes(term));
              if (currentIndex > lastIndex) {
                orderScore += 10;
                lastIndex = currentIndex;
              } else {
                orderScore -= 20; // Penalty for wrong order
              }
            }
            relevanceScore += orderScore;
          }
          
          // CONTEXT BONUS: Boost scores for contextually relevant matches
          const contextBonuses = {
            'paper': titleLower.includes('paper') ? 25 : 0,
            'writing': titleLower.includes('writing') || titleLower.includes('composition') ? 20 : 0,
            'example': titleLower.includes('example') || titleLower.includes('sample') ? 20 : 0,
            'guide': titleLower.includes('guide') || titleLower.includes('notes') ? 15 : 0
          };
          
          Object.entries(contextBonuses).forEach(([context, bonus]) => {
            if (originalQuery.includes(context)) {
              relevanceScore += bonus;
            }
          });
          
          // FINAL SCORE CALCULATION with conflict penalties
          const finalScore = Math.max(0, relevanceScore - conflictPenalty);
          
          // Only include results with meaningful scores
          if (finalScore > 5) {
            results.push({
              ...res,
              category: categoryData.title,
              categoryKey: catKey,
              section: sectionData.title,
              sectionKey: secKey,
              levelKey: levelKey, // Add levelKey to the result
              relevanceScore: Math.round(finalScore),
              matchedTerms: [...new Set(matchedTerms)],
              hasConflict: conflictPenalty > 0
            });
          }
        });
      });
    });

    // ADVANCED SORTING: Multiple criteria
    results.sort((a, b) => {
      // First priority: Non-conflicting results
      if (a.hasConflict && !b.hasConflict) return 1;
      if (!a.hasConflict && b.hasConflict) return -1;
      
      // Second priority: Relevance score
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      
      // Third priority: Exact title matches
      const aExact = a.title.toLowerCase() === originalQuery;
      const bExact = b.title.toLowerCase() === originalQuery;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Fourth priority: Shorter titles (more specific)
      if (a.title.length !== b.title.length) {
        return a.title.length - b.title.length;
      }
      
      // Final priority: Alphabetical
      return a.title.localeCompare(b.title);
    });
    
    setSearchResults(results);
    setIsSearching(false);
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSmartSearch(searchQuery, selectedCategory);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, levelKey]);

  // Highlight matched terms component - React-based highlighting
  const HighlightedText = ({ text, matchedTerms }) => {
    if (!matchedTerms || (matchedTerms || []).length === 0) {
      return <span>{text}</span>;
    }

    let parts = [text];
    
    matchedTerms.forEach(term => {
      const newParts = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${term})`, 'gi');
          const splitParts = part.split(regex);
          
          splitParts.forEach((splitPart, index) => {
            if (splitPart.toLowerCase() === term.toLowerCase()) {
              newParts.push(
                <span key={`${term}-${index}`} className="bg-purple-100 text-purple-800 px-1 py-0.5 rounded font-semibold">
                  {splitPart}
                </span>
              );
            } else if (splitPart) {
              newParts.push(splitPart);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return <span>{parts}</span>;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Search className="w-6 h-6 text-purple-600" />
                <span>Search - {resource?.title}</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Search across all categories and find resources instantly
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for notes, examples, guides, vocabulary... (e.g., 'paper 1 guide', 'narrative writing', 'grammar')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg"
              autoFocus
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <Label className="text-sm font-medium">Filter by category:</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {(categories || []).map((catKey) => {
                  const categoryData = resource?.categories?.[catKey] as any;
                  return (
                    <SelectItem key={catKey} value={catKey}>
                      {categoryData?.title || catKey}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto ios-scroll p-6">
          {!searchQuery.trim() ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">Start typing to search</h3>
              <p className="text-gray-400">
                Search across hundreds of resources in this subject
              </p>
              
              {/* Quick suggestions */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="text-sm text-gray-500">Try searching for:</span>
                {['paper 1', 'examples', 'vocabulary', 'guide', 'notes'].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (searchResults || []).length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No results found</h3>
              <p className="text-gray-400 mb-4">
                No resources match "{searchQuery}" in {selectedCategory === 'all' ? 'any category' : (resource?.categories[selectedCategory] as any)?.title}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear search
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Found {(searchResults || []).length} resource{(searchResults || []).length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                  Sorted by relevance
                </Badge>
              </div>
              
              {(searchResults || []).map((result, index) => (
                <div
                  key={`${result.categoryKey}-${result.sectionKey}-${result.id}`}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => {
                    onResourceSelect(result);
                    onClose();
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                          <HighlightedText text={result.title} matchedTerms={result.matchedTerms} />
                        </h4>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                        <span className="text-gray-300">•</span>
                        <span>{result.section}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SavedResourcesModal = ({ isOpen, onClose, onOpenPdf, savedResources, onDeleteResource, navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = (savedResources || []).filter(resource =>
    resource.resource_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-purple-600" />
            <span>Your Saved Resources</span>
          </DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            View and access all your saved study resources ({savedResources?.length || 0} total)
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search your saved resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Resources List */}
          {(filteredResources || []).length > 0 ? (
            <div className="space-y-3">
              {(filteredResources || []).map((resource) => (
                <div 
                  key={resource.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {resource.resource_title}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <Badge variant="secondary">{resource.resource_level?.toUpperCase()}</Badge>
                        <Badge variant="outline">{resource.resource_category}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        // Try to navigate to resource with proper routing
                        const levelUrl = LEVEL_TO_URL_MAP[resource.resource_level] || 'all';
                        const categoryUrl = CATEGORY_URL_MAP[resource.resource_category];
                        
                        if (categoryUrl && resource.resource_title) {
                          // For saved resources, we might not have proper section info
                          // Try to find the resource in the data to get the correct section
                          const level = URL_TO_LEVEL_MAP[resource.resource_level] || resource.resource_level;
                          const category = URL_TO_CATEGORY_MAP[resource.resource_category] || resource.resource_category;
                          const resourceData = RESOURCES[level]?.categories?.[category];
                          
                          if (resourceData?.sections) {
                            // Find the section containing this resource
                            let foundSectionKey = null;
                            for (const [sectionKey, sectionData] of Object.entries(resourceData.sections)) {
                              const found = (sectionData as any)?.resources?.find((res: any) => 
                                res.id === resource.resource_id || res.title === resource.resource_title
                              );
                              if (found) {
                                foundSectionKey = sectionKey;
                                break;
                              }
                            }
                            
                            if (foundSectionKey) {
                              const sectionUrl = SECTION_URL_MAP[foundSectionKey];
                              const resourceSlug = generateSlug(resource.resource_title);
                              navigate(`/resources/${levelUrl}/${categoryUrl}/${sectionUrl}/${resourceSlug}`);
                              return;
                            }
                          }
                        }
                        
                        // Fallback to direct PDF if routing info is incomplete
                        onOpenPdf(`${BASE_URL}${resource.resource_id}.pdf`);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => onDeleteResource(resource.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Your collection is looking a bit empty! 📭
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Time to start hoarding some knowledge! Click the bookmark icon on any resource to add it here.
              </p>
            </div>
          )}
        </div>
        
        {/* Close button */}
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to map study level to resource view
const getResourcesViewByLevel = (studyLevel: string | null | undefined): string => {
  if (!studyLevel) return 'home';
  
  switch (studyLevel.toLowerCase()) {
    case 'igcse':
      return 'igcse';
    case 'a-level-9093':
    case 'a-levels-9093':
      return 'cambridge9093';
    case 'a-levels-egp':
      return 'generalPaper';
    case 'edexcel':
    case 'a-level-edexcel':
      return 'edexcel';
    default:
      return 'home';
  }
};

// Main Resources Component
const Resources = () => {
  // Authentication
  const { user, loading } = useAuth();
  
  // React Router navigation
  const navigate = useNavigate();
  const location = useLocation();
  
  // Auth modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authFeature, setAuthFeature] = useState('');
  
  // State management
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [levelBasedNavigationDone, setLevelBasedNavigationDone] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSavedResourcesModal, setShowSavedResourcesModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [resourceToSave, setResourceToSave] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [showNewGroupInput, setShowNewGroupInput] = useState(false);
  const [savedGroups, setSavedGroups] = useState([]);
  
  // Updated savedResources state to actually track saved items
  const [savedResources, setSavedResources] = useState([]);
  
  // Load saved groups and resources from Supabase for the authenticated user
  const fetchSavedGroups = async () => {
    try {
      if (!user) return;
      const { data, error } = await supabase
        .from('saved_groups')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      setSavedGroups(data || []);
    } catch (err) {
      console.error('Error loading saved groups:', err);
    }
  };

  const fetchSavedResources = async () => {
    try {
      if (!user) return;
      const { data, error } = await supabase
        .from('saved_resources')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setSavedResources(data || []);
    } catch (err) {
      console.error('Error loading saved resources:', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedGroups();
      fetchSavedResources();
    } else {
      setSavedGroups([]);
      setSavedResources([]);
    }
  }, [user]);
  
  // Smart search state
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [smartSearchLevel, setSmartSearchLevel] = useState(null);
  
  // Success/Error messages
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', subtext: '' });
  const [errorMessage, setErrorMessage] = useState({ title: '', subtext: '' });

  // URL matching for routing with bulletproof error handling
  console.log('🔍 Current location.pathname:', location.pathname);
  
  // URL matching for routing (stable hook order, no conditional calls)
  const match4 = useMatch('/resources/:level/:category/:section/:slug');
  const match3 = useMatch('/resources/:level/:category/:slug'); 
  const match2 = useMatch('/resources/:level/:category');
  const match1 = useMatch('/resources/:level');
  const matchRoot = useMatch('/resources');
  const matchAll = useMatch('/resources/all');
  const matchHome = matchRoot || matchAll;
  
  console.log('🔍 Match results:', { match4: !!match4, match3: !!match3, match2: !!match2, match1: !!match1, matchHome: !!matchHome });

  // Simple route params without useMemo to avoid dependency issues
  const routeParams = (match4?.params || match3?.params || match2?.params || match1?.params || {}) as { level?: string; category?: string; section?: string; slug?: string };
  console.log('🔄 Route params (direct):', routeParams);
  
  const isModalOpen = Boolean(routeParams?.slug);

  // Central resource resolver function
  const getResourceByUrl = (params: any) => {
    const { level: levelUrl, category: categoryUrl, section: sectionUrl, slug } = params || {};
    
    if (!levelUrl || !categoryUrl || !slug) return null;
    
    const level = URL_TO_LEVEL_MAP[levelUrl.toLowerCase()];
    const category = URL_TO_CATEGORY_MAP[categoryUrl.toLowerCase()];
    const sectionKey = sectionUrl ? URL_TO_SECTION_MAP[sectionUrl.toLowerCase()] : null;
    
    if (!level || !category) return null;
    
    const resource = RESOURCES[level];
    if (!resource?.categories?.[category]) return null;
    
    const categoryData = resource.categories[category];
    
    if (sectionKey && categoryData.sections?.[sectionKey]) {
      // Search in specific section
      const section = categoryData.sections[sectionKey];
      const foundResource = section?.resources?.find((res: any) => generateSlug(res.title) === slug);
      if (foundResource) {
        return { resource: foundResource, sectionKeyFound: sectionKey, level, category };
      }
    } else {
      // Search all sections (legacy 3-part URLs)
      if (categoryData.sections) {
        for (const [secKey, section] of Object.entries(categoryData.sections)) {
          const foundResource = (section as any)?.resources?.find((res: any) => generateSlug(res.title) === slug);
          if (foundResource) {
            return { resource: foundResource, sectionKeyFound: secKey, level, category };
          }
        }
      }
    }
    
    return null;
  };

  // URL synchronization effect with comprehensive debugging and fallbacks
  useEffect(() => {
    console.log('=== URL Sync Effect ===');
    console.log('Current path:', location.pathname);
    console.log('Route matches:', { 
      match4: !!match4, 
      match3: !!match3, 
      match2: !!match2, 
      match1: !!match1, 
      matchHome: !!matchHome 
    });
    console.log('Route params:', routeParams);
    console.log('Current state before sync:', { currentView, selectedCategory });
    if (matchHome) {
      setCurrentView('home');
      setSelectedCategory(null);
      setSelectedSection(null);
      setSelectedResource(null);
      setPdfUrl(null);
    } else if (match1 && !match2) {
      // Level only
      const level = URL_TO_LEVEL_MAP[routeParams?.level?.toLowerCase() || ''];
      if (level) {
        setCurrentView(level);
        setSelectedCategory(null);
        setSelectedSection(null);
        setSelectedResource(null);
        setPdfUrl(null);
      } else {
        console.log('❌ Invalid level, redirecting to home');
        navigate('/resources/all', { replace: true });
      }
    } else if (match2 && !routeParams?.slug) {
      // Level + category only
      const level = URL_TO_LEVEL_MAP[routeParams?.level?.toLowerCase() || ''];
      const category = URL_TO_CATEGORY_MAP[routeParams?.category?.toLowerCase() || ''];
      if (level && category) {
        // Prevent blank screen when level is 'home' (/resources/all/:category)
        if (level === 'home') {
          const categoryUrl = CATEGORY_URL_MAP[category];
          // Default to IGCSE when coming from 'all'
          if (categoryUrl) {
            navigate(`/resources/igcse/${categoryUrl}`, { replace: true });
            return;
          }
        }
        setCurrentView(level);
        setSelectedCategory(category);
        setSelectedSection(null);
        setSelectedResource(null);
        setPdfUrl(null);
      }

    } else if (routeParams?.slug) {
      // Has resource slug - resolve and open modal
      const resolved = getResourceByUrl(routeParams);
      
      if (resolved) {
        const { resource, sectionKeyFound, level, category } = resolved;
        setCurrentView(level);
        setSelectedCategory(category);
        setSelectedSection(sectionKeyFound);
        setSelectedResource(resource);
        const pdfUrl = `${BASE_URL}${resource.id}.pdf`;
        setPdfUrl(pdfUrl);
        
        // If this is a legacy 3-part URL, canonicalize to 4-part URL
        if (match3 && sectionKeyFound) {
          const levelUrl = LEVEL_TO_URL_MAP[level];
          const categoryUrl = CATEGORY_URL_MAP[category];
          const sectionUrl = SECTION_URL_MAP[sectionKeyFound];
          if (levelUrl && categoryUrl && sectionUrl) {
            navigate(`/resources/${levelUrl}/${categoryUrl}/${sectionUrl}/${routeParams?.slug}`, { replace: true });
          }
        }
      } else {
        // Resource not found - show error and navigate to category
        const level = URL_TO_LEVEL_MAP[routeParams?.level?.toLowerCase() || ''];
        const category = URL_TO_CATEGORY_MAP[routeParams?.category?.toLowerCase() || ''];
        if (level && category) {
          const levelUrl = LEVEL_TO_URL_MAP[level];
          const categoryUrl = CATEGORY_URL_MAP[category];
          setErrorMessage({ title: 'Resource not found', subtext: 'The requested resource could not be found.' });
          setShowErrorMessage(true);
          setTimeout(() => setShowErrorMessage(false), 3000);
          navigate(`/resources/${levelUrl}/${categoryUrl}`);
        }
      }
    } else {
      console.log('❓ No route match found - ensuring valid state');
      // Fallback: if we're in an invalid state, redirect to home
      if (!currentView || (currentView !== 'home' && !RESOURCES[currentView])) {
        console.log('🔄 Invalid currentView, redirecting to home');
        navigate('/resources/all', { replace: true });
      }
    }
    console.log('Final state after sync:', { currentView, selectedCategory });
    console.log('=== End URL Sync ===\n');
  }, [match4, match3, match2, match1, matchHome, routeParams]);

  // Navigation functions
  const navigateToLevel = (levelKey) => {
    const urlPath = LEVEL_TO_URL_MAP[levelKey] || 'all';
    navigate(`/resources/${urlPath}`);
  };

  const navigateToCategory = (levelKey, categoryKey) => {
    console.log('🚀 navigateToCategory called:', { levelKey, categoryKey });
    const levelUrl = LEVEL_TO_URL_MAP[levelKey] || 'all';
    const categoryUrl = CATEGORY_URL_MAP[categoryKey];
    console.log('🚀 URL mapping:', { levelUrl, categoryUrl });
    
    if (categoryUrl) {
      const targetUrl = `/resources/${levelUrl}/${categoryUrl}`;
      console.log('🚀 Navigating to:', targetUrl);
      navigate(targetUrl);
    } else {
      console.log('❌ No categoryUrl found for category:', categoryKey);
    }
  };

const navigateToResource = (levelKey, categoryKey, sectionKey, resource) => {
  const levelUrl = LEVEL_TO_URL_MAP[levelKey] || 'all';
  const categoryUrl = CATEGORY_URL_MAP[categoryKey];
  const sectionUrl = SECTION_URL_MAP[sectionKey];
  const resourceSlug = generateSlug(resource.title);
  if (categoryUrl && sectionUrl && resourceSlug) {
    navigate(`/resources/${levelUrl}/${categoryUrl}/${sectionUrl}/${resourceSlug}`);
  }
};

  const navigateHome = () => {
    navigate('/resources/all');
  };

  const handleClosePdfModal = () => {
    // Use route params to navigate back to category level
    if (routeParams.level && routeParams.category) {
      const levelUrl = LEVEL_TO_URL_MAP[URL_TO_LEVEL_MAP[routeParams.level] || ''] || 'all';
      const categoryUrl = CATEGORY_URL_MAP[URL_TO_CATEGORY_MAP[routeParams.category] || ''] || '';
      if (categoryUrl) {
        navigate(`/resources/${levelUrl}/${categoryUrl}`);
      } else {
        navigate(`/resources/${levelUrl}`);
      }
    } else {
      navigate('/resources');
    }
    
    setSelectedResource(null);
    setPdfUrl(null);
  };

  // Level-based navigation effect
  useEffect(() => {
    const navigateBasedOnLevel = async () => {
      if (user && currentView === 'home' && !levelBasedNavigationDone) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('study_level')
            .eq('id', user.id)
            .maybeSingle();
          
          if (profile?.study_level) {
            const targetView = getResourcesViewByLevel(profile.study_level);
            if (targetView !== 'home') {
              navigateToLevel(targetView);
            }
          }
          setLevelBasedNavigationDone(true);
        } catch (error) {
          console.error('Error fetching user study level:', error);
          setLevelBasedNavigationDone(true);
        }
      }
    };

    navigateBasedOnLevel();
  }, [user, currentView, levelBasedNavigationDone]);

  // Close PDF modal when navigating away from resource
  useEffect(() => {
    if (!selectedResource) {
      setPdfUrl(null);
    }
  }, [selectedResource]);

  const handleSaveResource = async () => {
    if (!resourceToSave) {
      return;
    }

    if (!selectedGroup && !newGroupName.trim()) {
      setErrorMessage({ 
        title: 'Hold up there, speed racer! 🏃‍♂️', 
        subtext: 'Pick a folder or create one - your resources need a home!' 
      });
      setShowErrorMessage(true);
      return;
    }

    try {
      if (!user) {
        setErrorMessage({ title: 'Sign in required', subtext: 'Please sign in to save resources.' });
        setShowErrorMessage(true);
        return;
      }

      // Ensure we have a group ID (create a group if typing a new name)
      let groupId = selectedGroup;
      if (!groupId && newGroupName.trim()) {
        const { data: newGroup, error: groupError } = await supabase
          .from('saved_groups')
          .insert({ name: newGroupName.trim(), user_id: user.id })
          .select()
          .single();
        if (groupError) throw groupError;
        if (newGroup) {
          setSavedGroups(prev => [...prev, newGroup]);
          groupId = newGroup.id;
        }
      }

      // Insert saved resource into Supabase
      const { data: inserted, error } = await supabase
        .from('saved_resources')
        .insert({
          user_id: user.id,
          group_id: groupId as string,
          resource_id: resourceToSave.id,
          resource_title: resourceToSave.title,
          title: resourceToSave.title,
          resource_level: currentView,
          resource_category: selectedCategory || 'general',
          section: selectedSection || null,
          resource_type: 'pdf'
        })
        .select()
        .single();

      if (error) throw error;

      if (inserted) {
        setSavedResources(prev => [inserted, ...prev]);
      }

      // Show success message
      const funnyMessages = [
        { title: 'Resource saved! 🎉', subtext: 'Successfully added to your procrastination collection!' },
        { title: 'Boom! Saved! 💥', subtext: 'Another one for the "I\'ll read this later" pile!' },
        { title: 'Mission accomplished! 🚀', subtext: 'Your study arsenal grows stronger!' },
        { title: 'Saved and secured! 🔒', subtext: 'Now safely stored in your digital hoard!' },
        { title: 'Victory! 🏆', subtext: 'Added to your ever-growing study empire!' }
      ];
      const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      setSuccessMessage(randomMessage);
      setShowSuccessMessage(true);
    } catch (err) {
      console.error('Error saving resource:', err);
      setErrorMessage({ title: 'Could not save resource', subtext: 'Please try again.' });
      setShowErrorMessage(true);
    } finally {
      setShowSaveModal(false);
      setResourceToSave(null);
      setSelectedGroup('');
      setNewGroupName('');
      setShowNewGroupInput(false);
    }
  };

  // Handle deleting saved resources
  const handleDeleteSavedResource = async (resourceId) => {
    try {
      if (!user) return;
      const { error } = await supabase
        .from('saved_resources')
        .delete()
        .eq('id', resourceId);
      if (error) throw error;
      setSavedResources(prev => (prev || []).filter(resource => resource.id !== resourceId));
      const deleteMessages = [
        { title: 'Poof! Gone! 💨', subtext: 'Resource vanished from your collection!' },
        { title: 'Deleted! 🗑️', subtext: 'One less thing to procrastinate on!' },
        { title: 'Bye bye! 👋', subtext: 'Resource has left the building!' }
      ];
      const randomMessage = deleteMessages[Math.floor(Math.random() * deleteMessages.length)];
      setSuccessMessage(randomMessage);
      setShowSuccessMessage(true);
    } catch (err) {
      console.error('Error deleting saved resource:', err);
      setErrorMessage({ title: 'Could not delete', subtext: 'Please try again.' });
      setShowErrorMessage(true);
    }
  };

  // Authentication check helper
  const requireAuth = (feature, callback) => {
    if (!user) {
      setAuthFeature(feature);
      setShowAuthModal(true);
      return false;
    }
    callback();
    return true;
  };

  // Handle smart search
  const handleOpenSmartSearch = (levelKey) => {
    requireAuth('search functionality', () => {
      setSmartSearchLevel(levelKey);
      setShowSmartSearch(true);
    });
  };

  // Handle saved resources
  const handleOpenSavedResources = () => {
    requireAuth('saved resources', async () => {
      await fetchSavedResources();
      setShowSavedResourcesModal(true);
    });
  };

const handleSmartSearchResourceSelect = (resource) => {
  // Navigate to the resource URL instead of opening modal directly
  navigateToResource(resource.levelKey, resource.categoryKey, resource.sectionKey, resource);
};

  // Home view - shows all exam levels
  const renderHomeView = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Study Resources</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Choose your study level to access tailored resources</p>
          </div>
          <div className="flex-1 flex justify-end">
            <Button
              variant="outline"
              onClick={handleOpenSavedResources}
              className="flex items-center space-x-2"
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved ({savedResources?.length || 0})</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { key: 'igcse', title: 'IGCSE', description: 'Cambridge IGCSE 0500 English Language' },
          { key: 'cambridge9093', title: 'A-Level 9093', description: 'Cambridge A-Level 9093 English Language' },
          { key: 'generalPaper', title: 'General Paper', description: 'Cambridge General Paper (EGP)' },
          { key: 'edexcel', title: 'Edexcel A-Level', description: 'Edexcel A-Level English Language' },
          { key: 'ib', title: 'IB Language & Literature', description: 'IB Language and Literature resources' }
        ].map((level) => (
          <Card key={level.key} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigateToLevel(level.key)}>
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">{level.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{level.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Level view - shows categories for selected level
  const renderLevelView = (levelKey) => {
    const resource = RESOURCES[levelKey];
    if (!resource) return renderHomeView();
    
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={navigateHome}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Levels</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              {/* Saved Button */}
              <Button
                variant="outline"
                onClick={handleOpenSavedResources}
                className="flex items-center space-x-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>Saved ({savedResources?.length || 0})</span>
              </Button>
              
              {/* Search Button */}
              <Button
                onClick={() => handleOpenSmartSearch(levelKey)}
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2 px-6 py-3"
                size="lg"
              >
                <Search className="w-5 h-5" />
                <span className="font-semibold">Search</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{resource.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">{EXAM_LEVELS[levelKey]?.description || 'Study resources'}</p>
          </div>
        </div>

        <div className="space-y-4">
          {(() => {
            try {
              const categoriesEntries = resource && resource.categories ? Object.entries(resource.categories) : [] as any[];
              console.log('🧭 renderLevelView categoriesEntries length:', categoriesEntries.length);
              if (categoriesEntries.length === 0) {
                return (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      No categories available for this level.
                    </CardContent>
                  </Card>
                );
              }
              return categoriesEntries.map(([categoryKey, category]) => {
                const categoryData = category as any;
                const IconComponent = categoryData.icon;
                return (
                  <Card 
                    key={categoryKey}
                    className="cursor-pointer hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                    onClick={() => navigateToCategory(levelKey, categoryKey)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{categoryData.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{categoryData.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                );
              });
            } catch (err) {
              console.error('❌ Error rendering categories list:', err, { levelKey, resource });
              return (
                <Card>
                  <CardContent className="p-6 text-center text-destructive">
                    Failed to load categories. Please refresh.
                  </CardContent>
                </Card>
              );
            }
          })()}
        </div>
      </div>
    );
  };

  // Section view - shows resources within a category
  const renderSectionView = () => {
    console.log('📋 renderSectionView called:', { 
      selectedCategory, 
      currentView,
      hasResources: !!RESOURCES[currentView]
    });
    
    if (!selectedCategory) {
      console.log('❌ No selectedCategory - returning null');
      return null;
    }

    const resource = RESOURCES[currentView];
    if (!resource || !resource.categories) {
      console.log('❌ No resource or categories found for currentView:', currentView);
      console.log('Available RESOURCES keys:', Object.keys(RESOURCES));
      return null;
    }

    const category = resource.categories[selectedCategory];
    if (!category || !category.sections) {
      console.log('❌ No category or sections found for selectedCategory:', selectedCategory);
      console.log('Available categories:', Object.keys(resource.categories || {}));
      return null;
    }

    const sections = category.sections;

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (selectedResource) {
                // If viewing a specific resource, go back to category
                navigateToCategory(currentView, selectedCategory);
              } else {
                // If viewing category, go back to level
                navigateToLevel(currentView);
              }
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{category.title}</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {(() => {
            try {
              const entries = sections ? Object.entries(sections) : [] as any[];
              console.log('📚 Section entries length:', entries.length);
              if (entries.length === 0) {
                return (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      No sections available in this category.
                    </CardContent>
                  </Card>
                );
              }
              return entries.map(([sectionKey, section]) => {
                const sectionData = section as any;
                if (!sectionData || !sectionData.resources) return null;
                const filteredResources = (sectionData.resources || []).filter((resource: any) =>
                  resource?.title?.toLowerCase?.().includes?.(searchTerm.toLowerCase())
                );
                if ((filteredResources || []).length === 0) return null;
                return (
                  <Card key={sectionKey}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{sectionData.title}</h3>
                      <div className="grid gap-4">
                        {(filteredResources || []).map((resource: any) => (
                          <button 
                            key={resource.id} 
                            type="button"
                            className="relative p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full text-left"
                            onClick={() => navigateToResource(currentView, selectedCategory, sectionKey, resource)}
                            onTouchEnd={(e) => {
                              e.preventDefault();
                              navigateToResource(currentView, selectedCategory, sectionKey, resource);
                            }}
                            style={{ WebkitTapHighlightColor: 'rgba(139, 92, 246, 0.1)' }}
                          >
                            <button 
                              type="button"
                              className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center cursor-pointer transition-all"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                requireAuth('save resources', () => {
                                  setResourceToSave(resource);
                                  setShowSaveModal(true);
                                });
                              }}
                              onTouchEnd={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <Bookmark className="w-4 h-4 text-white" />
                            </button>
                            <div className="flex items-center space-x-4 pr-10">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">{resource.title}</h4>
                                <p className="text-sm text-gray-500">Click me</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              });
            } catch (err) {
              console.error('❌ Error rendering sections list:', err, { currentView, selectedCategory, sections });
              return (
                <Card>
                  <CardContent className="p-6 text-center text-destructive">
                    Failed to load sections. Please refresh.
                  </CardContent>
                </Card>
              );
            }
          })()}
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    try {
      console.log('🎨 renderCurrentView called:', { 
        selectedCategory, 
        currentView, 
        hasSelectedCategory: !!selectedCategory,
        isHome: currentView === 'home'
      });
      if (selectedCategory) {
        console.log('🎨 Rendering section view for category:', selectedCategory);
        return renderSectionView();
      }
      if (currentView === 'home') {
        console.log('🎨 Rendering home view');
        return renderHomeView();
      }
      console.log('🎨 Rendering level view for:', currentView);
      return renderLevelView(currentView);
    } catch (err) {
      console.error('💥 Render error in renderCurrentView:', err);
      return (
        <div className="max-w-2xl mx-auto p-6">
          <Card>
            <CardContent className="p-6 text-center text-destructive">
              Something went wrong rendering this view. Please refresh.
            </CardContent>
          </Card>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BookLoader text="Loading resources..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ios-scroll">
      {/* Success/Error Messages */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50">
          <SuccessMessage
            message={successMessage.title}
            subText={successMessage.subtext}
            onClose={() => setShowSuccessMessage(false)}
          />
        </div>
      )}
      
      {showErrorMessage && (
        <div className="fixed top-4 right-4 z-50">
          <ErrorMessage
            message={errorMessage.title}
            subText={errorMessage.subtext}
            onClose={() => setShowErrorMessage(false)}
          />
        </div>
      )}

      {/* Main Content */}
      {renderCurrentView()}

      {/* Smart Search Modal */}
      {showSmartSearch && smartSearchLevel && (
        <SmartSearch
          levelKey={smartSearchLevel}
          onResourceSelect={handleSmartSearchResourceSelect}
          onClose={() => {
            setShowSmartSearch(false);
            setSmartSearchLevel(null);
          }}
        />
      )}

      {/* Saved Resources Modal */}
      <SavedResourcesModal
        isOpen={showSavedResourcesModal}
        onClose={() => setShowSavedResourcesModal(false)}
        onOpenPdf={setPdfUrl}
        savedResources={savedResources}
        onDeleteResource={handleDeleteSavedResource}
        navigate={navigate}
      />

      {/* PDF Modal */}
      <PdfModal
        isOpen={isModalOpen}
        onClose={handleClosePdfModal}
        pdfUrl={(() => {
          const currentPdfUrl = pdfUrl || (selectedResource ? `${BASE_URL}${selectedResource.id}.pdf` : null);
          return currentPdfUrl || '';
        })()}
        title={selectedResource?.title || 'PDF Viewer'}
        user={user}
      />

      {/* Save Resource Modal */}
      {showSaveModal && resourceToSave && (
        <Dialog open={showSaveModal} onOpenChange={setShowSaveModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <DialogTitle>Save to Your Collection 📚</DialogTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Time to hoard some knowledge!
                  </p>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  📄 {resourceToSave.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">Goodie</p>
              </div>

              {(savedGroups || []).length > 0 && !showNewGroupInput && (
                <div className="space-y-2">
                  <Label>Select a group:</Label>
                  <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a group..." />
                    </SelectTrigger>
                    <SelectContent>
                      {(savedGroups || []).map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          <div className="flex items-center space-x-2">
                            <Folder className="w-4 h-4" />
                            <span>{group.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center justify-between">
                {!showNewGroupInput ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowNewGroupInput(true);
                      setSelectedGroup('');
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Create New Group
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowNewGroupInput(false);
                      setNewGroupName('');
                    }}
                  >
                    ← Back to groups
                  </Button>
                )}
              </div>

              {showNewGroupInput && (
                <div className="space-y-2">
                  <Label>New group name:</Label>
                  <Input
                    placeholder="e.g., 'IGCSE Paper 1 Resources'"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    autoFocus
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowSaveModal(false);
                    setResourceToSave(null);
                    setSelectedGroup('');
                    setNewGroupName('');
                    setShowNewGroupInput(false);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveResource}
                  disabled={!selectedGroup && !newGroupName.trim()}
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Enhanced Auth Modal */}
      {showAuthModal && (
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Dude, sign in! 🚀
                </DialogTitle>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Unlock the full power of our study platform
                </p>
              </div>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-purple-600" />
                  You're trying to access: <span className="text-purple-600 ml-1">{authFeature}</span>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Sign in to unlock this feature and so much more!
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                  <Award className="w-4 h-4 mr-2 text-purple-600" />
                  What you'll get with an account:
                </h4>
                <div className="grid gap-3">
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Bookmark className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Save Resources</p>
                      <p className="text-xs text-gray-500">Build your personal study library</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Search className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Smart Search</p>
                      <p className="text-xs text-gray-500">AI-powered resource discovery</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <FolderPlus className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Organize Collections</p>
                      <p className="text-xs text-gray-500">Create custom study groups</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Study Planning</p>
                      <p className="text-xs text-gray-500">Track progress and set goals</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Button 
                  onClick={() => window.location.href = '/auth-resources'}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  <UserIcon className="w-5 h-5 mr-2" />
                  Sign In / Create Account
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Continue Without Account
                </Button>
              </div>
              
              <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                ✨ Free forever • No spam • Secure & private
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Resources;