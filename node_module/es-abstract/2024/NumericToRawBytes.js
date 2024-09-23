'use strict';

var $TypeError = require('es-errors/type');

var hasOwnProperty = require('./HasOwnProperty');
var ToBigInt64 = require('./ToBigInt64');
var ToBigUint64 = require('./ToBigUint64');
var ToInt16 = require('./ToInt16');
var ToInt32 = require('./ToInt32');
var ToInt8 = require('./ToInt8');
var ToUint16 = require('./ToUint16');
var ToUint32 = require('./ToUint32');
var ToUint8 = require('./ToUint8');
var ToUint8Clamp = require('./ToUint8Clamp');

var valueToFloat32Bytes = require('../helpers/valueToFloat32Bytes');
var valueToFloat64Bytes = require('../helpers/valueToFloat64Bytes');
var integerToNBytes = require('../helpers/integerToNBytes');

var keys = require('object-keys');

// https://262.ecma-international.org/15.0/#table-the-typedarray-constructors
var TypeToSizes = {
	__proto__: null,
	INT8: 1,
	UINT8: 1,
	UINT8C: 1,
	INT16: 2,
	UINT16: 2,
	INT32: 4,
	UINT32: 4,
	BIGINT64: 8,
	BIGUINT64: 8,
	FLOAT32: 4,
	FLOAT64: 8
};

var TypeToAO = {
	__proto__: null,
	INT8: ToInt8,
	UINT8: ToUint8,
	UINT8C: ToUint8Clamp,
	INT16: ToInt16,
	UINT16: ToUint16,
	INT32: ToInt32,
	UINT32: ToUint32,
	BIGINT64: ToBigInt64,
	BIGUINT64: ToBigUint64
};

// https://262.ecma-international.org/15.0/#sec-numerictorawbytes

module.exports = function NumericToRawBytes(type, value, isLittleEndian) {
	if (typeof type !== 'string' || !hasOwnProperty(TypeToSizes, type)) {
		throw new $TypeError('Assertion failed: `type` must be a TypedArray element type: ' + keys(TypeToSizes));
	}
	if (typeof value !== 'number' && typeof value !== 'bigint') {
		throw new $TypeError('Assertion failed: `value` must be a Number or a BigInt');
	}
	if (typeof isLittleEndian !== 'boolean') {
		throw new $TypeError('Assertion failed: `isLittleEndian` must be a Boolean');
	}

	if (type === 'FLOAT32') { // step 1
		return valueToFloat32Bytes(value, isLittleEndian);
	} else if (type === 'FLOAT64') { // step 2
		return valueToFloat64Bytes(value, isLittleEndian);
	} // step 3

	var n = TypeToSizes[type]; // step 3.a

	var convOp = TypeToAO[type]; // step 3.b

	var intValue = convOp(value); // step 3.c

	return integerToNBytes(intValue, n, isLittleEndian); // step 3.d, 3.e, 4
};
