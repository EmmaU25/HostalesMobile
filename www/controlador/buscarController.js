myapp.controller('buscar', function($scope,$http,$state){


	$scope.barra={}
	$scope.barra.show=false;


	$scope.pos=function(){
		$scope.barra.show= ! $scope.barra.show;
	}

	$scope.ire = function(palabra){
		$scope.j = palabra;
	}
});