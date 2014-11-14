// 2014.04.22 - Alex Bowman - edit line 120 to not render null markerz

// The MIT License (MIT)

// Copyright (c) 2014 Clint Ivy, Jamie Love, and Jason Davies.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

//
// https://gist.github.com/mbostock/4061961
//
(function() {

// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/
d3.bullet = function() {
  var orient = "left", // TODO top & bottom
      reverse = false,
      duration = 0,
      ranges = bulletRanges,
      markers = bulletMarkers,
      measures = bulletMeasures,
      circles = bulletCircles,
      width = 380,
      height = 30,
      tickFormat = null,
      lowerChartRange = 0;

  // For each small multiple…
  function bullet(g) {
    g.each(function(d, i) {
      var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
          markerz = markers.call(this, d, i).slice().sort(d3.descending),
          measurez = measures.call(this, d, i).slice().sort(d3.descending),
          circlez = circles.call(this, d, i).slice().sort(d3.descending),
          g = d3.select(this);

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain([lowerChartRange, Math.max(rangez[0], markerz[0], measurez[0].upper, circlez[0])])
          .range(reverse ? [width, 0] : [0, width]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([lowerChartRange, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Derive width-scales from the x-scales.
      var w0 = bulletWidth(x0, lowerChartRange),
          w1 = bulletWidth(x1, lowerChartRange);

      // Update the range rects.
      var range = g.selectAll("rect.range")
          .data(rangez);

      range.enter().append("rect")
          .attr("class", function(d, i) { return "range s" + i; })
          .attr("width", w0)
          .attr("height", height)
          .attr("x", reverse ? x0 : 0)
        .transition()
          .duration(duration)
          .attr("width", w1)
          .attr("x", reverse ? x1 : 0);

      range.transition()
          .duration(duration)
          .attr("x", reverse ? x1 : 0)
          .attr("width", w1)
          .attr("height", height);


      var measureData = [];
      if (measurez[0].upper !== null) {
        measureData.push(measurez[0].upper);
      }

      // Update the measure rects.
      var measure = g.selectAll("rect.performance-range")
          .data(measureData);

      measure.enter().append("rect")
          .attr("class", function(d, i) { return "performance-range s" + i; })
          .attr("width", x0(measurez[0].upper) - x0(measurez[0].lower))
          .attr("height", height)
          .attr("x", reverse ? x0 - x0(measurez[0].lower): x0(measurez[0].lower))
        .transition()
          .duration(duration)
          .attr("width", x1(measurez[0].upper) - x1(measurez[0].lower))
          .attr("x", reverse ? x1 - x1(measurez[0].lower): x1(measurez[0].lower));

      measure.transition()
          .duration(duration)
          .attr("width", x1(measurez[0].upper) - x1(measurez[0].lower))
          .attr("height", height)
          .attr("x", reverse ? x1 - x1(measurez[0].lower): x1(measurez[0].lower));

      // Update the marker lines.
      var marker = g.selectAll("line.target")
          .data(_.without(markerz, null));

      marker.enter().append("line")
          .attr("class", "target")
          .attr("x1", x0)
          .attr("x2", x0)
          .attr("y1", 0)
          .attr("y2", height)
        .transition()
          .duration(duration)
          .attr("x1", x1)
          .attr("x2", x1);

      marker.transition()
          .duration(duration)
          .attr("x1", x1)
          .attr("x2", x1)
          .attr("y1", 0)
          .attr("y2", height);

      var circle = g.selectAll("circle.organization-performance")
        .data(circlez);

      if (circlez[0] !== null) {
        circle.enter().append("circle")
            .attr("class", "organization-performance")
            .attr("cx", x0)
            .attr("cy", height / 2)
            .attr("r", 4)
          .transition()
            .duration(duration)
            .attr("cx", x1)

        circle.transition()
            .duration(duration)
            .attr("cx", x1)
            .attr("cy", height / 2);
      }

      // Compute the tick format.
      var format = tickFormat || x1.tickFormat(8);

      // Update the tick groups.
      var tick = g.selectAll("g.tick")
          .data(x1.ticks(8), function(d) {
            return this.textContent || format(d);
          });

      // Initialize the ticks with the old scale, x0.
      var tickEnter = tick.enter().append("g")
          .attr("class", "tick")
          .attr("transform", bulletTranslate(x0))
          .style("opacity", 1e-6);

      tickEnter.append("line")
          .attr("y1", height)
          .attr("y2", height * 7 / 6);

      tickEnter.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "1em")
          .attr("y", height * 7 / 6)
          .text(format);

      // Transition the entering ticks to the new scale, x1.
      tickEnter.transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1);

      // Transition the updating ticks to the new scale, x1.
      var tickUpdate = tick.transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1);

      tickUpdate.select("line")
          .attr("y1", height)
          .attr("y2", height * 7 / 6);

      tickUpdate.select("text")
          .attr("y", height * 7 / 6);

      // Transition the exiting ticks to the new scale, x1.
      tick.exit().transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1e-6)
          .remove();
    });
    d3.timer.flush();
  }

  // left, right, top, bottom
  bullet.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    reverse = orient == "right" || orient == "bottom";
    return bullet;
  };

  // ranges (bad, satisfactory, good)
  bullet.ranges = function(x) {
    if (!arguments.length) return ranges;
    ranges = x;
    return bullet;
  };

  // markers (previous, goal)
  bullet.markers = function(x) {
    if (!arguments.length) return markers;
    markers = x;
    return bullet;
  };

  // measures (actual, forecast)
  bullet.measures = function(x) {
    if (!arguments.length) return measures;
    measures = x;
    return bullet;
  };

  bullet.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return bullet;
  };

  bullet.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return bullet;
  };

  bullet.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return bullet;
  };

  bullet.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return bullet;
  };

  bullet.circles = function(x) {
    if (!arguments.length) return circles;
    circles = x;
    return bullet;
  }

  bullet.lowerChartRange = function(x) {
    if (!arguments.length) return lowerChartRange;
    lowerChartRange = x;
    return bullet;
  }

  return bullet;
};

function bulletRanges(d) {
  return d.ranges;
}

function bulletMarkers(d) {
  return d.markers;
}

function bulletMeasures(d) {
  return d.measures;
}

function bulletCircles(d) {
  return d.circles;
}

function bulletTranslate(x) {
  return function(d) {
    return "translate(" + x(d) + ",0)";
  };
}

function bulletWidth(x, lowerChartRange) {
  var x0 = x(lowerChartRange);
  return function(d) {
    return Math.abs(x(d) - x0);
  };
}

})();
