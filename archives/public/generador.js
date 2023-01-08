let seccionEscogida = "textodepruebaqueseraborradoluego";
var ListComboBox = []
var storage = 0;
localStorage.clear();
sessionStorage.clear();
var numeroCombo = 0;

var matrix = new Array();

for(let i = 0 ; i <= 8 ; i++){
    matrix[i] = new Array();

    for(let j = 0 ; j <= 5 ; j++){
            matrix[i][j] = ".";

//            matrix[i][j] = i+""+j;
    }
}
/*
var ot = "";

for(let i = 0 ; i <= 8 ; i++){
    for(let j = 0 ; j <= 5 ; j++){
        if(i != 0 && j != 0){
            ot += matrix[i][j] + " ";
        }
    }
    ot +="\n";
}
console.log(ot);
*/


function generarTabla(){

    ModificateTable();


    var contenedorTabla = document.getElementById("contenedorTabla");
    
    contenedorTabla.innerHTML = ""; //Limpia el HTML que contenga la tabla
    var tabla = "<table>";

    for (let i = 0; i <= 8; i++) {
        if(i == 0){tabla += "<thead>";}
        tabla += "<tr id="+i+">";

        for (let j = 0; j <= 5; j++) {
            tabla += "<td id="+ i +""+ j+">";       //Esto funcionara como los Fxy, donde td11 es el inicio de la tabla y td85 el final

                 if(i == 0 && j == 1){tabla += "Lunes";    }
            else if(i == 0 && j == 2){tabla += "Martes";   }
            else if(i == 0 && j == 3){tabla += "Miercoles";}
            else if(i == 0 && j == 4){tabla += "Jueves";   }
            else if(i == 0 && j == 5){tabla += "Viernes";  }
            else if(j == 0){
                                if(i==1){tabla += "08:30 - 09:50";}
                           else if(i==2){tabla += "10:00 - 11:20";}
                           else if(i==3){tabla += "11:30 - 12:50";}
                           else if(i==4){tabla += "13:00 - 14:20";}
                           else if(i==5){tabla += "14:30 - 15:50";}
                           else if(i==6){tabla += "16:00 - 17:20";}
                           else if(i==7){tabla += "17:25 - 18:45";}
                           else if(i==8){tabla += "18:50 - 20:10";}
                           else if(i==9){tabla += "20:15 - 21:30";}
                                                                        }

            else{tabla += "." ; }

            tabla += "</td>";

        }
        tabla += "</tr>";
        if(i == 0){tabla += "</thead>";}

    }

    tabla += "</table>";
    contenedorTabla.innerHTML = tabla;

/*

08:30 - 09:50
10:00 - 11:20
11:30 - 12:50
13:00 - 14:20
14:30 - 17:20
17:25 - 18:45
18:50 - 20:10
20:15 - 21:30

*/


}

function loadDoc() {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "./carreras");
    xhttp.send();

    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);

            var ComboBoxCarrera = document.getElementById("carrera");
    
            ComboBoxCarrera.innerHTML = ""; //Limpia el HTML que contenga la tabla
            var select = "<option disabled selected>Seleccione su carrera </option> ";

            for(let item of datos){

                select += "<option value=" + item.id + ">" + item.nombre_carrera + "</option>";

            }

            ComboBoxCarrera.innerHTML = select;

        }
    }
}

function ShowSelected(){
/* Para obtener el valor */
var id_carrera = document.getElementById("carrera").value;
var ComboBoxRamo = document.getElementById("ComboBox");

const xhttp = new XMLHttpRequest();

xhttp.open("GET", "./ramos/" + id_carrera);
xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);

            ComboBoxRamo.innerHTML = ""; //Limpia el HTML que contenga la tabla
            var aux3 = "";
//
            for(let i = 1 ; i < 7 ; i++){

                aux3 +='<div id = "DivRamo'+i+'" name="DivRamo'+i+'"> \
                <select id = "ComboBoxRamo'+i+'" name="ComboBoxRamo'+i+'" onchange="ShowRamoSelected('+i+');"> \
                <option disabled selected>Seleccione ramo </option>';                

                for(let item of datos){
 
                    aux3 += '<option value="'+ item.id +'"> '+ item.nombre_asignatura + ' </option>';
 
                }

                aux3+='  </select>  \
                    </div> \
                      <br>\
                        <!-- Bloque Combobox -->';

            }
            ComboBoxRamo.innerHTML += aux3;

// 
        }
    }

}

function ShowRamoSelected(n){            /* Funcion para agregar ramos a las cookies */
    /* Para obtener el valor */

    var id_carrera = document.getElementById("carrera").value;
    var ComboBoxRamo = document.getElementById("ComboBoxRamo"+n).value;/* para saber el ramo que se selecciono*/ 

    const xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", "./secciones/" + id_carrera + "/" + ComboBoxRamo);
    xhttp.send();
    
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let datos = JSON.parse(this.responseText);
    
                var aux = "";

                for(let item of datos){     //desconosco de como extraer un valor. En este caso es el id del ramo que se repite. Se optimizara en el futuro

                    aux = item.id;

                }
                 
                localStorage.setItem(aux, this.responseText);
                
            }
        }

}

