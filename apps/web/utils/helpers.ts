export const getPointsDifference = (prevClose: number, lastTraded: number) =>
  parseFloat((lastTraded - prevClose).toFixed(2));

export const changePercentage = (prevClose: number, lastTraded: number) =>
  parseFloat(((lastTraded - prevClose) / prevClose).toFixed(2));
