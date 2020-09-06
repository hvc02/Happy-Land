/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    var productName = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var category = req.body.category;

    await Product.create({
      name: productName,
      price: price,
      image: image,
      category: category,
    });
    //put a success message in session
    req.session.success = "Product successfully added.";

    res.redirect("/products");
  },
};
