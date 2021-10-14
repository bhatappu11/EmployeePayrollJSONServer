window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch(e){
            textError.textContent = e;
        }
    });

    const startDateError = document.querySelector('.date-error');
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
            startDateError.textContent = "";
        } catch(e) {
            startDateError.textContent = e;
        }
    }
    const salary = document.querySelector('#salary');
    const output  = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
    output.textContent = salary.value;
    });

 
});


