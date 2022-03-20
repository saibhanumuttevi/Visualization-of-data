datasource="../static/media/Sample data set.csv";

let c1=[];
let c2=[];
let c3=[];
let c4=[];
let c5=[];
let c6=[];

drawChart()

//auto button creation
async function buttons(x,y,w,z){
  for (let i=0;i<x.length;i++) {
    const btn = document.createElement('button');
    btn.innerText=x[i];
    btn.className='p-2 m-3 btn btn-outline-primary btn-sm'
    btn.onclick = function(){reset(z),y(x[i])};
    document.getElementById(w).prepend(btn)
  }
}

function reset(x){
  for(i=x+1;i<7;i++){
    $('#c'+i).empty();
    $('#button'+i).empty();
    document.getElementById("c"+i).innerHTML='<div id="chart'+i+'" class="shadow-lg chart p-2 m-2 bg-body rounded-3"></div>'
  }
}

//main data
async function mainData(){
  let response=await fetch(datasource);
  const data= await response.text();
  const rows = data.split('\n').slice(1);
  return{rows};
}


//main chart
async function drawChart(){
    let main=await mainData();
    let datapoint=await getData(main.rows);
    var options = {
      title: {
        text: 'Result',
        align: 'center',
      },
      chart: {
        type: 'pie'
      },
      series: datapoint.resultCounts,
      labels: datapoint.resultUnique
    } 
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    buttons(datapoint.resultUnique,drawChart1,"button0",0);
}


//1st chart
async function drawChart1(x){
  let main=await mainData();
  c1=[]
  main.rows.forEach(row => {
      const column=row.split(',');
      if (column[5]==x) {
          c1.push(row);
      }
  });
  let datapoint=await getData(c1);
  var options = {
    title: {
      text: 'Subsystem Failed',
      align: 'center',
    },
    subtitle: {
      text: ['Total: '+c1.length,'Selected : '+x],
      style: {
        fontSize:  '10px',
      },
    },
    chart: {
      type: 'pie'
    },
    series: datapoint.sfailedCounts,
    labels: datapoint.sfailedUnique
  }
  var chart = new ApexCharts(document.querySelector("#chart1"), options);
  chart.render();
  buttons(datapoint.sfailedUnique,drawChart2,"button1",1)
}

//2nd chart
async function drawChart2(x){
  c2=[];
  c1.forEach(row => {
    const column=row.split(',');
    if(column[6]==x){
      c2.push(row);
    }
  });
  let datapoint=await getData(c2);

  var options={
    title: {
      text: 'Remarks',
      align: 'center',
    },
    subtitle: {
      text:['Total: '+c2.length,'Selected : '+x],
      style: {
        fontSize:  '10px',
      },
    },
    chart: {
      type: 'pie'
    },
    series: datapoint.remarksCounts,
    labels: datapoint.remarksUnique
  }
  var chart = new ApexCharts(document.querySelector('#chart2'),options);
  chart.render();
  buttons(datapoint.remarksUnique,drawChart3,"button2",2);

}

//3rd chart
async function drawChart3(x){
  c3=[]
  let rand=[];
  c2.forEach(row => {
    const column=row.split(',');
    if(column[9]==x){
      c3.push(row);
    }
  });
  if(c3.length==1){
    c3.forEach(row => {
      const column=row.split(',');
      rand=column[10]
    });
    var options={
      title: {
        text: 'Pre- Test',
        align: 'center',
      },
      subtitle: {
        text: ['Total: '+c3.length,'Selected : '+x],
        style: {
          fontSize:  '10px',
        },
      },
      chart: {
        type: 'pie'
      },
      series: [1],
      labels: [rand]
    }
    var chart = new ApexCharts(document.querySelector('#chart3'),options);
    chart.render();
    buttons([rand],drawChart4,"button3",3);
}
else{
  let datapoint=await getData(c3);
  var options={
    title: {
      text: 'Pre- Test',
      align: 'center',
    },
    subtitle: {
      text: ['Total: '+c3.length,'Selected : '+x],
      style: {
        fontSize:  '10px',
      },
    },
    chart: {
      type: 'pie'
    },
    series: datapoint.pretestCounts,
    labels: datapoint.pretestUnique
  }
  var chart = new ApexCharts(document.querySelector('#chart3'),options);
  chart.render();
  buttons(datapoint.pretestUnique,drawChart4,"button3",3);
  }
}

