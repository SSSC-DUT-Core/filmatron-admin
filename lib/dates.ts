import dayjs from 'dayjs';

export function formatDateToMMMDDYYYY(inputDateStr: string) {
  // Parse the input date string using dayjs
  const date = dayjs(inputDateStr);

  // Format the date as "MMM DD YYYY" (e.g., "Sep 08 2023")
  const formattedDate = date.format('MMM DD YYYY');

  return formattedDate;
}

/**
 * Convert an ISO 8601 date to "MMM D" format.
 * @param isoDate The date in ISO 8601 format (e.g., '2023-10-31T13:30:33.000Z').
 * @returns The formatted date (e.g., 'Oct 31').
 */
export function formatDateToMMMDD(isoDate: string): string {
  // Parse the input date
  const parsedDate = dayjs(isoDate);

  // Format the date as "MMM D"
  const formattedDate = parsedDate.format('MMM D');

  return formattedDate;
}