import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { X, Bookmark, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { PaperSaveModal } from "./PaperSaveModal";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  user: User | null;
}

export const PdfModal = ({ isOpen, onClose, pdfUrl, title, user }: PdfModalProps) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Create a paper object for the current PDF
  const createPaperFromTitle = () => {
    return [
      {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        title: title,
        type: "Question Paper" as const, // Default type, could be improved with better logic
        session: "Summer" as const, // Default session, could be improved with parsing from title
        paper: "1", // Default paper number, could be improved with parsing from title
        url: pdfUrl,
        fileName: title, // Using title as filename for now
      },
    ];
  };

  const handleSaveClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setShowSaveModal(true);
  };

  if (isMobile) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent
            side="bottom"
            className="h-[100dvh] max-h-[100dvh] p-0 flex flex-col"
            style={{
              WebkitOverflowScrolling: "touch",
              paddingBottom: "env(safe-area-inset-bottom)",
              paddingTop: "env(safe-area-inset-top)",
            }}
          >
            <SheetHeader className="px-3 py-2 sm:px-4 sm:py-3 bg-background border-b flex-shrink-0 relative">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50 w-8 h-8 rounded-full bg-background hover:bg-muted flex items-center justify-center shadow-md border"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex flex-col gap-2 pr-10">
                <SheetTitle className="text-xs sm:text-sm font-medium leading-tight line-clamp-2">{title}</SheetTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSaveClick} className="flex-1 h-8 text-xs">
                    <Bookmark className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(pdfUrl, "_blank")}
                    className="flex-1 h-8 text-xs"
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </SheetHeader>

            <div className="flex-1 w-full overflow-hidden bg-muted/20 ios-scroll">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-none"
                title={title}
                loading="lazy"
                style={{ WebkitOverflowScrolling: "touch" }}
              />
            </div>
          </SheetContent>
        </Sheet>

        {showSaveModal && user && (
          <PaperSaveModal
            isOpen={showSaveModal}
            onClose={() => setShowSaveModal(false)}
            papers={createPaperFromTitle()}
            user={user}
            examType="0500"
            year={2024}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[98vw] w-[98vw] h-[98vh] max-h-[98vh] p-0 flex flex-col gap-0">
          <DialogHeader className="p-3 sm:p-4 border-b flex-shrink-0 relative pr-14">
            <div className="flex justify-between items-center gap-4">
              <DialogTitle className="text-sm sm:text-base md:text-lg font-semibold truncate flex-1">
                {title}
              </DialogTitle>
              <div className="flex gap-2 flex-shrink-0 sm:mr-[2%]">
                <Button variant="outline" size="sm" onClick={handleSaveClick}>
                  <Bookmark className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Save</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.open(pdfUrl, "_blank")}>
                  <Download className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </div>
            </div>
          </DialogHeader>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-50 w-9 h-9 rounded-full bg-background hover:bg-muted flex items-center justify-center shadow-lg border-2"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex-1 w-full overflow-hidden ios-scroll">
            <iframe
              src={pdfUrl}
              className="w-full h-full border-none"
              title={title}
              loading="lazy"
              style={{ WebkitOverflowScrolling: "touch" }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {showSaveModal && user && (
        <PaperSaveModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          papers={createPaperFromTitle()}
          user={user}
          examType="0500"
          year={2024}
        />
      )}
    </>
  );
};
