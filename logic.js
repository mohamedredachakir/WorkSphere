const btnadd = document.querySelector("#bntadd");
const addplace = document.querySelector("#addplace");
const modalform = document.querySelector("#modalform");
const addForm = document.querySelector("#add-form");
const btnannuler = document.querySelector("#btnannuler");
const btnexpr = document.querySelector("#btnexpr");

const username = document.querySelector("#username");
const userage = document.querySelector("#userage");
const usermail = document.querySelector("#usermail");
const usertel = document.querySelector("#usertel");
const userrole = document.querySelector("#userrole");
const userimg = document.querySelector("#userimg");
const userstart = document.querySelector("#userstart");
const userleave = document.querySelector("#userleave");
const btnsubmit = document.querySelector("#btnsubmit");

let allusers = JSON.parse(localStorage.getItem("allusers")) || [];

btnadd.addEventListener("click", () => {
  modalform.classList.remove("hidden");
  addForm.reset();
  addForm.querySelectorAll(".exprstart, .exprleave, .exprdis").forEach((Input) => Input.parentElement.remove());
});

btnannuler.addEventListener("click", () => {
  modalform.classList.add("hidden");
});


let nameRegex = /^[A-Za-z\s]+$/;
let ageRegex = /^(1[0-9]|[2-9][0-9])$/;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
let phoneRegex = /^[0-9]{10}$/;
let roleRegex = /^(Manager|Nettoyage|Techniciens IT|Agents de sécurité|Réceptionnistes|Autres rôles)$/;
// let imgUrlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
// let dateRegex = /^\d{4}-\d{2}-\d{2}$/;


btnsubmit.addEventListener("click", (e) => {
  e.preventDefault(); //stop reload page

  if (!nameRegex.test(username.value)) {
    alert("Name invalid");
    return;
  }

  if (!ageRegex.test(userage.value)) {
    alert("Age invalid");
    return;
  }

  if (!emailRegex.test(usermail.value)) {
    alert("Email invalid");
    return;
  }

  if (!phoneRegex.test(usertel.value)) {
    alert("Phone invalid");
    return;
  }

  if (!roleRegex.test(userrole.value)) {
    alert("Role invalid");
    return;
  }

  // if (!imgUrlRegex.test(userimg.value)) {
  //   alert("Image URL invalid");
  //   return;
  // }

  // if (!dateRegex.test(userstart.value)) {
  //   alert("Start date invalid");
  //   return;
  // }

  // if (!dateRegex.test(userleave.value)) {
  //   alert("Leave date invalid");
  //   return;
  // }

  let exprstart = document.querySelectorAll(".exprstart");
  let exprleave = document.querySelectorAll(".exprleave");
  let exprdis = document.querySelectorAll(".exprdis");
  let exp = [];
  exprleave.forEach((l, index) => {
    let ex = {
      start: exprstart[index].value,
      leave: l.value,
      dis: exprdis[index].value,
    };
    exp.push(ex);
  });
  let person = {
    id: Date.now(),
    name: username.value,
    age: userage.value,
    email: usermail.value,
    phone: usertel.value,
    role: userrole.value,
    img: userimg.value,
    start: userstart.value,
    leave: userleave.value,
    expr: exp,
  };

  allusers.push(person);
    localStorage.setItem("allusers", JSON.stringify(allusers));
    alert("add person");
    modalform.classList.add("hidden");
    addForm.reset();
    console.log(allusers);
    displayall();
    
});

btnexpr.addEventListener("click", (e) => {
  e.preventDefault();
  const cardexpr = document.createElement("div");
  cardexpr.className =
    "flex flex-col justify-center items-center gap-6 bg-white h-fit mx-2 rounded-md w-fit";
  cardexpr.innerHTML = `
                <h3>add experience </h3>
                <input  class="exprstart h-[30px] w-[300px] rounded-md pl-4 pb-1 text-gray-800 border border-gray-800" type="datetime-local" placeholder="start" />
                <input  class="exprleave h-[30px] w-[300px] rounded-md pl-4 pb-1 text-gray-800 border border-gray-800" type="datetime-local" placeholder="leave" />
                <input  class="exprdis h-[30px] w-[300px] rounded-md pl-4 pb-1 text-gray-800 border border-gray-800" type="text" placeholder="description" />
                 `;
  addForm.insertBefore(cardexpr, btnexpr.parentElement);
});

