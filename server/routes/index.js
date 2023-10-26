const express = require("express");
const router = express.Router();
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandlers");

router.get("/", function (req, res) {
  res.status(200).json({ message: "Hello World" });
});

router.post("/register", Controller.register);
router.post("/login", Controller.login);

// middleware
router.use(authentication); //proses ini wajib dilewati

router.get("/employees", Controller.showAllEmployees);
router.post("/employees", Controller.addEmployee);
router.get("/employees/:id", Controller.showOneEmployee);

router.get("/branches", Controller.showAllBranches);
router.get("/positions", Controller.showAllPositions);

router.put("/employees/:id", Controller.updateEmployee);
router.patch("/employees/:id", Controller.updateEmployeeStatus);
router.delete("/employees/:id", Controller.deleteOneEmployee);

router.get("/check-expiring-contracts", Controller.checkExpiringContracts);

router.use(errorHandler);

module.exports = router;
