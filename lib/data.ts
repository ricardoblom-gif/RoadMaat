export type FeedItem = {
  id: number;
  author: string;
  role: string;
  time: string;
  body: string;
  tags: string[];
};

export type LocationItem = {
  id: number;
  name: string;
  category: 'Parking' | 'Restaurant' | 'Klant' | 'Fabriek';
  status: 'Open' | 'Busy' | 'Review';
  distance: string;
};

export const feed: FeedItem[] = [
  {
    id: 1,
    author: 'Klaas Smit',
    role: 'Mentor',
    time: '12 min geleden',
    body: 'Nieuwe parkeerplek bij Nisse heeft een vaste laadstroom. De route is goed en er is een duidelijke entree.',
    tags: ['parking', 'route'],
  },
  {
    id: 2,
    author: 'Mila Venema',
    role: 'Chauffeur',
    time: '49 min geleden',
    body: 'Vandaag veel rust op de route. Heeft een goede ervaring met de korte lunchstop buiten de hub.',
    tags: ['community', 'experience'],
  },
  {
    id: 3,
    author: 'Jesse de Vries',
    role: 'Planner',
    time: '1 uur geleden',
    body: 'Klantlocatie in de buurt van Zevenhuizen is nu goed bereikbaar voor trailers van 16 meter.',
    tags: ['planning', 'logistics'],
  },
];

export const locations: LocationItem[] = [
  { id: 1, name: 'Truckstop Joost', category: 'Parking', status: 'Open', distance: '3.1 km' },
  { id: 2, name: 'Cafe de Schans', category: 'Restaurant', status: 'Busy', distance: '7.4 km' },
  { id: 3, name: 'AB Texel Hub', category: 'Klant', status: 'Open', distance: '5.7 km' },
  { id: 4, name: 'Fabriek Noord', category: 'Fabriek', status: 'Review', distance: '11.2 km' },
];

export const groups = [
  { id: 'team-texel', name: 'Texel Team', members: 14, focus: 'Route updates' },
  { id: 'drivers-north', name: 'Drivers North', members: 29, focus: 'Praktische tips' },
  { id: 'mentors', name: 'Mentor Network', members: 8, focus: 'Onboarding' },
];
