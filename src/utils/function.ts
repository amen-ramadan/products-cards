/**
 * 
 * @param {string} txt - The input text to be sliced
 * @param {number} [max=50] - The maximum length of the sliced text
 * @returns - The sliced text, with an ellipsis if the input text is longer than the maximum length
 */
export function textSlice(txt: string, max: number = 50) {
  if (txt.length >= max) return `${txt.slice(0, max)}...`;
  return txt;
} 