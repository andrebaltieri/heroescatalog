(function () {    
    angular.module('app').factory('HeroesRepository', [HeroesRepository]);

    function HeroesRepository() {
        var service = {
            getAllHeroes: getAllHeroes
        };
        return service;

        function getAllHeroes() {
            var host = "http://localhost:5724";
            var serviceName = host + "/breeze/heroes";
            var manager = new breeze.EntityManager(serviceName);
            
            return breeze.EntityQuery.from("Heroes")
                .using(manager).execute()
                .then(success);

            function success(data) {
                console.log("Recuperado " + data.results.length + " herói(s)");
                return data.results;
            }
        }
    }
})();