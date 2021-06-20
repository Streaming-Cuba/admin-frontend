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
