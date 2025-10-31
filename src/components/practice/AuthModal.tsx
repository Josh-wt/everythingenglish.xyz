
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

export const AuthModal = ({ isOpen, onClose, feature = "this feature" }: AuthModalProps) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/auth');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mb-3">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-xl">Sign In Required</DialogTitle>
          <p className="text-sm text-muted-foreground">
            You need to sign in to access {feature}
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center py-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-primary/60" />
            </div>
            
            <h3 className="font-semibold mb-2">Create your account</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Sign in to save your progress, set study goals, and access saved resources
            </p>

            <Button onClick={handleSignIn} className="w-full">
              Sign In / Create Account
            </Button>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Continue Without Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
