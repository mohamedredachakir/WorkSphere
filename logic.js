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
  addForm
    .querySelectorAll(".exprstart, .exprleave, .exprdis")
    .forEach((Input) => Input.parentElement.remove());
});

btnannuler.addEventListener("click", () => {
  modalform.classList.add("hidden");
});

btnsubmit.addEventListener("click", (e) => {
  e.preventDefault(); //stop reload page
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
