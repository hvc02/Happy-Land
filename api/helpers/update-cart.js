module.exports = {
  friendlyName: "Update cart",

  description: "This helper updates a cart already in session",

  inputs: {
    req: {
      type: "ref",
      required: true,
    },
  },

  fn: async function (inputs, exits) {
    //check if there is a qty in the request parameters
    //if there is, use it, if there isn't, default to 1

    if (inputs.req.param("qty") != undefined && inputs.req.param("qty") >= 1) {
      //set the quantity to the request param qty
      var qty = inputs.req.param("qty");
    } else if (inputs.req.body != undefined) {
      var qty = parseInt(inputs.req.body.quantity);
    } else {
      //default to 1
      var qty = 1;
    }

    //check if the request came as post or as a param
    if (inputs.req.param("id")) {
      //find the product
      var product = await Product.findOne({ id: inputs.req.param("id") });
    }

    if (inputs.req.body != undefined) {
      //find the product
      var product = await Product.findOne({ id: inputs.req.body.productId });
    }

    //get the current cart
    var currentCart = inputs.req.session.cart;

    //check if the product is in the current cart
    if ("item" + product.id in currentCart.items) {
      var productid = "item" + product.id;

      //get previous qty & price
      oldQty = currentCart.items[productid].qty;
      oldPrice =
        currentCart.items[productid].qty *
        currentCart.items[productid].product.price;

      //set the new cart
      var updatedCart = currentCart;

      //update the quantity
      updatedCart.items[productid].qty = qty;

      //reset total price and qty
      updatedCart.totalQty = updatedCart.totalQty - oldQty;
      updatedCart.totalPrice = updatedCart.totalPrice - oldPrice;

      //update the total price and qty
      updatedCart.totalQty = +updatedCart.totalQty + qty;
      updatedCart.totalPrice =
        updatedCart.totalPrice +
        updatedCart.items[productid].product.price * qty;
    } else {
      //push the new item to the current cart
      currentCart.items["item" + inputs.req.param("id")] = {
        qty: qty,
        product: product,
      };

      //update the total qty and total price
      currentCart.totalQty = currentCart.totalQty + qty;
      currentCart.totalPrice = currentCart.totalPrice + product.price * qty;

      var updatedCart = currentCart;
    }
    inputs.req.session.success = `${currentCart.totalQty} products added. Go to cart to see the updated price `;

    // All done. Return the updated cart.
    return exits.success(updatedCart);
  },
};
