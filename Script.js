function openTab(id,btn){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}

function calcMMS(){
  let t = +document.getElementById("mmsTables").value;
  document.getElementById("mmsOut").innerHTML = "Rafters: " + (t*12);
}

function calcPiling(){
  let t = +document.getElementById("pileTables").value;
  document.getElementById("pileOut").innerHTML = "Piles: " + (t*2);
}
