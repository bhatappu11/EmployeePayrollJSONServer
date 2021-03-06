class EmployeePayrollData {

    //getter and setter
    id;
    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
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
    get profilePic(){return this._profilePic;}
    set profilePic(profilePic){
        this._profilePic = profilePic;
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
        if(startDate >= new Date())
            throw 'Start Date can not be a future date';
        let days = Math.abs(startDate - new Date())/(1000*60*60*24);
        if(days > 30)
            throw 'Start Date is beyond 30 days';
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
        return "id= "+this.id+", name="+ this.name +", ProfilePic="+ this.profilePic+", salary="+ this.salary+", gender="+ this.gender+", start date="+ employeeDate+", department="+this.departments+", notes="+this.notes+"\n";
    }
}

