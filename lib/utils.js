"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidatedPayload = exports.validate = exports.isFloat = exports.generateToken = void 0;
const js_base64_1 = require("js-base64");
function generateToken(secretKey) {
    if (secretKey) {
        const encodedKey = unescape(encodeURIComponent(secretKey));
        const token = decodeURIComponent(escape(js_base64_1.encode(encodedKey)));
        return token;
    }
    throw Error("`secretKey` cannot be null.");
}
exports.generateToken = generateToken;
/**
 * Check if number is float
 *
 * @param {number} num
 */
function isFloat(num) {
    return typeof num === "number" && !Number.isInteger(num);
}
exports.isFloat = isFloat;
/**
 * Validates user input based on type.
 *
 * @param {string}           key
 * @param {string | number}  value
 * @param {string}           type
 */
function validate(key, value, type) {
    if (type == typeof value) {
        if (value) {
            return value;
        }
        else {
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
exports.validate = validate;
/**
 * Maps keys of basis for validation over user input.
 *
 * @param {Object}  payload
 * @param {Object}  basis
 */
function getValidatedPayload(payload, basis) {
    let validatedPayload = {};
    if (typeof payload === 'object') {
        Object.keys(basis).forEach((key) => {
            let basisKey = basis[key];
            let isKeyRequired = basisKey['required'];
            let basisType = basisKey['type'];
            if (isKeyRequired) {
                if (key in payload) {
                    validatedPayload[key] = validate(key, payload[key], basisType);
                }
                else {
                    throw Error(`'${key}' is required.`);
                }
            }
            else {
                if (key in payload && payload[key] !== '') {
                    validatedPayload[key] = validate(key, payload[key], basisType);
                }
                else {
                    if ('default' in basis[key]) {
                        validatedPayload[key] = basisKey['default'];
                    }
                    else {
                        validatedPayload[key] = '';
                    }
                }
            }
        });
        return validatedPayload;
    }
    else {
        throw Error("'payload' must be an object");
    }
}
exports.getValidatedPayload = getValidatedPayload;
