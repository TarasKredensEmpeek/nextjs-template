import isObject from 'lodash/isObject';

const deCapitalizeProperties = <O = unknown>(o: O): O => {
  if (!o) {
    return o;
  }

  if (Array.isArray(o)) {
    return o.map(deCapitalizeProperties) as unknown as O;
  }

  if (isObject(o)) {
    return Object.fromEntries(
      Object.entries(o).map(([k, v]) => {
        const newKey = k.charAt(0).toLowerCase() + k.substring(1);
        const value = deCapitalizeProperties(v);

        return [newKey, value];
      }),
    ) as O;
  }

  return o;
};

export default deCapitalizeProperties;
