import { encode, decode, isValid } from "js-base64";
import { BasisList, Payload } from '../src/types';

export function generateToken(secretKey: string): string {
  if (secretKey) {
    const encodedKey = unescape(encodeURIComponent(secretKey));
    const token = decodeURIComponent(escape(encode(encodedKey)));
    return token;
  }
  throw Error("`secretKey` cannot be null.");
}

/**
 * Check if number is float
 * 
 * @param {number} num
 */
export function isFloat(num: number) {
  return typeof num === "number" && !Number.isInteger(num);
}

/**
 * Validates user input based on type.
 * 
 * @param {string}           key 
 * @param {string | number}  value 
 * @param {string}           type 
 */
export function validate<T>(key: string, value: T, type: string) {
  if (type == typeof value) {
    if (value) {
      return value;
    } else {
      if (typeof value === "string") {
        throw Error(`'${key}' must be not be empty.`);
      }
      if (typeof value === "number") {
        throw Error(`'${key}' must be greater than '0.0'`);
      }
    }
  }
  throw Error(`'${key} must be of type '${type}'`);
}

/**
 * Maps keys of basis for validation over user input.
 * 
 * @param {Object}  payload 
 * @param {Object}  basis 
 */
export function getValidatedPayload(payload: Payload, basis: BasisList) {
  let validatedPayload = {} as Payload;
  if (typeof payload === 'object') {
    Object.keys(basis).forEach((key: string) => {
      let basisKey = basis[key];
      let isKeyRequired = basisKey['required'];
      let basisType = basisKey['type'];
      if (isKeyRequired) {
        if (key in payload) {
          validatedPayload[key] = validate(key, payload[key], basisType);
        } else {
          throw Error(`'${key}' is required.`)
        }
      } else {
        if (key in payload && payload[key] !== '') {
          validatedPayload[key] = validate(key, payload[key], basisType);
        } else {
          if ('default' in basis[key]) {
            validatedPayload[key] = basisKey['default'];
          } else {
            validatedPayload[key] = '';
          }
        }
      }
    })
    return validatedPayload;
  } else {
    throw Error("'payload' must be an object");
  }
}

/**
 * Encodes additionalData object to base64.
 * 
 * @param {string}  additionalData 
 */
export function encodeAdditionalData (additionalData: object) {
  if (typeof(additionalData) == "object") {
    const encodedData = encode(unescape(encodeURIComponent(JSON.stringify(additionalData))));
    return decodeURIComponent(escape(encodedData));
  }
  throw Error("'data' must be an object");
}
