let seccionEscogida = "textodepruebaqueseraborradoluego";
var ListComboBox = []
var storage = 0;
localStorage.clear();
sessionStorage.clear();
var numeroCombo = 0;

function generarTabla(){

    loadDoc();

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

                select += '<option value=' + item.id + ' >' + item.nombre_carrera + '</option>';

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
                        <div id = "DivSeccion'+i+'" name="DivSeccion'+i+'"> \
                                    <select id = "ComboBoxSeccion'+i+'" name="ComboBoxSeccion'+i+'" onchange="ShowSeccionSelected('+i+');" > <option disabled selected>Seccion </option>\
                                    </select>  \
                        </div> <br>\
                        <!-- Bloque Combobox -->';

            }
            ComboBoxRamo.innerHTML += aux3;

// 
        }
    }

}

function ShowRamoSelected(n){            /* Funcion para agregar las secciones una vez agregado los ramos */
    /* Para obtener el valor */
    var tmp = sessionStorage.getItem("codigo"+n)
    if(tmp!=null && tmp!= ""){changeRamo(n);}
    
    sessionStorage.removeItem("codigo"+n);
    var id_carrera = document.getElementById("carrera").value;
    var ComboBoxRamo = document.getElementById("ComboBoxRamo"+n).value;/* para saber el ramo que se selecciono*/ 
    var ComboBoxSeccion = document.getElementById("DivSeccion"+n);/* para saber el ramo que se selecciono*/ 

    const xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", "./secciones/" + id_carrera + "/" + ComboBoxRamo);
    xhttp.send();
    
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let datos = JSON.parse(this.responseText);
    
                ComboBoxSeccion.innerHTML = ""; //Limpia el HTML que contenga la tabla
                var select = '<select id = "ComboBoxSeccion'+n+'" name="ComboBoxSeccion'+n+'" onchange="ShowSeccionSelected('+n+');"> <option disabled selected>Seccion </option> ';
                
                const aux = []; //basicamente se creo este arreglo para que al momento de poner en la combobox de secciones, no se repitan las secciones, pues cada una puede ser ayudantia, catedra, laboratorio, tesis, etc
                //console.log("Cookies: " + sessionStorage.length);
//---
// Objetivo: Guardar los codigos de las secciones que chocan entre si dentro de un arreglo. Luego los diferenciamos con IF 
var bloqueCookies = []; 
var diccionary = {};

                for(let index = 0 ; index < sessionStorage.length ; index++){   //recorremos todas las cookies si es que tenemos
                    for(let coockie of JSON.parse(sessionStorage.getItem(sessionStorage.key(index)))){   //dentro de esos elemenos, hay distintos eventos con distintas horas y dias
                        var bloqueHoraCookie = getHoras(coockie.hora);
                        var bloqueDiasCookie = getDias(coockie.dia);

                        for(let i = 0 ; i < bloqueDiasCookie.length ; i++){       //se debe recorrer el storage a ver cuantos elementos hay
                            for(let j = 0 ; j < bloqueHoraCookie.length ; j++){ 
                                bloqueCookies.push(bloqueHoraCookie[j] + "" + bloqueDiasCookie[i]);
                            }
                        }
                    }
                }


                for(let item of datos){
                    var choqueDeDias = false;


                    var bloqueSeleccionado = []; 
                    var bloqueHora = getHoras(item.hora);
                    var bloqueDias = getDias(item.dia);

                    for(let k = 0; k < bloqueDias.length ; k++){
                        for(let h = 0; h < bloqueHora.length ; h++){
                            bloqueSeleccionado.push(bloqueHora[h] + "" + bloqueDias[k]);

                        }
                    }

                for(let p = 0; p < bloqueSeleccionado.length ; p++){            //se comprueba si un ramo choca con otro
                    if(bloqueCookies.includes(bloqueSeleccionado[p]) == true){
                        choqueDeDias = true;
                    }
                }

//--- 

                    if(aux.indexOf(item.codigo) == -1 && item.descripcion.includes("TEDRA")){
                        if(choqueDeDias == false){
                            diccionary[item.codigo] = "<option value=" + item.codigo + " title="+item.hora +" >" + item.codigo + " | " /*+ item.dia + " " + item.hora  + ' | ' */ + item.nombre +"</option>";
                            aux.push(item.codigo);
                            
                        }
                        else{ // si se encontro alguna coincidencia con otra seccion, que la desactive porque es true
                            diccionary[item.codigo] = '<option value="' + item.codigo + '" disabled>' + item.codigo+ ' | '  /*+ item.dia + " " + item.hora  + ' | ' */ + item.nombre +'</option>';
                            aux.push(item.codigo);
                        }
                    }
                    else if (item.descripcion.includes("TEDRA") ){
                        if(choqueDeDias == true){
                            diccionary[item.codigo] = '<option value="' + item.codigo + '" disabled>' + item.codigo+ ' | '  /*+ item.dia + " " + item.hora  + ' | ' */ + item.nombre +'</option>';
                            
                        }
                    }

                }

                for(let val in diccionary){
                
                    select+= diccionary[val];

                }

                select+="</select>";
                ComboBoxSeccion.innerHTML = select;
            }
        }

}


