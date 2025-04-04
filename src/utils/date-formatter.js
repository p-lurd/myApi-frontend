export function formatCurrentDate() {
  const date = new Date();
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);

  const getOrdinal = (n) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${getOrdinal(day)} ${month}`;
}
