myapp.controller('busqueda',function($scope,$http,$stateParams){
//SE RECUPERA LA PALABRA MEDIANTE $ROUTEPARAMS
$scope.palabra = $stateParams.palabraClave;
    $http.get("http://localhost/cate/api/busqueda.php",{params:{i:$stateParams.palabraClave}}).then(function(response){
        $scope.data=response.data; 
        //SE HACE UNA CONSULTA PARA SABER LOS DATOS Y LA OTRA PARA EL NUMERO DE DATOS
        $http.get("http://localhost/cate/api/busqueda.php",{params:{d:$stateParams.palabraClave}}).then(function(response){
        var num=response.data;
        $scope.numeroRow = parseFloat(num[0]['num']);
        });
    });
 //SE ORDENA POR 10 REGISTRO, COMIENZA EN LA APGIAN 1
 $scope.viewby = 10;
  //$scope.totalItems = $scope.numeroRow;
  $scope.currentPage = 1;
  //CUANTAS PAGINAS POR VISTA Y EL NUMERO DE PAGINAS QUE SE MOSTRARAN
  $scope.itemsPerPage = $scope.viewby;
  $scope.maxSize = 5; 

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
  $scope.pageChanged = function() {
  };

$scope.setItemsPerPage = function(num) {
  $scope.itemsPerPage = num;
  $scope.currentPage = 1; //reset to first paghe
}

  //CONSULTA PARA SABER LAS IMAGENES EN EL SLIDER

    $http.get("api/slide.php").then(function(response){
      $scope.slides=response.data;
    });
     $scope.myInterval = 3000;   
});