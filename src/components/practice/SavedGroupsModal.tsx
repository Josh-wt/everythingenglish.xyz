import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Bookmark, Plus, Trash2, FileText, FolderPlus } from 'lucide-react';

interface SavedGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onOpenPdf: (url: string, title: string) => void;
}

interface SavedGroup {
  id: string;
  name: string;
  created_at: string;
  bookmarks: PaperBookmark[];
}

interface PaperBookmark {
  id: string;
  paper_id: string;
  paper_title: string;
  exam_type: string;
  created_at: string;
}

export const SavedGroupsModal = ({ isOpen, onClose, user, onOpenPdf }: SavedGroupsModalProps) => {
  const [groups, setGroups] = useState<SavedGroup[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadGroups();
    }
  }, [isOpen, user.id]);

  const loadGroups = async () => {
    // Load groups with their bookmarks
    const { data: groupsData, error: groupsError } = await supabase
      .from('saved_groups')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (groupsError) {
      console.error('Error loading groups:', groupsError);
      return;
    }

    // Load bookmarks for each group
    const groupsWithBookmarks = await Promise.all(
      (groupsData || []).map(async (group) => {
        const { data: bookmarks, error: bookmarksError } = await supabase
          .from('paper_bookmarks')
          .select('*')
          .eq('group_id', group.id)
          .order('created_at', { ascending: false });

        if (bookmarksError) {
          console.error('Error loading bookmarks:', bookmarksError);
        }

        return {
          ...group,
          bookmarks: bookmarks || []
        };
      })
    );

    setGroups(groupsWithBookmarks);
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

    const { error } = await supabase
      .from('saved_groups')
      .insert({
        user_id: user.id,
        name: newGroupName
      });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({ title: "Group created successfully!" });
    setNewGroupName('');
    setShowCreateForm(false);
    loadGroups();
  };

  function deleteGroup(groupId: string) {
    return supabase
      .from('saved_groups')
      .delete()
      .eq('id', groupId)
      .eq('user_id', user.id)
      .then(({ error }) => {
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        toast({ title: "Group deleted" });
        loadGroups();
      });
  }

  function deletePaperFromGroup(bookmarkId: string) {
    return supabase
      .from('paper_bookmarks')
      .delete()
      .eq('id', bookmarkId)
      .eq('user_id', user.id)
      .then(({ error }) => {
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        toast({ title: "Paper removed from group" });
        loadGroups();
      });
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Your Saved Groups
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Groups List */}
          {groups.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mb-8">
                <FolderPlus className="h-16 w-16 text-primary/60" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-4">No saved groups yet</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Create your first group to organize and save your favorite papers. Groups help you keep track of papers by topic, exam session, or study plan.
              </p>

              {!showCreateForm ? (
                <Button onClick={() => setShowCreateForm(true)} size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Create Your First Group
                </Button>
              ) : (
                <Card className="max-w-md mx-auto">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <Input
                        placeholder="Enter group name (e.g., 'June 2024 Papers')"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && createGroup()}
                        className="text-center"
                      />
                      <div className="flex gap-2 justify-center">
                        <Button onClick={createGroup} className="gap-2">
                          <Plus className="h-4 w-4" />
                          Create Group
                        </Button>
                        <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <>
              {/* Create New Group */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Manage Groups</h3>
                {!showCreateForm && (
                  <Button onClick={() => setShowCreateForm(true)} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Group
                  </Button>
                )}
              </div>

              {showCreateForm && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter group name"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && createGroup()}
                      />
                      <Button onClick={createGroup}>Create</Button>
                      <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {groups.map((group) => (
                  <Card key={group.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {group.bookmarks.length} papers • Created {formatDate(group.created_at)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteGroup(group.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {group.bookmarks.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No papers saved in this group</p>
                      ) : (
                        <div className="space-y-2">
                          {group.bookmarks.map((bookmark) => (
                            <div
                              key={bookmark.id}
                              className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="h-4 w-4 text-primary" />
                                <div>
                                  <div className="font-medium text-sm">{bookmark.paper_title}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {bookmark.exam_type} • Saved {formatDate(bookmark.created_at)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onOpenPdf('', bookmark.paper_title)}
                                >
                                  Open
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deletePaperFromGroup(bookmark.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
