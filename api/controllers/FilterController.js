/**
 * FilterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  filterByCategory: async function (req, res) {
    const category = req.body.category;

    const result = await Product.find({
      category: category,
    });
    if (result.length < 1) {
      return res.send(
        `Products with category: ${category} are not found in the database `
      );
    }
    res.status(200).send(result);
    // res.redirect("/products");
  },

  filterByName: async function (req, res) {
    const name = req.body.name;

    const result = await Product.find({
      name: name,
    });
    if (result.length < 1) {
      return res.send(
        `Products with name: ${name} are not found in the database `
      );
    }
    res.status(200).send(result);
    // res.redirect("/products");
  },
};