function displayall() {
  addplace.innerHTML = "";
  allusers.forEach((user, index) => {
    const card = document.createElement("div");
card.className ="flex justify-between items-center px-4 py-2 w-full bg-white/80 backdrop-blur-sm shadow-md border border-gray-300 rounded-xl hover:shadow-lg transition duration-200";

   card.innerHTML = `
   <div class="flex justify-evenly">
    <div class="flex flex-col w-[50%]">
        <p class="text-[15px] font-semibold text-gray-800">${user.name}</p>
    </div>

    <div class="flex justify-evenly gap-2 w-[50%]">
        <button class="deleteuser bg-red-600 text-white px-3 py-1 rounded-lg text-[12px] hover:bg-red-700 transition">Dlt</button>
        <button class="infouser bg-blue-500 text-white px-3 py-1 rounded-lg text-[12px] hover:bg-blue-600 transition">Inf</button>
    </div>
    </div>
`;

    addplace.appendChild(card);

    const deleteuser = card.querySelector(".deleteuser");
    deleteuser.addEventListener("click", () => {
      removeuser(index);
    });
    const infouser = card.querySelector(".infouser");
    infouser.addEventListener("click", () => {
      info(index);
    });
    
  });

}


function removeuser(user) {
    let index = allusers.findIndex(u => u.id === user.id)
    console.log(index);
    allusers.splice(index, 1);
    console.log(allusers);
    localStorage.setItem('allusers' , JSON.stringify(allusers));
    displayall()
}

const infoplace = document.querySelector('.infoplace');
function info(index){
    let user = allusers[index];
     const card = document.createElement('div');
    card.className = "bg-gray-300 border p-4 rounded-md shadow text-white flex flex-col gap-4 relative m-4 overflow-y-scroll";
    card.innerHTML = `
        <img class="rounded-md w-full h-[180px] object-cover" src="${user.img}">
        <h2 class="text-center text-[25px] font-bold">${user.name}</h2>

        <div class="flex flex-col gap-2">
            <p><strong>Age:</strong> ${user.age}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>start:</strong> ${user.start}</p>
            <p><strong>leave:</strong> ${user.leave}</p>
            </div>
            <div class="flex justify-center gap-5"><button class=" deleteuserfrominfo bg-red-700 rounded-md w-[60px] h-[50px]">delete</button>
            <button class="infouserclose bg-green-400 rounded-md w-[60px] h-[50px]">close</button></div>
        </div> `
    infoplace.appendChild(card);
    

    const deleteuserfrominfo = card.querySelector('.deleteuserfrominfo');
    deleteuserfrominfo.addEventListener('click' ,()=>{
        removeuser(index)
        card.classList.add('hidden');
        displayall();
    });
    const infouserclose = card.querySelector('.infouserclose');
    infouserclose.addEventListener('click',()=>{
        card.classList.add('hidden');
        displayall();
    })
}

const btnplaceReception = document.querySelector('#btnplaceReception');
const btnplaceconference = document.querySelector('#btnplaceconference');
const btnplacestaff = document.querySelector('#btnplacestaff');
const btnplaceserver = document.querySelector('#btnplaceserver');
const btnplacearchive = document.querySelector('#btnplacearchive');
const btnplacesecurite = document.querySelector('#btnplacesecurite');

let rec = 0;
let conf = 0;
let st = 0;
let ser = 0;
let ar = 0;
let sec = 0;

btnplaceReception.addEventListener('click', ()=>{
    rec++;
    if(rec == 4){
      alert("salle plaine");
    }else{displayroles('Réception')}
    
})

btnplaceconference.addEventListener('click', ()=>{
    conf++;
    if(conf == 3){
      alert("salle plaine");
    }else{displayroles('conference')}
    
})

btnplacestaff.addEventListener('click', ()=>{
    st++;
    if(st == 3){alert("salle plaine");}
    else{displayroles('staff')}
})

btnplaceserver.addEventListener('click', ()=>{
    ser++;
    if(ser == 2){alert("salle plaine");}
    else{displayroles('server')}
})

btnplacearchive.addEventListener('click', ()=>{
    ar++;
    if(ar == 1){alert("salle plaine");}
    else {displayroles('archive')}
})

btnplacesecurite.addEventListener('click', ()=>{
    sec++;
    if(sec == 1){alert("salle plaine");}
      else{displayroles('securite')}
})

