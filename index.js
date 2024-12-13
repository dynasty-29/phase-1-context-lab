/* Your Code Here */
// 1. createEmployeeRecord
// Argument(s) // A 4-element Array of a String, String, String, and Number 
// Returns JS Object with keys: firstName, familyName, title ,payPerHour, timeInEvents, timeOutEvents, Behavior
// initialize empty Arrays on the properties timeInEvents and timeOutEvents.
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// createEmployeeRecords
// Argument(s)  Array of Arrays
// Returns  Array of Objects
// Behavior converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// createTimeInEvent
// Argument(s) A date stamp ("YYYY-MM-DD HHMM"), where time is expressed in 24-hour standardLinks to an external site.
// Returns  The record that was just updated
// Behavior Add an Object with keys: type: Set to "TimeIn",hour: Derived from the argument,  date: Derived from the argument
function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

// createTimeOutEvent
// Argument(s) A date stamp ("YYYY-MM-DD HHMM"), where time is expressed in 24-hour standardLinks to an external site.
// Returns The record that was just updated
// Behavior  Add an Object with keys:,type: Set to "TimeOut",  hour: Derived from the argument,  date: Derived from the argument
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}
// hoursWorkedOnDate
// Argument(s)  A date of the form "YYYY-MM-DD"
// Returns Hours worked, an Integer
// Behavior Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(employeeRecord, date) {
    validateTimeEntries(employeeRecord, date);
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}


// wagesEarnedOnDate
// Argument(s)  A date of the form "YYYY-MM-DD"
// Returns Pay owed
// Behavior Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. 
// Amount should be returned as a number.
function wagesEarnedOnDate(employeeRecord, date) {
    const hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
}


// allWagesFor
// Argument(s) None
// Returns Sum of pay owed to one employee for all dates, as a number
// Behavior Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. 
// Amount should be returned as a number. HINT: You will need to find the available dates somehow....
function allWagesFors(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
}


// findEmployeeByFirstName
// Argument(s)  srcArray: Array of employee records,  firstName
// Returns Matching record or undefined
// Behavior Test the firstName field for a match with the firstName argument
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

// calculatePayroll
// Argument(s)  Array of employee records
// Returns Sum of pay owed for all employees for all dates, as a number
// Behavior  Using allWagesFor for each of the employees, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

