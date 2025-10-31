
import { ExamType } from '@/pages/Practice';

interface YearSelectionProps {
  examType: ExamType;
  onSelectYear: (year: number) => void;
  selectedYear: number;
}

export const YearSelection = ({ examType, onSelectYear, selectedYear }: YearSelectionProps) => {
  return (
    <div className="border border-border rounded-2xl bg-card">
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">Select Year</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {examType.years.map((year) => {
            const isActive = year === selectedYear;
            return (
              <button
                key={year}
                className={`
                  min-w-[120px] px-4 py-3 rounded-xl font-medium text-base transition-all duration-300 cursor-pointer text-center border-2
                  ${isActive 
                    ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                    : 'bg-card text-foreground border-border hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-1 hover:shadow-lg'
                  }
                `}
                onClick={() => onSelectYear(year)}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