function displayroles(room) {
    let  filtreusers = allusers.filter((e)=> {
        if(room === 'securite'){
            return e.role === "Agents de sécurité" ||  e.role ===  "Nettoyage" || e.role === "Manager"
        }
        if(room === 'Réception'){
            return e.role === "Réceptionnistes" || e.role === "Nettoyage" || e.role === "Manager" || e.role === "Autres rôles" || e.role === "Techniciens IT" || e.role === "Agents de sécurité"
        }
        if(room === 'conference'){
            return e.role === "Nettoyage" || e.role === "Manager" || e.role === "Techniciens IT"
        }
        if(room === 'staff'){
            return e.role === "Réceptionnistes" || e.role === "Nettoyage" || e.role === "Manager" || e.role === "Techniciens IT" || e.role ==="Agents de sécurité"
        }
        if(room === 'archive'){
            return e.role === "Manager" || e.role === "Agents de sécurité" 
        }
        if(room === 'server'){
            return e.role === "Nettoyage" || e.role === "Manager" || e.role === "Techniciens IT"
        }
    })

const salleplace = document.querySelector('.salleplace');

document.querySelectorAll(".user").forEach(user =>{
    user.remove();
})


filtreusers.forEach((user,index)=>{
        const card = document.createElement("div");
        card.className = "user bg-gray-300 border rounded-md shadow text-white flex justify-evenly items-center gap-4 relative m-4 h-[60px]";
        card.innerHTML = `
        <div class="w-[50%] flex flex-col justify-center items-center">
        <h2 class="text-center text-[17px] font-bold">${user.name}</h2>
         <p> ${user.role}</p></div>
         <div class="w-[50%] flex justify-evenly gap-3">
         <button class="deletemodalsalle bg-red-600 text-white px-3 py-1 rounded-lg text-[12px] hover:bg-red-700 transition">Dlt</button>
        <button class="addinthissalle bg-blue-500 text-white px-3 py-1 rounded-lg text-[12px] hover:bg-blue-600 transition">add</button></div>
        `;
        salleplace.appendChild(card);
        salleplace.classList.remove('hidden');

        const deletemodalsalle = card.querySelector(".deletemodalsalle");
        deletemodalsalle.addEventListener("click", () => {
        removeuser(user.id);
        filtreusers.splice(index,1);
        card.remove();
        });
        const addinthissalle = card.querySelector('.addinthissalle');
        addinthissalle.addEventListener('click',()=>{
            addtoplace(user,room);
            salleplace.classList.add("hidden");
        })
    })
    
    const closeSallePlace = document.querySelector('#closeSallePlace');
    closeSallePlace.addEventListener('click',()=>{
        salleplace.classList.add("hidden");
        salleplace.querySelectorAll(".user").forEach((user)=>{
            user.remove()
        })
    })

}

const Receptionplace = document.querySelector('#Receptionplace');
const serverplace = document.querySelector('#serverplace');
const securiteplace = document.querySelector('#securiteplace');
const staffplace = document.querySelector('#staffplace');
const archiveplace = document.querySelector('#archiveplace');
const conferenceplace =document.querySelector('#conferenceplace');


let Reception = JSON.parse(localStorage.getItem("Reception")) || [];
let server = JSON.parse(localStorage.getItem("server")) || [];
let securite = JSON.parse(localStorage.getItem("securite")) || [];
let staff = JSON.parse(localStorage.getItem("staff")) || [];
let archive = JSON.parse(localStorage.getItem("archive")) || [];
let conference = JSON.parse(localStorage.getItem("conference")) || [];


function addtoplace(user,room) {
    removeuser(user);
    if(room === 'securite'){
        securite.push(user);
        localStorage.setItem('securite',JSON.stringify(securite));
        rendersecurite();
    }
    if(room === 'Réception'){
        Reception.push(user);
        localStorage.setItem('Reception',JSON.stringify(Reception));
        renderreception();  
    }
    if(room === 'conference'){
        conference.push(user);
        localStorage.setItem('conference',JSON.stringify(conference));
        renderconfernce();
    }
    if(room === 'staff'){
        staff.push(user);
        localStorage.setItem('staff',JSON.stringify(staff));
        renderstaff();
    }
    if(room === 'archive'){
        archive.push(user);
        localStorage.setItem('archive',JSON.stringify(archive));
        renderarchive();
    }
    if(room === 'server'){
        server.push(user);
        localStorage.setItem('server',JSON.stringify(server));
        renderserver();
    }
    
}

