// Create an Employee Object template
function Employee(name, age, department, salary) {
    this.name = name;
    this.age = age;
    this.department = department;
    this.salary = salary;
}

// Calculate Average Salary
function calculateAverageSalary(employees) {
    if (employees.length === 0) {
        return 0;
    }

    const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0);
    return totalSalary / employees.length;
}

// Find Employees in a Department
function findEmployeesByDepartment(employees, targetDepartment) {
    return employees.filter(employee => employee.department === targetDepartment);
}

// Increase Salary for Employees
function increaseSalary(employees, percentageIncrease) {
    return employees.map(employee => {
        employee.salary *= (1 + percentageIncrease / 100);
        return employee;
    });
}

// Sort Employees by Age
function sortEmployeesByAge(employees) {
    return employees.slice().sort((a, b) => a.age - b.age);
}

// Example usage:
const employees = [
    new Employee("John", 30, "IT", 50000),
    new Employee("Jane", 25, "HR", 45000),
    new Employee("Bob", 35, "Finance", 60000)
];

console.log("Average Salary:", calculateAverageSalary(employees));
console.log("Employees in HR Department:", findEmployeesByDepartment(employees, "HR"));
console.log("Increased Salaries:", increaseSalary(employees, 10));
console.log("Sorted Employees by Age:", sortEmployeesByAge(employees));
