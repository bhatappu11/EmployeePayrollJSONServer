const save = () => {
    try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }catch(e){
        return;
    }
}
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
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
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        item.checked = false;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}