function rendersecurite() {
    securiteplace.innerHTML = '';
    
    securite.forEach((user, index) => {

        const card = document.createElement('div');
        card.className = "flex justify-evenly items-center w-full h-[40px] bg-white/80 backdrop-blur-sm shadow-md border border-gray-300 rounded-xl hover:shadow-lg transition duration-200";
        card.innerHTML = `
            <button class="infoinplace">
                <h2 class="text-center w-[50%] text-[12px] font-bold">${user.name}</h2>
            </button>
            <button class="deleteinplace bg-red-600 w-fit text-white px-3 py-1 rounded-lg text-[12px] hover:bg-red-700 transition">X</button>
        `;

        const infoinplace = card.querySelector('.infoinplace');
        infoinplace.addEventListener('click', () => {
            securiteinfo(index);
        });

        const deleteinplace = card.querySelector('.deleteinplace');
        deleteinplace.addEventListener('click', () => {
            let deleteIndex = securite.findIndex(u => u.id === user.id)
            let deletedUser = securite.splice(deleteIndex,1);
            allusers.push(deletedUser[0]);
            localStorage.setItem('securite', JSON.stringify(securite));
            localStorage.setItem('allusers', JSON.stringify(allusers));
            rendersecurite();
            displayall();
        });
        securiteplace.appendChild(card);
    });
}

rendersecurite();



function renderreception(){
    Receptionplace.innerHTML = '';
   Reception.forEach((user,index)=>{
    const card = document.createElement('div');
    card.className = card.className ="flex justify-evenly items-center w-full h-[40px] bg-white/80 backdrop-blur-sm shadow-md border border-gray-300 rounded-xl hover:shadow-lg transition duration-200";
    card.innerHTML = `
     <button class="infoinplace"><h2 class="text-center w-[50%] text-[12px] font-bold">${user.name}</h2></button>
     <button class="deleteinplace bg-red-600 w-fit text-white px-3 py-1 rounded-lg text-[12px] hover:bg-red-700 transition">X</button>
    `
    
    const infoinplace = card.querySelector('.infoinplace');
    
    infoinplace.addEventListener('click',()=>{
        Receptioninfo(index)
    })
    
    const deleteinplace = card.querySelector('.deleteinplace');
    
    deleteinplace.addEventListener('click',()=>{
        let deleteIndex = Reception.findIndex(u => u.id === user.id)
        let deletedUser = Reception.splice(deleteIndex,1);
        allusers.push(deletedUser[0]);
        localStorage.setItem('Reception',JSON.stringify(Reception));
        localStorage.setItem('allusers',JSON.stringify(allusers));
        console.log(allusers);
        renderreception();
        displayall()
    })
    Receptionplace.appendChild(card);
})

}

renderreception();

function renderconfernce() {
    conferenceplace.innerHTML = '';

    conference.forEach((user, index) => {
        const card = document.createElement('div');
        card.className =
            "flex justify-evenly items-center w-full h-[40px] bg-white/80 backdrop-blur-sm shadow-md border border-gray-300 rounded-xl hover:shadow-lg transition duration-200";

        card.innerHTML = `
            <button class="infoinplace">
                <h2 class="text-center w-[50%] text-[12px] font-bold">${user.name}</h2>
            </button>
            <button class="deleteinplace bg-red-600 w-fit text-white px-3 py-1 rounded-lg text-[12px] hover:bg-red-700 transition">X</button>
        `;

        const infoinplace = card.querySelector('.infoinplace');
        infoinplace.addEventListener('click', () => {
            conferenceinfo(index);
        });

        const deleteinplace = card.querySelector('.deleteinplace');
        deleteinplace.addEventListener('click', () => {
            let deleteIndex = conference.findIndex(u => u.id === user.id)
            let deletedUser = conference.splice(deleteIndex,1);
            allusers.push(deletedUser[0]);

            localStorage.setItem('conference', JSON.stringify(conference));
            localStorage.setItem('allusers', JSON.stringify(allusers));

            renderconfernce();
            displayall();
        });

        conferenceplace.appendChild(card);
    });
}

renderconfernce();