//4th chart
async function drawChart4(x){
  c4=[];
  let rand=[];
  c3.forEach(row => {
    const column=row.split(',');
    if(column[10]==x){
      c4.push(row);
    }
  });
  if(c4.length==1){
      c4.forEach(row => {
        const column=row.split(',');
        rand=column[4]
      });
      var options={
        title: {
          text: 'Location',
          align: 'center',
        },
        subtitle: {
          text: ['Total: '+c4.length,'Selected : '+x],
          style: {
            fontSize:  '10px',
          },
        },
        chart: {
          type: 'pie'
        },
        series: [1],
        labels: [rand]
      }
      var chart = new ApexCharts(document.querySelector('#chart4'),options);
      chart.render();
      buttons([rand],drawChart5,"button4",4);
  }
  else{
    let datapoint=await getData(c4);
    var options={
      title: {
        text: 'Location',
        align: 'center',
      },
      subtitle: {
        text: ['Total: '+c4.length,'Selected : '+x],
        style: {
          fontSize:  '10px',
        },
      },
      chart: {
        type: 'pie'
      },
      series: datapoint.locationCounts,
      labels: datapoint.locationUnique
    }
    var chart = new ApexCharts(document.querySelector('#chart4'),options);
    chart.render();
    buttons(datapoint.locationUnique,drawChart5,"button4",4);
  }
}


//5th chart
async function drawChart5(x){
  c5=[];
  let rand=[]
  c4.forEach(row => {
    const column=row.split(',');
    if(column[4]==x){
      c5.push(row);
    }
  });
  if(c5.length==1){
    c5.forEach(row => {
      const column=row.split(',');
      rand=column[3]
    });
    var options={
      title: {
        text: 'Target',
        align: 'center',
      },
      subtitle: {
        text: ['Total: '+c5.length,'Selected : '+x],
        style: {
          fontSize:  '10px',
        },
      },
      chart: {
        type: 'pie'
      },
      series: [1],
      labels: [rand]
    }
    var chart = new ApexCharts(document.querySelector('#chart5'),options);
    chart.render();
    buttons([rand],drawChart6,"button5",5);
  }
  else{
    let datapoint=await getData(c5);
    var options={
      title: {
        text: 'Target',
        align: 'center',
      },
      subtitle: {
        text: ['Total: '+c5.length,'Selected : '+x],
        style: {
          fontSize:  '10px',
        },
      },
      chart: {
        type: 'pie'
      },
      series: datapoint.targetCounts,
      labels: datapoint.targetUnique
    }
    var chart = new ApexCharts(document.querySelector('#chart5'),options);
    chart.render();
    buttons(datapoint.targetUnique,drawChart6,"button5",5);
  }
}


//6th chart
async function drawChart6(x){
  c6=[];
  let rand=[];
  c5.forEach(row => {
    const column=row.split(',');
    if(column[3]==x){
      c6.push(row);
    }
  });
  if(c6.length==1){
    c6.forEach(row => {
      const column=row.split(',');
      rand=column[2]
    });
    var options={
      title: {
        text: 'User',
        align: 'center',
      },
      subtitle: {
        text: ['Total: '+c6.length,'Selected : '+x],
        style: {
          fontSize:  '10px',
        },
      },
      chart: {
        type: 'pie'
      },
      series: [1],
      labels: [rand]
    }
    var chart = new ApexCharts(document.querySelector('#chart6'),options);
    chart.render();
  }
  else{
    let datapoint=await getData(c6);
    var options={
      title: {
        text: 'User',
        align: 'center',
      },
      subtitle: {
        text: ['Total: '+c6.length,'Selected : '+x],
        style: {
          fontSize:  '10px',
        },
      },
      chart: {
        type: 'pie'
      },
      series: datapoint.userCounts,
      labels: datapoint.userUnique
    }
    var chart = new ApexCharts(document.querySelector('#chart6'),options);
    chart.render();
  }
}



