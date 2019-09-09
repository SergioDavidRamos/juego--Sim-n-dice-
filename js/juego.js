const circleWrapper = document.querySelector('.circle-wrapper'),
btnEmpezar = document.querySelector('.btn-start'),
blue  = document.getElementById('blue'),
purple  = document.getElementById('purple'),
orange  = document.getElementById('orange'),
green  = document.getElementById('green'),
congrats = document.querySelector('.congrats'),
scoreBox = document.querySelector('.scoreBox'),
score = document.querySelector('.score'),
starts = document.querySelector('.starts')

var rotate = 0

class Juego {
  constructor(){
    this.init = this.init.bind(this)
    this.init()
    this.generearSecuencia()
    this.siguienteNivel()
    this.generateStarts()
  }

  init(){
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.iluminarSecuencia = this.iluminarSecuencia.bind(this)
    btnEmpezar.classList.toggle('hide')
    congrats.style.opacity = '0'
    scoreBox.style.display = 'block'
    starts.style.display = 'block'
    score.innerHTML = '0'
    this.score = 0
    this.nivel = 1
    this.ultimoNivel = 5
    this.colores = {
      blue,
      purple,
      orange,
      green
    }
  }

  refresh(){
    btnEmpezar.classList.toggle('hide')
    score.innerHTML = '0'
    scoreBox.style.display = 'none'
    starts.style.display = 'none'
    starts.innerHTML = ''
    this.nivel = 1
  }

  generearSecuencia(){
    this.secuencia = new Array(this.ultimoNivel).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  generateStarts(){
    for(let i = 0; i < this.ultimoNivel; i++){
      let icon = document.createElement('i')
      icon.classList.add('far', 'fa-star')
      starts.appendChild(icon)
    }
    this.starts = document.querySelectorAll('.fa-star')
    console.log(this.starts)
  }

  siguienteNivel(){
    this.subnivel = 0
    setTimeout(this.iluminarSecuencia, 350)
  }

  transformarNumeroAColor(numero){
    switch(numero){
      case 0:
        return 'blue'
      case 1:
        return 'purple'
      case 2:
        return 'orange'
      case 3: 
        return 'green'
    }
  }

  transformarColorANumero(color){
    switch(color){
      case 'blue':
        return 0
      case 'purple':
        return 1
      case 'orange':
        return 2
      case 'green':
        return 3
    }
  }

  iluminarSecuencia(){
    this.index = 0;
    for(let i = 0; i < this.nivel; i++){
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => {
        this.iluminarColor(color)
        this.index++
        }, 1000 * i)
    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('iluminate')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color){
    this.colores[color].classList.remove('iluminate')
    if(this.index === this.nivel){
      this.agregarEventosClick()
    }
  }

  agregarEventosClick(){
    this.colores.blue.addEventListener('click', this.elegirColor)
    this.colores.purple.addEventListener('click', this.elegirColor)
    this.colores.orange.addEventListener('click', this.elegirColor)
    this.colores.green.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick(){
    this.colores.blue.removeEventListener('click', this.elegirColor)
    this.colores.purple.removeEventListener('click', this.elegirColor)
    this.colores.orange.removeEventListener('click', this.elegirColor)
    this.colores.green.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev){
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if(numeroColor === this.secuencia[this.subnivel]){
      this.score += 10
      score.innerHTML = this.score
      this.subnivel++
      if(this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel === (this.ultimoNivel + 1)){
          this.ganasteELJuego();
        }else {
          this.pasasteDeNivel();
        }
      }
    }else {
      this.perdioElJuego();
    }
  }
  
  pasasteDeNivel(){
    rotate += 45
    circleWrapper.style.transform = `rotate(${rotate}deg)`
    this.starts[this.nivel - 2].classList.replace('far', 'fas')

    // swal('GOTO!', 'pasaste de nivel!')
    // .then(() => {
      setTimeout(this.siguienteNivel, 750)
    // })
  }

  ganasteELJuego(){
    congrats.style.visibility = 'visible'
    congrats.style.opacity = '1'
    swal('Simon Dice :v', 'Ganaste!! :v\n\nPuntaje final: ' + this.score, 'success')
    .then(()=> {
      this.refresh()
    })
  }

  perdioElJuego(){
    swal('Simon Dice :v', 'Perdiste p :v\n\nPuntaje final: ' + this.score, 'error')
    .then(() => {
      this.eliminarEventosClick()
      this.refresh()
    })
  }

}

function empezarJuego(){
  window.juego = new Juego()
}