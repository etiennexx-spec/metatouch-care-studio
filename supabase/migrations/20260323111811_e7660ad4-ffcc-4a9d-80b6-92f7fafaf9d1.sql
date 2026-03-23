
-- Site sections for editable content
CREATE TABLE public.site_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  title text,
  subtitle text,
  description text,
  image_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site sections are viewable by everyone" ON public.site_sections FOR SELECT TO public USING (true);
CREATE POLICY "Admins can insert site sections" ON public.site_sections FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site sections" ON public.site_sections FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site sections" ON public.site_sections FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Gallery images
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  image_url text NOT NULL,
  section text DEFAULT 'general',
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery images are viewable by everyone" ON public.gallery_images FOR SELECT TO public USING (true);
CREATE POLICY "Admins can insert gallery images" ON public.gallery_images FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update gallery images" ON public.gallery_images FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery images" ON public.gallery_images FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for site images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Storage RLS policies
CREATE POLICY "Anyone can view site images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'site-images');
CREATE POLICY "Admins can upload site images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at on site_sections
CREATE TRIGGER update_site_sections_updated_at BEFORE UPDATE ON public.site_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial site sections
INSERT INTO public.site_sections (section_key, title, subtitle, description) VALUES
  ('hero', 'Meta Cares', 'l''expérience médicale à portée de main', 'Meta Cares connecte les patients aux meilleurs professionnels de santé et accompagne les établissements dans leur besoin en personnel qualifié.'),
  ('about', 'Votre partenaire de confiance en services de santé', 'Qui sommes-nous', 'Meta Cares est une entreprise spécialisée dans les services de santé, présente en Belgique et au Cameroun.'),
  ('services', 'Des solutions complètes pour la santé', 'Nos Services', 'Meta Cares offre une gamme complète de services pour accompagner les patients, les professionnels de santé et les établissements médicaux.'),
  ('testimonials', 'Ce que disent nos partenaires', 'Témoignages', 'Découvrez les expériences de nos patients, partenaires et professionnels de santé.'),
  ('faq', 'Questions fréquentes', 'FAQ', 'Retrouvez les réponses aux questions les plus posées par nos patients et partenaires.'),
  ('professionals', 'Rejoignez Meta Cares', 'Pour les Professionnels', 'Vous êtes infirmier, aide-soignant, médecin ou professionnel de santé ?'),
  ('contact', 'Contactez Meta Cares', 'Contact', 'Une question, un projet de partenariat ou une demande de soins ? Notre équipe est à votre écoute.'),
  ('partners', 'Nos partenaires de confiance', 'Partenaires', 'Ils nous font confiance pour la qualité de nos services.');
