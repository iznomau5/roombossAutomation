export function parseYenPrice(price){
  return parseInt(price.replace(/[^\d]/g, ''))
}