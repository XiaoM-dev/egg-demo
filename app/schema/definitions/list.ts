export default {
  type: 'object',
  properties: {
    page: {
      type: 'number',
      default: 1,
    },
    size: {
      type: 'number',
      default: 10,
    },
  },
  required: [ 'page', 'size' ],
  additionalProperties: false,
};