import express from "express";

import {
    addOrderItems,
    GetMyOrders,
    GetOrderById,
    updateOrderToPaid,
    updateOrderToDelivred,
    getOrders
} from "../controllers/orderController.js";

import {protect,admin} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route("/").post(protect,addOrderItems).get(protect,admin,getOrders);
router.route("/mine").get(protect,GetMyOrders);
router.route("/:id").get(protect,GetOrderById);
router.route("/:id/pay").put(protect,updateOrderToPaid);
router.route("/:id/deliver").put(protect,admin,updateOrderToDelivred);




export default router;
