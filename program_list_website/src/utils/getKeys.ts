/** Returns typed named keys instead of simple «string[]» */
export function getKeys<O>(o: O) {
  return Object.keys(o) as (keyof O)[];
}
