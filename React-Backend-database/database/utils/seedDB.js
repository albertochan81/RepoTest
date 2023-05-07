const { Employee, Task } = require('../models');

const seedDB = async () => {
	const dummyEmployee = await Employee.create({
		firstname: "Melissa",
		lastname: "Lynch",
		department: "Computer Science"
	});
	const dummyEmployee2 = await Employee.create({
		firstname: "Kim",
		lastname: "Kardashian"
	});

	const dummyTask = await Task.create({
		description: "Sleeping",
        prioritylevel: "high",
        completionstatus: "incomplete"
	});

	await dummyTask.setEmployee(dummyEmployee);
	
}

module.exports = seedDB;