function getDias(dias){ //esta funcion debe devolver los dias convertidos en numeros para ser puestos en los dias

    var numero_dia = [];         // variable auxiliar para recoger el numero del dia

    if(dias != "NO DEFINIDO"){
        
            var aux = dias.split(' ');

        for(let i = 0; i < aux.length ; i++){
            if ("LU" == aux[i].trim()){
                numero_dia.push(1);
            }
            if ("MA" == aux[i].trim()){
                numero_dia.push(2);
            }       
            if ("MI" == aux[i].trim()){
                numero_dia.push(3);
            }      
            if ("JU" == aux[i].trim()){
                numero_dia.push(4);
            } 
            if ("VI" == aux[i].trim()){
                numero_dia.push(5);        
            }
        }
    }

    return numero_dia;
}

function getHoras(horas){

    var numero_hora = [];         // variable auxiliar para recoger el numero del dia

    if(horas != "NO DEFINIDO"){
        var aux = horas.split('-');
    
        var bloque = [
                        new Date("2022/07/20 07:00:00"),
                        new Date("2022/07/20 08:30:00"), //1
                        new Date("2022/07/20 10:00:00"), //2
                        new Date("2022/07/20 11:30:00"), //3
                        new Date("2022/07/20 13:00:00"), //4
                        new Date("2022/07/20 14:30:00"), //5
                        new Date("2022/07/20 16:00:00"), //6
                        new Date("2022/07/20 17:25:00"), //7
                        new Date("2022/07/20 18:50:00"), //8
                        new Date("2022/07/20 20:15:00"), //9
                        new Date("2022/07/20 21:40:00")
                                                            ];

        var horainicio = new Date("2022/07/20 " + aux[0].trim());
        var horafin = new Date("2022/07/20 " + aux[1].trim());

        for(var i = 0; i < bloque.length ; i++){

            if(horainicio.getTime()  <= bloque[i].getTime()){   //cuando la hora de inicio sea menor o igual a la hora predefinida

                for(var j = i; j < bloque.length ; j++){

                    if(horafin.getTime()  >= bloque[j].getTime()){   //cuando la hora de fin sea menor o igual a la hora predefinida
                        
                        if(i == j){
                            numero_hora.push(i);

                        }
                        else if(numero_hora.indexOf(j) == -1 && i+1 != j){  //si la hora aun no fue ingresada, entonces ingresela, porque pueden existir casos particulares de ramos con horas distintas a las predefinidas, por lo que es bueno comparar
                            numero_hora.push(j);

                        }
                    }
                }
            }
        }
    }
        return numero_hora;
}


function ModificateTable(){

    var array = new Map();  // estos mapas son auxiliares para guardar informacion
    var asignatura = new Map();

    for(let index = 0 ; index < localStorage.length ; index++){

        var datos = JSON.parse(localStorage.getItem(localStorage.key(index)));
        var ramo = "";
        for(let evento of datos){

            if(!array.has(evento.codigo)){
                array.set(evento.codigo, new seccion(evento.id, evento.nombre_asignatura, evento.codigo, evento.nombre, evento.descripcion, evento.dia, evento.hora));
                ramo=evento.id;
            }
            else{
                var aux = array.get(evento.codigo);
                aux.update(evento.nombre, evento.descripcion, evento.dia, evento.hora);
                array.set(evento.codigo, aux);
                ramo=evento.id;

            }

        }

        if(!asignatura.has(ramo)){
            asignatura.set(ramo, array);

        }
        else{
            var aux = array.get(evento.codigo);
            aux.update(evento.nombre, evento.descripcion, evento.dia, evento.hora);
            array.set(evento.codigo, aux);
            ramo=evento.id;

        }

    }



    for (let value of asignatura.values()) {
        console.log(value);
    }



    //recursive(ramos);

}



function recursive(ramos){

    var aux = [];
    var exp= [];
    var asignatura = "";

    if(ramos.length != 0){
        asignatura = ramos[0].id;

    }
    else{
        return;
    }

    for(let i = 0; i < ramos.length; i++){

        if(ramos[i].id == asignatura){

            aux.push(ramos[i]);

        }
        else{
            exp.push(ramos[i]);
        }
    }
//

    var seccion = [];
    var asignatura_sec = [];
    for(let i = 0; i < aux.length; i++){
        if(aux[i].codigo == ""){
            seccion.push(aux[i]);
        }
    }
    
}


class seccion {

    id;
    nombre_asignatura;
    codigo;
    nombre = [];
    descripcion = [];
    dia = [];
    hora = [];

    constructor(id, nombre_asignatura, codigo, nombre, descripcion, dia, hora) {
        this.id = id;
        this.nombre_asignatura = nombre_asignatura;
        this.codigo = codigo;
        this.nombre.push(nombre);
        this.descripcion.push(descripcion);
        this.dia.push(dia);
        this.hora.push(hora);
    
    }


    update(nombre, descripcion, dia, hora){
        this.nombre.push(nombre);
        this.descripcion.push(descripcion);
        this.dia.push(dia);
        this.hora.push(hora);
    }


}

class materia {

    secciones = [];

    constructor(seccion) {
        secciones.push(seccion);
    
    }


    update(seccion){
        secciones.push(seccion);
    }


}