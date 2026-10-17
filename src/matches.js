// ISCL Season 1 (Dec 2025) results, from isclcricket.in
export const MSC = { name: 'Maharashtra Super Chargers', short: 'MSC', logo: '/logo.png' }
export const teams = {
  GUJARAT: { name: 'Gujarati Kings', short: 'GK', logo: '/teams/Gujarati_kings.jpg' },
  CHHATTISGARH: { name: 'Chhattisgarh Cheetahs', short: 'CC', logo: '/teams/CHHATTISGARH.png' },
  'NORTH EAST': { name: 'Hima Hawks', short: 'HH', logo: '/teams/NORTH_EAST.png' },
  UTTARAKHAND: { name: 'Uttara Raptors', short: 'UR', logo: '/teams/UK.jpg' },
}
// home = team batting first
export const results = [
  { stage: 'ISCL Match 1', date: '2025-12-01', time: '10:00', home: 'GUJARAT', away: 'MSC', homeScore: '109/5', awayScore: '42/10', won: false, summary: 'Gujarati Kings won by 67 runs' },
  { stage: 'ISCL Match 6', date: '2025-12-02', time: '14:30', home: 'MSC', away: 'CHHATTISGARH', homeScore: '59/9', awayScore: '54/9', won: true, summary: 'Maharashtra won by 5 runs' },
  { stage: 'ISCL Match 11', date: '2025-12-03', time: '18:00', home: 'NORTH EAST', away: 'MSC', homeScore: '46/8', awayScore: '107/8', won: true, summary: 'Maharashtra won by 61 runs' },
  { stage: 'Super 16 · M-2', date: '2025-12-04', time: '17:00', venue: 'Kini Cricket Ground', home: 'UTTARAKHAND', away: 'MSC', homeScore: '55/1', awayScore: '54/8', won: false, summary: 'Uttara Raptors won by 9 wickets' },
]
