const v = "\x1b[32m%s\x1b[0m"; // NO TOCAR
const o = "*".repeat(80) + "\n"; // NO TOCAR
const oo = "*".repeat(25); // NO TOCAR

/*******************************/
/* Desarrollo de las consignas */
/*******************************/

const archivos = require("./jsonHelper")
const arraybicicletas = archivos.leerJson("bicicletas")

const carrera = {

    bicicletas: arraybicicletas,
    bicicletasPorTanda: 4,
// D

    listarBicicletas: function (array) {
        array.forEach(ciclista => {
            let estado = ciclista.dopaje? "Inhabilitado":"habilitado";
            console.log(`Ciclista: ${ciclista.ciclista}, marca: ${ciclista.marca},  rodado: ${ciclista.rodado}, peso: ${ciclista.peso} kg, largo: ${ciclista.largo} cm, estado: ${estado}.`)
        });
        
    },

// E
    ciclistasHabilitados: function () { 
        
        return this.bicicletas.filter(ciclista => ciclista.dopaje === false)
    },
// F
    buscarPorId: function (id) {
        return this.bicicletas.find(ciclista => ciclista.id === id)
    },  
// G
    filtrarPorPeso: function (pesoMax){
        let CiclistasDisponibles = this.ciclistasHabilitados()
        return CiclistasDisponibles.filter(ciclista => ciclista.peso <= pesoMax)
    },
// H
    ordenarPorRodado: function (){
        return this.bicicletas.sort((bici1,bici2) => (bici1.rodado - bici2.rodado))
    },
// I
    largoPromedio: function(){
        let suma = this.bicicletas.reduce((acum, ciclista) => (acum + ciclista.largo),0)
        let promedio = suma/this.bicicletas.length
        return `el promedio del largo de las bicicletas es de ${promedio}`
    },
// J
    aumentarPeso: function (cantidadAumentarKg, ID){
        let CiclistaEncontrado = this.buscarPorId(ID)
        if (CiclistaEncontrado) {   
            CiclistaEncontrado.peso = CiclistaEncontrado.peso + cantidadAumentarKg
            archivos.escribirJson("bicicletas", this.bicicletas)
        }
    },
// K
    generarTanda: function(Rodado, pesoMax){
        let ciclistasHabilitadosConPeso = this.filtrarPorPeso(pesoMax)
        let tandaCiclistas = ciclistasHabilitadosConPeso.filter((ciclista)=>ciclista.rodado <= Rodado)
        return tandaCiclistas.slice(0, this.bicicletasPorTanda)
    },
    // L 
    calcularPodio: function(Tandaarray){
       
        let podium = Tandaarray.sort((ciclista1,ciclista2) => ciclista2.puntaje - ciclista1.puntaje )
            podium.forEach((ciclista, index) => {
                if (index == 0) {console.log(`El ganador es: ${ciclista.ciclista}, con un puntaje de ${ciclista.puntaje}.`)}
                if (index == 1) {console.log(`El segundo puesto es para: ${ciclista.ciclista}, con un puntaje de ${ciclista.puntaje}.`)}
                if (index == 2) {console.log(`El tercer puesto es para: ${ciclista.ciclista}, con un puntaje de ${ciclista.puntaje}.`)}
            })
    }



    }














/******************************/
/* Ejecución de las consignas */
/******************************/

console.log(v, "\n" + oo + " .D. ");
carrera.listarBicicletas(carrera.bicicletas);
console.log(o);

console.log(v, oo + " .E.");
carrera.listarBicicletas(carrera.ciclistasHabilitados());
console.log(o);

console.log(v, oo + " .F.");
console.log(carrera.buscarPorId(2))
console.log(o);

console.log(v, oo + " .G.");
carrera.listarBicicletas(carrera.filtrarPorPeso(8))
console.log(o);

console.log(v, oo + " .H.");
carrera.listarBicicletas(carrera.ordenarPorRodado())
console.log(o);

console.log(v, oo + " .I.");
console.log(carrera.largoPromedio())
console.log(o);

console.log(v, oo + " .J. ");
console.log(carrera.buscarPorId(2))
carrera.aumentarPeso(10,2)
console.log(carrera.buscarPorId(2))
console.log(o);

console.log(v, oo + " .K. ");
carrera.listarBicicletas(carrera.generarTanda(28,10))
console.log(o);

console.log(v, oo + " .L. ");
carrera.calcularPodio(carrera.generarTanda(28,10))
console.log(o);
