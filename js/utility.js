const stringifyDate = (date) => {
    const options = { day: 'numeric',month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" :
                    new Date(Date.parse(date)).toLocaleDateString('en-GB',options);
    return newDate;
}

const update = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData._id == node.id);
    if(!employeePayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(employeePayrollData))
    window.location.replace(site_properties.add_emp_payroll_page);
}

const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if(!nameRegex.test(name)) throw 'Name is Incorrect!';
}

const checkStartDate = (startDate) => {
    if(startDate >= new Date())
        throw 'Start Date can not be a future date';
    let days = Math.abs(startDate - new Date())/(1000*60*60*24);
    if(days > 30)
        throw 'Start Date is beyond 30 days';
}