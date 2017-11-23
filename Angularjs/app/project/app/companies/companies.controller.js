angular.module("app").controller('CompaniesController', CompaniesController);

function CompaniesController ($scope, $http, baseUrl, $mdDialog, $parse, cfpLoadingBar, $timeout) {
	var vm = this;
	vm.companiesView = 'app/companies/companies.html';
	vm.dialogView = 'app/companies/dialog.html';

	function rejected(error) {
		console.log(error.status);
		console.log(error.statusText);
	}

	vm.refresh = function () {
		var promise = $http.get(baseUrl);
		promise.then(fulfilledRefresh, rejected);

		function fulfilledRefresh(response) {
			vm.companiesItems = response.data.success;
			vm.filtratedCompaniesItems = angular.copy(vm.companiesItems);
			$scope.changeQuantityPages();
			$timeout(function () {
				$mdDialog.hide();
			}, 1200);
		}
	};
	vm.create = function (item) {
		var promise = $http.post(baseUrl, item);
		promise.then(fulfilledCreate, rejected);

		function fulfilledCreate(response) {
			vm.filtratedCompaniesItems.push(response.data.success);
			vm.companiesItems.push(response.data.success);
			// $scope.changeQuantityPages();
			$scope.filtrCompanies();
		}
	};

	vm.update = function (item, companyName) {
		var promise = $http({
								url: baseUrl + companyName,
								method: 'PUT',
								data: item
							});
		promise.then(fulfilledUpdate, rejected);

		function fulfilledUpdate (response) {
			var modifiedItem = response.data.success;

			updateView (vm.filtratedCompaniesItems);
			updateView (vm.companiesItems);

			function updateView (items) {
				for (var i = 0; i < items.length; i++) {
					if (items[i].companyName === companyName) {
						items[i] = modifiedItem; // update view
						break;
					}
				}
			}
		}
	};
	vm.delete = function (item) {
		var promise = $http({
								url: baseUrl + item.companyName,
								method: "DELETE",
							});
		promise.then(fulfilledDelete, rejected);

		function fulfilledDelete () {
			vm.companiesItems.splice(vm.companiesItems.findIndex(function (elem) {
				return elem.companyName === item.companyName;
			}), 1);

			vm.filtratedCompaniesItems.splice(vm.filtratedCompaniesItems.indexOf(item), 1);
			$scope.changeQuantityPages();
		}
	};

	vm.editOrCreate = function (item) {
		vm.currentItem = item ? angular.copy(item) : {};
	};

	vm.saveEdit = function (item, companyName) {
		if(vm.flagUpdateOrCreate === 'udate') {
			vm.update(item, companyName);
		} else {
			vm.create(item);
		}
	};

	vm.refresh();
	
	
	//////////// for pagination

	vm.defaultQuantityElemsForOnePage = 5;
	vm.defaultCurrentPage = 1;

	
	vm.quantityElemsForOnePage = vm.defaultQuantityElemsForOnePage;

	$scope.pages = {current: vm.defaultCurrentPage, quantity: ""};

	$scope.changeQuantityPages = function () {
		$scope.pages.quantity = Math.ceil(vm.filtratedCompaniesItems.length / vm.quantityElemsForOnePage);
		$scope.pages.current  = vm.defaultCurrentPage;

		if( !isFinite($scope.pages.quantity) ) { //if not the correct data
			
			$scope.pages.quantity = Math.ceil(vm.filtratedCompaniesItems.length / vm.defaultQuantityElemsForOnePage);
		}
	};
	
	////////////

	  $scope.deleteDialog = function(ev, item) {
	    // Appending dialog to document.body to cover sidenav in docs app
	    var confirm = $mdDialog.confirm()
	          .title('Are you sure to delete?')
	          .textContent('Restoration of data can not be.')
	          .targetEvent(ev)
	          .ok('Delete')
	          .cancel('Cancel');

	    $mdDialog.show(confirm).then(function() {
	    	vm.delete(item);
	    }, function() {
	      	console.log("not delete")
	    });
	  };


	  $scope.editOrCreateDialog = function(ev, item, flagUpdateOrCreate) {
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'dialog1.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    });

	    vm.flagUpdateOrCreate = flagUpdateOrCreate;
	    vm.editOrCreate(item);
	    vm.currentCompanyName = vm.currentItem.companyName;
	    if (!vm.currentItem.companyGoods) {  // at least 1 product
	    	vm.currentItem.companyGoods = [];
	    	vm.currentItem.companyGoods.push("");
	    }
	  };

	  function DialogController($scope, $mdDialog) {
	  	
	  	$scope.currentItem = vm.currentItem;

	  	$scope.newProduct = function () {
	  		$scope.currentItem.companyGoods.push("");
	  	};
	  	
	  	$scope.chackUnique = function () {
	  		for (var i = 0; i < vm.companiesItems.length; i++) {
	  			if (vm.companiesItems[i].companyName === $scope.currentItem.companyName && vm.companiesItems[i].companyName !== vm.currentCompanyName) {
	  				$scope.editorForm.nameCompany.$setValidity('notOriginal', false);
	  				break;
	  			} else {
	  				$scope.editorForm.nameCompany.$setValidity('notOriginal', true);
	  			}
	  		}
	  	};

	  	$scope.deleteProduct = function (index) {
	  		$scope.currentItem.companyGoods.splice(index, 1);
	  	};

	    $scope.hide = function() {
	      $mdDialog.hide();

	    };

	    $scope.save = function() {
	    	vm.saveEdit(vm.currentItem, vm.currentCompanyName);
	    	$mdDialog.hide();
	    };

	    $scope.getError = function (error) {
	    	if (angular.isDefined(error) ) {
	    		if (error.required) {
	    			return "Required";
	    		} else if (error.notOriginal) {
	    			return "The company name must be unique";
	    		}
	    	}
	    };
	  }
	  $scope.search = {companyName: '', companyGoods: ''};
	  $scope.filtrCompanies = function () {
	  	vm.companiesItemsJSON = JSON.stringify(vm.companiesItems);
	  	$scope.expr = vm.companiesItemsJSON + '| filter:{companyName: "' + $scope.search.companyName + '", companyGoods: "' + $scope.search.companyGoods + '"}';

	  	var fn = $parse($scope.expr);
	  	vm.filtratedCompaniesItems = fn();
	  	$scope.changeQuantityPages();
	  };


	  $scope.progressDialog = function(ev) {
	  	$mdDialog.show({
	  	  templateUrl: 'app/progress/progress.html',
	  	  clickOutsideToClose:true
	  	});
	  }

	  $scope.progressDialog();
}