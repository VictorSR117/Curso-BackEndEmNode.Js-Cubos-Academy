const { Router } = require("express");
const multer = require('../services/multer');
const verifyLoggedUser = require("../middlewares/loginMiddleware");
const { validationBodyMiddleware, validationParamsMiddleware } = require("../middlewares/validation");
const { productSchema, productParamsIdSchema } = require("../validations/productSchema");
const {
    registerProduct,
    editProduct,
    listProducts,
    detailProduct,
    deleteProduct
} = require("../controllers/productController");

const productRouter = Router();

productRouter.post("/produto",
    verifyLoggedUser,
    multer.single('file'),
    validationBodyMiddleware(productSchema),
    registerProduct
);

productRouter.get('/produto',
    verifyLoggedUser,
    listProducts
);

productRouter.get("/produto/:id",
    verifyLoggedUser,
    validationParamsMiddleware(productParamsIdSchema),
    detailProduct
);

productRouter.put("/produto/:id",
    verifyLoggedUser,
    multer.single('file'),
    validationBodyMiddleware(productSchema),
    validationParamsMiddleware(productParamsIdSchema),
    editProduct
);

productRouter.delete("/produto/:id",
    verifyLoggedUser,
    validationParamsMiddleware(productParamsIdSchema),
    deleteProduct
);

module.exports = productRouter;
