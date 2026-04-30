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
/* PAGE NAVIGATION */
function openTab(id,btn){

  document.querySelectorAll(".page").forEach(p=>{
    p.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b=>{
    b.classList.remove("active");
  });

  btn.classList.add("active");
}

/* PILING */
function calcPiling(){

  const tables =
    Number(document.getElementById("pileTables").value) || 0;

  const piles = tables * 2;

  document.getElementById("pileOut").innerHTML = `
    <b>Total Tables:</b> ${tables}<br>
    <b>Total Piles:</b> ${piles}
  `;
}

/* MODULE */
function calcModule(){

  const full =
    Number(document.getElementById("fullTables").value) || 0;

  const half =
    Number(document.getElementById("halfTables").value) || 0;

  const fullModules = full * 58;
  const halfModules = half * 29;

  const totalModules = fullModules + halfModules;

  const pallets = Math.ceil(totalModules / 33);

  const leftover =
    (pallets * 33) - totalModules;

  document.getElementById("moduleOut").innerHTML = `
    <b>Full Table Modules:</b> ${fullModules}<br>
    <b>Half Table Modules:</b> ${halfModules}<br><br>

    <b>Total Modules:</b> ${totalModules}<br>
    <b>Pallets Required:</b> ${pallets}<br>
    <b>Balance Modules:</b> ${leftover}
  `;
}

/* ELECTRICAL */
function calcElectrical(){

  const modules =
    Number(document.getElementById("modules").value) || 0;

  const modulesPerString = 29;

  const totalStrings =
    Math.floor(modules / modulesPerString);

  const stringsPerInverter = 18;

  const inverters =
    Math.ceil(totalStrings / stringsPerInverter);

  const dcCables =
    totalStrings * 2;

  document.getElementById("electricalOut").innerHTML = `
    <b>Total Strings:</b> ${totalStrings}<br>
    <b>Total Inverters:</b> ${inverters}<br>
    <b>DC String Cables:</b> ${dcCables}<br>
    <b>Modules/String:</b> 29
  `;
}
/* ELECTRICAL */
function calcElectrical(){

  const tables =
    Number(document.getElementById("electricalTables").value) || 0;

  const moduleWp =
    Number(document.getElementById("moduleWp").value);

  const stringsPerInv =
    Number(document.getElementById("stringsPerInv").value);

  /* TABLE → STRINGS */
  const strings = tables * 2;

  /* STRINGS → INVERTERS */
  const inverters =
    Math.ceil(strings / stringsPerInv);

  /* TABLE → MW DC */
  const mwDC =
    ((tables * 58 * moduleWp) / 1000000)
    .toFixed(2);

  /* INVERTER → MW AC */
  const mwAC =
    ((inverters * 275) / 1000)
    .toFixed(2);

  /* LT PANELS */
  const ltPanels =
    (inverters / 16).toFixed(2);

  document.getElementById("electricalOut").innerHTML = `
  
    <b>Total Strings:</b> ${strings}<br>

    <b>Total Inverters:</b> ${inverters}<br>

    <b>LT Panels Required:</b> ${ltPanels}<br>

    <b>DC Capacity:</b> ${mwDC} MW<br>

    <b>AC Capacity:</b> ${mwAC} MW

  `;
}
