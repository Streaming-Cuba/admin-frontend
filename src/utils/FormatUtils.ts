export function formatVideoDuration(duration: number) {
  let finalDuration = duration;
  let count = 0;
  let unit = "s";
  while (duration < 60) {
    finalDuration = finalDuration / 60;
    count++;
  }
  switch (count) {
    case 1:
      unit = "m";
      break;
    case 2:
      unit = "h";
      break;
    default:
      break;
  }
  return `${finalDuration} {unit}`;
}

export function secondsToString(seconds: number): string {
  const second = Math.round(seconds % 0x3c).toString();
  const hour = Math.floor(seconds / 0xe10).toString();
  const minute = (Math.floor(seconds / 0x3c) % 0x3c).toString();

  return hour + ":" + minute + ":" + second;
}

export function getCountryCode(countryName: string): string | null {
  const matches = countryName.match(/\([A-Z][A-Z]\)/);
  if (matches) return matches[0].replaceAll("(", "").replaceAll(")", "");
  return null;
}

export function getFlagUrlByCountry(countryName: string): string {
  const code = getCountryCode(countryName);
  if (code)
    return `https://www.countryflags.io/${code}/flat/24.png`;

  return "";
}
