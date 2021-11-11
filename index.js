(async () => {
    const dataLinks = ["https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json", "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"]
    const requests = dataLinks.map(async link => {
        return await (await fetch(link)).json()
    })
    const [countyData, userEduData] = await Promise.all(requests).catch(error => console.log(error))
    console.log(countyData, userEduData)
})()