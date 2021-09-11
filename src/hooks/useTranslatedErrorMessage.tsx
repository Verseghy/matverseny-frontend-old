const errorMessages: { [key: string]: string } = {
  E0000: 'not implemented',
  E0001: 'Email megadása kötelező',
  E0002: 'Jelszó megadása kötelező',
  E0003: 'Hibás email cím vagy jelszó',
  E0004: 'Adatbázis hiba',
  E0005: 'Kriptográfiai hiba',
  E0006: 'JWT hiba',
  E0007: 'Név megadása kötelező',
  E0008: 'Email formátuma hibás',
  E0009: 'Iskola megadása kötelező',
  E0010: 'A felhasználó már létezik',
  E0011: 'Token lejárt',
  E0012: 'Nincs jogosultság',
  E0013: 'Hibás hely',
  E0014: 'Nem található',
  E0015: 'Hibás azonosító',
  E0016: 'Nincs jogosultság',
  E0017: 'Nincs csapat',
  E0018: 'Sikertelen email küldés',
  E0019: 'Hibás token',
  E0020: 'Queue error',
  E0021: 'A felhasználó már csapatban van',
  E0022: 'Csapatnév már foglalt',
  E0023: 'A lehetetlen megtörtént, a világ pokolra van utalva (próbáld újra)',
  E0024: 'A csapatfőnök nem léphet ki a csapatból',
  E0025: 'Nincs jogosultság',
  E0026: 'Csak üres csapatot lehet törölni',
  E0027: 'Rossz idő formátum',
  E0028: 'Túl hosszú csapatnév',
}

export const useTranslatedErrorMessage = (message: string): string => {
  let error
  const match = message.match(/(E[0-9]{4}): .*/)
  if (!match || !(error = errorMessages[match[1]])) error = 'Ismeretlen hiba'

  return error
}
