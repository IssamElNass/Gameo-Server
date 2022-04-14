import express from "express";
import controller from "../controllers/users";
const router = express.Router();

router.get("/users", controller.getUsers);
router.post("/user", controller.addNewUser);
// router.get("/posts/:id", controller.getPost);
// router.put("/posts/:id", controller.updatePost);
// router.delete("/posts/:id", controller.deletePost);
export = router;