function renderstaff() {
    staffplace.innerHTML = '';

    staff.forEach((user, index) => {
        const card = document.createElement('div');
        card.className =
            "flex justify-evenly items-center w-full h-[40px] bg-white/80 backdrop-blur-sm shadow-md border border-gray-300 rounded-xl hover:shadow-lg transition duration-200";

        card.innerHTML = `
            <button class="infoinplace">
                <h2 class="text-center w-[50%] text-[12px] font-bold">${user.name}</h2>
            </button>
            <button class="deleteinplace bg-red-600 w-fit text-white px-3 py-1 rounded-lg text-[12px] hover:bg-red-700 transition">X</button>
        `;

        const infoinplace = card.querySelector('.infoinplace');
        infoinplace.addEventListener('click', () => {
            staffinfo(index);
        });

        const deleteinplace = card.querySelector('.deleteinplace');
        deleteinplace.addEventListener('click', () => {
            let deleteIndex = staff.findIndex(u => u.id === user.id)
            let deletedUser = staff.splice(deleteIndex,1);
            allusers.push(deletedUser[0]);

            localStorage.setItem('staff', JSON.stringify(staff));
            localStorage.setItem('allusers', JSON.stringify(allusers));

            renderstaff();
            displayall();
        });

        staffplace.appendChild(card);
    });
}

renderstaff();


function renderarchive() {
    archiveplace.innerHTML = '';

    archive.forEach((user, index) => {
        const card = document.createElement('div');
        card.className =
            "flex justify-evenly items-center w-full h-[40px] bg-white/80 backdrop-blur-sm shadow-md border border-gray-300 rounded-xl hover:shadow-lg transition duration-200";

        card.innerHTML = `
            <button class="infoinplace">
                <h2 class="text-center w-[50%] text-[12px] font-bold">${user.name}</h2>
            </button>
            <button class="deleteinplace bg-red-600 w-fit text-white px-3 py-1 rounded-lg text-[12px] hover:bg-red-700 transition">X</button>
        `;

        const infoinplace = card.querySelector('.infoinplace');
        infoinplace.addEventListener('click', () => {
            archiveinfo(index);
        });

        const deleteinplace = card.querySelector('.deleteinplace');
        deleteinplace.addEventListener('click', () => {
            let deleteIndex = archive.findIndex(u => u.id === user.id)
            let deletedUser = archive.splice(deleteIndex,1);
            allusers.push(deletedUser[0]);

            localStorage.setItem('archive', JSON.stringify(archive));
            localStorage.setItem('allusers', JSON.stringify(allusers));

            renderarchive();
            displayall();
        });

        archiveplace.appendChild(card);
    });
}

renderarchive();


function renderserver() {
    serverplace.innerHTML = '';

    server.forEach((user, index) => {
        const card = document.createElement('div');
        card.className =
            "flex justify-evenly items-center w-full h-[40px] bg-white/80 backdrop-blur-sm shadow-md border border-gray-300 rounded-xl hover:shadow-lg transition duration-200";

        card.innerHTML = `
            <button class="infoinplace">
                <h2 class="text-center w-[50%] text-[12px] font-bold">${user.name}</h2>
            </button>
            <button class="deleteinplace bg-red-600 w-fit text-white px-3 py-1 rounded-lg text-[12px] hover:bg-red-700 transition">X</button>
        `;

        const infoinplace = card.querySelector('.infoinplace');
        infoinplace.addEventListener('click', () => {
            serverinfo(index);
        });

        const deleteinplace = card.querySelector('.deleteinplace');
        deleteinplace.addEventListener('click', () => {
            let deleteIndex = server.findIndex(u => u.id === user.id)
            let deletedUser = server.splice(deleteIndex,1);
            allusers.push(deletedUser[0]);

            localStorage.setItem('server', JSON.stringify(server));
            localStorage.setItem('allusers', JSON.stringify(allusers));

            renderserver();
            displayall();
        });

        serverplace.appendChild(card);
    });
}

renderserver();



