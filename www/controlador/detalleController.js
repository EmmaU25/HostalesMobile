myapp.controller('detalle',function($scope,$http,$location,$stateParams){
//MODULO PARA REALIZAR LA SOLICITUD DEL HOSTAL
//AUTOR: JUAN COLORADO
//FECHA: 17 DE MAR DEL 2017


//SE REALIZAN LAS CONSULTAS PARA SER MOSTRADAS EN LA PAGINA DATOS, IMAGENES Y COMENTARIOS
$http.get("http://localhost/cate/api/detalle.php",{params:{i:$stateParams.idProducto}}).then(function(response){
	//alert(response.data[0]);

	$scope.hostal=response.data[0];
	});

$http.get("http://localhost/cate/api/detalle.php",{params:{o:$stateParams.idProducto}}).then(function(response){
	//alert(response.data[0]);
	//console.log(response.data);
	$scope.cuartos=response.data;
	});


$http.get("http://localhost/cate/api/imagenes.php",{params:{i:$stateParams.idProducto}}).then(function(response){
	$scope.per=response.data;

	$scope.im1=$scope.per[0]["url"];
	$scope.im2=$scope.per[1]["url"];
	$scope.im3=$scope.per[2]["url"];
	$scope.im4=$scope.per[3]["url"];
	});


$scope.refrescarComentarios=function(){
$scope.comen=[]; 
$http.get("http://localhost/cate/api/comentarios.php",{params:{i:$stateParams.idProducto}}).then(function(response){
	$scope.comen=response.data;

	});
}
$scope.refrescarComentarios();


$scope.comentar= function(na,com){
	$http.post("http://localhost/cate/api/addComentario.php",{comentario: com, idhostal: $stateParams.idProducto ,nombre: na},{
    	headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}).success(function(respuesta){
			$scope.asa = respuesta;	
			$scope.refrescarComentarios();
			$scope.comentario='';
			$scope.nombre='';

		})
		
}




//METODO PARA MANDAR A ADDRESERVA
$scope.irReserva=function(){
	$location.path('/reservar/'+$stateParams.idProducto);
}
//MUESTRA LAS INAGENES EN EL SLIDER

    $http.get("http://localhost/cate/api/slide.php").then(function(response){
      $scope.slides=response.data;
    });
     $scope.myInterval = 3000;   

});
