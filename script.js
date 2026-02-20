// AUTH
function login() {
  const name = document.getElementById("usernameInput").value;
  if(name){
    localStorage.setItem("user", name);
    startApp();
  }
}

function logout(){
  localStorage.clear();
  location.reload();
}

function startApp(){
  document.getElementById("authScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("welcomeUser").textContent =
    "Welcome, " + localStorage.getItem("user");
}

if(localStorage.getItem("user")) startApp();

// DARK MODE
function toggleDark(){
  document.body.classList.toggle("dark");
}

// TASKS
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(){
  const input = document.getElementById("taskInput");
  if(input.value){
    tasks.push(input.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    input.value="";
  }
}

function renderTasks(){
  const list = document.getElementById("taskList");
  list.innerHTML="";
  tasks.forEach((task,index)=>{
    const li=document.createElement("li");
    li.innerHTML=task + 
    ` <button onclick="deleteTask(${index})">X</button>`;
    list.appendChild(li);
  });
}

function deleteTask(i){
  tasks.splice(i,1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();

// TIMER
let time=1500, running=false, interval;

function updateTimer(){
  const m=Math.floor(time/60);
  const s=time%60;
  document.getElementById("timer").textContent=
  (m<10?"0":"")+m+":"+(s<10?"0":"")+s;
}

function startTimer(){
  if(!running){
    running=true;
    interval=setInterval(()=>{
      if(time>0){
        time--;
        updateTimer();
      }else{
        clearInterval(interval);
        running=false;
        alert("Session Done!");
      }
    },1000);
  }
}

function resetTimer(){
  clearInterval(interval);
  running=false;
  time=1500;
  updateTimer();
}
updateTimer();

// GOALS
function addGoal(){
  const name=document.getElementById("goalInput").value;
  const progress=document.getElementById("goalProgress").value;

  if(name && progress){
    const div=document.createElement("div");
    div.innerHTML=
      `<strong>${name}</strong>
       <div style="background:#ddd;border-radius:10px;">
         <div style="width:${progress}%;background:#8b5cf6;height:12px;border-radius:10px;"></div>
       </div>
       <small>${progress}%</small>`;
    document.getElementById("goalList").appendChild(div);
  }
}

// MOOD TRACKING
let moodData=[0,0,0]; // happy, focused, stressed

function setMood(type){
  if(type==="Happy") moodData[0]++;
  if(type==="Focused") moodData[1]++;
  if(type==="Stressed") moodData[2]++;
  moodChart.update();
}

const ctx=document.getElementById("moodChart");
const moodChart=new Chart(ctx,{
  type:"bar",
  data:{
    labels:["Happy","Focused","Stressed"],
    datasets:[{
      label:"Mood Count",
      data:moodData,
      backgroundColor:["#34d399","#60a5fa","#f87171"]
    }]
  }
});