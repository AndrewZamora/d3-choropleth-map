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
  // const graphCountyData = countyData.objects["counties"].map()
  // Create chart container dimensions
  const margin = { top: 40, right: 80, bottom: 40, left: 80 };
  const chartHeight = 1000;
  const chartWidth = 1000;
  const innerHeight = chartHeight - margin.top - margin.bottom;
  const innerWidth = chartWidth - margin.left - margin.right;
  // Create map and projection https://github.com/d3/d3-geo/blob/v3.0.1/README.md#geoPath
  const projection = d3
    .geoAlbersUsa()
    .translate([innerWidth / 2, innerHeight / 2])
    .scale(1000);
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
  // chart
  //   .selectAll("path")
  //   .data(nation)
  //   .enter()
  //   .append("path")
  //   .attr("d", d3.geoPath())
  //   .attr("class", "nation");
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
    .attr("class", "county")
    .attr("fill", (d) => {
      const [match] = userEduData.filter((item) => d.id === item.fips);
      // console.log(match)
      return colorScale(match.bachelorsOrHigher);
    })
    .attr("data-fips", (d) => {
      const [match] = userEduData.filter((item) => d.id === item.fips);
      return match.fips;
    })
    .attr("data-education", (d) => {
      const [match] = userEduData.filter((item) => d.id === item.fips);
      return match.bachelorsOrHigher;
    });
})();
