
app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('app',{
        url: '/',
        views: {
            'navbar': {
                templateUrl: 'views/layouts/navbar.html',
            },
            'content': {
                templateUrl: 'views/pages/home.html',
                controller:  'HomePageController',
            },
            'footer': {
                templateUrl: 'views/layouts/footer.html'
            }
        }
    })

    $locationProvider.html5Mode(true);
 
});
