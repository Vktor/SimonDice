    const niveles = 15
    let teclas = generarTeclas(niveles);

    function siguientenivel(nivelActual){
        if(nivelActual==niveles){
           // return alert('Ganaste')
           return swal({
               title: 'Ganaste',
               type: 'success'
           })
        }
        //alert(`Nivel ${nivelActual+1}`)
        swal({
            timer: 1000,
            title: `Nivel ${nivelActual+1}`,
            showConfirmButton: false
        })
        for(let i=0; i<= nivelActual; i++){
            setTimeout(()=>activate(teclas[i]), 1000*(i+1)+1000)
        }
        let i=0;
        let teclaActual = teclas[i]
        window.addEventListener('keydown', onkeydown)
        function onkeydown(ev){
            if(ev.keyCode == teclaActual){
                activate(teclaActual, {success: true})
                i++;
                if(i>nivelActual){
                    window.removeEventListener('keydown', onkeydown)
                    setTimeout(()=>siguientenivel(i), 1500) 
                }
                teclaActual = teclas[i]
            } else {
                activate(ev.keyCode, {fail: true})
                window.removeEventListener('keydown', onkeydown)
                //alert('Perdiste :(')
                swal({
                    title: 'Perdiste',
                    text: 'Quieres jugar de nuevo?',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                    closeOnConfirm: 'true'
                }, function(ok){
                    if(ok){
                        let teclas = generarTeclas(niveles);
                        siguientenivel(0)
                    }
                })
            }
        }
    }
    siguientenivel(0);

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