export enum TimeUnits {
  SECONDS,
  MILLI_SECONDS,
}
export function formatTime(
  time: number,
  units: TimeUnits = TimeUnits.SECONDS
): string {
  if (units == TimeUnits.MILLI_SECONDS) {
    time /= 1000;
  }

  let formattedTime = '';

  const seconds = Math.floor(time % 60);
  time = Math.floor(time / 60);
  const minutes = Math.floor(time % 60);
  time = Math.floor(time / 60);
  const hours = time;

  const secondsStr = seconds > 9 ? String(seconds) : '0' + String(seconds);
  const minutesStr = minutes > 9 ? String(minutes) : '0' + String(minutes);
  const hoursStr = hours > 9 ? String(hours) : '0' + String(hours);

  if (hours) formattedTime += hoursStr + ':';
  formattedTime += minutesStr + ':';
  formattedTime += secondsStr;
  return formattedTime;
}

formatTime(67);
