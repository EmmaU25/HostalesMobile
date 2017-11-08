myapp.controller('directorio',function($scope,$http,$location){
//MODULO PARA REALIZAR EL DIRECTORIO
//AUTOR: JOSUE MATUZALEM
//FECHA: 18 DE MAR DEL 2017

//SE REALIZA LA CONSULTA PARA EL EL DIRECTORIO
$http.get("http://localhost/cate/api/destinos.php").then(function(response){

	$scope.elementos=response.data;
	});
	//PARA IR A LA PAGINA DE CONSULTA EN CASO DE UNA INFROMACION MAS ESPECIFICA
	$scope.ir=function(_ti){
		$location.path('/consulta/'+_ti.idhostales);
	}
//METODO PARA EL SLIDER
	$http.get("http://localhost/cate/api/slide.php").then(function(response){
      $scope.slides=response.data;
    });
    $scope.myInterval = 3000;   
});