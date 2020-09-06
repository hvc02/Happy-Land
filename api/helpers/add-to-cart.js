module.exports = {
  friendlyName: "Add to cart",

  description: "This helper creates a cart and adds the first product to it",

  inputs: {
    productId: {
      type: "string",
      required: true,
    },

    productQty: {
      type: "number",
      required: true,
    },
  },

  fn: async function (inputs, exits) {
    //find the product
    var product = await Product.findOne({ id: inputs.productId });

    //create the cart scaffolding
    var cart = {
      items: {},
      totalQty: inputs.productQty,
      totalPrice: product.price,
    };

    //push the first product in the cart

    cart.items["item" + product.id] = {
      qty: inputs.productQty,
      product: product,
    };
    // All done.
    return exits.success(cart);
  },
};
