
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, FileText, Info } from 'lucide-react';
import { ExamType } from '@/pages/Practice';

interface SearchInterfaceProps {
  onOpenPdf: (url: string, title: string) => void;
  onSelectExam: (exam: ExamType) => void;
  examTypes: ExamType[];
}

interface SearchResult {
  id: string;
  title: string;
  examType: string;
  year: string;
  session: string;
  paper: string;
  type: string;
  fileName: string;
  examId: string;
}

export const SearchInterface = ({ onOpenPdf, onSelectExam, examTypes }: SearchInterfaceProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock database of papers for all exam types
  const mockPapers: SearchResult[] = [
    // IGCSE English (0500) papers
    {
      id: '1',
      title: 'IGCSE English Language Paper 1 Question Paper',
      examType: 'IGCSE English (0500)',
      year: '2024',
      session: 'June',
      paper: '1',
      type: 'Question Paper',
      fileName: '0500_s24_qp_12.pdf',
      examId: '0500'
    },
    {
      id: '2',
      title: 'IGCSE English Language Paper 1 Mark Scheme',
      examType: 'IGCSE English (0500)',
      year: '2024',
      session: 'June',
      paper: '1',
      type: 'Mark Scheme',
      fileName: '0500_s24_ms_12.pdf',
      examId: '0500'
    },
    {
      id: '3',
      title: 'IGCSE English Language Paper 2 Question Paper',
      examType: 'IGCSE English (0500)',
      year: '2023',
      session: 'November',
      paper: '2',
      type: 'Question Paper',
      fileName: '0500_w23_qp_21.pdf',
      examId: '0500'
    },
    // O Level English (1123) papers
    {
      id: '4',
      title: 'O Level English Language Paper 1 Question Paper',
      examType: 'O Level English (1123)',
      year: '2024',
      session: 'June',
      paper: '1',
      type: 'Question Paper',
      fileName: '1123_s24_qp_12.pdf',
      examId: '1123'
    },
    {
      id: '5',
      title: 'O Level English Language Paper 2 Mark Scheme',
      examType: 'O Level English (1123)',
      year: '2023',
      session: 'November',
      paper: '2',
      type: 'Mark Scheme',
      fileName: '1123_w23_ms_21.pdf',
      examId: '1123'
    },
    // Cambridge EGP (8021) papers
    {
      id: '6',
      title: 'Cambridge EGP Paper 1 Question Paper',
      examType: 'Cambridge EGP (8021)',
      year: '2024',
      session: 'June',
      paper: '1',
      type: 'Question Paper',
      fileName: '8021_s24_qp_11.pdf',
      examId: '8021'
    },
    {
      id: '7',
      title: 'Cambridge EGP Paper 1 Mark Scheme',
      examType: 'Cambridge EGP (8021)',
      year: '2023',
      session: 'June',
      paper: '1',
      type: 'Mark Scheme',
      fileName: '8021_s23_ms_11.pdf',
      examId: '8021'
    },
    // Cambridge English Language (9093) papers
    {
      id: '8',
      title: 'Cambridge A Level English Language Paper 1 Question Paper',
      examType: 'Cambridge English Language (9093)',
      year: '2024',
      session: 'June',
      paper: '1',
      type: 'Question Paper',
      fileName: '9093_s24_qp_11.pdf',
      examId: '9093'
    },
    // Edexcel English Language (XEN01) papers
    {
      id: '9',
      title: 'Edexcel English Language IAL Paper 1 Question Paper',
      examType: 'Edexcel English Language (XEN01)',
      year: '2024',
      session: 'January',
      paper: '1',
      type: 'Question Paper',
      fileName: 'XEN01_24_qp_01.pdf',
      examId: 'XEN01'
    }
  ];

  const performSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      
      // Filter papers based on search query
      const filtered = mockPapers.filter(result => {
        const matchesTitle = result.title.toLowerCase().includes(query);
        const matchesSession = result.session.toLowerCase().includes(query);
        const matchesYear = result.year.includes(searchQuery);
        const matchesType = result.type.toLowerCase().includes(query);
        const matchesPaper = `paper ${result.paper}`.includes(query);
        const matchesExamType = result.examType.toLowerCase().includes(query);
        const matchesMarkScheme = query.includes('mark scheme') && result.type === 'Mark Scheme';
        const matchesQuestionPaper = query.includes('question') && result.type === 'Question Paper';
        
        return matchesTitle || matchesSession || matchesYear || matchesType || 
               matchesPaper || matchesExamType || matchesMarkScheme || matchesQuestionPaper;
      });
      
      setSearchResults(filtered);
      setIsSearching(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const handleOpenPaper = (result: SearchResult) => {
    // Find the exam type and set it
    const examType = examTypes.find(exam => exam.id === result.examId);
    if (examType) {
      onSelectExam(examType);
    }
    
    // Open the PDF
    onOpenPdf(`/papers/${result.fileName}`, result.title);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Search Past Papers</h1>
        <p className="text-muted-foreground mb-6">
          Search for papers using natural language like "June 2023", "Mark Scheme Paper 1", etc.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex gap-2">
          <Input
            placeholder="Search papers: 'June 2023', 'Question Paper', 'Mark Scheme'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="text-lg"
          />
          <Button 
            onClick={performSearch}
            disabled={isSearching || !searchQuery.trim()}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search Results ({searchResults.length})</h2>
          <div className="grid gap-4">
            {searchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {result.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>{result.examType}</div>
                      <div>{result.session} {result.year} • Paper {result.paper}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenPaper(result)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Open
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {searchQuery && searchResults.length === 0 && !isSearching && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No papers found for "{searchQuery}"</p>
            <p className="text-sm mt-2">Try searching for year, session, or document type</p>
          </div>
        </div>
      )}

      {isSearching && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">Searching...</div>
        </div>
      )}
    </div>
  );
};
