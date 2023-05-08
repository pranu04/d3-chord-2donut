const svg = d3
  .select("svg")
  .append("svg")
  .attr("width", 1500)
  .attr("height", 1500)
  .append("g")
  .attr("transform", "translate(500,500)");

// create a matrix
const matrix = [
  [11, 58, 89, 28],
  [51, 18, 20, 61],
  [80, 145, 80, 85],
  [103, 99, 40, 71],
];

const data = [10, 20, 30, 40];

const nodes = ["node1", "node2", "node3", "node4"];

const color = d3
  .scaleOrdinal()
  .domain(d3.range(nodes.length))
  .range(d3.schemeCategory10);

// give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
const res = d3.chord().padAngle(0.05).sortSubgroups(d3.descending)(matrix);

// Add the links between groups
svg
  .datum(res)
  .append("g")
  .selectAll("path")
  .data((d) => d)
  .join("path")
  .attr("d", d3.ribbon().radius(190))
  .style("fill", (d) => color(d.source.index));

// this group object use each group of the data.groups object
const group = svg
  .datum(res)
  .append("g")
  .selectAll("g")
  .data((d) => d.groups)
  .enter();

// add the group arcs on the outer part of the circle
group
  .append("g")
  .append("path")
  .style("fill", "grey")
  .style("stroke", "black")
  .attr("d", d3.arc().innerRadius(190).outerRadius(200));

// Add the ticks
group
  .selectAll(".group-tick")
  .data((d) => groupTicks(d, 25)) // Controls the number of ticks: one tick each 25 here.
  .join("g")
  .attr(
    "transform",
    (d) => `rotate(${(d.angle * 180) / Math.PI - 90}) translate(200,0)`
  )
  .append("line") // By default, x1 = y1 = y2 = 0, so no need to specify it.
  .attr("x2", 6)
  .attr("stroke", "black");

// Add the labels of a few ticks:
group
  .selectAll(".group-tick-label")
  .data((d) => groupTicks(d, 25))
  .enter()
  .filter((d) => d.value % 25 === 0)
  .append("g")
  .attr(
    "transform",
    (d) => `rotate(${(d.angle * 180) / Math.PI - 90}) translate(200,0)`
  )
  .append("text")
  .attr("x", 8)
  .attr("dy", ".35em")
  .attr("transform", function (d) {
    return d.angle > Math.PI ? "rotate(180) translate(-16)" : null;
  })
  .style("text-anchor", function (d) {
    return d.angle > Math.PI ? "end" : null;
  })
  .text((d) => d.value)
  .style("font-size", 9);

// Returns an array of tick angles and values for a given group and step.
function groupTicks(d, step) {
  const k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(function (value) {
    return { value: value, angle: value * k + d.startAngle };
  });
}

const data1 = [10, 20, 30, 40, 50];
const data2 = [60, 70, 80, 90, 100];

const radius = 250;
const innerRadius = 230;
const color1 = d3.scaleOrdinal().domain(data1).range(d3.schemeCategory10);

// create a pie chart layout
const pie = d3.pie().startAngle(0).endAngle(Math.PI);

// create an arc generator
const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius);

// create a group to hold the donut chart
const donutGroup = svg
  .append("g")
  .attr(
    "transform",
    (d) => `rotate(${(d.angle * 180) / Math.PI - 90}) translate(200,0)`
  );

// create the first donut chart
const donut1 = donutGroup.append("g").attr("class", "donut1");
donut1
  .selectAll(".arc")
  .data(pie(data1))
  .enter()
  .append("path")
  .attr("class", "arc")
  .attr("d", arc)
  .attr("fill", (d) => color1(d.data));

const outerRadius = radius + 25;
const outerArc = d3
  .arc()
  .innerRadius(outerRadius - 20)
  .outerRadius(outerRadius);
const outerDonut = donutGroup.append("g").attr("class", "outerDonut");

// create the outer donut chart
// const outerData = [...data1, ...data2];
const outerColor = d3
  .scaleOrdinal()
  .domain(data1)
  .range([...d3.schemeCategory10, ...d3.schemeSet2]);
outerDonut
  .selectAll(".arc")
  .data(pie(data1))
  .enter()
  .append("path")
  .attr("class", "arc")
  .attr("d", outerArc)
  .attr("fill", (d) => outerColor(d.data));

// second donut

const data3 = [10, 20, 30, 40, 50];
const data4 = [60, 70, 80, 90, 100];

const radius2 = 330;
const innerRadius2 = 300;
const color2 = d3.scaleOrdinal().domain(data3).range(d3.schemeCategory10);

// create a pie chart layout
const pie2 = d3
  .pie()
  .startAngle(Math.PI)
  .endAngle(2 * Math.PI);

// create an arc generator
const arc2 = d3.arc().innerRadius(innerRadius2).outerRadius(radius2);

// create a group to hold the donut chart
const donutGroup2 = svg
  .append("g")
  .attr(
    "transform",
    (d) => `rotate(${(d.angle * 180) / Math.PI - 90}) translate(200,0)`
  );

// create the first donut chart
const donut2 = donutGroup2.append("g").attr("class", "donut1");
donut2
  .selectAll(".arc")
  .data(pie2(data3))
  .enter()
  .append("path")
  .attr("class", "arc2")
  .attr("d", arc2)
  .attr("fill", (d) => color1(d.data));

const outerRadius2 = radius2 + 25;
const outerArc2 = d3
  .arc()
  .innerRadius(outerRadius2 - 20)
  .outerRadius(outerRadius2);
const outerDonut2 = donutGroup2.append("g").attr("class", "outerDonut");

const outerColor2 = d3
  .scaleOrdinal()
  .domain(data3)
  .range([...d3.schemeCategory10, ...d3.schemeSet2]);
outerDonut
  .selectAll(".arc2")
  .data(pie2(data3))
  .enter()
  .append("path")
  .attr("class", "arc2")
  .attr("d", outerArc2)
  .attr("fill", (d) => outerColor(d.data));

// create a group for the image labels
const imageGroup = donutGroup2.append("g").attr("class", "imageGroup");

// append an image for each arc
imageGroup
  .selectAll(".imageLabel")
  .data(pie2(data3))
  .enter()
  .append("svg:image")
  .attr("class", "imageLabel")
  .attr("xlink:href", (d, i) => `C:/personal/Pcode/img${i + 1}.jfif`)
  .attr("width", 30)
  .attr("height", 30)
  .attr("transform", function (d) {
    const pos = outerArc2.centroid(d);
    return `translate(${pos})`;
  });
