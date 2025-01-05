const magicNumbers = [
  147, 117, 239, 143, 157, 312, 161, 612, 512, 804, 411, 527, 170, 511, 421,
  667, 764, 621, 301, 106, 133, 793, 411, 511, 312, 423, 344, 346, 653, 758,
  342, 222, 236, 811, 711, 611, 122, 447, 128, 199, 183, 135, 489, 703, 800,
  745, 152, 863, 134, 211, 142, 564, 375, 793, 212, 153, 138, 153, 648, 611,
  151, 649, 318, 143, 117, 756, 119, 141, 717, 113, 112, 146, 162, 660, 693,
  261, 362, 354, 251, 641, 157, 178, 631, 192, 734, 445, 192, 883, 187, 122,
  591, 731, 852, 384, 565, 596, 451, 772, 624, 691,
];

export const getMagicNumberFor = (marketId: number, day: number): number =>
  magicNumbers[marketId] + marketId + 2 * day;
