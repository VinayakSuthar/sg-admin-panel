function formatDate(date) {
  const currentDate = new Date(date).toLocaleDateString('en-in', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return currentDate;
}

export { formatDate };
