angular.module("app").controller('FiltersController', FiltersController);

function FiltersController ($scope, $parse) {
	var vm = this;
	vm.filtersView = 'app/filters/filters.html';
}