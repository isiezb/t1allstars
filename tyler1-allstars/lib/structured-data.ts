export function getEventStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': 'Tyler1 All Stars - Season 1 Winter 2026',
    'description': '8 Players | Best-of-3 | Double Elimination | 1v1 Howling Abyss',
    'url': 'https://t1allstars.vercel.app',
    'organizer': {
      '@type': 'Organization',
      'name': 'Tyler1',
      'url': 'https://t1allstars.vercel.app'
    },
    'eventStatus': 'EventScheduled',
    'eventAttendanceMode': 'OnlineEventBroadcastPresentation',
    'startDate': '2026-01-27',
    'endDate': '2026-03-15',
    'location': {
      '@type': 'VirtualLocation',
      'url': 'https://t1allstars.vercel.app'
    }
  };
}

export function getTournamentStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    'name': 'Tyler1 All Stars Tournament',
    'description': 'League of Legends 1v1 Howling Abyss tournament',
    'sport': 'League of Legends',
    'sportsEventStatus': 'https://schema.org/EventScheduled',
    'competitor': [
      'Humzh', 'TFBlade', 'Solarbacca', 'Adrian', 
      'Pstar', 'Quantum', 'Manco', 'Tyler1'
    ]
  };
}
