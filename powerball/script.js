

var NUM_FIRST = 5,
  POWER_MAX = 69,
  POWER_LAST_MAX = 26;


jQuery.fn.autoWidth = function(options) {
  var settings = {
    limitWidth: false
  };

  if (options) {
    jQuery.extend(settings, options);
  }

  var maxWidth = 0;

  this.each(function() {
    if ($(this).width() > maxWidth) {
      if (settings.limitWidth && maxWidth >= settings.limitWidth) {
        maxWidth = settings.limitWidth;
      } else {
        maxWidth = $(this).width();
      }
    }
  });

  this.width(maxWidth);
};

//set of values between 1 and max
var createRandomDataSet = function(numberOfItems, max) {
  var r = [];
  while (r.length < numberOfItems) {
    var x = Math.floor((Math.random() * max) + 1);
    if (r.indexOf(x) < 0) {
      r.push(x);
    }
  }
  return r;
};
var firstData = createRandomDataSet(NUM_FIRST, POWER_MAX);
var lastData = createRandomDataSet(1, POWER_LAST_MAX);

var dataset = firstData.concat(lastData);
//Width and height
var w = 600;
var h = 350;

var RADIUS = 40,
  BASE_NUMBER = 6,
  Y = 60;
var xScale = d3.scale.ordinal()
  .domain(d3.range(dataset.length))
  .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
  .domain([0, d3.max(dataset)])
  .range([0, h]);

var drawIt = function(svg, dataset, w, h) {
  var variableRadius = RADIUS * (6 / dataset.length);

  svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("r", variableRadius)
    .attr("cy", Y)
    .attr("cx", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("fill", function(d, i) {
      if (i === dataset.length - 1) {
        return "rgb(255, 0,0)";
      } else {
        return "white";
      }

    })
    .attr("stroke", "rgb(200,200,200");


  svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
      return d;
    })
    .attr("y", Y + 7)
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("font-family", "sans-serif")
    .attr("font-weight", "bold")
    .attr("fill", function(d, i) {
      if (i === dataset.length - 1) {
        return "white";
      } else {
        return "black";
      }
    })
    .attr("font-size", "24px")
    .attr("class", "nums");

  return svg;

};

//Create SVG element

var svg = d3.select("#fsid")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

svg = drawIt(svg, dataset, w, h);



//On click, update with new data			
d3.select("#d3click")
  .on("click", function() {
    var firstData = createRandomDataSet(NUM_FIRST, POWER_MAX);
    var lastData = createRandomDataSet(1, POWER_LAST_MAX);
    var dataset = firstData.concat(lastData);
    var nullds = [];
    svg.selectAll(".nums").remove();

    svg.selectAll("nums")
      .data(nullds)
      .exit()
      .append("text");

    svg.selectAll(".nums")
      .data(dataset)
      .enter()
      .append("text")
      .text(0)
      .attr("y", Y + 7)
      .attr("text-anchor", "middle")
      .attr("x", function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
      })
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold")
      .attr("fill", function(d, i) {
        if (i === dataset.length - 1) {
          return "white";
        } else {
          return "black";
        }
      })
      .attr("font-size", "24px")
      .attr("class", "nums")
      .transition()
      .duration(3000)
      .tween("text", function(d) {
        var i = d3.interpolate(this.textContent, d),
          prec = (d + "").split("."),
          round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

        return function(t) {
          this.textContent = Math.round(i(t) * round) / round;
        };
      });

  });

