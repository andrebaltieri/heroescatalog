(function () {
    'use strict';
    var controllerId = 'HeroController';

    angular.module('app').controller(controllerId, ['$scope', 'HeroesRepository', HeroController]);

    function HeroController($scope, HeroesRepository) {
        var vm = this;

        vm.title = 'HeroController';
        vm.heroes = [];
        vm.totalHeroes = 0;

        getAllHeroes();

        function getAllHeroes() {
            HeroesRepository.getAllHeroes()
                .then(success)
                .catch(failed);

            function success(data) {
                vm.heroes = data;
                vm.totalHeroes = data.length;
                $scope.$apply();
            }
            function failed(error) {
                console.log(error.message);
            };
        }
    }
})();
