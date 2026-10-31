export const pl = {
  appName: 'Music Tinder',
  common: {
    reset: 'Zresetuj demo',
    mockup: 'Makieta',
  },
  nav: {
    label: 'Nawigacja główna',
    discover: 'Odkrywaj',
    chats: 'Czaty',
  },
  discover: {
    like: 'Polub',
    pass: 'Pomiń',
    empty: 'Na dziś to wszystko',
    emptyHint: 'Zmień filtry lub zresetuj demo, aby zobaczyć profile ponownie.',
    clearFilters: 'Wyczyść filtry',
    filters: {
      role: 'Rola',
      genre: 'Styl',
      city: 'Miasto',
      any: 'Wszystkie',
    },
    match: {
      title: 'To match!',
      description: (name: string) => `Ty i ${name} polubiliście się nawzajem.`,
      message: 'Napisz wiadomość',
      continue: 'Dalej przeglądam',
    },
  },
  chat: {
    listTitle: 'Czaty',
    listEmpty: 'Nie masz jeszcze matchy. Polub kogoś na ekranie Odkrywaj.',
    noMessagesYet: 'Napisz pierwszą wiadomość',
    notFound: 'Nie znaleziono rozmowy.',
    back: 'Wróć do listy czatów',
    messages: 'Wiadomości',
    startHint: (name: string) => `Przywitaj się z ${name}.`,
    typing: (name: string) => `${name} pisze…`,
    placeholder: 'Napisz wiadomość',
    send: 'Wyślij',
  },
} as const;
