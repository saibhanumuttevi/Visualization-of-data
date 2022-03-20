datasource="../static/media/Sample data set.csv";
let colid;
let colnm;
let colnum;
let selcol;
let selrow;

Dropdown();

async function Dropdown(){
  let main=await mainData();
  let datapoint=await getData(main.rows);
  let option="";
  for(var i=-1;i<datapoint.colnames.length;i++){
      option+='<option value="'+datapoint.colnames[i]+'">'+datapoint.colnames[i]+'</option>'
  }
  document.getElementById('column').innerHTML=option
}

async function fname(x){
  let main=await mainData();
  let datapoint=await getData(main.rows);
  for (let i = 0; i < datapoint.colnames.length+1; i++) {
    if (datapoint.colnames[i]==x) {
      colid=i
    }
  }
  colnum=colid
  colnm=datapoint.colname[colid]
  colid=datapoint.colUnique[colid];
  Dropdown1(colid)
}

async function Dropdown1(x){
  let option1="";
  let innerText='Select Column';
  for(var i=-1;i<x.length;i++){
      option1+='<option value="'+x[i]+'">'+x[i]+'</option>'
  }  
  document.getElementById('column1').innerHTML=option1
}

function getSelectedrow(x){
  var sel=document.getElementById(x).value;
  selrow=sel;
  drawChart1(sel);
}

function getSelectedcolumn(x){
  var sel=document.getElementById(x).value;
  selcol=sel
  fname(sel)
}

function reset(){
  $('#chartc').empty();
  document.getElementById('chartc').innerHTML='<div id="chart" class="shadow-lg p-2 m-2 bg-body rounded-3" ></div>'
}

//chart
async function drawChart1(x){
  let main=await mainData();
  let newrows1=[];
  let rand=[]
  main.rows.forEach(row=>{
    const column=row.split(',');
    column[column.length-1]=column[column.length-1].replace(/\r?\n|\r/g,"");
    if(column[colnum]==x){
      newrows1.push(row)
    }
  });
  if(newrows1.length==1){
    newrows1.forEach(row => {
      const column=row.split(',');
      rand=column[5]
    });
    let datapoint=await getData(newrows1);
    var options = {
      title: {
        text: 'Result',
        align: 'center',
      },
      subtitle:{
        text: selcol+':'+selrow,
      },
      chart: {
        type: 'pie'
      },
      series: [1],
      labels: [rand]
    } 
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }
  else{
    let datapoint=await getData(newrows1);
    
    var options = {
      title: {
        text: 'Result',
        align: 'center',
      },
      subtitle:{
        text: ['Total: '+newrows1.length,selcol+': '+selrow],
        style:{
          fontSize: '10px'
        },
      },
      chart: {
        type: 'pie'
      },
      series: datapoint.resultCounts,
      labels: datapoint.resultUnique
    } 
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }
}

//main data
async function mainData(){
  let response=await fetch(datasource);
  const data= await response.text();
  const rows = data.split('\n');
  return{rows};
}


//getting data
async function getData(df){   
  let names=df[0];
  let column=names.split(',');
  for (let i = 0; i < column.length; i++) {
    column[i]=column[i].replace(/\r?\n|\r/g, "");
  }

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

  let rows=df.slice(1);

  rows.forEach(x => {
    let column=[]
    column=x.split(',');
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
    testingyr[i]=testingyr[i].replace(/\r?\n|\r/g, "");
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
    array.forEach((v) => (v === value && count++));
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