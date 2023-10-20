const { User, Branch, Position, Employee, sequelize } = require("../models");
const { QueryTypes, Op } = require("sequelize");
const { comparePasswords } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { fullName, email, password, phoneNumber, address, npk } = req.body;

      const user = await User.create({
        fullName,
        email,
        password,
        phoneNumber,
        address,
        npk,
      });

      res.status(201).json({ message: `User with id ${user.id} is created` });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "badRequest", message: "Email cannot be empty" };
      }

      if (!password) {
        throw { name: "badRequest", message: "Password cannot be empty" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "unauthenticated", message: "Invalid email" };
      }

      const validPass = comparePasswords(password, user.password);
      console.log(validPass);

      if (!validPass) {
        throw { name: "unauthenticated", message: "Invalid password" };
      }

      const access_token = createToken({ id: user.id });
      // console.log(access_token);
      res.status(200).json({ access_token, fullName: user.fullName });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async showAllEmployees(req, res, next) {
    try {
      // let { page, filter, search } = req.query;

      let employees = await Employee.findAll({
        include: [User, Branch, Position],
        order: [["id", "ASC"]],
        // where: {
        //   fullName: { [Op.iLike]: `%${search}%` },
        // },
      });

      employees = employees.map((employee) => {
        const today = new Date();
        const endContractDate = new Date(employee.endContractDate);
        const timeDiff = endContractDate - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysDiff <= 60) {
          employee.employeeStatus = "Warning";
        }

        return employee;
      });

      // if (page) {
      //   const limit = 8;
      //   const offset = (page - 1) * limit;
      //   employees = employees.slice(offset, offset + limit);
      // }

      // if (filter) {
      //   employees = employees.filter(
      //     (employee) => employee.BranchId === parseInt(filter)
      //   );
      // }
      // console.log("Filtered Employees:", employees);

      res.status(200).json(employees);
    } catch (error) {
      next(error);
    }
  }

  static async showOneEmployee(req, res, next) {
    try {
      const { id } = req.params;

      const employee = await Employee.findByPk(id, {
        include: [User, Branch, Position],
      });

      if (!employee) {
        throw { name: "employeeNotFound" };
      }

      res.status(200).json(employee);
    } catch (error) {
      // console.log(error, '<<<<<<')
      next(error);
    }
  }

  static async addEmployee(req, res, next) {
    // console.log(req.body);
    try {
      const {
        fullName,
        email,
        BranchId,
        JobId,
        startContractDate,
        endContractDate,
      } = req.body;

      const branch = await Branch.findByPk(BranchId);
      const job = await Position.findByPk(JobId);

      if (!branch) {
        throw { name: "branchNotFound", error: "Branch not found" };
      }
      if (!job) {
        throw { name: "positionNotFound", error: "Position not found" };
      }

      const newEmployee = await Employee.create({
        fullName,
        email,
        UserId: req.user.id,
        BranchId,
        JobId,
        startContractDate,
        endContractDate,
      });

      res.status(201).json({
        message: `Employee with id ${newEmployee.id} has been created`,
        newEmployee,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async showAllBranches(req, res, next) {
    try {
      const branches = await Branch.findAll();

      res.status(200).json(branches);
    } catch (error) {
      next(error);
    }
  }

  static async showAllPositions(req, res, next) {
    try {
      const positions = await Position.findAll();

      res.status(200).json(positions);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOneEmployee(req, res, next) {
    try {
      await Employee.destroy({ where: { id: req.params.id } });

      res.status(200).json({
        message: `Employee with id ${req.params.id} deleted succesfully.`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateEmployee(req, res, next) {
    try {
      const { id } = req.params;
      const {
        fullName,
        email,
        BranchId,
        JobId,
        startContractDate,
        endContractDate,
      } = req.body;
      const employee = await Employee.findByPk(id);

      if (!employee) {
        throw { name: "employeeNotFound" };
      }

      employee.fullName = fullName;
      employee.email = email;
      employee.BranchId = BranchId;
      employee.JobId = JobId;
      employee.startContractDate = startContractDate;
      employee.endContractDate = endContractDate;

      await employee.save();

      let updatedEmployee = await Employee.findByPk(id);

      res.status(200).json({
        message: "Employee updated successfully",
        updatedEmployee,
      });
    } catch (error) {
      next(error); // 404 & 403
    }
  }

  static async checkExpiringContracts(req, res, next) {
    try {
      const query = `
        SELECT *
        FROM "Employees"
        WHERE "endContractDate" < CURRENT_DATE + interval '60 days';
      `;

      const results = await sequelize.query(query, { type: QueryTypes.SELECT });

      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;