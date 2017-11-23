angular.module("app").controller('PaginationController', PaginationController);

function PaginationController ($scope) {
	var vm = this;
	vm.paginationView = 'app/components/pagination.html';

	  vm.paging = {
	    total: $scope.pages.quantity, //interaction companiesController
	    current: 1,
	    onPageChanged: loadPages,
	  };

	  function loadPages() {
	    $scope.pages.current = vm.paging.current; //interaction companiesController
	     // console.log('Current page is : ' + $scope.pages.current);
	  }

	  $scope.$watch('pages.quantity', function (newQuantityPages, oldQuantityPages) { //interaction companiesController
	  	vm.paging.total = newQuantityPages;
	  });

	  $scope.$watch('pages.current', function (newCurrentPages) { //interaction companiesController
	  	vm.paging.current = newCurrentPages;
	  });


}