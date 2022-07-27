/**
 * Converts an enum to an array of its values
 * 
 * @param enumm Enum to convert
 * @returns Converted enum to array
 */
export function enumToArray(enumm: Record<string, unknown>) {
  return Object.keys(enumm).map(key => enumm[key]);
}
