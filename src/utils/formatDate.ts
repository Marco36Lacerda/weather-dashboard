export function formatDate(): string {
  const dateObj = new Date();
  const date = dateObj.toLocaleDateString();
  return date;
}

export function sunTime(riseAndSet: number): string {
  const sunInTheSky = new Date(riseAndSet * 1000).toLocaleTimeString("en-US", {
    hour12: true,
  });
  return sunInTheSky;
}

export function localTime(timeStamp: number, timezoneOffset: number): string {
  const utcMillis = timeStamp * 1000;
  const localMillis = utcMillis + timezoneOffset * 1000;
  const localDate = new Date(localMillis);

  const hours = localDate.getUTCHours().toString().padStart(2, "0");
  const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
