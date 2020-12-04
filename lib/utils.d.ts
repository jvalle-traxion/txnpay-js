import { BasisList, Payload } from '../src/types';
export declare function generateToken(secretKey: string): string;
/**
 * Check if number is float
 *
 * @param {number} num
 */
export declare function isFloat(num: number): boolean;
/**
 * Validates user input based on type.
 *
 * @param {string}           key
 * @param {string | number}  value
 * @param {string}           type
 */
export declare function validate<T>(key: string, value: T, type: string): T;
/**
 * Maps keys of basis for validation over user input.
 *
 * @param {Object}  payload
 * @param {Object}  basis
 */
export declare function getValidatedPayload(payload: Payload, basis: BasisList): Payload;