function securiteinfo(index) {
    let user = securite[index];

    const card = document.createElement('div');
    card.className = "bg-gray-300 border p-4 rounded-md shadow text-white flex flex-col gap-4 relative m-4 overflow-y-scroll";

    card.innerHTML = `
        <img class="rounded-md w-full h-[180px] object-cover" src="${user.img}">
        <h2 class="text-center text-[25px] font-bold">${user.name}</h2>

        <div class="flex flex-col gap-2">
            <p><strong>Age:</strong> ${user.age}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>start:</strong> ${user.start}</p>
            <p><strong>leave:</strong> ${user.leave}</p>
        </div>

        <div class="flex justify-center gap-5">
            <button class="deleteuserfrominfo bg-red-700 rounded-md w-[60px] h-[50px]">delete</button>
            <button class="infouserclose bg-green-400 rounded-md w-[60px] h-[50px]">close</button>
        </div>
    `;

    infoplace.appendChild(card);

    const deleteuserfrominfo = card.querySelector('.deleteuserfrominfo');
    deleteuserfrominfo.addEventListener('click', () => {
        let deletedUser = securite.splice(index, 1);
        allusers.push(deletedUser[0]);

        localStorage.setItem('securite', JSON.stringify(securite));
        localStorage.setItem('allusers', JSON.stringify(allusers));

        rendersecurite();
        displayall();

        card.classList.add('hidden');
    });

    const infouserclose = card.querySelector('.infouserclose');
    infouserclose.addEventListener('click', () => {
        card.classList.add('hidden');
    });
}

function Receptioninfo(index){
    let user = Reception[index];
    const card = document.createElement('div');
    card.className = "bg-gray-300 border p-4 rounded-md shadow text-white flex flex-col gap-4 relative m-4 overflow-y-scroll";
    card.innerHTML = `
        <img class="rounded-md w-full h-[180px] object-cover" src="${user.img}">
        <h2 class="text-center text-[25px] font-bold">${user.name}</h2>

        <div class="flex flex-col gap-2">
            <p><strong>Age:</strong> ${user.age}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>start:</strong> ${user.start}</p>
            <p><strong>leave:</strong> ${user.leave}</p>
        </div>

        <div class="flex justify-center gap-5">
            <button class="deleteuserfrominfo bg-red-700 rounded-md w-[60px] h-[50px]">delete</button>
            <button class="infouserclose bg-green-400 rounded-md w-[60px] h-[50px]">close</button>
        </div>
    `;
    infoplace.appendChild(card);

    const deleteuserfrominfo = card.querySelector('.deleteuserfrominfo');
    deleteuserfrominfo.addEventListener('click', ()=>{
        let deleted = Reception.splice(index,1);
        allusers.push(deleted[0]);
        localStorage.setItem('Reception', JSON.stringify(Reception));
        localStorage.setItem('allusers', JSON.stringify(allusers));
        renderreception();
        displayall();
        card.classList.add('hidden');
    });

    const infouserclose = card.querySelector('.infouserclose');
    infouserclose.addEventListener('click', ()=>{
        card.classList.add('hidden');
    });
}

function conferenceinfo(index){
    let user = conference[index];
    const card = document.createElement('div');
    card.className = "bg-gray-300 border p-4 rounded-md shadow text-white flex flex-col gap-4 relative m-4 overflow-y-scroll";
    card.innerHTML = `
        <img class="rounded-md w-full h-[180px] object-cover" src="${user.img}">
        <h2 class="text-center text-[25px] font-bold">${user.name}</h2>

        <div class="flex flex-col gap-2">
            <p><strong>Age:</strong> ${user.age}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>start:</strong> ${user.start}</p>
            <p><strong>leave:</strong> ${user.leave}</p>
        </div>

        <div class="flex justify-center gap-5">
            <button class="deleteuserfrominfo bg-red-700 rounded-md w-[60px] h-[50px]">delete</button>
            <button class="infouserclose bg-green-400 rounded-md w-[60px] h-[50px]">close</button>
        </div>
    `;
    infoplace.appendChild(card);

    const deleteuserfrominfo = card.querySelector('.deleteuserfrominfo');
    deleteuserfrominfo.addEventListener('click', ()=>{
        let deleted = conference.splice(index,1);
        allusers.push(deleted[0]);
        localStorage.setItem('conference', JSON.stringify(conference));
        localStorage.setItem('allusers', JSON.stringify(allusers));
        renderconfernce();
        displayall();
        card.classList.add('hidden');
    });

    const infouserclose = card.querySelector('.infouserclose');
    infouserclose.addEventListener('click', ()=>{
        card.classList.add('hidden');
    });
}


