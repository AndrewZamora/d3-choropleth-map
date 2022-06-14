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
  const chartHeight = 1000;
  const chartWidth = 1000;
  const innerHeight = chartHeight - margin.top - margin.bottom;
  const innerWidth = chartWidth - margin.left - margin.right;
  // Create map and projection https://github.com/d3/d3-geo/blob/v3.0.1/README.md#geoPath
  const projection = d3.geoAlbersUsa().scale(1000);
  // .translate([innerWidth / 2, innerHeight / 2])
  // .scale(1000);
  const path = d3.geoPath().projection(projection);
  // Select DOM elements and apply dimensions
  const chart = d3
    .select("#chart-container")
    .append("svg")
    .attr("height", chartHeight)
    .attr("width", chartWidth);
  const states = topojson.feature(
    countyData,
    countyData.objects["states"]
  ).features;
  const counties = topojson.feature(
    countyData,
    countyData.objects["counties"]
  ).features;
  chart
    .selectAll("path")
    .data(states)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "state");
  chart
    .selectAll("path")
    .data(counties)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county");
})();
