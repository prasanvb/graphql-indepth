export const toISOdate = (UTCTimeStamp) => {
  return UTCTimeStamp.slice(0, 'yyyy-mm-dd'.length);
};
