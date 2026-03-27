-- NextStep V13-Community: Forum and Mentorship Network
-- Run this in Supabase > SQL Editor

-- 1. Community Forum Tables
CREATE TABLE IF NOT EXISTS public.forum_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- e.g., 'dicas', 'vagas', 'transicao', 'geral'
  upvotes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.forum_comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.forum_votes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  vote_type SMALLINT NOT NULL CHECK (vote_type IN (-1, 1)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- 2. Mentorship Network Tables
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_mentor BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS mentor_bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS mentor_hourly_rate NUMERIC DEFAULT 0; -- 0 for free

CREATE TABLE IF NOT EXISTS public.mentorship_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mentor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  mentee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to handle vote counts
CREATE OR REPLACE FUNCTION update_post_upvotes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.forum_posts SET upvotes = upvotes + NEW.vote_type WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.forum_posts SET upvotes = upvotes - OLD.vote_type WHERE id = OLD.post_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.forum_posts SET upvotes = upvotes - OLD.vote_type + NEW.vote_type WHERE id = NEW.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER forum_votes_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.forum_votes
FOR EACH ROW EXECUTE FUNCTION update_post_upvotes();

-- RLS
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;

-- Post Policies
CREATE POLICY "Everyone can view posts" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update their posts" ON public.forum_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete their posts" ON public.forum_posts FOR DELETE USING (auth.uid() = author_id);

-- Comment Policies
CREATE POLICY "Everyone can view comments" ON public.forum_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON public.forum_comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can delete their comments" ON public.forum_comments FOR DELETE USING (auth.uid() = author_id);
CREATE POLICY "Post authors can mark comments as accepted" ON public.forum_comments FOR UPDATE USING (
  EXISTS(SELECT 1 FROM public.forum_posts WHERE id = post_id AND author_id = auth.uid())
);

-- Vote Policies
CREATE POLICY "Everyone can view votes" ON public.forum_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can vote" ON public.forum_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own votes" ON public.forum_votes FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Users can update own votes" ON public.forum_votes FOR UPDATE USING (auth.uid() = user_id);

-- Mentorship Policies
CREATE POLICY "Mentors and mentees can view their requests" ON public.mentorship_requests 
  FOR SELECT USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);
CREATE POLICY "Users can create requests" ON public.mentorship_requests 
  FOR INSERT WITH CHECK (auth.uid() = mentee_id);
CREATE POLICY "Mentors can update requests" ON public.mentorship_requests 
  FOR UPDATE USING (auth.uid() = mentor_id);
