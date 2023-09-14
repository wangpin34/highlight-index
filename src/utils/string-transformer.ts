export function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export function snakeToNormal(str: string) {
  return str
    .replace(/[-_]/g, (sep) => ` `)
    .split(" ")
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join(" ");
}