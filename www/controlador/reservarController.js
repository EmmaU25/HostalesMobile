myapp.controller('reserva',function ($scope,$http,$stateParams,$location,$ionicHistory) {
$scope.valor="";
//MODULO PARA REALIZAR LA RESERVA DEL HOSTAL
//AUTOR: JUAN COLORADO
//FECHA: 17 DE MAR DEL 2017

//SE CREAN LAS VARIABLES 
$scope.respuesta="";
$scope.pes1 =true;
$scope.pes2 =false;
$scope.pes3 =false;
$scope.pes4 =false;
$scope.CurrentDate = new Date();
$scope.CurrentDate1 = new Date();
$scope.propietario="";
$scope.codigo ="";
$scope.numeroCuenta="";
$scope.banco="BANAMEX";
$scope.tipoTarjeta="DEBITO";
$scope.respuesta="ESPERANDO CONFIRMACION";
$scope.nombreCliente="", $scope.apellidoCliente = "", $scope.pais = "MX" , $scope.fechaNacimiento="";

//SE CONSULTA LOS CUARRTOS DE LOS HOSTALES
	$http.get("http://localhost/cate/api/cuartos.php",{params:{i:$stateParams.idProducto}}).then(function(response){
		
		$scope.cuartos=response.data;
		//SE ALMACENA LOS PRIMEROS DATOS PARA SER MOSTRADOS EN LA VISTA
		$scope.precio=$scope.cuartos[0]["precio"];
		$scope.total = $scope.precio;
		$scope.valor=$scope.cuartos[0]["id"];
		$scope.name = $scope.cuartos[0]["nombre"];
		
	});

	//METODO PARA CALCULAR EL PRECIO MENDIANTE LA SELECCION DEL CUARTO
	$scope.calcularPrecio = function(va,a,b){
//Se hace la consulta del cuarto y se almacena el precio y nombre
	$http.get("http://localhost/cate/api/cuartos.php",{params:{o:va}}).then(function(response){
		$scope.precio=response.data[0]['precioxdia'];
		$scope.name=response.data[0]['nombre'];
	});

	//saca la diferncia de dias y los multiplica por el precio en caso de ser un dia no multiplica solo asigna el precio a total
	if($scope.diferenciaEntreDiasEnDias(a,b) <= 0){
	$scope.total = $scope.precio;
	}else{
		//en caso de ser mas dias lo multiplica
	$scope.total = $scope.diferenciaEntreDiasEnDias(a,b) * $scope.precio;
	}

	}


	//el metodo calcular se usa para saber la cantidad mendiante los dias
$scope.calcularPrecio2 = function(a,b){
	var day =  $scope.diferenciaEntreDiasEnDias(a,b) ;
	//alert(day);
		if(day <= 0){
			$scope.total = $scope.precio;
		}else{
			$scope.total = day * $scope.precio;
		}
}

//se calculan los dias con la funcion, se mandan como parametros las fechas y regresa el dia
$scope.diferenciaEntreDiasEnDias=function(a, b)
{

var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / MILISENGUNDOS_POR_DIA);
}





//metodo para ocultar y pasar al siguiente tab, este realiza el metodo calcular precio2 por cualquier cosa que le usuario no de clic bien 
//en la fecha y no se actualize el precio
$scope.siguiente1=function(a,b){
	$scope.calcularPrecio2(a,b);
$scope.pes1 =false;
$scope.pes2 =true;
$scope.pes3 =false;
$scope.pes4 =false;
}

//metodo apra realizar los datos del cliente verifica que no sean campos vacios
$scope.siguiente2=function(a,b,c){
$scope.nombreCliente=a;	
$scope.apellidoCliente=b;
$scope.fechaNacimiento=c;

if (($scope.nombreCliente.trim() != "" ) && ($scope.apellidoCliente.trim() != "" ) && ($scope.fechaNacimiento != "") ) {
$scope.pes1 =false;
$scope.pes2 =false;
$scope.pes3 =true;
$scope.pes4 =false;	
$scope.error1=null;
}else{
	$scope.error1="Faltan campos";
}



}
//crea una variable idhistorial
$scope.idhistorial=0;

$scope.siguiente3=function(a,b,c,d){
//los datos son enviados a reserva.php
$scope.propietario=a;
$scope.numeroCuenta=b;
$scope.codigo=c;

	if (($scope.propietario.trim() != "") && ($scope.numeroCuenta.trim() != "") && ($scope.codigo.trim() != "")  ) {
		var parametro={
	 	"numeroTarjeta":$scope.numeroCuenta,
	 	"propietarioTarjeta":$scope.propietario,
	 	"codigoTarjeta":$scope.codigo,
	 	"tipoTarjeta":$scope.tipoTarjeta,
	 	"bancoTarjeta":$scope.banco,
	 	"nombreCliente":$scope.nombreCliente,
	 	"apellidoCliente":$scope.apellidoCliente,
	 	"pais":$scope.pais,
	 	"fechaNacimiento":$scope.fechaNacimiento,
	 	"idHostal":$stateParams.idProducto,
	 	"total":$scope.total,
	 	"fechaInicial":$scope.CurrentDate,
	 	"fechaFin":$scope.CurrentDate1,
	 	"cuarto":$scope.name 
	 };
	 	//se envian mediante post a reserva.php y el resultado en caso de satisfactorio se imprime una palomita y en caso de error una X
			$http({data:parametro,
        		method : "POST",
    		    url : "http://localhost/cate/api/reserva.php",
    		    headers:{'Content-Type':undefined},
    		    dataType: "jsonp"
    		}).then(function mySucces(response) {
        		$scope.idhistorial = response.data['idhistorial'];		
				$scope.respuesta = response.data['respuesta'];
				$scope.img='imagen/b.jpg';



    		}, function myError(response) {
    		    $scope.respuesta = response.statusText;
    		    $scope.img='imagen/x.jpg';
 		   });
	//se manda al ultimo tab
		$scope.pes1 =false;
		$scope.pes2 =false;
		$scope.pes3 =false;
		$scope.pes4 =true;
		$scope.error2=null;
	}else{
		$scope.error2="Faltan campos";
	}

$scope.terminar=function(){
$scope.respuesta="";
$scope.pes1 =true;
$scope.pes2 =false;
$scope.pes3 =false;
$scope.pes4 =false;
$scope.CurrentDate = new Date();
$scope.CurrentDate1 = new Date();
$scope.propietario="";
$scope.codigo ="";
$scope.numeroCuenta="";
$scope.banco="BANAMEX";
$scope.tipoTarjeta="DEBITO";
$scope.respuesta="ESPERANDO CONFIRMACION";
$scope.nombreCliente="", $scope.apellidoCliente = "", $scope.pais = "MX" , $scope.fechaNacimiento="";
$location.path('#/tab/home');
$ionicHistory.clearCache();
}

}

//metodos para realizar el back en las pestañas
$scope.atras2=function(){
$scope.pes1 =true;
$scope.pes2 =false;
$scope.pes3 =false;
$scope.pes4 =false;
}

$scope.atras3=function(){
$scope.pes1 =false;
$scope.pes2 =true;
$scope.pes3 =false;
$scope.pes4 =false;
}




});