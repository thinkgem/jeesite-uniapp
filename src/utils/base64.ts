/**
 * Copyright (c) 2013-Now https://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */

// base64 character set, plus padding character (=)
const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
// Regular expression to check formal correctness of base64 encoded strings
const b64re = /^(?:[a-z\d+/]{4})*?(?:[a-z\d+/]{2}(?:==)?|[a-z\d+/]{3}=?)?$/i

export function btoa(string: string): string {
  string = String(string)
  let bitmap: number, a: number, b: number, c: number
  let result = ''
  let i = 0
  const rest = string.length % 3 // To determine the final padding

  for (; i < string.length;) {
    a = string.charCodeAt(i++)
    b = string.charCodeAt(i++)
    c = string.charCodeAt(i++)

    if (a > 255 || b > 255 || c > 255) {
      throw new TypeError('Failed to execute \'btoa\' on \'Window\': The string to be encoded contains characters outside of the Latin1 range.')
    }

    bitmap = (a << 16) | (b << 8) | c
    result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63)
      + b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63)
  }

  // If there's need of padding, replace the last 'A's with equal signs
  return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result
};

export function atob(string: string): string {
  // atob can work with strings with whitespaces, even inside the encoded part,
  // but only \t, \n, \f, \r and ' ', which can be stripped.
  string = String(string).replace(/[\t\n\f\r ]+/g, '')
  if (!b64re.test(string))
    throw new TypeError('Failed to execute \'atob\' on \'Window\': The string to be decoded is not correctly encoded.')

  // Adding the padding if missing, for simplicity
  string += '=='.slice(2 - (string.length & 3))
  let bitmap: number
  let result = ''
  let r1: number, r2: number
  let i = 0

  for (; i < string.length;) {
    bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12
      | (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)))

    result += r1 === 64
      ? String.fromCharCode(bitmap >> 16 & 255)
      : r2 === 64
        ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255)
        : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255)
  }
  return result
};
