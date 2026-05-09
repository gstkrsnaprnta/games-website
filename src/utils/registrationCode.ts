export function formatRegistrationCode(year: number, competitionCode: string, number: number) {
  return `GAMES-${year}-${competitionCode.toUpperCase()}-${String(number).padStart(4, "0")}`;
}
