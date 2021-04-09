import {promises as fs} from "fs";

let cities = null;
let states = null;

await loadStates();
await loadCities();
await generateUFS();

let total = await countCities('SP');
console.log(total);

async function loadStates () {
  let data = await fs.readFile('./Estados.json', 'utf-8')
  states = JSON.parse(data);
}

async function loadCities () {
  let data = await fs.readFile('./Cidades.json', 'utf-8');
  cities = JSON.parse(data)
}

async function generateUFS() {
  let allCities = [];
  let statesCounts = [];
  let smallerStates = null;
  let biggerStates = null;
  let biggerCitysNames = [];
  let smallerCitysNames = [];
  let biggerCityName = '';
  let smallerCityName = '';

  states.forEach(state => {
    let citiesList = cities.filter(city => {
      return state.ID === city.Estado
    });

    citiesList.sort();
    citiesList.sort((a,b) => {
      return a.Nome.length - b.Nome.length
    });

    smallerCitysNames.push({
      "Nome":citiesList[0].Nome,
      "UF":state.Sigla
    });
    biggerCitysNames.push({
      "Nome":citiesList.slice(-1)[0].Nome,
      "UF":state.Sigla
    });
    statesCounts.push({
      "UF":state.Sigla,
      "totalCities":citiesList.length
    });

    fs.writeFile('./cidades/'+state.Sigla+'.json',JSON.stringify(citiesList));
  })

  statesCounts.sort((a,b) => {
    return a.totalCities - b.totalCities;
  })

  smallerStates = statesCounts.slice(0,5);
  biggerStates = statesCounts.slice(Math.max(statesCounts.length - 5,1));

  smallerCitysNames.sort((a,b) => {
    var nameA = a.Nome;
    var nameB = b.Nome;
    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
  })

  smallerCitysNames.sort((a,b) => {
    return a.Nome.length - b.Nome.length;
  })

  biggerCitysNames.sort((a,b) => {
    return b.Nome.length - a.Nome.length;
  })

  smallerCityName = smallerCitysNames[0];
  biggerCityName = biggerCitysNames[0];

  console.log(biggerStates);
  console.log(smallerStates);
  console.log(biggerCitysNames);
  console.log(smallerCitysNames);
  console.log(biggerCityName);
  console.log(smallerCityName);
}

async function countCities(UF) {
  let data = await fs.readFile(`./cidades/${UF}.json`,'utf-8');
  let resp = JSON.parse(data);
  let total = Object.keys(resp).length;
  return total;
}