function staffinfo(index){
    let user = staff[index];
    const card = document.createElement('div');
    card.className = "bg-gray-300 border p-4 rounded-md shadow text-white flex flex-col gap-4 relative m-4 overflow-y-scroll";
    card.innerHTML = `
        <img class="rounded-md w-full h-[180px] object-cover" src="${user.img}">
        <h2 class="text-center text-[25px] font-bold">${user.name}</h2>

        <div class="flex flex-col gap-2">
            <p><strong>Age:</strong> ${user.age}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>start:</strong> ${user.start}</p>
            <p><strong>leave:</strong> ${user.leave}</p>
        </div>

        <div class="flex justify-center gap-5">
            <button class="deleteuserfrominfo bg-red-700 rounded-md w-[60px] h-[50px]">delete</button>
            <button class="infouserclose bg-green-400 rounded-md w-[60px] h-[50px]">close</button>
        </div>
    `;
    infoplace.appendChild(card);

    const deleteuserfrominfo = card.querySelector('.deleteuserfrominfo');
    deleteuserfrominfo.addEventListener('click', ()=>{
        let deleted = staff.splice(index,1);
        allusers.push(deleted[0]);
        localStorage.setItem('staff', JSON.stringify(staff));
        localStorage.setItem('allusers', JSON.stringify(allusers));
        renderstaff();
        displayall();
        card.classList.add('hidden');
    });

    const infouserclose = card.querySelector('.infouserclose');
    infouserclose.addEventListener('click', ()=>{
        card.classList.add('hidden');
    });
}

function archiveinfo(index){
    let user = archive[index];
    const card = document.createElement('div');
    card.className = "bg-gray-300 border p-4 rounded-md shadow text-white flex flex-col gap-4 relative m-4 overflow-y-scroll";
    card.innerHTML = `
        <img class="rounded-md w-full h-[180px] object-cover" src="${user.img}">
        <h2 class="text-center text-[25px] font-bold">${user.name}</h2>

        <div class="flex flex-col gap-2">
            <p><strong>Age:</strong> ${user.age}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>start:</strong> ${user.start}</p>
            <p><strong>leave:</strong> ${user.leave}</p>
        </div>

        <div class="flex justify-center gap-5">
            <button class="deleteuserfrominfo bg-red-700 rounded-md w-[60px] h-[50px]">delete</button>
            <button class="infouserclose bg-green-400 rounded-md w-[60px] h-[50px]">close</button>
        </div>
    `;
    infoplace.appendChild(card);

    const deleteuserfrominfo = card.querySelector('.deleteuserfrominfo');
    deleteuserfrominfo.addEventListener('click', ()=>{
        let deleted = archive.splice(index,1);
        allusers.push(deleted[0]);
        localStorage.setItem('archive', JSON.stringify(archive));
        localStorage.setItem('allusers', JSON.stringify(allusers));
        renderarchive();
        displayall();
        card.classList.add('hidden');
    });

    const infouserclose = card.querySelector('.infouserclose');
    infouserclose.addEventListener('click', ()=>{
        card.classList.add('hidden');
    });
}

function serverinfo(index){
    let user = server[index];
    const card = document.createElement('div');
    card.className = "bg-gray-300 border p-4 rounded-md shadow text-white flex flex-col gap-4 relative m-4 overflow-y-scroll";
    card.innerHTML = `
        <img class="rounded-md w-full h-[180px] object-cover" src="${user.img}">
        <h2 class="text-center text-[25px] font-bold">${user.name}</h2>

        <div class="flex flex-col gap-2">
            <p><strong>Age:</strong> ${user.age}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>start:</strong> ${user.start}</p>
            <p><strong>leave:</strong> ${user.leave}</p>
        </div>

        <div class="flex justify-center gap-5">
            <button class="deleteuserfrominfo bg-red-700 rounded-md w-[60px] h-[50px]">delete</button>
            <button class="infouserclose bg-green-400 rounded-md w-[60px] h-[50px]">close</button>
        </div>
    `;
    infoplace.appendChild(card);

    const deleteuserfrominfo = card.querySelector('.deleteuserfrominfo');
    deleteuserfrominfo.addEventListener('click', ()=>{
        let deleted = server.splice(index,1);
        allusers.push(deleted[0]);
        localStorage.setItem('server', JSON.stringify(server));
        localStorage.setItem('allusers', JSON.stringify(allusers));
        renderserver();
        displayall();
        card.classList.add('hidden');
    });

    const infouserclose = card.querySelector('.infouserclose');
    infouserclose.addEventListener('click', ()=>{
        card.classList.add('hidden');
    });
}


displayall();