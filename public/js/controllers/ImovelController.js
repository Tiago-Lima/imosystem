angular.module('imobiliaria').directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
}).controller('ImovelController', function($scope, Imovel, $routeParams, $timeout){

	$scope.mensagem = {texto: ''};

	if($routeParams.imovelId){
		Imovel.get({id: $routeParams.imovelId}, 
		function(imovel){
			$scope.imovel = imovel;
			console.log(imovel);
		}, 
		function(erro){
			$scope.mensagem = {
				texto: 'Não foi possível obter o imovel'
			};
			console.log(erro);
		});
	}else{
		$scope.imovel = new Imovel();
	}

	$scope.salva = function(){
		$scope.imovel.$save().then(function(){
			$scope.mensagem = {
				texto: 'Salvo com sucesso'
			};

			$timeout(function(){ 
				$scope.mensagem = {
					texto: ''
				};
				window.location.href = '#/'
			}, 2000);

			$scope.imovel = new Imovel();
		}).catch(function(erro){
			$scope.mensagem = {
				texto: 'Não foi possível salvar'
			};
			console.log(erro);
		});
	};

	Imovel.query(function(imoveis){
		$scope.imoveis = imoveis;
	});

	$scope.listaCaracteristicas = [
		{
			nome: 'Academia'
		}
	];

	$scope.inserirCaracteristicas = function(){
		$scope.listaCaracteristicas.push({nome: $scope.caracteristicas});
		$scope.caracteristicas = '';
	}

});
