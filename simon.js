const niveles = 15
    let keys = generarTeclas(niveles);

    function generarTeclas(niveles){
      return new Array(niveles).fill(0).map(generarTeclaAleatoria)
    }
    function generarTeclaAleatoria(){
      const min =65
      const max = 90
      return Math.round(Math.random()*(max - min)+min)
    }
    function getElementByKeyCode(keyCode){
      return document.querySelector(`[data-key="${keyCode}"]`)
    }
    function activate(keyCode, opts={}){
      const el = getElementByKeyCode(keyCode)
      el.classList.add('active')
      if(opts.success){
        el.classList.add('success')
      }else if(opts.fail){
        el.classList.add('fail')
      }
      setTimeout(() =>deactivate(el), 500)
    }
    function deactivate(el) {
     el.className = 'key' 
    }