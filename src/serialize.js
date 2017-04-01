import sass from 'node-sass';
import { toColorHex } from './util';
import parseColor from 'parse-color';

function serializeColor(sassColor) {
  if(sassColor.getA() !== 1) {
    return `rgba(${sassColor.getR()},${sassColor.getG()},${sassColor.getB()},${sassColor.getA()})`;
  } else {
    const hex = `#${toColorHex(sassValue.getR())}${toColorHex(sassValue.getG())}${toColorHex(sassValue.getB())}`;
    const parsedColor = parseColor(hex);
    if(parsedColor.keyword != null) {
      return parsedColor.keyword;
    } else {
      return hex;
    }
  }
}

/**
 * Transform a SassValue into a serialized string
 */
function serializeValue(sassValue) {
  switch(sassValue.constructor) {
    case sass.types.String:
    case sass.types.Boolean:
      return `${sassValue.getValue()}`;

    case sass.types.Number:
      return `${sassValue.getValue()}${sassValue.getUnit()}`;

    case sass.types.Color:
      return serializeColor(sassValue);

    case sass.types.Null: 
      return `null`;

    case sass.types.List:
      const listLength = sassValue.getLength();
      const listElement = [];
      for(let i = 0; i < listLength; i++) {
        listElement.push(serialize(sassValue.getValue(i)));
      }
      return `[${listElement.join(',')}]`;

    case sass.types.Map:
      const mapLength = sassValue.getLength();
      const mapValue = {};
      for(let i = 0; i < mapLength; i++) {
        const key = serialize(sassValue.getKey(i));
        const value = serialize(sassValue.getValue(i));
        mapValue[key] = value;
      }
      const serializedMapValues = Object.keys(mapValue).map(key => `${key}:${mapValue[key]}`);
      return `{${serializedMapValues}}`;

    default:
      throw new Error(`Unsupported sass variable type '${sassValue.constructor.name}'`)
  };
};

/**
 * Create a serialized string from a sassValue object
 */
export function serialize(sassValue) {
  return serializeValue(sassValue);
};
