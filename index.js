(async () => {
    const eduData = await (await fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json")).json()
    console.log(eduData)
})()