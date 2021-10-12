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
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if(nameRegex.test(name))
            this._name = name;
        else throw 'Name is Incorrect';
    }
    get salary() { return this._salary; }
    set salary(salary) {
        let salaryRegex = RegExp('^[1-9][0-9]*$');
        if(salaryRegex.test(salary))
            this._salary = salary;
        else throw 'Salary is Incorrect';
    }
    get gender() { return this._gender; }
    set gender(gender) {
        let genderRegex = RegExp('(^M$)|(^F$)');
        if(genderRegex.test(gender))
            this._gender = gender;
        else throw 'gender must be either M or F';
    }
    get startDate() { return this._startDate; }
    set startDate(startDate) {
        var priorDate = new Date();
        priorDate.setDate(priorDate.getDate() - 30)
        if(new Date() >= startDate && startDate >= priorDate) 
            this._startDate = startDate;
        else throw 'Invalid date it can not be a future date and should be within 30 days of joining'; 
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
        return "name="+ this.name +", salary="+ this.salary+", gender="+ this.gender+", start date="+ employeeDate+", department="+this.departments+", notes="+this.notes+"\n";
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
    try{
        employeeArray.push(new EmployeePayrollData(name.value,salary.value,gender,date,departments,notes.value));
        alert("Saved successfully: "+employeeArray);
    }catch(e){
        alert("error:"+e);
    }
}
