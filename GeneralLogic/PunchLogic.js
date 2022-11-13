
function payrollCalculator(){
  payrollData.employeeData.forEach((employee, i) => {
    var employeeFinal = employeeTimeCard(employee, i)
  });
  //testJobRates();//TODO make assertEquals to values for faster testing
}
//Main Functions
const jobRates = (job, hours, totalHours) =>{//takes in the job and the hours and returns an obj holding the wage pay and the benefit pay
  const hourSum = hours + totalHours;
  let wageObj = {wageRate: 0 ,benefitRate: 0, regularHours: 0,overtimeHours: 0, doubletimeHours: 0};
  switch(job){
    case 'Hospital - Painter':
    wageObj.benefitRate = payrollData.jobMeta[0].benefitsRate * hours;
    if(totalHours >= 48){//if total hours already equal double time no calculation just give double time
      wageObj.doubletimeHours = hours;
      wageObj.wageRate =  hours * payrollData.jobMeta[0].rate * 2.0;
    }
    else if(hourSum >=48){// if the summed hours put it into overtime calculate amount earned at double time and add it to amount earned for overTime
      wageObj.doubletimeHours = hourSum - 48;
      wageObj.overtimeHours = hours - (hourSum - 48)
      wageObj.wageRate = (wageObj.doubletimeHours * (payrollData.jobMeta[0].rate * 2.0)) + (wageObj.overtimeHours * payrollData.jobMeta[0].rate * 1.5)
    }
    else if(hourSum >= 40){//if the summed hours is in overtime
      if(totalHours >= 40){//if the summed hours are in overtime and the total hours already reached overtime just pay out at overtime rate
        wageObj.overtimeHours = hours;
        wageObj.wageRate =  hours * payrollData.jobMeta[0].rate * 1.5;
      }
      else{//if these hours put us into overtime give the adjusted rate for each
        wageObj.overtimeHours = hourSum - 40;
        wageObj.regularHours = hours - (hourSum - 40);
        wageObj.wageRate = (wageObj.overtimeHours * (payrollData.jobMeta[0].rate * 1.5)) + (wageObj.regularHours * payrollData.jobMeta[0].rate)
      }
    }
    else {//if the sum of the hours dont put you into overtme just pay them the regular wages
      wageObj.wageRate =  hours * payrollData.jobMeta[0].rate;
      wageObj.regularHours = hours;
    }
    return wageObj;
    break;
    case 'Hospital - Laborer':
    wageObj.benefitRate = payrollData.jobMeta[1].benefitsRate * hours;
    if(totalHours >= 48){//if total hours already equal double time no calculation just give double time
      wageObj.doubletimeHours = hours;
      wageObj.wageRate =  hours * payrollData.jobMeta[1].rate * 2.0;
    }
    else if(hourSum >=48){// if the summed hours put it into overtime calculate amount earned at double time and add it to amount earned for overTime
      wageObj.doubletimeHours = hourSum - 48;
      wageObj.overtimeHours = hours - (hourSum - 48)
      wageObj.wageRate = (wageObj.doubletimeHours * (payrollData.jobMeta[1].rate * 2.0)) + (wageObj.overtimeHours * payrollData.jobMeta[1].rate * 1.5)
    }
    else if(hourSum >= 40){//if the summed hours is in overtime
      if(totalHours >= 40){//if the summed hours are in overtime and the total hours already reached overtime just pay out at overtime rate
        wageObj.overtimeHours = hours;
        wageObj.wageRate =  hours * payrollData.jobMeta[1].rate * 1.5;
      }
      else{//if these hours put us into overtime give the adjusted rate for each
        wageObj.overtimeHours = hourSum - 40;
        wageObj.regularHours = hours - (hourSum - 40);
        wageObj.wageRate = (wageObj.overtimeHours * (payrollData.jobMeta[1].rate * 1.5)) + (wageObj.regularHours * payrollData.jobMeta[1].rate)
      }
    }
    else {//if the sum of the hours dont put you into overtme just pay them the regular wages
      wageObj.wageRate =  hours * payrollData.jobMeta[1].rate;
      wageObj.regularHours = hours;
    }
    //console.log("Laborer: wage " + wageObj.wageRate +"benefit "+ wageObj.benefitRate);
    return wageObj;
    break;
    case 'Shop - Laborer':
    wageObj.benefitRate = payrollData.jobMeta[2].benefitsRate * hours;
    if(totalHours >= 48){//if total hours already equal double time no calculation just give double time
      wageObj.doubletimeHours = hours;
      wageObj.wageRate =  hours * payrollData.jobMeta[2].rate * 2.0;
    }
    else if(hourSum >=48){// if the summed hours put it into overtime calculate amount earned at double time and add it to amount earned for overTime
      wageObj.doubletimeHours = hourSum - 48;
      wageObj.overtimeHours = hours - (hourSum - 48)
      wageObj.wageRate = (wageObj.doubletimeHours * (payrollData.jobMeta[2].rate * 2.0)) + (wageObj.overtimeHours * payrollData.jobMeta[2].rate * 1.5)
    }
    else if(hourSum >= 40){//if the summed hours is in overtime
      if(totalHours >= 40){//if the summed hours are in overtime and the total hours already reached overtime just pay out at overtime rate
        wageObj.overtimeHours = hours;
        wageObj.wageRate =  hours * payrollData.jobMeta[2].rate * 1.5;
      }
      else{//if these hours put us into overtime give the adjusted rate for each
        wageObj.overtimeHours = hourSum - 40;
        wageObj.regularHours = hours - (hourSum - 40);
        wageObj.wageRate = (wageObj.overtimeHours * (payrollData.jobMeta[2].rate * 1.5)) + (wageObj.regularHours * payrollData.jobMeta[2].rate)
      }
    }
    else {//if the sum of the hours dont put you into overtme just pay them the regular wages
      wageObj.wageRate =  hours * payrollData.jobMeta[2].rate;
      wageObj.regularHours = hours;
    }


    //console.log("S-Laborer: wage " + wageObj.wageRate +"benefit "+ wageObj.benefitRate);\
    return wageObj;
    break;
  }

}
function employeeTimeCard(employee, index){
  let employeeTotals = {employee: employee.employee, regular: 0, overtime: 0, doubletime: 0, wageTotal: 0, benefitTotal: 0}
  employee.timePunch.forEach((timePunch, i) => {
    let timePunchObj = {job: timePunch.job, hours: punchHours(timePunch.start, timePunch.end), totalHours: employeeTotals.regular + employeeTotals.overtime}
    let tempRates = jobRates(timePunchObj.job, timePunchObj.hours,timePunchObj.totalHours);

    employeeTotals.wageTotal += tempRates.wageRate;
    employeeTotals.benefitTotal += tempRates.benefitRate
    employeeTotals.regular += tempRates.regularHours
    employeeTotals.overtime += tempRates.overtimeHours
    employeeTotals.doubletime += tempRates.doubletimeHours
  });

  console.log(roundValues(employeeTotals))
  return roundValues(employeeTotals);

}
//Helper Functions
const roundValues = (completedEmployee) =>{
  completedEmployee.wageTotal = Math.round(completedEmployee.wageTotal*10000) / 10000;
  completedEmployee.benefitTotal = Math.round(completedEmployee.benefitTotal*10000) / 10000;
  completedEmployee.regular = Math.round(completedEmployee.regular*10000)/ 10000;
  completedEmployee.overtime = Math.round(completedEmployee.overtime*10000)/ 10000;
  completedEmployee.doubletime = Math.round(completedEmployee.doubletime*10000)/ 10000;
  return completedEmployee;
}
const punchHours = (start, end) =>{
  var hours = Math.abs(Date.parse(end) - Date.parse(start))/ 36e5
  return hours;
}
const testJobRates=()=>{
  console.log("H-P")
  console.log(jobRates("Hospital - Painter", 5, 48));//312.5
  console.log(jobRates("Hospital - Painter", 5, 45));//265.625
  console.log(jobRates("Hospital - Painter", 5, 38));//203.125
  console.log(jobRates("Hospital - Painter", 5, 30));//156.25

  console.log("H-L")
  console.log(jobRates("Hospital - Laborer", 5, 48));//200
  console.log(jobRates("Hospital - Laborer", 5, 45));//170
  console.log(jobRates("Hospital - Laborer", 5, 38));//130
  console.log(jobRates("Hospital - Laborer", 5, 30));//100

    console.log("S-L")
  console.log(jobRates("Shop - Laborer", 5, 48));//162.5
  console.log(jobRates("Shop - Laborer", 5, 45));//138.125
  console.log(jobRates("Shop - Laborer", 5, 38));//105.625
  console.log(jobRates("Shop - Laborer", 5, 30));//81.25
}
//JSON Data
let payrollData =
{
  "jobMeta": [
    {
      "job": "Hospital - Painter",
      "rate": 31.25,
      "benefitsRate": 1
    },
    {
      "job": "Hospital - Laborer",
      "rate": 20.0,
      "benefitsRate": 0.5
    },
    {
      "job": "Shop - Laborer",
      "rate": 16.25,
      "benefitsRate": 1.25
    }
  ],
  "employeeData": [
    {
      "employee": "Mike",
      "timePunch": [
        {
          "job": "Hospital - Laborer",
          "start": "2022-02-18 09:00:01",
          "end": "2022-02-18 11:28:54"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-18 12:29:33",
          "end": "2022-02-18 14:00:59"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-19 08:16:51",
          "end": "2022-02-19 10:00:11"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-19 11:11:06",
          "end": "2022-02-19 12:00:14"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-19 13:22:13",
          "end": "2022-02-19 17:16:32"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-20 06:50:12",
          "end": "2022-02-20 11:21:11"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-20 13:01:11",
          "end": "2022-02-20 17:52:45"
        },
        {
          "job": "Hospital - Laborer",
          "start": "2022-02-21 07:08:11",
          "end": "2022-02-21 12:22:33"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-21 13:15:10",
          "end": "2022-02-21 17:58:06"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-22 07:11:59",
          "end": "2022-02-22 11:00:01"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-22 12:16:54",
          "end": "2022-02-22 17:59:03"
        }
      ]
    },
    {
      "employee": "Steve",
      "timePunch": [
        {
          "job": "Hospital - Painter",
          "start": "2022-02-18 06:02:35",
          "end": "2022-02-18 11:28:54"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-18 12:31:06",
          "end": "2022-02-18 15:00:11"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-19 07:03:41",
          "end": "2022-02-19 10:00:45"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-19 10:24:58",
          "end": "2022-02-19 12:00:19"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-19 13:22:13",
          "end": "2022-02-19 17:16:32"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-20 05:56:00",
          "end": "2022-02-20 11:33:23"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-20 12:18:45",
          "end": "2022-02-20 17:48:41"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-21 06:02:28",
          "end": "2022-02-21 12:22:19"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-21 13:04:01",
          "end": "2022-02-21 17:52:06"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-22 06:00:58",
          "end": "2022-02-22 11:02:55"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-22 12:18:04",
          "end": "2022-02-22 17:48:41"
        }
      ]
    },
    {
      "employee": "Alex",
      "timePunch": [
        {
          "job": "Shop - Laborer",
          "start": "2022-02-18 06:05:55",
          "end": "2022-02-18 11:18:14"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-18 11:30:09",
          "end": "2022-02-18 14:00:01"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-19 07:18:22",
          "end": "2022-02-19 11:07:45"
        },
        {
          "job": "Hospital - Laborer",
          "start": "2022-02-19 12:04:18",
          "end": "2022-02-19 14:00:19"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-20 06:06:00",
          "end": "2022-02-20 10:13:23"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-20 12:18:45",
          "end": "2022-02-20 16:58:21"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-21 06:08:08",
          "end": "2022-02-21 12:20:55"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-21 12:54:30",
          "end": "2022-02-21 16:45:20"
        },
        {
          "job": "Hospital - Laborer",
          "start": "2022-02-22 06:09:14",
          "end": "2022-02-22 11:30:11"
        },
        {
          "job": "Hospital - Laborer",
          "start": "2022-02-22 12:00:29",
          "end": "2022-02-22 17:59:55"
        }
      ]
    }
  ]
}
