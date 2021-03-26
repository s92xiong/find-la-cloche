function getTime() {
  // Get date information
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const value = `${month} ${day}, ${year}`;
  return value;
}

export default getTime;