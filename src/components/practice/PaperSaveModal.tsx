
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Plus, FolderPlus, Bookmark } from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  type: 'Question Paper' | 'Mark Scheme' | 'Insert' | 'Examiner Report' | 'Grade Thresholds';
  session: 'March' | 'Summer' | 'Winter';
  paper: string;
  url: string | null;
  fileName: string;
}

interface PaperSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  papers: Paper[];
  user: User | null;
  examType: string;
  year: number;
}

interface SavedGroup {
  id: string;
  name: string;
}

export const PaperSaveModal = ({ 
  isOpen, 
  onClose, 
  papers, 
  user, 
  examType,
  year
}: PaperSaveModalProps) => {
  const [groups, setGroups] = useState<SavedGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      loadGroups();
    }
  }, [isOpen, user?.id]);

  const loadGroups = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('saved_groups')
      .select('id, name')
      .eq('user_id', user.id)
      .order('name');

    if (error) {
      console.error('Error loading groups:', error);
      return;
    }

    setGroups(data || []);
    if (data && data.length > 0 && !selectedGroupId) {
      setSelectedGroupId(data[0].id);
    }
  };

  const createGroup = async () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a group name",
        variant: "destructive"
      });
      return;
    }

    setCreating(true);

    try {
      const { data, error } = await supabase
        .from('saved_groups')
        .insert({
          user_id: user!.id,
          name: newGroupName
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({ title: "Group created successfully!" });
      setNewGroupName('');
      setShowCreateForm(false);
      
      // Refresh groups and select the new one
      await loadGroups();
      setSelectedGroupId(data.id);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  const savePapers = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save papers",
        variant: "destructive"
      });
      return;
    }

    if (!selectedGroupId) {
      toast({
        title: "Error",
        description: "Please select a group",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);

    try {
      const paperInserts = papers.map(paper => ({
        user_id: user.id,
        group_id: selectedGroupId,
        exam_type: examType,
        paper_id: paper.id,
        paper_title: paper.title
      }));

      const { error } = await supabase
        .from('paper_bookmarks')
        .insert(paperInserts);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Some papers already saved",
            description: "Some papers were already in the selected group",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({ 
          title: "Papers saved successfully!",
          description: `${papers.length} paper(s) saved to group`
        });
        onClose();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  const sessionName = papers[0]?.session || '';
  const paperCount = papers.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mb-3">
            <Bookmark className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-xl">Save Papers to Group</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Save {paperCount} paper(s) from {sessionName} {year}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {groups.length === 0 && !showCreateForm ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mb-4">
                <FolderPlus className="h-8 w-8 text-primary/60" />
              </div>
              
              <h3 className="font-semibold mb-2">No groups yet</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Create your first group to organize your saved papers
              </p>

              <Button onClick={() => setShowCreateForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Group
              </Button>
            </div>
          ) : (
            <>
              {/* Group Selection */}
              {groups.length > 0 && !showCreateForm && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Select a group:</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowCreateForm(true)}
                      className="gap-2"
                    >
                      <Plus className="h-3 w-3" />
                      New
                    </Button>
                  </div>

                  <RadioGroup value={selectedGroupId} onValueChange={setSelectedGroupId}>
                    <div className="space-y-2">
                      {groups.map((group) => (
                        <div key={group.id}>
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value={group.id} id={group.id} />
                            <Label htmlFor={group.id} className="flex-1 cursor-pointer">
                              {group.name}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Create Group Form */}
              {showCreateForm && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Create new group
                        </Label>
                        <Input
                          placeholder="Enter group name (e.g., 'June 2024 Papers')"
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && createGroup()}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={createGroup} 
                          disabled={creating || !newGroupName.trim()}
                          className="flex-1 gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          {creating ? 'Creating...' : 'Create Group'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setShowCreateForm(false);
                            setNewGroupName('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        {!showCreateForm && (
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={savePapers} 
              disabled={saving || !selectedGroupId || groups.length === 0}
              className="flex-1"
            >
              {saving ? 'Saving...' : 'Save Papers'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
