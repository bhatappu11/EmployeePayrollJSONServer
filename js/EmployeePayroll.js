let employeeArray = [];

class EmployeePayrollData {

    //constructor
    constructor(...params) {
        this.name = params[0];
        this.salary = params[1];
        this.gender = params[2];
        this.startDate = params[3];
        this.departments = params[4];
        this.notes = params[5];
    }
    //getter and setter
    get name() { return this._name; }
    set name(name) {
        this._name = name;
    }
    get salary() { return this._salary; }
    set salary(salary) {
        this._salary = salary;
    }
    get gender() { return this._gender; }
    set gender(gender) {
        this._gender = gender;
    }
    get startDate() { return this._startDate; }
    set startDate(startDate) {
        this._startDate = startDate; 
    }
    get departments() { return this._departments}
    set departments(departments){
        this._departments = departments;
    }
    get notes() { return this._notes}
    set notes(notes) {
        this._notes = notes;
    }

    //method
    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = this.startDate == undefined ? "undefined" :
        this.startDate.toLocaleDateString("en-us", options);
        return "name="+ this.name +", salary="+ this.salary+", gender="+ this.gender+", start date="+ employeeDate+", department="+this.departments+", notes="+this.notes;
    }
}

function save(){
    const name = document.querySelector("#name");
    let departments = new Array();
    let markedCheckbox = document.getElementsByName('department');  
    for (var checkbox of markedCheckbox) {  
      if (checkbox.checked)  
        departments.push(checkbox.value);  
    } 
    let markedRadioButton = document.getElementsByName('gender');
    let gender;
    for (var radiobutton of markedRadioButton) {  
        if (radiobutton.checked)  
          gender = radiobutton.value;  
    }
    const salary = document.getElementById("salary");
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');
    const date = new Date(day.value+"/"+month.value+"/"+year.value);
    const notes = document.querySelector('#notes'); 

    employeeArray.push(new EmployeePayrollData(name.value,salary.value,gender,date,departments,notes.value));

    alert("Saved successfully: "+employeeArray);
}
