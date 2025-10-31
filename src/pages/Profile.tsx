
import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User as UserIcon, Settings, BookOpen, Target, Mail, Edit, Save, X } from 'lucide-react';
import { LevelSelectionModal } from '@/components/profile/LevelSelectionModal';
import { DiscordButton } from '@/components/DiscordButton';

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  study_level: string | null;
  email_updates: boolean;
}

interface UserStats {
  saved_resources_count: number;
  study_goals_count: number;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      await fetchProfile(session.user.id);
      await fetchStats(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProfile(data);
      if (data) {
        setEditForm({
          full_name: data.full_name || '',
          email: data.email || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error loading profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_stats', { user_uuid: userId });

      if (error) throw error;

      if (data && data.length > 0) {
        setStats({
          saved_resources_count: data[0].saved_resources_count || 0,
          study_goals_count: data[0].study_goals_count || 0
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile updated",
        description: "Your preferences have been saved.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.full_name,
          email: editForm.email
        })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { 
        ...prev, 
        full_name: editForm.full_name,
        email: editForm.email 
      } : null);
      
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || '',
        email: profile.email || ''
      });
    }
    setIsEditing(false);
  };

  const handleLevelChange = (newLevel: string) => {
    updateProfile({ study_level: newLevel });
    setShowLevelModal(false);
  };

  const getLevelDisplayName = (level: string | null) => {
    switch (level) {
      case 'igcse': return 'IGCSE English';
      case 'a-levels-9093': return 'A-Levels 9093';
      case 'a-levels-egp': return 'A-Levels EGP';
      default: return 'Not Set';
    }
  };

  const getLevelColor = (level: string | null) => {
    switch (level) {
      case 'igcse': return 'bg-blue-500/10 text-blue-700 dark:text-blue-300';
      case 'a-levels-9093': return 'bg-green-500/10 text-green-700 dark:text-green-300';
      case 'a-levels-egp': return 'bg-purple-500/10 text-purple-700 dark:text-purple-300';
      default: return 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={editForm.full_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                  </h1>
                  <p className="text-muted-foreground">{profile?.email || user?.email}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Preferences Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Email updates</span>
                </div>
                <Switch
                  checked={profile?.email_updates || false}
                  onCheckedChange={(checked) => updateProfile({ email_updates: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Saved resources</span>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {stats?.saved_resources_count || 0}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Study goals</span>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {stats?.study_goals_count || 0}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Study Level Card */}
          <Card className="shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Study Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Current level:</span>
                  <Badge className={getLevelColor(profile?.study_level)}>
                    {getLevelDisplayName(profile?.study_level)}
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowLevelModal(true)}
                >
                  Change Level
                </Button>
              </div>
              {!profile?.study_level && (
                <p className="text-sm text-muted-foreground mt-3">
                  Set your study level to get personalized content and resources.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Community Card with Discord Button */}
          <Card className="shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Connect with fellow learners</span>
                  <p className="text-sm text-muted-foreground">
                    Join our Discord community to chat with other students, get help, and share resources.
                  </p>
                </div>
                <DiscordButton />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Selection Modal */}
        <LevelSelectionModal
          isOpen={showLevelModal}
          onClose={() => setShowLevelModal(false)}
          onSelect={handleLevelChange}
          currentLevel={profile?.study_level}
        />
      </div>
    </div>
  );
};

export default Profile;
