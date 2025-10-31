
import { ExamType } from '@/pages/Practice';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, BookOpen, GraduationCap } from 'lucide-react';

interface ExamSelectionProps {
  examTypes: ExamType[];
  onSelectExam: (exam: ExamType) => void;
}

const getExamIcon = (id: string) => {
  switch (id) {
    case '1123':
      return FileText;
    case '0500':
      return BookOpen;
    case 'a-levels':
      return GraduationCap;
    default:
      return FileText;
  }
};

export const ExamSelection = ({ examTypes, onSelectExam }: ExamSelectionProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
        Select Your Exam Type
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {examTypes.map((exam) => {
          const Icon = getExamIcon(exam.id);
          
          return (
            <div
              key={exam.id}
              className="border border-border rounded-2xl cursor-pointer hover:border-primary hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              onClick={() => onSelectExam(exam)}
            >
              <Card className="h-full border-0 bg-card">
                <CardContent className="p-8 text-center">
                  <div className="border border-border rounded-full w-16 h-16 mx-auto mb-6 bg-muted flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {exam.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {exam.fullName}
                  </p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
