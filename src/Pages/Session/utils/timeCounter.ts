export const timeCounter = (returnTime: number) => {
  if (!returnTime) return;

  // const date = new Date(returnTime);
  // const diff = date.getTime() - Date.now();

  const minutes = returnTime > 0 ? Math.floor(returnTime / 60) % 60 : 0;
  const seconds = returnTime > 0 ? Math.floor(returnTime) % 60 : 0;

  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};
