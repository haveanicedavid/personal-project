app.controller('SearchController', ['$scope', 'jobSearch', function($scope, jobSearch){
  $scope.zipcode = "80202";
  $scope.searchWords = "web developer";
  $scope.searchDescription = "";
  $scope.dataPoints = {javascript: 0, ruby: 0, rails: 0, node: 0, angular: 0, angularjs: 0, tdd: 0, mvc: 0, jquery: 0, json: 0};

  $scope.submitSearch = function() {
    jobSearch.search($scope.zipcode, $scope.searchWords)
    .success(function(data){
      $scope.searchResults = phraseParse(data);
    });
  };

  var phraseParse = function(data) {   // Takes json data and converts to strings
    // var wordCount = [];
    var items = data.value.items;

    for (var i = 0, len = items.length - 1; i <= len ; i++) {
      var itemDescription = items[i].description;
      var split = itemDescription.toLowerCase()
                                 .replace(/\W/g, " ")
                                 .split(/\s+/);
      for (var x = 0; x < split.length; x++) {
         $scope.dataPoints[split[x]]++;
      }
    }
    console.log($scope.dataPoints);
  };

  // var wordCount = function(input) {    // Counts words passed from wordParse
  //   var split = input.replace(/[^a-zA-Z]/, " ").split(/\s+/),
  //   datapoints = {javascript: 0, ruby: 0, rails: 0, node: 0, angular: 0, angularjs: 0};
  //   for (var x = 0; x < split.length; x++) {
  //       datapoints[split[x]]++;
  //   }
    // for (var x = 0; x < split.length; x++) {
    //   if (datapoints[split[x]] === undefined ) {
    //     datapoints[split[x]] = 1;
    //   } else {
    //     datapoints[split[x]]++;
    //   }
    // }
    // keysSorted = Object.keys(datapoints).sort(function(a,b){   // sort words by occurrance 
    //   return datapoints[datapoints[a]] - datapoints[datapoints[b]]; 

    // });

  //   return datapoints;
  // };

}]);