import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Bookmark, BookmarkPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

import { User } from '@supabase/supabase-js';
import { PdfModal } from './PdfModal';
import { PaperSaveModal } from './PaperSaveModal';
import { Paper, getPapersForExamAndYear, getAvailableSessionsForExam } from '@/data/papersData';

// Import all data files to get all papers for search
import { getAllPapers as getOLevelPapers } from '@/data/oLevelEnglishData';
import { getAllPapers as getIGCSEPapers } from '@/data/igcseEnglishData';
import { getAllPapers as getALevel9093Papers } from '@/data/aLevels9093Data';
import { getAllPapers as getALevelEgpPapers } from '@/data/aLevelsEgpData';
import { getAllPapers as getEdexcelPapers } from '@/data/edexcelALevelsData';

interface PaperBrowserProps {
  examType: string;
  year: number;
  user: User | null;
  onOpenPdf?: (url: string, title: string) => void;
  searchQuery?: string;
  // NEW: Add variant completion callback
  onVariantComplete?: (variantInfo: {
    type: 'variant' | 'session' | 'paper',
    examType: string,
    year: number,
    variantId: string,
    session?: string,
    paperNumber?: string
  }) => void;
}

interface SearchablePaper extends Paper {
  searchTerms: string[];
}

export const PaperBrowser = ({ 
  examType, 
  year, 
  user, 
  onOpenPdf, 
  searchQuery = '', 
  onVariantComplete // NEW: Accept the callback prop
}: PaperBrowserProps) => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [allExamPapers, setAllExamPapers] = useState<Paper[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>('All');
  const [availableSessions, setAvailableSessions] = useState<string[]>([]);
  
  // NEW: Track completion states
  const [completedVariants, setCompletedVariants] = useState<Set<string>>(new Set());
  const [completedSessions, setCompletedSessions] = useState<Set<string>>(new Set());
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const [pdfModal, setPdfModal] = useState<{
    isOpen: boolean;
    pdfUrl: string;
    title: string;
  }>({
    isOpen: false,
    pdfUrl: '',
    title: ''
  });

  const [saveModal, setSaveModal] = useState<{
    isOpen: boolean;
    papers: Paper[];
  }>({
    isOpen: false,
    papers: []
  });

  useEffect(() => {
    // Load papers for the selected year (for normal display)
    const loadedPapers = getPapersForExamAndYear(examType, year);
    setPapers(loadedPapers);

    // Load ALL papers for this exam type (for search)
    let allPapers: Paper[] = [];
    switch (examType) {
      case '1123':
        allPapers = getOLevelPapers();
        break;
      case '0500':
        allPapers = getIGCSEPapers();
        break;
      case '9093':
        allPapers = getALevel9093Papers();
        break;
      case '8021':
        allPapers = getALevelEgpPapers();
        break;
      case 'XEN01':
        allPapers = getEdexcelPapers();
        break;
      default:
        allPapers = [];
    }
    setAllExamPapers(allPapers);

    const sessions = getAvailableSessionsForExam(examType, year);
    setAvailableSessions(sessions);

    if (loadedPapers.length === 0) {
      toast({
        title: "No papers found",
        description: `No papers available for ${examType} ${year}`,
      });
    }
  }, [examType, year, toast]);

  // NEW: Handle variant completion
  const handleVariantMarkComplete = (session: string, paperNumber: string, variant: string) => {
    const variantId = `${session}-${paperNumber}-${variant}`;
    
    if (completedVariants.has(variantId)) {
      // Already completed, show message
      toast({
        title: "Already Completed",
        description: `${session} Paper ${paperNumber} ${variant} is already marked as complete`,
      });
      return;
    }

    // Mark as completed locally
    setCompletedVariants(prev => new Set(prev).add(variantId));
    
    // Call the callback to update study goals
    if (onVariantComplete) {
      onVariantComplete({
        type: 'variant',
        examType,
        year,
        variantId,
        session,
        paperNumber
      });
    }

    toast({
      title: "Variant Completed!",
      description: `Marked ${session} Paper ${paperNumber} ${variant} as complete`,
    });
  };

  // NEW: Handle session completion (marks all variants in session complete)
  const handleSessionMarkComplete = (session: string) => {
    const sessionId = `${session}`;
    
    if (completedSessions.has(sessionId)) {
      toast({
        title: "Already Completed",
        description: `${session} is already marked as complete`,
      });
      return;
    }

    // Mark session as completed
    setCompletedSessions(prev => new Set(prev).add(sessionId));
    
    // Mark all variants in this session as completed
    const sessionPapers = groupedResults.grouped?.[session] || {};
    Object.entries(sessionPapers).forEach(([paperNumber, paperVariants]) => {
      Object.keys(paperVariants).forEach(variant => {
        const variantId = `${session}-${paperNumber}-${variant}`;
        setCompletedVariants(prev => new Set(prev).add(variantId));
        
        // Call completion callback for each variant
        if (onVariantComplete) {
          onVariantComplete({
            type: 'variant',
            examType,
            year,
            variantId,
            session,
            paperNumber
          });
        }
      });
    });

    // Also call session completion
    if (onVariantComplete) {
      onVariantComplete({
        type: 'session',
        examType,
        year,
        variantId: sessionId,
        session
      });
    }

    toast({
      title: "Session Completed!",
      description: `Marked entire ${session} as complete`,
    });
  };

  // NEW: Handle unmark functionality
  const handleVariantUnmark = (session: string, paperNumber: string, variant: string) => {
    const variantId = `${session}-${paperNumber}-${variant}`;
    setCompletedVariants(prev => {
      const newSet = new Set(prev);
      newSet.delete(variantId);
      return newSet;
    });
    
    toast({
      title: "Variant Unmarked",
      description: `${session} Paper ${paperNumber} ${variant} unmarked`,
    });
  };

  const handleSessionUnmark = (session: string) => {
    const sessionId = `${session}`;
    setCompletedSessions(prev => {
      const newSet = new Set(prev);
      newSet.delete(sessionId);
      return newSet;
    });

    // Unmark all variants in this session
    const sessionPapers = groupedResults.grouped?.[session] || {};
    Object.entries(sessionPapers).forEach(([paperNumber, paperVariants]) => {
      Object.keys(paperVariants).forEach(variant => {
        const variantId = `${session}-${paperNumber}-${variant}`;
        setCompletedVariants(prev => {
          const newSet = new Set(prev);
          newSet.delete(variantId);
          return newSet;
        });
      });
    });

    toast({
      title: "Session Unmarked",
      description: `${session} unmarked`,
    });
  };

  // Generate search terms for a paper
  const generateSearchTerms = (paper: Paper): string[] => {
    const terms: string[] = [];
    const fileName = paper.fileName.toLowerCase();

    // Parse filename based on exam type
    let sessionYear = '';
    let type = '';
    let paperUnit = '';
    let fullYear = '';

    if (examType === 'XEN01') {
      // Edexcel format: xen01_j18_ms_1.pdf
      const match = fileName.match(/xen01_([a-z]\d{2})_([a-z]+)_(\d+)/);
      if (match) {
        sessionYear = match[1];
        type = match[2];
        paperUnit = match[3];
      }
    } else if (fileName.includes('_sp_') || fileName.includes('specimen')) {
      // Specimen format: 0500_2020_sp_qp_1.pdf
      const match = fileName.match(/\d+_(\d{4})_(sp)_([a-z]+)_(\d+)/);
      if (match) {
        fullYear = match[1];
        sessionYear = match[2];
        type = match[3];
        paperUnit = match[4];
      }
    } else {
      // Standard format: 0500_s21_qp_12.pdf
      const match = fileName.match(/\d+_([a-z]\d{2})_([a-z]+)_(\d+)/);
      if (match) {
        sessionYear = match[1];
        type = match[2];
        paperUnit = match[3];
      }
    }

    // Session terms
    const sessionMap: { [key: string]: string[] } = {
      's': ['june', 'jun', 'summer'],
      'm': ['march', 'mar'],
      'w': ['november', 'nov', 'winter'],
      'j': ['january', 'jan'],
      'sp': ['specimen', 'spec']
    };

    const sessionCode = sessionYear.charAt(0);
    if (sessionMap[sessionCode]) {
      terms.push(...sessionMap[sessionCode]);
    }

    // Year terms
    if (fullYear) {
      terms.push(fullYear, fullYear.slice(-2));
    } else if (sessionYear.length > 1) {
      const yearPart = sessionYear.slice(1);
      const fullYearFromCode = yearPart.length === 2 ? 
        (parseInt(yearPart) > 50 ? '19' + yearPart : '20' + yearPart) : 
        yearPart;
      terms.push(fullYearFromCode, yearPart);
    }

    // Document type terms
    const typeMap: { [key: string]: string[] } = {
      'qp': ['question paper', 'question', 'qp'],
      'ms': ['mark scheme', 'marking scheme', 'marks', 'scheme', 'ms'],
      'in': ['insert', 'in']
    };

    if (typeMap[type]) {
      terms.push(...typeMap[type]);
    }

    // Paper/Unit terms
    if (examType === 'XEN01') {
      // Edexcel uses units
      terms.push(`unit ${paperUnit}`, `u${paperUnit}`, `unit${paperUnit}`);
    } else {
      // Standard exams use papers and variants
      if (paperUnit.length === 2) {
        const paperNum = paperUnit.charAt(0);
        const variantNum = paperUnit.charAt(1);
        terms.push(
          `paper ${paperNum}`, `p${paperNum}`, `paper${paperNum}`,
          `variant ${variantNum}`, `v${variantNum}`, `variant${variantNum}`
        );
      } else if (paperUnit.length === 1) {
        terms.push(`paper ${paperUnit}`, `p${paperUnit}`, `paper${paperUnit}`);
      }
    }

    // Combination terms
    const sessionTerms = sessionMap[sessionCode] || [];
    const typeTerms = typeMap[type] || [];
    
    // Session + Year combinations
    if (sessionTerms.length && fullYear) {
      sessionTerms.forEach(s => terms.push(`${s} ${fullYear}`, `${s} ${fullYear.slice(-2)}`));
    }
    
    // Session + Type combinations
    sessionTerms.forEach(s => {
      typeTerms.forEach(t => terms.push(`${s} ${t}`));
    });

    // Type + Year combinations
    if (typeTerms.length && fullYear) {
      typeTerms.forEach(t => terms.push(`${t} ${fullYear}`));
    }

    // Add paper title and type
    terms.push(paper.title.toLowerCase(), paper.type.toLowerCase());

    return [...new Set(terms)]; // Remove duplicates
  };

  // Create searchable papers with terms - use all papers when searching, selected year papers when not
  const searchablePapers: SearchablePaper[] = useMemo(() => {
    const papersToSearch = searchQuery.trim() ? allExamPapers : papers;
    return papersToSearch.map(paper => ({
      ...paper,
      searchTerms: generateSearchTerms(paper)
    }));
  }, [papers, allExamPapers, examType, searchQuery]);

  // Filter papers based on search query
  const filteredPapers = useMemo(() => {
    if (!searchQuery.trim()) {
      return papers.filter(paper => 
        selectedSession === 'All' || paper.session === selectedSession
      );
    }

    const queryWords = searchQuery.toLowerCase().trim().split(/\s+/);
    
    return searchablePapers.filter(paper => {
      // Check if all query words match at least one search term
      const matchesSearch = queryWords.every(queryWord => 
        paper.searchTerms.some(term => 
          term.includes(queryWord) || queryWord.includes(term)
        )
      );
      
      // When searching, don't filter by session as we want to see all matching results
      const matchesSession = searchQuery.trim() ? true : (selectedSession === 'All' || paper.session === selectedSession);
      return matchesSearch && matchesSession;
    });
  }, [searchablePapers, papers, searchQuery, selectedSession]);

  // Group filtered papers for display
  const groupedResults = useMemo(() => {
    if (!searchQuery.trim()) {
      // Normal grouping when not searching
      const regularPapers = filteredPapers.filter(paper => 
        paper.type === 'Question Paper' || paper.type === 'Mark Scheme' || paper.type === 'Insert'
      );
      

      const grouped = regularPapers.reduce((acc: { [session: string]: { [paper: string]: { [variant: string]: Paper[] } } }, paper) => {
        if (!acc[paper.session]) {
          acc[paper.session] = {};
        }

        const paperMatch = paper.fileName.match(/(\d)(\d?)[qms]/) || paper.fileName.match(/(\d)(\d?)\.pdf$/) || paper.fileName.match(/_(\d)(\d?)_/);
        const paperNumber = paperMatch ? paperMatch[1] : '1';
        
        if (!acc[paper.session][paperNumber]) {
          acc[paper.session][paperNumber] = {};
        }
        
        let variant = 'Variant 1';
        if (paperMatch && paperMatch[2]) {
          const variantNum = paperMatch[2];
          variant = `Variant ${variantNum}`;
        }
        
        if (!acc[paper.session][paperNumber][variant]) {
          acc[paper.session][paperNumber][variant] = [];
        }
        acc[paper.session][paperNumber][variant].push(paper);
        return acc;
      }, {});

      return { grouped };
    } else {
      // Search results grouping - group by session and year like normal view
      const searchGroups = filteredPapers.reduce((acc: { [sessionYear: string]: { [paper: string]: { [variant: string]: Paper[] } } }, paper) => {
        // Extract year from filename to create more specific grouping
        let yearFromFile = '';
        const yearMatch = paper.fileName.match(/(\d{4})|[smw](\d{2})/);
        if (yearMatch) {
          yearFromFile = yearMatch[1] || (yearMatch[2] ? (parseInt(yearMatch[2]) > 50 ? '19' + yearMatch[2] : '20' + yearMatch[2]) : '');
        }
        
        const groupKey = yearFromFile ? `${paper.session} ${yearFromFile}` : paper.session;
        
        if (!acc[groupKey]) {
          acc[groupKey] = {};
        }

        // Group papers by paper number and variant like normal view
        const paperMatch = paper.fileName.match(/(\d)(\d?)[qms]/) || paper.fileName.match(/(\d)(\d?)\.pdf$/) || paper.fileName.match(/_(\d)(\d?)_/);
        const paperNumber = paperMatch ? paperMatch[1] : '1';
        
        if (!acc[groupKey][paperNumber]) {
          acc[groupKey][paperNumber] = {};
        }
        
        let variant = 'Variant 1';
        if (paperMatch && paperMatch[2]) {
          const variantNum = paperMatch[2];
          variant = `Variant ${variantNum}`;
        }
        
        if (!acc[groupKey][paperNumber][variant]) {
          acc[groupKey][paperNumber][variant] = [];
        }
        acc[groupKey][paperNumber][variant].push(paper);
        
        return acc;
      }, {});

      return { grouped: searchGroups };
    }
  }, [filteredPapers, searchQuery]);

  // Helper function to find specific document type in papers array
  const findDocumentByType = (papers: Paper[], docType: 'Question Paper' | 'Mark Scheme' | 'Insert'): Paper | null => {
    return papers.find(paper => paper.type === docType) || null;
  };

  const handlePdfClick = (papers: Paper[], type: 'qp' | 'ms' | 'insert') => {
    const docType = type === 'qp' ? 'Question Paper' : type === 'ms' ? 'Mark Scheme' : 'Insert';
    const paper = findDocumentByType(papers, docType);
    
    if (!paper) {
      toast({
        title: "Document Not Available",
        description: `${docType} is not available for this variant`,
      });
      return;
    }
    
    console.log('PDF button clicked:', paper.fileName, type);
    
    const pdfUrl = paper.url;
    const title = `${paper.fileName} - ${docType}`;
    
    if (onOpenPdf) {
      onOpenPdf(pdfUrl, title);
    } else {
      setPdfModal({
        isOpen: true,
        pdfUrl,
        title
      });
    }
  };

  const handleSavePaper = (papers: Paper[], type: 'qp' | 'ms' | 'insert') => {
    const docType = type === 'qp' ? 'Question Paper' : type === 'ms' ? 'Mark Scheme' : 'Insert';
    const paper = findDocumentByType(papers, docType);
    
    if (!paper) {
      toast({
        title: "Document Not Available",
        description: `${docType} is not available for this variant`,
      });
      return;
    }
    
    // Check if user is authenticated
    if (!user) {
      navigate('/auth');
      return;
    }

    // Create a modified paper object with the specific type
    const specificPaper = {
      ...paper,
      title: `${paper.title} - ${type}`,
      type: type as Paper['type']
    };
    
    setSaveModal({
      isOpen: true,
      papers: [specificPaper]
    });
  };

  const closePdfModal = () => {
    setPdfModal({
      isOpen: false,
      pdfUrl: '',
      title: ''
    });
  };

  const closeSaveModal = () => {
    setSaveModal({
      isOpen: false,
      papers: []
    });
  };

  // Helper functions for session resources
  const getSessionCodeStrict = (session: string): string => {
    switch (session) {
      case 'March': return 'm';
      case 'June': return 's';
      case 'November': return 'w';
      case 'January': return 'j';
      case 'Specimen': return 'sp';
      default: return 'm';
    }
  };

  const buildFileKey = (type: 'er' | 'gt', session: string, year: number): string => {
    const sessionCode = getSessionCodeStrict(session);
    const examCode = getExamCode(examType);
    const yearCode = year.toString().slice(-2);
    return `${examCode}_${sessionCode}${yearCode}_${type}.pdf`;
  };

  // Create dedicated maps for ER and GT resources
  const erMap = useMemo(() => {
    const map = new Map<string, string>();
    allExamPapers.forEach(paper => {
      if (paper.fileName.includes('_er.pdf')) {
        map.set(paper.fileName.toLowerCase(), paper.url);
      }
    });
    return map;
  }, [allExamPapers]);

  const gtMap = useMemo(() => {
    const map = new Map<string, string>();
    allExamPapers.forEach(paper => {
      if (paper.fileName.includes('_gt.pdf')) {
        map.set(paper.fileName.toLowerCase(), paper.url);
      }
    });
    return map;
  }, [allExamPapers]);

  const handleSessionResourceClick = (type: 'er' | 'gt', session: string, year: number) => {
    const fileName = buildFileKey(type, session, year);
    const resourceMap = type === 'er' ? erMap : gtMap;
    const url = resourceMap.get(fileName.toLowerCase());
    
    if (url) {
      setPdfModal({
        isOpen: true,
        pdfUrl: url,
        title: fileName
      });
    } else {
      const resourceName = type === 'er' ? 'Examiner Report' : 'Grade Thresholds';
      toast({
        title: "Resource Not Available",
        description: `${resourceName} not found for ${session} ${year}`,
        variant: "destructive"
      });
    }
  };

  const generateSessionResourceFilename = (type: 'er' | 'gt', session: string, year: number): string => {
    return buildFileKey(type, session, year);
  };

  const getExamCode = (examType: string): string => {
    switch (examType) {
      case '9093': return '9093';
      case '8021': return '8021';
      case '1123': return '1123';
      case 'XEN01': return 'xen01';
      case '0500': return '0500';
      default: return '0500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Session Filter - Only show when not searching */}
      {!searchQuery && (
        <div className="flex items-center justify-start">
          <Select value={selectedSession} onValueChange={setSelectedSession}>
            <SelectTrigger className="w-[200px] purple-gradient-border">
              <div className="purple-gradient-border-inner w-full px-3 py-1 rounded-md">
                <SelectValue placeholder="Filter by Session" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {availableSessions.map((session) => (
                <SelectItem key={session} value={session} className="text-foreground hover:bg-accent">
                  {session}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {/* Papers Layout */}
      {searchQuery ? (
        // Search Results Layout - using same structure as normal view
        <div className="space-y-6">
          {Object.keys(groupedResults.grouped || {}).length > 0 ? (
            Object.entries(groupedResults.grouped || {})
              .sort(([a], [b]) => {
                // Sort by year (descending) then by session
                const yearA = a.match(/\d{4}/)?.[0] || '0';
                const yearB = b.match(/\d{4}/)?.[0] || '0';
                if (yearA !== yearB) {
                  return parseInt(yearB) - parseInt(yearA);
                }
                return a.localeCompare(b);
              })
              .map(([sessionYear, sessionPapers]) => {
                const sessionId = sessionYear;
                const isSessionComplete = completedSessions.has(sessionId);
                
                return (
                  <div key={sessionYear} className="purple-gradient-border rounded-xl overflow-hidden">
                    <div className="purple-gradient-border-inner">
                      <div className="bg-card/50 px-6 py-4 border-b border-border">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-foreground">
                            {sessionYear} - Search Results
                          </h3>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className={`${
                                isSessionComplete 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30'
                              }`}
                              onClick={() => handleSessionMarkComplete(sessionYear)}
                              disabled={isSessionComplete}
                            >
                              {isSessionComplete ? '✓ Completed' : '✓ Mark Complete'}
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-red-600 text-white hover:bg-red-700"
                              onClick={() => handleSessionUnmark(sessionYear)}
                            >
                              ✗ Unmark
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-8">
                        {Object.entries(sessionPapers)
                          .sort(([a], [b]) => parseInt(a) - parseInt(b))
                          .map(([paperNumber, paperVariants]) => (
                          <div key={paperNumber}>
                            <h4 className="text-lg font-medium text-foreground mb-4">Paper {paperNumber}</h4>
                            
                            {/* Variants */}
                            <div className="space-y-4">
                              {Object.entries(paperVariants)
                                .sort(([a], [b]) => {
                                  const variantA = parseInt(a.replace('Variant ', ''));
                                  const variantB = parseInt(b.replace('Variant ', ''));
                                  return variantA - variantB;
                                })
                                .map(([variant, papers]) => {
                                  const variantId = `${sessionYear}-${paperNumber}-${variant}`;
                                  const isVariantComplete = completedVariants.has(variantId);
                                  
                                  return (
                                    <div key={variant} className="border border-border rounded-lg bg-card/20">
                                      <div className="p-4">
                                        <div className="flex justify-between items-center mb-4">
                                          <h5 className="font-medium text-primary">{variant}</h5>
                                          <div className="flex gap-2">
                                            <Button 
                                              size="sm" 
                                              className={`${
                                                isVariantComplete 
                                                  ? 'bg-green-600 text-white' 
                                                  : 'bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30'
                                              }`}
                                              onClick={() => handleVariantMarkComplete(sessionYear, paperNumber, variant)}
                                              disabled={isVariantComplete}
                                            >
                                              {isVariantComplete ? '✓ Completed' : '✓ Mark Complete'}
                                            </Button>
                                            <Button 
                                              size="sm" 
                                              className="bg-red-600 text-white hover:bg-red-700"
                                              onClick={() => handleVariantUnmark(sessionYear, paperNumber, variant)}
                                            >
                                              ✗ Unmark
                                            </Button>
                                          </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-3 gap-4">
                                          <div className="relative">
                                            <Button 
                                              className="w-full bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                              onClick={() => handlePdfClick(papers, 'qp')}
                                            >
                                              Question Paper
                                            </Button>
                                            <button
                                              onClick={() => handleSavePaper(papers, 'qp')}
                                              className="absolute -top-2 -right-2 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors z-10"
                                            >
                                              <BookmarkPlus className="h-3 w-3 text-primary" />
                                            </button>
                                          </div>
                                          <div className="relative">
                                            <Button 
                                              className="w-full bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                              onClick={() => handlePdfClick(papers, 'ms')}
                                            >
                                              Mark Scheme
                                            </Button>
                                            <button
                                              onClick={() => handleSavePaper(papers, 'ms')}
                                              className="absolute -top-2 -right-2 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors z-10"
                                            >
                                              <BookmarkPlus className="h-3 w-3 text-primary" />
                                            </button>
                                          </div>
                                          <div className="relative">
                                            <Button 
                                              className="w-full bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                              onClick={() => handlePdfClick(papers, 'insert')}
                                            >
                                              Insert
                                            </Button>
                                            <button
                                              onClick={() => handleSavePaper(papers, 'insert')}
                                              className="absolute -top-2 -right-2 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors z-10"
                                            >
                                              <BookmarkPlus className="h-3 w-3 text-primary" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No papers found for "{searchQuery}"</p>
                <p className="text-sm mt-2">Try searching for year, session, or document type</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Normal Session Cards Layout
        <div className="space-y-6">
          {Object.entries(groupedResults.grouped || {}).map(([session, sessionPapers]) => {
            const sessionId = session;
            const isSessionComplete = completedSessions.has(sessionId);
            
            return (
              <div key={session} className="purple-gradient-border rounded-xl overflow-hidden">
                <div className="purple-gradient-border-inner">
                  {/* Session Header */}
                  <div className="bg-card/50 px-6 py-4 border-b border-border">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-foreground">{session}</h3>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className={`${
                            isSessionComplete 
                              ? 'bg-green-600 text-white' 
                              : 'bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30'
                          }`}
                          onClick={() => handleSessionMarkComplete(session)}
                          disabled={isSessionComplete}
                        >
                          {isSessionComplete ? '✓ Completed' : '✓ Mark Complete'}
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => handleSessionUnmark(session)}
                        >
                          ✗ Unmark
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Session Resources - Only for non-specimen sessions and non-Edexcel */}
                  {session !== 'Specimen' && examType !== 'XEN01' && (
                    <div className="p-6 pb-0">
                      <div className="text-sm font-medium text-muted-foreground mb-3">Session Resources</div>
                      <div className="grid grid-cols-2 gap-3 mb-8">
                      </div>
                    </div>
                  )}

                  {/* Papers */}
                  <div className="p-6 space-y-8">
                    {Object.entries(sessionPapers)
                      .sort(([a], [b]) => parseInt(a) - parseInt(b))
                      .map(([paperNumber, paperVariants]) => (
                      <div key={paperNumber}>
                        <h4 className="text-lg font-medium text-foreground mb-4">Paper {paperNumber}</h4>
                        
                        {/* Variants */}
                        <div className="space-y-4">
                          {Object.entries(paperVariants)
                            .sort(([a], [b]) => {
                              const variantA = parseInt(a.replace('Variant ', ''));
                              const variantB = parseInt(b.replace('Variant ', ''));
                              return variantA - variantB;
                            })
                            .map(([variant, papers]) => {
                              const variantId = `${session}-${paperNumber}-${variant}`;
                              const isVariantComplete = completedVariants.has(variantId);
                              
                              return (
                                <div key={variant} className="border border-border rounded-lg bg-card/20">
                                  <div className="p-4">
                                    <div className="flex justify-between items-center mb-4">
                                      <h5 className="font-medium text-primary">{variant}</h5>
                                      <div className="flex gap-2">
                                        <Button 
                                          size="sm" 
                                          className={`${
                                            isVariantComplete 
                                              ? 'bg-green-600 text-white' 
                                              : 'bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30'
                                          }`}
                                          onClick={() => handleVariantMarkComplete(session, paperNumber, variant)}
                                          disabled={isVariantComplete}
                                        >
                                          {isVariantComplete ? '✓ Completed' : '✓ Mark Complete'}
                                        </Button>
                                        <Button 
                                          size="sm" 
                                          className="bg-red-600 text-white hover:bg-red-700"
                                          onClick={() => handleVariantUnmark(session, paperNumber, variant)}
                                        >
                                          ✗ Unmark
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-4">
                                      <div className="relative">
                                        <Button 
                                          className="w-full bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                          onClick={() => handlePdfClick(papers, 'qp')}
                                        >
                                          Question Paper
                                        </Button>
                                        <button
                                          onClick={() => handleSavePaper(papers, 'qp')}
                                          className="absolute -top-2 -right-2 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors z-10"
                                        >
                                          <BookmarkPlus className="h-3 w-3 text-primary" />
                                        </button>
                                      </div>
                                      <div className="relative">
                                        <Button 
                                          className="w-full bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                          onClick={() => handlePdfClick(papers, 'ms')}
                                        >
                                          Mark Scheme
                                        </Button>
                                        <button
                                          onClick={() => handleSavePaper(papers, 'ms')}
                                          className="absolute -top-2 -right-2 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors z-10"
                                        >
                                          <BookmarkPlus className="h-3 w-3 text-primary" />
                                        </button>
                                      </div>
                                      <div className="relative">
                                        <Button 
                                          className="w-full bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                          onClick={() => handlePdfClick(papers, 'insert')}
                                        >
                                          Insert
                                        </Button>
                                        <button
                                          onClick={() => handleSavePaper(papers, 'insert')}
                                          className="absolute -top-2 -right-2 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors z-10"
                                        >
                                          <BookmarkPlus className="h-3 w-3 text-primary" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No Results */}
      {filteredPapers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {searchQuery ? 'No papers match your search.' : 'No papers available for this selection.'}
          </div>
        </div>
      )}

      {!onOpenPdf && (
        <PdfModal
          isOpen={pdfModal.isOpen}
          onClose={closePdfModal}
          pdfUrl={pdfModal.pdfUrl}
          title={pdfModal.title}
          user={user}
        />
      )}

      <PaperSaveModal
        isOpen={saveModal.isOpen}
        onClose={closeSaveModal}
        papers={saveModal.papers}
        user={user}
        examType={examType}
        year={year}
      />
    </div>
  );
};

export default PaperBrowser;