//getting data
async function getData(df){ 
  let names=df[0];
  let column=names.split(',');
  let msdName=column[0];
  let setName=column[1];
  let userName=column[2];
  let targetName=column[3];
  let locationName=column[4];
  let resultName=column[5];
  let sfailedName=column[6];
  let deliveryName=column[7];
  let manufactureName=column[8];
  let remarksName=column[9];
  let pretestName=column[10];
  let testingyrName=column[11];

  let colnames=[msdName,setName,userName,targetName,locationName,resultName,sfailedName,deliveryName,manufactureName,remarksName,pretestName,testingyrName];
  let colname=['msd','set','user','target','location','result','sfailed','delivery','manufacture','remarks','pretest','testingyr'];

  let msd=[];
  let set=[];
  let user=[];
  let target=[];
  let location=[];
  let result=[];
  let sfailed=[];
  let delivery=[];
  let manufacture=[];
  let remarks=[];
  let pretest=[];
  let testingyr=[];

  

  df.forEach(x => {
    const column=x.split(',');
    msd.push(column[0]);
    set.push(column[1]);
    user.push(column[2]);
    target.push(column[3]);
    location.push(column[4]);
    result.push(column[5]);
    sfailed.push(column[6]);
    delivery.push(column[7]);
    manufacture.push(column[8]);
    remarks.push(column[9]);
    pretest.push(column[10]);
    testingyr.push(column[11]);
  });

  if(msd[msd.length-1]==""){
  msd.pop();
  set.pop();
  user.pop();
  target.pop();
  location.pop();
  result.pop();
  sfailed.pop();
  delivery.pop();
  manufacture.pop();
  remarks.pop();
  pretest.pop();
  testingyr.pop();
  }
  

  for (let i = 0; i < testingyr.length; i++) {
    testingyr[i]=testingyr[i].replace(/\r?\n|\r/g,"");
  }
  

  let msdUnique=[...new Set(msd)];
  let setUnique=[...new Set(set)];
  let userUnique=[...new Set(user)];
  let targetUnique=[...new Set(target)];
  let locationUnique=[...new Set(location)];
  let resultUnique=[...new Set(result)];
  let sfailedUnique=[...new Set(sfailed)];
  let deliveryUnique=[...new Set(delivery)];
  let manufactureUnique=[...new Set(manufacture)];
  let remarksUnique=[...new Set(remarks)];
  let pretestUnique=[...new Set(pretest)];
  let testingyrUnique=[...new Set(testingyr)];

  let colUnique=[msdUnique,setUnique,userUnique,targetUnique,locationUnique,resultUnique,sfailedUnique,deliveryUnique,manufactureUnique,remarksUnique,pretestUnique,testingyrUnique];

  let msdCounts=[];
  let setCounts=[];
  let userCounts=[];
  let targetCounts=[];
  let locationCounts=[];
  let resultCounts=[];
  let sfailedCounts=[];
  let deliveryCounts=[];
  let manufactureCounts=[];
  let remarksCounts=[];
  let pretestCounts=[];
  let testingyrCounts=[];


  let counts=[];
  let a=[];
  function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v == value && count++));
    return count;
  }
  function count(x,y,z){
    for (let i = 0; i < y.length; i++) {
      a=getOccurrence(x,y[i]);
      z.push(a)
    }
  }

  count(msd,msdUnique,msdCounts);
  count(set,setUnique,setCounts);
  count(user,userUnique,userCounts);
  count(target,targetUnique,targetCounts);
  count(location,locationUnique,locationCounts);
  count(result,resultUnique,resultCounts);
  count(sfailed,sfailedUnique,sfailedCounts);
  count(delivery,deliveryUnique,deliveryCounts);
  count(manufacture,manufactureUnique,manufactureCounts);
  count(remarks,remarksUnique,remarksCounts)
  count(pretest,pretestUnique,pretestCounts);
  count(testingyr,testingyrUnique,testingyrCounts);

  let colCounts=[msdCounts,setCounts,userCounts,targetCounts,locationCounts,resultCounts,sfailedCounts,deliveryCounts,manufactureCounts,remarksCounts,pretestCounts,testingyrCounts]

  return{
    colnames,colname,colUnique,colCounts,
    msd,set,user,target,location,result,sfailed,delivery,manufacture,remarks,pretest,testingyr,
    msdUnique,setUnique,userUnique,targetUnique,locationUnique,resultUnique,sfailedUnique,deliveryUnique,manufactureUnique,remarksUnique,pretestUnique,testingyrUnique,
    msdCounts,setCounts,userCounts,targetCounts,locationCounts,resultCounts,sfailedCounts,deliveryCounts,manufactureCounts,remarksCounts,pretestCounts,testingyrCounts,
    msdName,setName,userName,targetName,locationName,resultName,sfailedName,deliveryName,manufactureName,remarksName,pretestName,testingyrName,
  };
}