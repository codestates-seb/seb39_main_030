export const getKST = (date: string) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 18);
  return newDate.toISOString().replace('T', ' ').substring(0, 19);
};
