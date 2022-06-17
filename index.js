(async () => {
  // Get chart data
  const dataLinks = [
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
  ];
  const requests = dataLinks.map(async (link) => {
    return await (await fetch(link)).json();
  });
  const [countyData, educationData] = await Promise.all(requests).catch((error) =>
    console.log({ error })
  );
  let educationDataByFips = {};
  educationData.forEach((county) => {
    educationDataByFips[county.fips] = county;
  });
  // Create chart container dimensions
  const margin = { top: 40, right: 80, bottom: 40, left: 80 };
  const chartHeight = 1000;
  const chartWidth = 1000;
  const innerHeight = chartHeight - margin.top - margin.bottom;
  const innerWidth = chartWidth - margin.left - margin.right;
  // Create colors pattern
  const colorScale = d3
    .scaleThreshold()
    .domain([10, 20, 30, 40, 100])
    .range(d3.schemeReds[5]);
  // Select DOM elements and apply dimensions
  const chart = d3
    .select("#chart-container")
    .append("svg")
    .attr("height", chartHeight)
    .attr("width", chartWidth);
  // Convert topoJson to GeoJson for D3 to handle
  const states = topojson.feature(
    countyData,
    countyData.objects["states"]
  ).features;
  const counties = topojson.feature(
    countyData,
    countyData.objects["counties"]
  ).features;
  const nation = topojson.feature(
    countyData,
    countyData.objects["nation"]
  ).features;
  // Add elements to map
  chart
    .selectAll("path")
    .data(counties)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (d) => {
      return colorScale(educationDataByFips[d.id].bachelorsOrHigher);
    })
    .attr("data-fips", (d) => {
      return educationDataByFips[d.id].fips;
    })
    .attr("data-education", (d) => {
      return educationDataByFips[d.id].bachelorsOrHigher;
    });
  chart
    .selectAll("path")
    .data(states)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "state");
  chart
    .selectAll("path")
    .data(nation)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "nation");
})();
