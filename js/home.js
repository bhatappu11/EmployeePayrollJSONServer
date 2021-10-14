window.addEventListener('DOMContentLoaded',(event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let employeePayrollData = createEmployeePayrollJSON()[0];
    const innerHtml = `${headerHtml}
        <tr>
            <td><img class="profile" alt="" src="${employeePayrollData._profilePic}" alt=""></td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td><div class="dept-label">${employeePayrollData._department[0]}</div>
                <div class="dept-label">${employeePayrollData._department[1]}</div>
            </td>
            <td>${employeePayrollData._salary}</td>
            <td>${employeePayrollData._startDate}</td>
            <td>
                <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete"
                    src="../assets/icons/delete-black-18dp.svg">
                <img name="${employeePayrollData._id}" alt="edit" onclick="update(this)"
                    src="../assets//icons/create-black-18dp.svg">
            </td>
        </tr>
    `;
    document.querySelector('#table-display').innerHTML = innerHtml;
}
const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Sheshadri Bhat',
            _gender: 'Male',
            _department: [
                'HR',
                'Finance'
            ],
            _salary: '500000',
            _startDate: '11 Oct 2021',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -2.png'
        },
        {
            _name: 'Smitha Naveen',
            _gender: 'Female',
            _department: [
                'Finance'
            ],
            _salary: '400000',
            _startDate: '3 Oct 2021',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/profile-images/Ellipse -4.png'
        }
    ];
    return empPayrollListLocal;
}