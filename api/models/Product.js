/**
 * Product.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
    },

    category: {
      type: "string",
    },

    price: {
      type: "number",
      required: true,
    },

    image: {
      type: "string",
    },
  },
};