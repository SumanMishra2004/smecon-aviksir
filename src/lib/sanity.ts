import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

/**
 * Sanity client configuration.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2023-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_WRITE_TOKEN,
});

const builder = createImageUrlBuilder(client);

// Helper to build image URLs safely from Sanity image asset objects
export const urlFor = (source: any) => {
  if (!source) return null;
  if (typeof source === 'string') return source;
  try {
    return builder.image(source).url();
  } catch (err) {
    return null;
  }
};

/**
 * Interfaces for Sanity schemas
 */
export interface SiteSettingsData {
  brandName?: string;
  brandYear?: string;
  currentYear?: string;
  ikcLogo?: any;
  smcLogo?: any;
  smeconLogo?: any;
  navLinks?: { label: string; href: string }[];
  organizerFooterText?: string;
  copyrightText?: string;
}

export interface HeroData {
  year?: string;
  eyebrow?: string;
  title?: string;
  highlightedYear?: string;
  subtitle?: string;
  organizerText?: string;
  backgroundImages?: any[];
  badges?: { text: string; iconType?: string }[];
  conferenceDate?: string;
  countdownLabel?: string;
  primaryButton?: { label: string; url: string };
  secondaryButton?: { label: string; url: string };
}

export interface TrackItem {
  trackId: string;
  title: string;
  color: 'teal' | 'purple' | 'gold';
}

export interface TracksData {
  year?: string;
  heading?: string;
  subheading?: string;
  tracksList?: TrackItem[];
  bannerText?: string;
}

export interface FeeItem {
  amount: string;
  label: string;
  icon: string;
}

export interface FeesData {
  year?: string;
  heading?: string;
  subheading?: string;
  feesList?: FeeItem[];
}

export interface SpeakerItem {
  name: string;
  role: string;
  affiliation: string;
  initials?: string;
  photo?: any;
  bio?: string;
  socialLinks?: string[];
}

export interface SpeakersData {
  year?: string;
  heading?: string;
  speakersList?: SpeakerItem[];
}

export interface CommitteeMember {
  name: string;
  domain?: string;
  role?: string;
  affiliation?: string;
  image?: any;
  linkedinUrl?: string;
  initials?: string;
}

export interface CommitteeData {
  year?: string;
  isVisible?: boolean;
  heading?: string;
  conveners?: string[];
  patrons?: string[];
  members?: CommitteeMember[];
}

export interface DateItem {
  label: string;
  date: string;
  iconKey?: string;
}

export interface ImportantDatesData {
  year?: string;
  heading?: string;
  datesList?: DateItem[];
}

export interface GalleryItem {
  image?: any;
  url?: string;
  caption: string;
}

export interface GalleryData {
  year?: string;
  isVisible?: boolean;
  heading?: string;
  subheading?: string;
  imagesList?: GalleryItem[];
}

export interface CallForPapersData {
  year?: string;
  heading?: string;
  primaryButton?: { label: string; url: string };
  secondaryButton?: { label: string; url: string };
  enquiryEmail?: string;
  subtext?: string;
  templateUrl?: string;
}

/**
 * Fetch data from Sanity with safe fallback handling
 */
export async function fetchSanity<T = any>(query: string, params: Record<string, any> = {}): Promise<T | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return null;
  }
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.warn('Sanity fetch error, falling back to static content:', error);
    return null;
  }
}

// Section queries filtered by year
export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  return fetchSanity<SiteSettingsData>(`*[_type == "siteSettings"][0]`);
}

export async function getHeroData(year: string = "2026"): Promise<HeroData | null> {
  return fetchSanity<HeroData>(`*[_type == "hero" && (year == $year || !defined(year))][0]`, { year });
}

export async function getTracksData(year: string = "2026"): Promise<TracksData | null> {
  return fetchSanity<TracksData>(`*[_type == "tracks" && (year == $year || !defined(year))][0]`, { year });
}

export async function getFeesData(year: string = "2026"): Promise<FeesData | null> {
  return fetchSanity<FeesData>(`*[_type == "fees" && (year == $year || !defined(year))][0]`, { year });
}

export async function getSpeakersData(year: string = "2026"): Promise<SpeakersData | null> {
  return fetchSanity<SpeakersData>(`*[_type == "speakersSection" || _type == "speakers" && (year == $year || !defined(year))][0]`, { year });
}

export async function getCommitteeData(year: string = "2026"): Promise<CommitteeData | null> {
  return fetchSanity<CommitteeData>(`*[_type == "committee" && (year == $year || !defined(year))][0]`, { year });
}

export async function getImportantDatesData(year: string = "2026"): Promise<ImportantDatesData | null> {
  return fetchSanity<ImportantDatesData>(`*[_type == "importantDates" && (year == $year || !defined(year))][0]`, { year });
}

export async function getGalleryData(year: string = "2026"): Promise<GalleryData | null> {
  return fetchSanity<GalleryData>(`*[_type == "gallery" && (year == $year || !defined(year))][0]`, { year });
}

export async function getCallForPapersData(year: string = "2026"): Promise<CallForPapersData | null> {
  return fetchSanity<CallForPapersData>(`*[_type == "callForPapers" && (year == $year || !defined(year))][0]`, { year });
}

export async function getAvailableYears(): Promise<string[]> {
  const years = await fetchSanity<string[]>(`array::unique(*[defined(year)].year)`);
  if (!years || years.length === 0) return ["2026"];
  const sorted = years.filter(Boolean).sort((a, b) => b.localeCompare(a));
  return sorted.length > 0 ? sorted : ["2026"];
}
