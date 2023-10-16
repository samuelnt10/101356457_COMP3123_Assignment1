const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ status: true, employees });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to get employees', error: error.message });
    }
};

exports.createEmployee = async (req, res) => {
    const { first_name, last_name, email, gender, salary } = req.body;

    try {
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            gender,
            salary,
        });

        const employee = await newEmployee.save();
        res.status(201).json({ status: true, employee });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to create employee', error: error.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json({ status: true, employee });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to get employee', error: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, {
            new: true,
        });
        if (!updatedEmployee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json({ status: true, employee: updatedEmployee });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to update employee', error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.query.eid);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to delete employee', error: error.message });
    }
};
