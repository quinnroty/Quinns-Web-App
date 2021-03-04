let x=0
let y=0
function ajaxGetRequest(path, callback){
  let request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (this.readyState===4&&this.status ===200){
      callback(this.response);
    }
  };
  request.open("GET", path);
  request.send();
}
function ajaxPostRequest(path, data, callback){
  let request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (this.readyState===4&&this.status ===200){
      callback(this.response);
    }
  };
  request.open("POST", path);
  request.send(data)
}

function showGraph(){
  if (y==1){
    let percentagelist = []
    let totalgrade = 0
    if (x==1){
      for (let vals of filteredWritGrades){
        totalgrade=totalgrade+vals
      }
      for (let vals of filteredWritGrades){
        percentagelist.push((vals / totalgrade)*100)
      }
    }
    if (x==2){
      for (let vals of filteredMathGrades){
        totalgrade=totalgrade+vals
      }
      for (let vals of filteredMathGrades){
        percentagelist.push((vals / totalgrade)*100)
      }
    }
    if (x==3){
      for (let vals of filteredReadGrades){
        totalgrade=totalgrade+vals
      }
      for (let vals of filteredReadGrades){
        percentagelist.push((vals / totalgrade)*100)
      }
    }
    console.log(percentagelist)
  let data = [{
    values: percentagelist,
    labels: ["0-199","200-399","400-599","600-800"],
    type: 'pie'
  }];
  let layout = {
    height: 400,
    width: 500
  };
  Plotly.newPlot('visualization',data,layout)
  }
  if (y==2){
    gradecount = []
    if (x==1){
      let data = [{
      x:['0-199','200-399','400-599','600-800'],
      y:filteredWritGrades,
      type: 'bar'}];
      Plotly.newPlot('visualization', data);
      console.log(data) 
    }
    if(x==2){
      let data = [{
      x:['0-199','200-399','400-599','600-800'],
      y:filteredMathGrades,
      type: 'bar'}];
     Plotly.newPlot('visualization', data); 
    }
    if(x==3){
      let data = [{
      x:['0-199','200-399','400-599','600-800'],
      y:filteredReadGrades,
      type: 'bar'}];
      Plotly.newPlot('visualization', data); 
      gradecount = filteredReadGrades
    }
  }
}


function renderGrades(response){
  let listMathGrades = []
  let listReadGrades = []
  let listWritGrades = []
  let filteredMathGrades = []
  let filteredReadGrades = []
  let filteredWritGrades = []
  let dicOfAllGrades = JSON.parse(response);
  for (let mthgrades of dicOfAllGrades["Mathematics"]){
    listMathGrades.push(mthgrades)
  }
  for (let readgrades of dicOfAllGrades["Critical Reading"]){
    listReadGrades.push(readgrades)
  }
  for (let writgrades of dicOfAllGrades["Writing"]){
    listWritGrades.push(writgrades)
  }
  filterMathGrades(listMathGrades);
  filterReadGrades(listReadGrades);
  filterWritGrades(listWritGrades);
  showGraph();
  console.log(filteredWritGrades)
  console.log(listWritGrades)
}




function requestGrades(){
  ajaxGetRequest("AllGrades",renderGrades)
}


//FilterFuncs
filteredReadGrades=[]
function filterReadGrades(list){
  let read199 = 0
  let read399 = 0
  let read599 = 0
  let read800 = 0
  for (let values of list){
    if (Number(values)<200){
        read199=read199+1
      }
    if (Number(values)<400 && Number(values)>=200){
       read399=read399+1
    }
    if (Number(values)>=400&&Number(values)<600){
        read599=read599+1
    }
    if (Number(values)>=600){
        read800=read800+1
    }
  }
  filteredReadGrades.push(read199)
  filteredReadGrades.push(read399)
  filteredReadGrades.push(read599)
  filteredReadGrades.push(read800) 
}

  


let filteredMathGrades = [];
function filterMathGrades(list){
  let mth199 = 0
  let mth399 = 0
  let mth599 = 0
  let mth800 = 0
  for (let values of list){
    if (Number(values)<200){
      mth199=mth199+1
    }
    if (Number(values)<400 && Number(values)>=200){
      mth399=mth399+1
    }
    if (Number(values)>=400&&Number(values)<600){
      mth599=mth599+1
    }
    if (Number(values)>=600){
      mth800=mth800+1
    }
  }
filteredMathGrades.push(mth199)
filteredMathGrades.push(mth399)
filteredMathGrades.push(mth599)
filteredMathGrades.push(mth800)
}

let filteredWritGrades = []
function filterWritGrades(list){
  let writ199 = 0
  let writ399 = 0
  let writ599 = 0
  let writ800 = 0
  for (let values of list){
    if (Number(values)<200){
      writ199=writ199+1
    }
    if (Number(values)<400 && Number(values)>=200){
      writ399=writ399+1
    }
    if (Number(values)>=400&&Number(values)<600){
      writ599=writ599+1
    }
    if (Number(values)>=600){
      writ800=writ800+1
    }
  }
  filteredWritGrades.push(writ199)
  filteredWritGrades.push(writ399)
  filteredWritGrades.push(writ599)
  filteredWritGrades.push(writ800)
}









//

function writing(){
  x=1
  let myDiv = document.getElementById("section");
  myDiv.innerHTML="Writing selected."
}
function mathematics(){
  x=2
  let myDiv=document.getElementById("section");
  myDiv.innerHTML="Mathematics selected."
}

function criticalReading(){
  x=3
  let myDiv=document.getElementById("section");
  myDiv.innerHTML="Critical Reading selected."
}




function pieGraph(){
  y = 1
  let myDiv = document.getElementById("whichfilter");
  myDiv.innerHTML = "Pie Graph selected."
}

function barGraph(){
  y = 2
  let myDiv = document.getElementById("whichfilter");
  myDiv.innerHTML = "Bar Graph selected.";
}

function getData(){
  ajaxGetRequest('https://newnewproj--quinnroty.repl.co/AllGrades',renderGrades)
}

//console.log(requestGrades())