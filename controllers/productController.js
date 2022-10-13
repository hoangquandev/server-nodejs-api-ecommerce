import Product from "../models/product";

const productController = {
  // create new product
  createNewProduct: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      return res.status(200).json(savedProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // Get all products with Search
  getAllProductWithSearch: async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 });
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = Product.find();
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productController;

// import formidable from "formidable";
// import fs from "fs";

// export const createProduct = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Image cannot be uploaded!",
//       });
//     }
//     const { name, description, price } = fields;
//     if (!name || !description || !price) {
//       return res.status(400).json({
//         error: "bạn cần nhập đầy đủ thông tin!",
//       });
//     }
//     let product = new Product(fields);
//     if (files.photo) {
//       if (files.photo.size > 300000) {
//         res.status(400).json({
//           error: "Bạn nên upload ảnh dưới 2MB!",
//         });
//       }
//       product.photo.data = fs.readFileSync(files.photo.filepath);
//       product.photo.contentType = files.photo.filepath;
//     }
//     product.save((err, data) => {
//       if (err) {
//         res.status(400).json({
//           error: " Không thêm được sản phẩm",
//         });
//       }
//       res.json(data);
//     });
//   });
// };

// export const list = (req, res) => {
//   return res.json({
//     message: "successfully",
//   });
// };

// export const productById = (req, res, next, id) => {
//   Product.findById(id).exec((err, product) => {
//     if (err || !product) {
//       return res.status(400).json({
//         error: " Không tìm thấy sản phẩm!",
//       });
//     }
//     req.product = product;
//     next();
//   });
// };
// export const read = (req, res) => {
//   return res.json(req.product);
// };

// export const remove = (req, res) => {
//   let product = req.product;
//   product.remove((err, deletedProduct) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Không xóa được sản phẩm",
//       });
//     }
//     res.json({
//       deletedProduct,
//       message: "Sản phẩm đã được xóa thành công!",
//     });
//   });
// };
