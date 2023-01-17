let altura = 0;
let largo = 0;
const inputLargo = document.querySelector("#inputLargo");
const inputAltura = document.querySelector("#inputAltura");
const area = document.querySelector("#area");
let superficie = 0;
let cantidadLadrillos = 0;
let tipoLadrillo = 0;
let cantidadHierros = 0;
let cantidadBolsas = 0;
let vlm = 0;
let vla = 0;
let mezcla = 0;
let metroArena = 0;
let cemento = "";
const hierro6 = {
    nombre: "Hierro del 6",
    largo: 12,
    precio: 1310,
}
const arena = {
    nombre: "Arena por metro",
    precio: 6590,
}
let ladrillos = [];
let cementos = [];
fetch('ladrillos.json')
.then((res)=>res.json())
.then( (data)=>{
    data.forEach(producto => {       
        ladrillos[producto.id-1]=producto;
    });
});
 fetch('cementos.json')
.then((res)=>res.json())
.then( (data)=>{
    data.forEach(producto => {       
        cementos[producto.id-1] = producto;        
    });
});

 function calcularSup(altura , lineal){
        superficie = altura * lineal;
 }
 function seleccionarLadrillo (){
    return document.querySelector('input[name="ladrillo"]:checked').value;

    
}
 function calcularLadrillos(superficie , ladrillo){
    cantidadLadrillos = Math.ceil(superficie / ladrillo);
 }
 function calcularHierros(altura, lineal){
    cantidadHierros = Math.ceil((altura / 0.6) * (lineal / 12));  
}
   
function volumenMuro(superficie, ladrillo){
    vlm = superficie * ladrillo;
}
function volumenLadrillo(superficie, ancho){
    vla = superficie * ancho;
}
 function calcularMezcla(vlm, vla){
    mezcla = vlm - vla;
}
function cantidadCemento(volumenMezcla){
    cantidadBolsas = Math.ceil(volumenMezcla* 7.5);
}
function cantidadArena(volumenMezcla){
    metroArena = Math.ceil(volumenMezcla * 1);
}
function total(cantidad, precio){
    return cantidad * precio;
};    
function seleccionarCemento(){
    return document.querySelector('input[name="cemento"]:checked').value; 
}
function presupuestoCemento(cemento,cantidad){
    return cemento * cantidad;
}
function presupuestoFinal(cemento,ladrillo,cantidadLadrillos, hierro, precioHierro, arena, precioArena){
   let totalLadrillos = ladrillo *cantidadLadrillos;
   let totalHierro = hierro * precioHierro;
   let totalArena = arena * precioArena;
   document.querySelector("#subtotal").innerHTML =
   `<li>Cemento: $ ${cemento} </li>
   <li>Ladrillos: $ ${totalLadrillos} </li>
   <li>Varillas de hierro: $ ${totalHierro}  </li>
   <li>Arena:  $ ${totalArena} </li>`;
   let total = cemento + totalLadrillos + totalHierro + totalArena;
    document.querySelector("#total").innerHTML =
    ` <p> Presupuesto final: $ ${total}</p>`
    

}
let arrayPresupuesto = [];
function presupuestoJSON(cemento,ladrillo,cantidadLadrillos, hierro, precioHierro, arena, precioArena){
    let totalLadrillos = ladrillo *cantidadLadrillos;
    let totalHierro = hierro * precioHierro;
    let totalArena = arena * precioArena;
    let total = cemento + totalLadrillos + totalHierro + totalArena;
    const pres = new constructorPresupuesto (cemento,totalLadrillos,totalHierro,totalArena,total);
    return pres; 
}
class constructorPresupuesto{ 
    constructor (cemento,ladrillos,hierro,arena,total){
    this.cemento = cemento;
    this.ladrillos = ladrillos;
    this.hierro = hierro;
    this.arena = arena;
    this.total = total;
}}
function removerGuardar (contador){
    const botonGuardar = document.getElementById("guardar");
    (contador > 0) ? botonGuardar.remove() : ""
  }
