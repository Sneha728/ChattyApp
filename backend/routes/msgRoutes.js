const express = require("express");
const  protectRoute  = require("../middlewares/authMiddleware");
const {getUsersForsidebar,getMessages,sendMessages} = require("../controllers/msgController");

const router = express.Router();


router.get("/users",protectRoute,getUsersForsidebar);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessages);

module.exports = router;