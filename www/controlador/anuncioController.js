myapp.controller('anuncio',function($scope,$http,$location){
//MODULO MODULO PARA EL REGISTRO DE EMPRESAS MENDIANTE UNA SOLICITUD QUE ES ENVIADA AL COMPILADOR PARA SER REGISTRADA
//AUTOR: JOSUE MATUZALEM
//FECHA: 18 DE MAR DEL 2017

$scope.err=null;
$scope.err1=null;
$scope.succes=null;
//SE CREA LAS VARIABLES PARA SER USADAS EN LA PAGINA DE ANUNCIARSE
	$scope.nombreHostal="";
	$scope.descripcion="";
	$scope.direccion="";
	$scope.telefono="";
	$scope.aas="";
	$scope.giro="Hostal";
	$scope.gerente="";
	$scope.web="";
	$scope.mensaje="";


//LA FUNCION MANDA LA INFOMRACION A ANUNCIO.PHP
//CREA UNA VARIABLE DE FORMA JSON PARA 
$scope.anunciar=function(a,b,c,d,e,f,g,h){
$scope.nombreHostal=a;
$scope.descripcion=b;
$scope.direccion=c;
$scope.telefono=d;
$scope.aas=e;
$scope.gerente=f;
$scope.web=g;
$scope.mensaje=h;
  if (($scope.nombreHostal.trim() != '') && ($scope.descripcion.trim() != '') && ($scope.direccion.trim() != '') && ($scope.telefono.trim()!= '') && ( $scope.aas.trim() != '')  && ($scope.gerente.trim() != '') && ($scope.web.trim() != '') && ($scope.mensaje.trim() != '') ) {

  var parametro = {
  'nombre':$scope.nombreHostal,
  'descripcion':$scope.descripcion,
  'direccion':$scope.direccion,
  'telefono':$scope.telefono,
  'email':$scope.aas,
  'giro':$scope.giro,
  'gerente':$scope.gerente,
  'pagina':$scope.web,
  'mensaje':$scope.mensaje
  };
  //SE MANDA EN UN $HTTP LA INFOMRACION SI ES SATISFACTORIA SE MANDA UN MENSAJE Y OTRO
  $http({data:parametro,
            method : "POST",
            url : "http://localhost/cate/api/anucio.php",
            headers:{'Content-Type':undefined},
            dataType: "jsonp"
        }).then(function mySucces(response) {
  //console.log(response);
           $scope.respuesta = response.data;   
            $scope.succes = 'El mensaje se ha enviado correctamente, espere nuestra respuesta';
            $scope.err=null;
            $scope.err1=null;
                $scope.nombreHostal='';
                $scope.descripcion='';
                $scope.direccion='';
                $scope.telefono='';
                $scope.aas='';
                $scope.gerente='';
                $scope.web='';
                $scope.mensaje='';
        }, function myError(response) {
    
            $scope.respuesta = response.statusText;
            $scope.err1='Ha ocurrido un error :( por favor intentalo de nuevo';
            $scope.err=null;
            $scope.succes=null;

     });

  }else{


    $scope.err1=null;
    $scope.succes=null;
    $scope.err="Faltan campos";
  }



}



    $http.get("http://localhost/cate/api/slide.php").then(function(response){
      $scope.slides=response.data;
  });
     $scope.myInterval = 3000;   

});