app.controller('SearchController', ['$scope', 'JobSearch', function($scope, JobSearch){

  $scope.zipcode = "80202";
  $scope.searchWords = "web developer";
  $scope.searchDescription = "";
  $scope.dataPoints = [{key: "javascript", y: 0}, {key: "ruby", y: 0}, {key: "rails", y: 0}, {key: "node", y: 0}, {key: "angular", y: 0}, {key: "angularjs", y: 0}, {key: "tdd", y: 0}, {key: "mvc", y: 0}, {key: "jquery", y: 0}, {key: "json", y: 0}]; //ruby: 0, rails: 0, node: 0, angular: 0, angularjs: 0, tdd: 0, mvc: 0, jquery: 0, json: 0}];
    //   {
    //   key: "Javascript",
    //   y: $scope.dataPoints.javascript
    // },
    // {
    //   key: "Ruby",
    //   y: $scope.dataPoints.ruby
    // },

  $scope.submitSearch = function() {
    JobSearch.search($scope.zipcode, $scope.searchWords)
    .success(function(data){
      $scope.searchResults = phraseParse(data);
      console.log("Working?");
    });
  };

  var phraseParse = function(data) {   // Takes json data and converts to strings
    // var wordCount = [];
    var items = data.value.items;

    var megaDescriptions = []
    for (var i = 0, len = items.length - 1; i <= len ; i++) {
      var itemDescription = items[i].description;
      var split = itemDescription.toLowerCase()
        .replace(/\W/g, " ")
        .split(/\s+/);
      megaDescriptions.push(split);
      // for (var x = 0; x < split.length; x++) {
      //   for (var y = 0; y < $scope.dataPoints.length; y++) {
      //     if (split[x] === $scope.dataPoints[y].key) {
      //       $scope.dataPoints[y].y ++;
      //     }
      //     console.log($scope.dataPoints[y].key);
      //   }
      //   // $scope.dataPoints[split[x]]++;
      // }
    }
    var flattenedDescriptions = [].concat.apply([], megaDescriptions);

    for (var x = 0; x < flattenedDescriptions.length; x++) {
      for (var y = 0; y < $scope.dataPoints.length; y++) {
        if (flattenedDescriptions[x] === $scope.dataPoints[y].key) {
          $scope.dataPoints[y].y ++;
        }
        // console.log($scope.dataPoints[y].key);
      }
      // $scope.dataPoints[split[x]]++;
    }
    console.log(flattenedDescriptions);
  };

  // Pie Chart
  $scope.options = {
    chart: {
      type: 'pieChart',
      height: 500,
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: true,
      transitionDuration: 500,
      labelThreshold: 0.01,
      legend: {
        margin: {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        }
      }
    }
  };

  $scope.data = [
    {
      key: "Javascript",
      y: $scope.dataPoints.javascript
    },
    {
      key: "Ruby",
      y: $scope.dataPoints.ruby
    },
    {
      key: "Rails",
      y: $scope.dataPoints.rails
    },
    {
      key: "Node",
      y: $scope.dataPoints.node
    },
    {
      key: "Angular",
      y: $scope.dataPoints.angular
    },
    {
      key: "AngularJS",
      y: $scope.dataPoints.angularjs
    },
    {
      key: "TDD",
      y: $scope.dataPoints.tdd
    },
    {
      key: "MVC",
      y: $scope.dataPoints.mvc
    },
    {
      key: "JQuery",
      y: $scope.dataPoints.jquery
    },
    {
      key: "JSON",
      y: $scope.dataPoints.json
    }
  ];
  // End of Pie Chart

  // $scope.data = angular.copy($scope.initData);

  // $scope.onchange = function() {
  //   $scope.data = [];
  //   angular.foreach($scope.initData, function(value, index){
  //     if ($scope.dataPoints[value.key]) $scope.data.push(value);
  //   });
  // };

}]);
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
