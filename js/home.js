let employeePayrollList;
window.addEventListener('DOMContentLoaded',(event) => {
    employeePayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
            JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    if(employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    //let empPayrollList = createEmployeePayrollJSON();
    for(const employeePayrollData of employeePayrollList) {
        innerHtml = `${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${employeePayrollData._profilePic}" alt=""></td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${getDeptHtml(employeePayrollData._departments)}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${stringifyDate(employeePayrollData._startDate)}</td>
            <td>
                <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete"
                    src="../assets/icons/delete-black-18dp.svg">
                <img name="${employeePayrollData._id}" alt="edit" onclick="update(this)"
                    src="../assets//icons/create-black-18dp.svg">
            </td>
        </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}