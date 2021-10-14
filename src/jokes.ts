const button: HTMLElement | null = document.getElementById('pulsa')
const texto: HTMLElement | null = document.getElementById('chiste')
const form: HTMLElement | null = document.getElementById('form')
const temps: HTMLElement | null = document.getElementById('temps')
const root: HTMLElement | null = document.querySelector(':root')


type Acudit = {
  joke: string
  score: string
  date: string
}
let newJoke: string
let report: Acudit
const reportAcudits: object[] = []
let idInput: string
let backgroundColor: number = 0


if(button){
  button.addEventListener('click', () => {
    let random:number = Math.floor(Math.random() * 2)
    if(random === 0) getDadJoke()
    else getChuckJoke()

    
    if(form?.classList.contains('joke-box__form--visible')){
      saveReport()
    } else form?.classList.add('joke-box__form--visible')

    
    report = {
      joke: newJoke,
      score: '0',
      date: new Date().toISOString()
    }

    
    random = Math.floor(Math.random() * 5)
    while(random === backgroundColor) random = Math.floor(Math.random() * 5)
    backgroundColor = random
    if(root){
      root.style.setProperty('--background', `url('../assets/images/backgroundMain/blob${backgroundColor}.svg')`)
      root.style.setProperty('--background-before', `url('../assets/images/backgroundLeft/blob${backgroundColor}-before.svg')`)
      root.style.setProperty('--background-after', `url('../assets/images/backgroundRight/blob${backgroundColor}-after.svg')`)
    }
  })
}

// Fetch API Dadjokes
const getDadJoke = async () => {
  const url = 'https://icanhazdadjoke.com/'
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  })
  const joke = await response.json()
  newJoke = joke.joke
  if(texto) texto.textContent = `" ${newJoke} "`
}

// Fetch API Chuck Norris
const getChuckJoke = async () => {
  const url = 'https://api.chucknorris.io/jokes/random'
  const response = await fetch(url)
  const joke = await response.json()
  newJoke = joke.value
  if(texto) texto.textContent = `" ${newJoke} "`
}


form?.addEventListener('change', (e: Event) => {
  const target = e.target as HTMLInputElement
  idInput = target.id
  report.score = target.value
})


const saveReport = () => {
  reportAcudits.push(report)

  const input = document.getElementById(idInput) as HTMLInputElement
  if(input) input.checked = false
}


//Fecth API Weather
const getWeather= async (lon: number,lat: number) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=731c48d38ef1b7cc54c3e98af3404213&units=metric&lang=es`
    const response = await fetch(url)
    const weather = await response.json()
    const temp = Math.floor(weather.main.temp)
    const icon = weather.weather[0].icon
    if(temps) temps.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png"/><span>${temp} ºC</span>`
}

//Weather API load
window.addEventListener('load', () =>{
  let lon: number
  let lat: number
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude
      lat = position.coords.latitude
      getWeather(lon, lat)
    })
  }
})