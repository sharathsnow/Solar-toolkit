function openTab(id, btn){

  // hide all pages
  document.querySelectorAll(".page")
    .forEach(page => {
      page.classList.remove("active");
    });

  // show selected page
  document.getElementById(id)
    .classList.add("active");

  // remove active from buttons
  document.querySelectorAll(".bottom-nav button")
    .forEach(button => {
      button.classList.remove("active");
    });

  // activate clicked button
  btn.classList.add("active");
}

/* MMS */
function calcMMS(){

  let t = Number(document.getElementById("mmsTables").value);

  let rafters = t * 12;

  document.getElementById("mmsOut").innerHTML =
    "Rafters Required: <b>" + rafters + "</b>";
}

/* PILING */
function calcPiling(){

  let t = Number(document.getElementById("pileTables").value);

  let piles = t * 2;

  document.getElementById("pileOut").innerHTML =
    "Total Piles: <b>" + piles + "</b>";
}

/* MODULE */
function calcModule(){

  let full = Number(document.getElementById("fullTables").value);

  let half = Number(document.getElementById("halfTables").value);

  let totalModules =
    (full * 58) +
    (half * 29);

  let pallets =
    Math.ceil(totalModules / 33);

  let leftover =
    (pallets * 33) - totalModules;

  document.getElementById("moduleOut").innerHTML =
    `
    Total Modules: <b>${totalModules}</b><br>
    Pallets Required: <b>${pallets}</b><br>
    Left Over Modules: <b>${leftover}</b>
    `;
}

/* ELECTRICAL */
function calcElectrical(){

  let modules =
    Number(document.getElementById("modules").value);

  let strings =
    Math.floor(modules / 29);

  let inverters =
    Math.ceil(strings / 18);

  document.getElementById("electricalOut").innerHTML =
    `
    Total Strings: <b>${strings}</b><br>
    Inverters Required: <b>${inverters}</b>
    `;
}
