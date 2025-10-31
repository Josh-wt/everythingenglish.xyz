export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      assessment_badges: {
        Row: {
          badge_description: string
          badge_icon: string
          badge_name: string
          badge_type: string
          earned_at: string | null
          id: string
          progress: number | null
          requirement: number | null
          tier: string | null
          user_id: string
        }
        Insert: {
          badge_description: string
          badge_icon: string
          badge_name: string
          badge_type: string
          earned_at?: string | null
          id?: string
          progress?: number | null
          requirement?: number | null
          tier?: string | null
          user_id: string
        }
        Update: {
          badge_description?: string
          badge_icon?: string
          badge_name?: string
          badge_type?: string
          earned_at?: string | null
          id?: string
          progress?: number | null
          requirement?: number | null
          tier?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_assessment_users"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "assessment_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "assessment_users"
            referencedColumns: ["uid"]
          },
        ]
      }
      assessment_evaluations: {
        Row: {
          ao1_marks: string | null
          ao2_marks: string | null
          ao3_marks: string | null
          content_structure_marks: string | null
          feedback: string
          full_chat: string | null
          grade: string
          id: string
          improvement_suggestions: string[] | null
          next_steps: string[] | null
          question_type: string
          reading_marks: string | null
          short_id: string | null
          strengths: string[] | null
          student_response: string
          style_accuracy_marks: string | null
          timestamp: string | null
          user_id: string
          writing_marks: string | null
        }
        Insert: {
          ao1_marks?: string | null
          ao2_marks?: string | null
          ao3_marks?: string | null
          content_structure_marks?: string | null
          feedback: string
          full_chat?: string | null
          grade: string
          id?: string
          improvement_suggestions?: string[] | null
          next_steps?: string[] | null
          question_type: string
          reading_marks?: string | null
          short_id?: string | null
          strengths?: string[] | null
          student_response: string
          style_accuracy_marks?: string | null
          timestamp?: string | null
          user_id: string
          writing_marks?: string | null
        }
        Update: {
          ao1_marks?: string | null
          ao2_marks?: string | null
          ao3_marks?: string | null
          content_structure_marks?: string | null
          feedback?: string
          full_chat?: string | null
          grade?: string
          id?: string
          improvement_suggestions?: string[] | null
          next_steps?: string[] | null
          question_type?: string
          reading_marks?: string | null
          short_id?: string | null
          strengths?: string[] | null
          student_response?: string
          style_accuracy_marks?: string | null
          timestamp?: string | null
          user_id?: string
          writing_marks?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_evaluations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_assessment_users"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "assessment_evaluations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "assessment_users"
            referencedColumns: ["uid"]
          },
        ]
      }
      assessment_feedback: {
        Row: {
          accurate: boolean
          category: string
          comments: string | null
          created_at: string | null
          evaluation_id: string
          id: string
          user_id: string
        }
        Insert: {
          accurate: boolean
          category: string
          comments?: string | null
          created_at?: string | null
          evaluation_id: string
          id?: string
          user_id: string
        }
        Update: {
          accurate?: boolean
          category?: string
          comments?: string | null
          created_at?: string | null
          evaluation_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_assessment_users"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "assessment_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "assessment_users"
            referencedColumns: ["uid"]
          },
        ]
      }
      assessment_follow_ups: {
        Row: {
          evaluation_id: string
          id: string
          question: string
          response: string
          timestamp: string | null
          user_id: string
        }
        Insert: {
          evaluation_id: string
          id?: string
          question: string
          response: string
          timestamp?: string | null
          user_id: string
        }
        Update: {
          evaluation_id?: string
          id?: string
          question?: string
          response?: string
          timestamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_follow_ups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "active_assessment_users"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "assessment_follow_ups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "assessment_users"
            referencedColumns: ["uid"]
          },
        ]
      }
      assessment_meta: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          key: string
          updated_at: string | null
          user_id: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key: string
          updated_at?: string | null
          user_id?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          user_id?: string | null
          value?: Json
        }
        Relationships: []
      }
      assessment_transactions: {
        Row: {
          amount_inr: number
          created_at: string | null
          id: string
          order_id: string
          status: string
          updated_at: string | null
          user_email: string
        }
        Insert: {
          amount_inr: number
          created_at?: string | null
          id?: string
          order_id: string
          status: string
          updated_at?: string | null
          user_email: string
        }
        Update: {
          amount_inr?: number
          created_at?: string | null
          id?: string
          order_id?: string
          status?: string
          updated_at?: string | null
          user_email?: string
        }
        Relationships: []
      }
      assessment_user_audit_log: {
        Row: {
          email: string
          id: string
          ip_address: unknown | null
          new_data: Json | null
          old_data: Json | null
          operation: string
          performed_at: string | null
          performed_by: string | null
          user_agent: string | null
          user_uid: string
        }
        Insert: {
          email: string
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          operation: string
          performed_at?: string | null
          performed_by?: string | null
          user_agent?: string | null
          user_uid: string
        }
        Update: {
          email?: string
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          operation?: string
          performed_at?: string | null
          performed_by?: string | null
          user_agent?: string | null
          user_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_user_audit_log_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "active_assessment_users"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "assessment_user_audit_log_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "assessment_users"
            referencedColumns: ["uid"]
          },
        ]
      }
      assessment_users: {
        Row: {
          academic_level: string | null
          accessibility_mode: boolean | null
          auto_advance: boolean | null
          auto_backup: boolean | null
          auto_save_drafts: boolean | null
          backup_frequency: string | null
          cloud_sync: boolean | null
          compact_mode: boolean | null
          created_at: string | null
          credits: number | null
          current_plan: string | null
          dark_mode: boolean | null
          data_retention_days: number | null
          deleted_at: string | null
          deleted_by: string | null
          display_name: string | null
          distraction_free: boolean | null
          email: string
          email_notifications: boolean | null
          export_format: string | null
          feedback_detail_level: string | null
          focus_mode: boolean | null
          font_size: string | null
          grammar_suggestions: boolean | null
          is_launch_user: boolean | null
          keyboard_shortcuts: boolean | null
          language_preference: string | null
          launch_period_granted: boolean | null
          launch_period_granted_at: string | null
          marketing_emails: boolean | null
          notification_frequency: string | null
          photo_url: string | null
          privacy_mode: boolean | null
          questions_marked: number | null
          show_character_count: boolean | null
          show_progress: boolean | null
          show_tips: boolean | null
          show_word_count: boolean | null
          sound_effects: boolean | null
          spell_check: boolean | null
          subscription_status: string | null
          theme_color: string | null
          timezone: string | null
          uid: string
          updated_at: string | null
          use_data_for_training: boolean | null
          writing_style: string | null
        }
        Insert: {
          academic_level?: string | null
          accessibility_mode?: boolean | null
          auto_advance?: boolean | null
          auto_backup?: boolean | null
          auto_save_drafts?: boolean | null
          backup_frequency?: string | null
          cloud_sync?: boolean | null
          compact_mode?: boolean | null
          created_at?: string | null
          credits?: number | null
          current_plan?: string | null
          dark_mode?: boolean | null
          data_retention_days?: number | null
          deleted_at?: string | null
          deleted_by?: string | null
          display_name?: string | null
          distraction_free?: boolean | null
          email: string
          email_notifications?: boolean | null
          export_format?: string | null
          feedback_detail_level?: string | null
          focus_mode?: boolean | null
          font_size?: string | null
          grammar_suggestions?: boolean | null
          is_launch_user?: boolean | null
          keyboard_shortcuts?: boolean | null
          language_preference?: string | null
          launch_period_granted?: boolean | null
          launch_period_granted_at?: string | null
          marketing_emails?: boolean | null
          notification_frequency?: string | null
          photo_url?: string | null
          privacy_mode?: boolean | null
          questions_marked?: number | null
          show_character_count?: boolean | null
          show_progress?: boolean | null
          show_tips?: boolean | null
          show_word_count?: boolean | null
          sound_effects?: boolean | null
          spell_check?: boolean | null
          subscription_status?: string | null
          theme_color?: string | null
          timezone?: string | null
          uid: string
          updated_at?: string | null
          use_data_for_training?: boolean | null
          writing_style?: string | null
        }
        Update: {
          academic_level?: string | null
          accessibility_mode?: boolean | null
          auto_advance?: boolean | null
          auto_backup?: boolean | null
          auto_save_drafts?: boolean | null
          backup_frequency?: string | null
          cloud_sync?: boolean | null
          compact_mode?: boolean | null
          created_at?: string | null
          credits?: number | null
          current_plan?: string | null
          dark_mode?: boolean | null
          data_retention_days?: number | null
          deleted_at?: string | null
          deleted_by?: string | null
          display_name?: string | null
          distraction_free?: boolean | null
          email?: string
          email_notifications?: boolean | null
          export_format?: string | null
          feedback_detail_level?: string | null
          focus_mode?: boolean | null
          font_size?: string | null
          grammar_suggestions?: boolean | null
          is_launch_user?: boolean | null
          keyboard_shortcuts?: boolean | null
          language_preference?: string | null
          launch_period_granted?: boolean | null
          launch_period_granted_at?: string | null
          marketing_emails?: boolean | null
          notification_frequency?: string | null
          photo_url?: string | null
          privacy_mode?: boolean | null
          questions_marked?: number | null
          show_character_count?: boolean | null
          show_progress?: boolean | null
          show_tips?: boolean | null
          show_word_count?: boolean | null
          sound_effects?: boolean | null
          spell_check?: boolean | null
          subscription_status?: string | null
          theme_color?: string | null
          timezone?: string | null
          uid?: string
          updated_at?: string | null
          use_data_for_training?: boolean | null
          writing_style?: string | null
        }
        Relationships: []
      }
      completed_papers: {
        Row: {
          completed_at: string
          created_at: string
          exam_type: string
          id: string
          paper_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          exam_type: string
          id?: string
          paper_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          exam_type?: string
          id?: string
          paper_id?: string
          user_id?: string
        }
        Relationships: []
      }
      dodo_customer_portal_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          session_url: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          session_url: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          session_url?: string
        }
        Relationships: []
      }
      dodo_payments: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      dodo_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          cancelled_at: string | null
          created_at: string | null
          current_period_end: string
          current_period_start: string
          id: string
          metadata: Json | null
          next_billing_date: string | null
          raw_data: Json | null
          trial_end: string | null
          trial_start: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          cancelled_at?: string | null
          created_at?: string | null
          current_period_end: string
          current_period_start: string
          id?: string
          metadata?: Json | null
          next_billing_date?: string | null
          raw_data?: Json | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          cancelled_at?: string | null
          created_at?: string | null
          current_period_end?: string
          current_period_start?: string
          id?: string
          metadata?: Json | null
          next_billing_date?: string | null
          raw_data?: Json | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      dodo_webhook_events: {
        Row: {
          created_at: string | null
          error_message: string | null
          event_type: string
          id: string
          processed: boolean | null
          processed_at: string | null
          retry_count: number | null
          signature: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          event_type: string
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          retry_count?: number | null
          signature?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          event_type?: string
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          retry_count?: number | null
          signature?: string | null
        }
        Relationships: []
      }
      food_items: {
        Row: {
          brand: string | null
          calories_per_unit: number
          carbs_per_unit: number | null
          created_at: string | null
          fat_per_unit: number | null
          fiber_per_unit: number | null
          id: string
          meal_id: string
          name: string
          protein_per_unit: number | null
          quantity: number
          sodium_per_unit: number | null
          sugar_per_unit: number | null
          unit: string
        }
        Insert: {
          brand?: string | null
          calories_per_unit?: number
          carbs_per_unit?: number | null
          created_at?: string | null
          fat_per_unit?: number | null
          fiber_per_unit?: number | null
          id?: string
          meal_id: string
          name: string
          protein_per_unit?: number | null
          quantity: number
          sodium_per_unit?: number | null
          sugar_per_unit?: number | null
          unit?: string
        }
        Update: {
          brand?: string | null
          calories_per_unit?: number
          carbs_per_unit?: number | null
          created_at?: string | null
          fat_per_unit?: number | null
          fiber_per_unit?: number | null
          id?: string
          meal_id?: string
          name?: string
          protein_per_unit?: number | null
          quantity?: number
          sodium_per_unit?: number | null
          sugar_per_unit?: number | null
          unit?: string
        }
        Relationships: []
      }
      generated_plans: {
        Row: {
          ai_model: string | null
          assessment_responses: Json
          components_used: string[]
          created_at: string | null
          generation_prompt: string | null
          id: string
          plan_data: Json
          user_id: string | null
        }
        Insert: {
          ai_model?: string | null
          assessment_responses: Json
          components_used?: string[]
          created_at?: string | null
          generation_prompt?: string | null
          id?: string
          plan_data: Json
          user_id?: string | null
        }
        Update: {
          ai_model?: string | null
          assessment_responses?: Json
          components_used?: string[]
          created_at?: string | null
          generation_prompt?: string | null
          id?: string
          plan_data?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      paper_bookmarks: {
        Row: {
          created_at: string
          exam_type: string
          group_id: string
          id: string
          paper_id: string
          paper_title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          exam_type: string
          group_id: string
          id?: string
          paper_id: string
          paper_title: string
          user_id: string
        }
        Update: {
          created_at?: string
          exam_type?: string
          group_id?: string
          id?: string
          paper_id?: string
          paper_title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "paper_bookmarks_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "saved_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_adaptations: {
        Row: {
          adaptation_prompt: string | null
          adaptation_reason: string
          changes_made: Json
          created_at: string | null
          id: string
          plan_id: string | null
          user_id: string | null
        }
        Insert: {
          adaptation_prompt?: string | null
          adaptation_reason: string
          changes_made: Json
          created_at?: string | null
          id?: string
          plan_id?: string | null
          user_id?: string | null
        }
        Update: {
          adaptation_prompt?: string | null
          adaptation_reason?: string
          changes_made?: Json
          created_at?: string | null
          id?: string
          plan_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_adaptations_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "generated_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          email_updates: boolean | null
          full_name: string | null
          id: string
          study_level: string | null
          theme_preference: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          email_updates?: boolean | null
          full_name?: string | null
          id: string
          study_level?: string | null
          theme_preference?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          email_updates?: boolean | null
          full_name?: string | null
          id?: string
          study_level?: string | null
          theme_preference?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      saved_groups: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      saved_resources: {
        Row: {
          category: string | null
          created_at: string | null
          group_id: string
          id: string
          resource_category: string
          resource_id: string
          resource_level: string
          resource_title: string
          resource_type: string | null
          section: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          group_id: string
          id?: string
          resource_category: string
          resource_id: string
          resource_level: string
          resource_title: string
          resource_type?: string | null
          section?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          group_id?: string
          id?: string
          resource_category?: string
          resource_id?: string
          resource_level?: string
          resource_title?: string
          resource_type?: string | null
          section?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_resources_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "saved_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      study_components: {
        Row: {
          category: string
          created_at: string | null
          description: string
          difficulty: string
          duration: number
          follow_up: string[]
          id: string
          level: string
          prerequisites: string[]
          resources: string[]
          skills: string[]
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          difficulty: string
          duration: number
          follow_up?: string[]
          id: string
          level: string
          prerequisites?: string[]
          resources?: string[]
          skills?: string[]
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          difficulty?: string
          duration?: number
          follow_up?: string[]
          id?: string
          level?: string
          prerequisites?: string[]
          resources?: string[]
          skills?: string[]
          title?: string
        }
        Relationships: []
      }
      study_goals: {
        Row: {
          category: string | null
          completed: boolean | null
          created_at: string | null
          deadline: string | null
          description: string | null
          exam_level: string
          goal_name: string | null
          id: string
          papers: string[] | null
          priority: string | null
          progress: Json | null
          resource_type: string | null
          target_date: string | null
          target_resource_id: string | null
          title: string | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          completed?: boolean | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          exam_level: string
          goal_name?: string | null
          id?: string
          papers?: string[] | null
          priority?: string | null
          progress?: Json | null
          resource_type?: string | null
          target_date?: string | null
          target_resource_id?: string | null
          title?: string | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          completed?: boolean | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          exam_level?: string
          goal_name?: string | null
          id?: string
          papers?: string[] | null
          priority?: string | null
          progress?: Json | null
          resource_type?: string | null
          target_date?: string | null
          target_resource_id?: string | null
          title?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      study_plans: {
        Row: {
          created_at: string | null
          description: string
          focus_area: string
          id: string
          learning_style: string
          level: string
          plan_data: Json
          time_commitment: string
          timeline: string
          title: string
          weekly_hours: string
        }
        Insert: {
          created_at?: string | null
          description: string
          focus_area: string
          id: string
          learning_style: string
          level: string
          plan_data: Json
          time_commitment: string
          timeline: string
          title: string
          weekly_hours: string
        }
        Update: {
          created_at?: string | null
          description?: string
          focus_area?: string
          id?: string
          learning_style?: string
          level?: string
          plan_data?: Json
          time_commitment?: string
          timeline?: string
          title?: string
          weekly_hours?: string
        }
        Relationships: []
      }
      study_streaks: {
        Row: {
          created_at: string | null
          id: string
          last_study_date: string | null
          longest_streak: number | null
          milestone_celebrations: Json | null
          streak_count: number | null
          total_study_days: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_study_date?: string | null
          longest_streak?: number | null
          milestone_celebrations?: Json | null
          streak_count?: number | null
          total_study_days?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_study_date?: string | null
          longest_streak?: number | null
          milestone_celebrations?: Json | null
          streak_count?: number | null
          total_study_days?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscription_billing_history: {
        Row: {
          amount: number
          billing_date: string
          created_at: string | null
          currency: string | null
          id: string
          payment_method: string | null
          status: string | null
          subscription_id: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          billing_date: string
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          subscription_id?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          billing_date?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          subscription_id?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_billing_history_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_features: {
        Row: {
          created_at: string | null
          feature: string
          id: string
          subscription_id: string | null
        }
        Insert: {
          created_at?: string | null
          feature: string
          id?: string
          subscription_id?: string | null
        }
        Update: {
          created_at?: string | null
          feature?: string
          id?: string
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_features_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_tags: {
        Row: {
          created_at: string | null
          id: string
          subscription_id: string | null
          tag: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          subscription_id?: string | null
          tag: string
        }
        Update: {
          created_at?: string | null
          id?: string
          subscription_id?: string | null
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_tags_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_usage: {
        Row: {
          current_usage: number | null
          id: string
          last_updated: string | null
          subscription_id: string | null
          usage_limit: number | null
          usage_unit: string | null
        }
        Insert: {
          current_usage?: number | null
          id?: string
          last_updated?: string | null
          subscription_id?: string | null
          usage_limit?: number | null
          usage_unit?: string | null
        }
        Update: {
          current_usage?: number | null
          id?: string
          last_updated?: string | null
          subscription_id?: string | null
          usage_limit?: number | null
          usage_unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_usage_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          auto_renew: boolean | null
          billing_cycle: string
          cancellation_date: string | null
          category: string
          color: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          discount: number | null
          icon: string | null
          id: string
          name: string
          next_billing_date: string
          original_price: number | null
          price: number
          status: string
          support_email: string | null
          trial_ends_at: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          auto_renew?: boolean | null
          billing_cycle: string
          cancellation_date?: string | null
          category: string
          color?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          discount?: number | null
          icon?: string | null
          id?: string
          name: string
          next_billing_date: string
          original_price?: number | null
          price: number
          status?: string
          support_email?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          auto_renew?: boolean | null
          billing_cycle?: string
          cancellation_date?: string | null
          category?: string
          color?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          discount?: number | null
          icon?: string | null
          id?: string
          name?: string
          next_billing_date?: string
          original_price?: number | null
          price?: number
          status?: string
          support_email?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed: boolean | null
          completion_date: string | null
          created_at: string | null
          id: string
          notes: string | null
          plan_id: string
          subtask_id: string | null
          task_id: string
          time_spent: number | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          completion_date?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          plan_id: string
          subtask_id?: string | null
          task_id: string
          time_spent?: number | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          completion_date?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          plan_id?: string
          subtask_id?: string | null
          task_id?: string
          time_spent?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      active_assessment_users: {
        Row: {
          academic_level: string | null
          created_at: string | null
          credits: number | null
          current_plan: string | null
          dark_mode: boolean | null
          deleted_at: string | null
          deleted_by: string | null
          display_name: string | null
          email: string | null
          is_launch_user: boolean | null
          launch_period_granted: boolean | null
          launch_period_granted_at: string | null
          photo_url: string | null
          questions_marked: number | null
          subscription_status: string | null
          uid: string | null
          updated_at: string | null
        }
        Insert: {
          academic_level?: string | null
          created_at?: string | null
          credits?: number | null
          current_plan?: string | null
          dark_mode?: boolean | null
          deleted_at?: string | null
          deleted_by?: string | null
          display_name?: string | null
          email?: string | null
          is_launch_user?: boolean | null
          launch_period_granted?: boolean | null
          launch_period_granted_at?: string | null
          photo_url?: string | null
          questions_marked?: number | null
          subscription_status?: string | null
          uid?: string | null
          updated_at?: string | null
        }
        Update: {
          academic_level?: string | null
          created_at?: string | null
          credits?: number | null
          current_plan?: string | null
          dark_mode?: boolean | null
          deleted_at?: string | null
          deleted_by?: string | null
          display_name?: string | null
          email?: string | null
          is_launch_user?: boolean | null
          launch_period_granted?: boolean | null
          launch_period_granted_at?: string | null
          photo_url?: string | null
          questions_marked?: number | null
          subscription_status?: string | null
          uid?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_dodo_payments_status: {
        Args: Record<PropertyKey, never>
        Returns: {
          columns_exist: string[]
          record_count: number
          table_exists: boolean
        }[]
      }
      check_user_license_validity: {
        Args: { product_type?: string; user_uuid: string }
        Returns: boolean
      }
      create_or_restore_assessment_user: {
        Args: {
          p_academic_level?: string
          p_credits?: number
          p_current_plan?: string
          p_dark_mode?: boolean
          p_display_name?: string
          p_email: string
          p_is_launch_user?: boolean
          p_photo_url?: string
          p_uid: string
        }
        Returns: string
      }
      find_orphaned_auth_users: {
        Args: Record<PropertyKey, never>
        Returns: {
          auth_uid: string
          created_at: string
          email: string
        }[]
      }
      get_assessment_analytics: {
        Args: { days_back?: number }
        Returns: Json
      }
      get_learning_progress_analytics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_performance_insights: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_signup_analytics: {
        Args: { days_back?: number }
        Returns: Json
      }
      get_user_active_subscription: {
        Args: { user_uid: string }
        Returns: {
          cancel_at_period_end: boolean
          current_period_end: string
          plan_type: string
          status: string
          subscription_id: string
          trial_end: string
        }[]
      }
      get_user_activity_analytics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_current_subscription: {
        Args: { user_uuid: string }
        Returns: {
          dodo_subscription_id: string
          expires_at: string
          product_id: string
          status: string
          subscription_id: string
          tier: string
        }[]
      }
      get_user_management_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_stats: {
        Args: { user_uuid: string }
        Returns: {
          saved_resources_count: number
          study_goals_count: number
        }[]
      }
      hard_delete_assessment_user: {
        Args: { p_force?: boolean; p_uid: string }
        Returns: boolean
      }
      soft_delete_assessment_user: {
        Args: { p_deleted_by?: string; p_uid: string }
        Returns: boolean
      }
      sync_user_from_auth: {
        Args: { p_email: string; p_metadata?: Json; p_uid: string }
        Returns: string
      }
      sync_user_subscription_status: {
        Args: { user_uid: string }
        Returns: undefined
      }
      update_user_evaluation_limits: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      user_has_active_subscription: {
        Args: { user_uid: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
