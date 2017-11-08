myapp.controller('promo',function($scope,$http,$location,$ionicHistory,$state){
//MODULO PARA REALIZAR LA BUSQUEDA MENDIANTE UNA PALABRA
//AUTOR: EMMANUEL YAH
//FECHA: 17 DE MAR DEL 2017

// SE CONSULTA LOS PRODUCTOS DE LA PAGINA HOME Y SE MUESTRA 
$http.get("http://localhost/cate/api/productos.php").then(function(response){
	$scope.elementos=response.data;
	});
	//PARA IR A CONSULTAS
	$scope.ir=function(_ti){
			$location.path('/consulta/'+_ti.idhostales);
	}
	
	$ionicHistory.clearCache().then(function(){ $state.go('tab.dash') })
	//slide de la pagina
	/*$http.get("api/slide.php").then(function(response){
      $scope.slides=response.data;
    });
     $scope.myInterval = 3000;   */
});