inputAltura.addEventListener("input",()=>{
     altura = inputAltura.value;
})
inputLargo.addEventListener("input", ()=>{
    largo = inputLargo.value;
})
const offLadrillos = document.querySelector("#formLadrillos");
const formCalculadora = document.querySelector("#formCalculadora")
formCalculadora.addEventListener("submit", (e)=>{
    e.preventDefault();
   calcularSup(altura , largo);
    let cajaSuperficie = document.querySelector(".cajaSuperficie")
    cajaSuperficie.innerHTML = `<h3> Superficie: ${superficie} m² <h3> `
    offLadrillos.classList.add("opacarOff");
    offLadrillos.classList.remove("opacarOn");
    formCalculadora.reset();
})
const offMateriales =document.querySelector("#divMateriales");
const offh3 = document.querySelector(".h3");
const offCementos = document.querySelector(".cementos");
const formLadrillos = document.querySelector("#formLadrillos");
formLadrillos.addEventListener("click",()=>{
    
    tipoLadrillo = seleccionarLadrillo();
   formLadrillos.innerHTML = `<h3> ${ladrillos[tipoLadrillo].nombre}<h3> `
   offMateriales.classList.add("opacarOff");
   offMateriales.classList.remove("opacarOn"); 
   offCementos.classList.add("opacarOff");
   offCementos.classList.remove("opacarOn");
   offh3.classList.add("opacarOff");
   offh3.classList.remove("opacarOn");
   calcularLadrillos(superficie , ladrillos[tipoLadrillo].superficie);
   calcularHierros(altura , largo);
   volumenMuro(superficie , ladrillos[tipoLadrillo].ancho);
   volumenLadrillo(ladrillos[tipoLadrillo].superficie , ladrillos[tipoLadrillo].ancho);
   calcularMezcla(vlm , vla);
   cantidadCemento(mezcla);
   cantidadArena(mezcla);
    document.querySelector("#listaMateriales").innerHTML = 
    `<li>Cemento: ${cantidadBolsas} bolsas</li>
    <li>Ladrillos: ${cantidadLadrillos} unidades</li>
    <li>Varillas de hierro: ${cantidadHierros}  unidades</li>
    <li>Arena: ${metroArena} metros</li>`;
});  
setTimeout(()=> {
 const avellaneda = document.querySelector("#avellaneda")
avellaneda.innerHTML = "Cemento:"+ cementos[1].nombre +"\n Precio:$"+ cementos[1].precio;
const hidralit = document.querySelector("#hidralit")
hidralit.innerHTML = "Cemento:"+  cementos[3].nombre +"\n Precio:$"+ cementos[3].precio;
const holcim = document.querySelector("#holcim")
holcim.innerHTML = "Cemento:"+  cementos[2].nombre +"\n Precio:$"+  cementos[2].precio;
const lomanegra = document.querySelector("#lomanegra")
lomanegra.innerHTML = "Cemento:"+  cementos[0].nombre +"\n Precio:$"+  cementos[0].precio;
},1000);
const offSaveReset = document.querySelector(".saveReset");
let filtrado = "";
let costoCemento = 0;
const formCemento = document.querySelector(".cementos");
formCemento.addEventListener("click", ()=>{
 cemento = seleccionarCemento();
 formCemento.classList.add("divCemento");
 formCemento.innerHTML = `<h3> ${cemento}<h3> `
 offSaveReset.classList.add("opacarOff");
 offSaveReset.classList.remove("opacarOn");
filtrado = cementos.filter((elegido)=> elegido.nombre === cemento );
  costoCemento = presupuestoCemento(filtrado[0].precio , cantidadBolsas);
presupuestoFinal(costoCemento,cantidadLadrillos,ladrillos[tipoLadrillo].precio,cantidadHierros,hierro6.precio,metroArena, arena.precio);
})

let antiCopia = 0;
const guardar = document.querySelector("#guardar");
 guardar.addEventListener("click",()=>{
  (Swal.fire({
          position: 'center',
         icon: 'success',
        title: 'Presupuesto guardado',
        showConfirmButton: false,
        timer: 1500
        })) 
        let pres = presupuestoJSON(costoCemento,cantidadLadrillos,ladrillos[tipoLadrillo].precio,cantidadHierros,hierro6.precio,metroArena, arena.precio);
        let presLocalStorage = localStorage.getItem("presupuestos");
        arrayPresupuesto = JSON.parse(presLocalStorage);                  
        arrayPresupuesto.push(pres);                   
        localStorage.setItem("presupuestos", JSON.stringify(arrayPresupuesto));
        antiCopia++;
        removerGuardar(antiCopia);
                    })


const limpiar = document.querySelector("#reset");
limpiar.addEventListener("click",()=>{
    let timerInterval
Swal.fire({
  title: '¡Hasta pronto!',
  html: 'Esta página se recargará en <b></b> milliseconds.',
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
    window.location.reload()
  }
})
})
