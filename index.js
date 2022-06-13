(async () => {
  // Get chart data
  const dataLinks = [
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
  ];
  const requests = dataLinks.map(async (link) => {
    return await (await fetch(link)).json();
  });
  const [countyData, userEduData] = await Promise.all(requests).catch((error) =>
    console.log({ error })
  );
  console.log({ countyData, userEduData });
  // Create chart container dimensions
  const margin = { top: 40, right: 80, bottom: 40, left: 80 };
  const chartHeight = 400;
  const chartWidth = 1000;
  const innerHeight = chartHeight - margin.top - margin.bottom;
  const innerWidth = chartWidth - margin.left - margin.right;
  // Create map and projection https://github.com/d3/d3-geo/blob/v3.0.1/README.md#geoPath
  const projection = d3
    .geoAlbersUsa()
    .translate([innerWidth / 2, innerHeight / 2])
    .scale([1000]);
  const path = d3.geoPath().projection(projection);
  // Select DOM elements and apply dimensions
  const chart = d3
    .select("#chart-container")
    .append("svg")
    .attr("height", chartHeight)
    .attr("width", chartWidth);
  //
  // chart
  // .append("g")
  // .selectAll("path")
  // .data(countyData.arcs)
  // .enter()
  // .append("path")
  // .attr("d", path)
  // .style("stroke", "#fff")
  // .style("stroke-width", "1")
  // .attr("fill", (d)=> {
  //   console.log(d)
  //   return 'green'
  // })
  // chart
  //   .selectAll("path")
  //   .data(countyData)
  //   .join("path")
  //   .attr("d", path)
  //   .attr("fill", "red")
  //   .attr("stroke", "green")
  //   .attr("stroke-width", 1);
})();
