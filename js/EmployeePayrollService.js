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
            checkName(name.value);
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
            checkStartDate(startDate);
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
    //document.querySelector('#cancelButton').href = site_properties.home_page;
    checkForUpdate();

 
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        if(site_properties.use_local_storage.match("true")){
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
          }
          else {
            createOrUpdateEmployeePayroll();
          }
    }
    catch(e){
        console.log(e);
        return;
    }
  }
  const createOrUpdateEmployeePayroll = () => {
    let postUrl = site_properties.server_url;
    let methodCall = "POST";
    if(isUpdate) {
      methodCall = "PUT";
      postUrl = postUrl + employeePayrollObj.id.toString();
    }
    makeServiceCall(methodCall, postUrl, true, employeePayrollObj)
        .then(responceText => {
          resetForm();
          window.location.replace(site_properties.home_page);
        })
        .catch(error => {
          throw error;
        });
  }
  
  const setEmployeePayrollObject = () => {
    if(!isUpdate ) employeePayrollObj.id = createNewEmployeeId();
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._departments = getSelectedValues('[name=department]');
    employeePayrollObj._salary =  getInputValueById('#salary');
    employeePayrollObj._notes = getInputValueById('#notes');
    let date = getInputValueById('#day')+ " "+ getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollObj._startDate = date;
    console.log(employeePayrollObj);
  }
  
  const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
      let empPayrollData = employeePayrollList.find(empData => empData.id == employeePayrollObj.id);
      if(!empPayrollData) {
        employeePayrollList.push(employeePayrollObj);
      }
      else {
        const index = employeePayrollList.map(empData => empData.id)
                                         .indexOf(empPayrollData.id);
        employeePayrollList.splice(index, 1, createEmployeePayrollData(employeePayrollObj));
      }
    }
    else{
      employeePayrollList = [employeePayrollObj];
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
  }
  
  /*const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
  }
  
  const setEmployeePayrollData = (employeePayrollData) => {
    const textError = document.querySelector('.text-error');
    try{
        employeePayrollData.name = employeePayrollObj._name;
    }
    catch (e) {
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.departments = employeePayrollObj._departments;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.notes = employeePayrollObj._notes;
    const startDateError = document.querySelector('.date-error');
    try {
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    }   
    catch(e){
        setTextValue('.date-error',e);
        throw e;
    }
    alert(employeePayrollData.toString());
  }*/
  
  const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeId");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeId",empID);
    return empID;
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