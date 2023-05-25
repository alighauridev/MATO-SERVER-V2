//model imports
import User from '../models/user.js';
import Product from "../models/product.js";
import Order from  "../models/order.js";



//-------------- common pipelines reuseable ---------------------
// pagination pipeline
const paginationPipeline = (cursor = null, limit = 10) => {
  if (cursor) {
    return [
      {
        $match: {
          _id: { $lt: cursor },
        },
      },
      {
        $limit: limit,
      },
    ];
  }
  return [
    {
      $limit: limit,
    },
  ];
};

//------------------ common pagination and filter reuseable -----------------
const paginationAndFilter = (page, limit ,sort_by) => {
  
  let pagination = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 10,
  };

  let sort = {
    createdAt: -1,
  };

  if (sort_by === "title-accending") {
    sort = {
      title: 1,
    };
  } else if (sort_by === "title-decending") {
    sort = {
      title: -1,
    };
  } else if (sort_by === "price-accending") {
    sort = {
      price: 1,
    };
  } else if (sort_by === "price-decending") {
    sort = {
      price: -1,
    };
  } else if (sort_by === "date-accending") {
    sort = {
      createdAt: 1,
    };
  }
  return { pagination, sort };
};

//remove strings
const removeUserString =
  "-password -isDeleted -__v -authType -emailVerified -admin";

const removeProductString = "-isDeleted -__v";

const removeTableString = '-__v -createdAt -updatedAt';


//---------- reusable functions --------------------------------
const userById = async (userId) => {
  try {
    let user = await User.findById(userId).select(removeUserString);
    return user;
  } catch (err) {
    return err;
  }
};

const productById = async (productId) => {
  try {
    let product = await Product.findById(productId).select(removeProductString);
    return product;
  } catch (err) {
    return err;
  }
};


const orderById = async (orderId) => {
  try{
    let order = await Order.findById(orderId).select("-__v")
    return order

  } catch(err) {
    return err;
  }
}



export {
    paginationPipeline,
    paginationAndFilter,
    userById,
    productById,
    removeUserString,
    removeProductString,
    removeTableString,
    orderById,
}
