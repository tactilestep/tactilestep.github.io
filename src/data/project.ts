// Edit research content here. Empty values render explicit placeholders.
// Local asset paths are relative to public/.
export interface VideoAsset {
  portrait?: boolean;
  src: string;
  poster: string;
  label: string;
  caption: string;
  captionsSrc?: string;
  captionsLanguage?: string;
  captionsLabel?: string;
}

export interface FigureAsset {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export const paper: {
  projectName: string;
  title: string;
  titleBreakBefore: string;
  acceptance: string;
  awards: string[];
  authors: { name: string; url: string; affiliationIds: string[]; contribution?: string }[];
  affiliations: { id: string; name: string }[];
  authorNotes: string[];
  abstract: string[];
  abstractHighlights: string[];
  bibtex: string;
} = {
  projectName: 'TactileStep',
  title: 'TactileStep: Sole Tactile Learning for Regulating Foot–Terrain Interaction in Humanoid Locomotion',
  titleBreakBefore: 'Foot–Terrain', // Preferred subtitle line break; does not change the paper title.
  acceptance: 'Accepted at CoRL 2026',
  awards: [], // Reserved: only add confirmed, author-supplied award names.
  // Names, order, affiliation, and equal-contribution note transcribed from page 1.
  // Author-supplied homepages; Zizhuo and Ming-Ju have no public homepage yet.
  authors: [
    { name: 'Zizhuo Wang', url: '', affiliationIds: ['1'], contribution: '*' },
    { name: 'Ming-Ju Lee', url: '', affiliationIds: ['1'], contribution: '*' },
    { name: 'Shaoting Zhu', url: 'https://shaotingzhu.github.io/', affiliationIds: ['1'] },
    { name: 'Haozhe Lou', url: 'https://haozhelou.com/', affiliationIds: ['1'] },
    { name: 'Hang Zhao', url: 'https://hangzhaomit.github.io/', affiliationIds: ['1'], contribution: '†' },
    { name: 'Yiming Li', url: 'https://yimingli-page.github.io/', affiliationIds: ['1'], contribution: '†' },
  ],
  affiliations: [{ id: '1', name: 'Tsinghua University' }],
  authorNotes: ['* Equal contribution.', '† Corresponding authors.'],
  // Verbatim abstract from CoRL_2026_Humanoid (11).pdf, p. 1;
  // only PDF line wrapping and discretionary hyphenation have been removed.
  abstract: [
    'Humanoid parkour policies can traverse various terrains, but task completion may mask challenges of harsh landings, edge contacts, and unstable stance contacts. Humans naturally regulate foot–terrain interaction through tactile feedback, modulating contact compliance according to terrain stiffness. This highlights a key domain gap between humans and humanoid robots: the absence of rich tactile sensing in most humanoid systems. We address this problem with TactileStep, a deployable tactile learning framework that brings sole pressure sensing into humanoid locomotion control for softer touchdowns and more stable support. TactileStep aligns tactile simulation with the real pressure insole, allowing the policy to learn from the same contact features available on hardware. During training, we use tactile and motion cues to recognize different foot-contact phases and apply phase-aware rewards that encourage safer landing and more stable stance. Evaluated in simulation and on a Unitree G1 humanoid across diverse terrains, TactileStep reduces peak touchdown force by up to 48.8% and peak A-weighted impact noise by up to 30.1 dB over a strong perceptive baseline, while increasing stance contact area by up to 23.8%.',
  ],
  abstractHighlights: ['TactileStep', 'deployable tactile learning framework', 'sole pressure sensing', 'tactile simulation', 'foot-contact phases', 'phase-aware rewards'],
  bibtex: '', // TODO: author-supplied BibTeX; do not infer publication metadata
};

export const resources: { label: string; icon: 'paper' | 'arxiv' | 'code' | 'video'; href: string }[] = [
  { label: 'Paper', icon: 'paper', href: '' },
  { label: 'arXiv', icon: 'arxiv', href: '' },
  { label: 'Code', icon: 'code', href: '' },
  { label: 'Video', icon: 'video', href: '#overview' },
];

export const hero: VideoAsset = {
  src: 'videos/hero/tactilestep-hero.mp4',
  poster: 'images/posters/tactilestep-hero.jpg',
  label: 'Hero video',
  caption: '',
};

export const overview: VideoAsset = {
  src: 'videos/overview/tactilestep-overview-trimmed.mp4',
  poster: 'images/posters/tactilestep-overview-trimmed.jpg',
  label: 'Project overview video',
  caption: '',
  captionsSrc: '', // Optional author-supplied WebVTT captions for narrated video
  captionsLanguage: 'en',
  captionsLabel: 'English',
};

export const method: FigureAsset = {
  src: 'images/method/tactilestep-method.png',
  alt: 'TactileStep architecture. Depth, proprioception, and sole contact features (normal force, contact area, and center of pressure) feed an actor with dense and sparse critics. Phase-conditioned rewards cover swing, pre-landing, landing, and stance.',
  caption: 'Overview of TactileStep. Our central design is to turn sole pressure into a deployable contact-state representation for policy learning. We first construct a lightweight tactile simulator that maps rigid foot–terrain contacts to a pressure array, from which contact features are extracted and exposed to the policy during both training and deployment. Gait phases are estimated online and phase-conditioned rewards are designed to regulate touchdown impact and stance support.',
  width: 2400,
  height: 922,
};

// Mobile reading order; desktop columns are arranged in the page template.
export const terrainVideos: VideoAsset[] = [
  { src: 'videos/experiments/stair-descent.mp4', poster: 'images/posters/stair-descent.jpg', label: 'Stair descent', caption: '' },
  { src: 'videos/experiments/platform-ascent.mp4', poster: 'images/posters/platform-ascent.jpg', label: 'Platform ascent', caption: '', portrait: true },
  { src: 'videos/experiments/platform-descent.mp4', poster: 'images/posters/platform-descent.jpg', label: 'Platform descent', caption: '', portrait: true },
  { src: 'videos/experiments/level-ground.mp4', poster: 'images/posters/level-ground.jpg', label: 'Flat ground', caption: '' },
  { src: 'videos/experiments/slope-ascent.mp4', poster: 'images/posters/slope-ascent.jpg', label: 'Slope ascent', caption: '' },
  { src: 'videos/experiments/slope-descent.mp4', poster: 'images/posters/slope-descent.jpg', label: 'Slope descent', caption: '' },
];
