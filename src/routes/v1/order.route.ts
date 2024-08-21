import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
// import { orderController, orderValidation } from '../../modules/order';
import { orderController, orderValidation } from '../../modules/order';

const router: Router = express.Router();

router
    .route('/')
    .post(auth('manageOrder'), validate(orderValidation.createOrder), orderController.createOrder)
    .get(auth('getOrders'), validate(orderValidation.getOrders), orderController.getOrders);

router
    .route('/:orderId')
    .get(auth('getOrders'), validate(orderValidation.getOrder), orderController.getOrder)
    .patch(auth('manageSellers'), validate(orderValidation.updateOrder), orderController.updateOrder)
    .delete(auth('manageSellers'), validate(orderValidation.deleteOrder), orderController.deleteOrder);

// router.post('/pay', auth(), validate(orderValidation.login), orderController.pay);

// router.post('/order-webhook', auth(), validate(orderValidation.login), orderController['order-webhook']);

export default router;
