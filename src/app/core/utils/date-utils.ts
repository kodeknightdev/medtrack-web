const pad = (n: number) => String(n).padStart(2, '0');

/** Formats a date for an <input type="datetime-local"> */
export function toLocalInput(value: Date | string): string {
  const d = typeof value === 'string' ? new Date(value) : value;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Formats a date for an <input type="date"> */
export function toDateInput(value: Date | string): string {
  return toLocalInput(value).substring(0, 10);
}

export function fromLocalInput(value: string): string {
  return new Date(value).toISOString();
}

export function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
