
-- News feed table
CREATE TABLE public.news_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  media_url text,
  media_type text NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  period text NOT NULL DEFAULT 'hebdomadaire' CHECK (period IN ('hebdomadaire', 'mensuel', 'annuel')),
  event_date text,
  sort_order integer DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.news_feed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "News feed viewable by everyone"
  ON public.news_feed FOR SELECT
  USING (is_published = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert news"
  ON public.news_feed FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update news"
  ON public.news_feed FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete news"
  ON public.news_feed FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER news_feed_updated_at
  BEFORE UPDATE ON public.news_feed
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for news media (images + videos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-media', 'news-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "News media public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'news-media');

CREATE POLICY "Admins upload news media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'news-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update news media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'news-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete news media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'news-media' AND has_role(auth.uid(), 'admin'::app_role));
