let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input',function(){
        if(name.value.length == 0){
            setTextValue('.text-error',"");
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            setTextValue('.text-error',"");
        } catch(e){
            setTextValue('.text-error',e);
        }
    });

    const date  = document.querySelector('#day');
    const month  = document.querySelector('#month');
    const year  = document.querySelector('#year');
    date.addEventListener("change",validateDate);
    month.addEventListener("change",validateDate);
    year.addEventListener("change",validateDate);

    function validateDate() {
        let startDate = Date.parse(year.value + "-" + month.value + "-" + date.value);
        try{
            (new EmployeePayrollData()).startDate = startDate;
            setTextValue('.date-error',"");
        } catch(e) {
            setTextValue('.date-error',e);
        }
    }
    const salary = document.querySelector('#salary');
    const output  = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
    output.textContent = salary.value;
    });

    checkForUpdate();

 
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch(e){
        return;
    }
}
const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._departments = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._notes = getInputValueById('#notes');
    let date = getInputValueById('#year')+"-"+getInputValueById('#month')+"-"+getInputValueById('#day');
    employeePayrollObj._startDate = date;
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList = [employeePayrollData]
    }
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
    employeePayrollData.id = new Date().getTime();
    const dateError = document.querySelector('.date-error');
    let date = getInputValueById('#year')+"-"+getInputValueById('#month')+"-"+getInputValueById('#day');
    try {
        employeePayrollData.startDate =new Date(date);
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
    setValue('#salary','400000');
    const output  = document.querySelector('.salary-output');
    output.textContent = salary.value;
    setValue('#notes','');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
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

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._departments);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}