function ShowSeccionSelected(n){
    var id_carrera = document.getElementById("carrera").value;
    var ComboBoxRamo = document.getElementById("ComboBoxRamo"+n).value;/* para saber el ramo que se selecciono*/ 
    var ComboBoxSeccion = document.getElementById("ComboBoxSeccion"+n).value;/* para saber el ramo que se selecciono*/ 
    var tmp = sessionStorage.getItem("codigo"+n);

    const xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", "./secciones/" + id_carrera + "/" + ComboBoxRamo);
    xhttp.send();
    
    xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var datos = JSON.parse(this.responseText);

                var auxiliar = [];
                if(tmp!=null && tmp !=""){       //limpia el ramo anterior
                    changeRamo(n);
                }

                for(let item of datos){
    
                    if( item.codigo == ComboBoxSeccion){


                        ModificateTable(item);
                        auxiliar.push(item);
                        // para quitar la seleccion que se hizo antes

                    }    
                }
                               //si no hay ramo obstruyendo, pongalo en cookies
                    sessionStorage.setItem("codigo"+n, JSON.stringify(auxiliar)  );       //OJO ACA, Esto define si se podra quitar o no
                                        aplicarTodosLosCombobox( ComboBoxSeccion, n);  //esta funcion lo que hace es que al seleccionar una seccion, en todos los combobox se deben actualizar para tomar ramos

                    localStorage.setItem("ramo"+n,this.responseText);        //guaramos lo que pongamo en la caja

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

function ModificateTable(evento){

    //console.log(evento);
    var dias = getDias(evento.dia);                                    //devuelve los dias en numeros
    var hora = getHoras(evento.hora);                                    //devuelve los dias en numeros

//Definimos si la hora o el dai esta definido, sino se lanzara un ALERT en la pagina

if(dias.length ==0){
    alert("ADVERTENCIA " + evento.descripcion + " NO tiene dias definidos aun... Consulte secretaria de estudios.");
}
if(hora.length ==0){
    alert("ADVERTENCIA " + evento.descripcion + " NO tiene horas definidas aun... Consulte secretaria de estudios.");
}

///////////////////////////////////////////////////////////////////////////////

    for(let i = 0; i < dias.length ; i++){
        for(let j = 0; j < hora.length ; j++){
            var td = document.getElementById(hora[j] + "" + dias[i]);
            //console.log(td.innerHTML);
            if(td.innerHTML != "." && evento.nombre_asignatura != td.innerHTML){                        // si es distinto de un bloque vacio, esp orque hay un ramo obstruyendo

                alert("La seccion que selecciona, esta siendo obstruida por otra");
                location.reload();
            }

        }
    }


    for(let i = 0; i < dias.length ; i++){
        for(let j = 0; j < hora.length ; j++){
            var td = document.getElementById(hora[j] + "" + dias[i]);
            td.innerHTML = ""; 
            td.innerHTML = " <p> " + evento.nombre_asignatura +  "</p>" + " <small> " + evento.nombre + "; " + evento.descripcion + "</small>";
        }
    }
    
    
}


function changeRamo(n){
    let datos = JSON.parse(sessionStorage.getItem("codigo"+n));
    //console.log(datos);

    for(let item of datos){
        //console.log(item.dia);
        //console.log(item.hora);

        var dias = getDias(item.dia);                                    //devuelve los dias en numeros
        var hora = getHoras(item.hora);                                    //devuelve los dias en numeros    
    ///////////////////////////////////////////////////////////////////////////////

        for(let i = 0; i < dias.length ; i++){
            for(let j = 0; j < hora.length ; j++){
                var td = document.getElementById(hora[j] + "" + dias[i]);
                td.innerHTML = "."; 
            }
        }
    }
}


function aplicarTodosLosCombobox( ComboBoxSeccionSelected, n){


    for(let i = 1 ; i < 7 ; i++){
        var SelectionComboBoxSeccion = document.getElementById("ComboBoxSeccion"+i).value;/* para saber el ramo que se selecciono*/ 
                 // problema es que las ayudantias vienen primero

        if(i != n &&  SelectionComboBoxSeccion != "Seccion"){

            var ComboBoxSeccion = document.getElementById("ComboBoxSeccion"+i);/* para saber el ramo que se selecciono*/ 

            //ahora limpio todo el combobox porque ya tengo el valor escogido guardado

            ComboBoxSeccion.innerHTML = "";
            var select = '<option disabled >Seccion </option> ';
        
            //ahora vuelvo a poner los mismos valores PERO con los ramos que no se pueden tomar y el seleccionado

                let datos = JSON.parse(localStorage.getItem("ramo"+i));

                    var diccionary = {};
                    const aux4 = [];
//

                    // Objetivo: Guardar los codigos de las secciones que chocan entre si dentro de un arreglo. Luego los diferenciamos con IF 
                    var bloqueCookies = []; 
                    var diccionary = {};

                        for(let index = 0 ; index < sessionStorage.length ; index++){   //recorremos todas las cookies si es que tenemos
                            if(index+1 != i){ // es necesario no incluir la materia que se esta cambiando
                                for(let coockie of JSON.parse(sessionStorage.getItem(sessionStorage.key(index)))){   //dentro de esos elemenos, hay distintos eventos con distintas horas y dias
                                    var bloqueHoraCookie = getHoras(coockie.hora);
                                    var bloqueDiasCookie = getDias(coockie.dia);

                                    for(let k = 0 ; k < bloqueDiasCookie.length ; k++){       //se debe recorrer el storage a ver cuantos elementos hay
                                        for(let j = 0 ; j < bloqueHoraCookie.length ; j++){ 
                                            bloqueCookies.push(bloqueHoraCookie[j] + "" + bloqueDiasCookie[k]);
                                        }
                                    }
                                }
                            }
                        }

                
                    for(let dato of datos){


                        var choqueDeDias = false;


                        var bloqueSeleccionado = []; 
                        var bloqueHora = getHoras(dato.hora);
                        var bloqueDias = getDias(dato.dia);
    
                        for(let k = 0; k < bloqueDias.length ; k++){
                            for(let h = 0; h < bloqueHora.length ; h++){
                                bloqueSeleccionado.push(bloqueHora[h] + "" + bloqueDias[k]);
    
                            }
                        }
    
                    for(let p = 0; p < bloqueSeleccionado.length ; p++){            //se comprueba si un ramo choca con otro
                        if(bloqueCookies.includes(bloqueSeleccionado[p]) == true){
                            choqueDeDias = true;
                        }
                    }
//arreglamos la combobox

                        if(aux4.indexOf(dato.codigo) == -1 && dato.descripcion.includes("TEDRA") && SelectionComboBoxSeccion != "" && SelectionComboBoxSeccion != null){
           
                            if(SelectionComboBoxSeccion == dato.codigo){

                                diccionary[dato.codigo] = "<option value=" + dato.codigo + " title="+dato.hora +" selected>" + dato.codigo + " | " /*+ dato.dia + " " + dato.hora  + ' | ' */ + dato.nombre +"</option>";
                                aux4.push(dato.codigo);
                            }
                            else if (!choqueDeDias){ // si no hay choque de dias, entonces que lo ponga como opcion seleccionable

                                diccionary[dato.codigo] = "<option value=" + dato.codigo + " title="+dato.hora +" >" + dato.codigo + " | " /*+ dato.dia + " " + dato.hora  + ' | ' */ + dato.nombre +"</option>";
                                aux4.push(dato.codigo);

                            }
                            else if (choqueDeDias){ // si no hay choque de dias, entonces que lo ponga como opcion seleccionable

                                diccionary[dato.codigo] = "<option value=" + dato.codigo + " title="+dato.hora +" disabled>" + dato.codigo + " | " /*+ dato.dia + " " + dato.hora  + ' | ' */ + dato.nombre +"</option>";

                            }
                        }

                    }

                    for(let val in diccionary){
                
                        select+= diccionary[val];
    
                    }
    
                    ComboBoxSeccion.innerHTML = select;


                }
         
        
    }
}
