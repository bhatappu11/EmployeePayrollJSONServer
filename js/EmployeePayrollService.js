const save = () => {
    try{
        let employeePayrollData = createEmployeePayroll();
    }catch(e){
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    const textError = document.querySelector('.text-error');
    try{
        employeePayrollData.name = getInputValueById('#name');
    } catch(e){
        textError.textContent = e;
        throw e;
    }

    employeePayrollData.profilePic = getSelectedValues('[name=profile').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.departments = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.notes = getInputValueById('#notes');
    const dateError = document.querySelector('.date-error');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    try {
        employeePayrollData.startDate = new Date(date);
    } catch(e){
        dateError.textContent = e;
        throw e;
    }
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item => {
        if(item.checked) selectedItems.push(item.value);
    });
    return selectedItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}