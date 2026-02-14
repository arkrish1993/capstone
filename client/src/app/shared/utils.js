export const convertToDate = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleString();
};
