let mmsType = "full";

/* MATERIAL DATA */
const material = {

  full:{
    Rafter:12,
    "Purlin 1":4,
    "Purlin 2":4,
    "Purlin 3":4,
    "Purlin 4":4,
    "Purlin 5":4,
    "Purlin 6":4,
    "Front Bracing":12,
    "Rear Bracing":12,
    "Connecting Channel":12,
    "Cross Bracing":2
  },

  half:{
    Rafter:7,
    "Purlin 7":4,
    "Purlin 8":4,
    "Purlin 9":4,
    "Front Bracing":7,
    "Rear Bracing":7,
    "Connecting Channel":7,
    "Cross Bracing":2
  }

};

/* FASTENER DATA */
const fastener = {

  full:{
    "M12×30 Nut–Bolt":24,
    "M12×30 PW":48,
    "M12×30 SW":24,
    "M10×30 Nut–Bolt":324,
    "M10×30 PW":472,
    "M10×30 SW":324,
    "M10×30 RW":176,
    "M8×25 Nut-Bolt":232,
    "M8×25 RW":232
  },

  half:{
    "M12×30 Nut–Bolt":14,
    "M12×30 PW":28,
    "M12×30 SW":14,
    "M10×30 Nut–Bolt":176,
    "M10×30 PW":264,
    "M10×30 SW":176,
    "M10×30 RW":88,
    "M8×25 Nut-Bolt":116,
    "M8×25 RW":116
  }

};

/* TABLE TYPE */
function setMMSTable(type,btn){

  mmsType = type;

  document.querySelectorAll(".table-btn")
    .forEach(b=>b.classList.remove("active"));

  btn.classList.add("active");

  loadDropdowns();
}

/* SWITCH MODE */
function showMMS(id,btn){

  document.querySelectorAll(".mode-btn")
    .forEach(b=>b.classList.remove("active"));

  btn.classList.add("active");

  ["t2m","m2t","t2f","f2t"]
    .forEach(div=>{
      document.getElementById(div)
        .classList.add("hidden");
    });

  document.getElementById(id)
    .classList.remove("hidden");
}

/* LOAD DROPDOWN */
function loadDropdowns(){

  matType.innerHTML = "";

  for(let k in material[mmsType]){
    matType.innerHTML +=
      `<option value="${k}">${k}</option>`;
  }

  fasType.innerHTML = "";

  for(let k in fastener[mmsType]){
    fasType.innerHTML +=
      `<option value="${k}">${k}</option>`;
  }
}

loadDropdowns();

/* TABLE → MATERIAL */
function calcMaterial(){

  const n = +mmsTables.value;

  let out = "";

  for(let k in material[mmsType]){

    out += `
      ${k}: <b>
      ${material[mmsType][k] * n}
      </b><br>
    `;
  }

  mmsResult.innerHTML = out;
}

/* MATERIAL → TABLE */
function materialToTable(){

  const q = +matQty.value;
  const t = matType.value;

  mmsResult2.innerHTML =
    `
    Tables Possible:
    <b>
    ${Math.floor(q / material[mmsType][t])}
    </b>
    `;
}

/* TABLE → FASTENER */
function calcFasteners(){

  const n = +fasTables.value;

  let out = "";

  for(let k in fastener[mmsType]){

    out += `
      ${k}: <b>
      ${fastener[mmsType][k] * n}
      </b><br>
    `;
  }

  fasResult.innerHTML = out;
}

/* FASTENER → TABLE */
function fastenerToTable(){

  const q = +fasQty.value;
  const t = fasType.value;

  fasResult2.innerHTML =
    `
    Tables Possible:
    <b>
    ${Math.floor(q / fastener[mmsType][t])}
    </b>
    `;
}
