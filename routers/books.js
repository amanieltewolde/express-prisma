import { destroy, index, show, store, update } from "../controllers/bookcontroller.js";
import express from "express";

const router = express.Router();

// URL da usare '/books'
router.use(express.json());

// INDEX
router.get('/', index);

// SHOW
router.get('/:id', show);

// STORE
router.post('/', store);

// UPDATE
router.patch('/:id', update);

// DESTROY
router.delete('/:id', destroy);

export default router;