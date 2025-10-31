
import { ExamType } from '@/pages/Practice';
import { BookMarked, Languages, Award, ArrowLeft, Globe, FileText } from 'lucide-react';

interface ALevelSubjectsProps {
  onSelectSubject: (subject: ExamType) => void;
  onGoBack: () => void;
}

const aLevelSubjects: ExamType[] = [
  {
    id: '9093',
    name: 'Cambridge English Language (9093)',
    fullName: 'Complete A Level syllabus coverage',
    years: [2024, 2023, 2022, 2021, 2020, 2019, 2018],
    icon: 'Languages'
  },
  {
    id: '8021',
    name: 'Cambridge General Paper',
    fullName: 'Complete General Paper resources',
    years: [2024, 2023, 2022, 2021, 2020, 2019, 2018],
    icon: 'Globe'
  },
  {
    id: 'XEN01',
    name: 'Edexcel A Level English Language',
    fullName: 'Complete Edexcel A Level resources',
    years: [2024, 2023, 2022, 2021, 2020, 2019, 2018],
    icon: 'FileText'
  }
];

const getSubjectIcon = (iconName: string) => {
  switch (iconName) {
    case 'Languages':
      return <Languages className="w-12 h-12" />;
    case 'Globe':
      return <Globe className="w-12 h-12" />;
    case 'FileText':
      return <FileText className="w-12 h-12" />;
    default:
      return <Languages className="w-12 h-12" />;
  }
};

export const ALevelSubjects = ({ onSelectSubject, onGoBack }: ALevelSubjectsProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <button 
          onClick={onGoBack}
          className="mb-6 text-primary hover:text-primary/80 transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Exam Selection
        </button>
        <h2 className="text-3xl font-bold mb-4 text-foreground">Choose A Level Subject</h2>
        <p className="text-lg text-muted-foreground mb-8">Select your specific A Level English qualification</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {aLevelSubjects.map((subject) => (
          <div
            key={subject.id}
            onClick={() => onSelectSubject(subject)}
            className="bg-card border border-border rounded-2xl p-8 cursor-pointer text-center transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-xl group"
          >
            <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity text-primary">
              {getSubjectIcon(subject.icon)}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
              {subject.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-primary/80 transition-colors">
              {subject.fullName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
