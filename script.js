let hours = document.querySelector('.hours')
let minutes = document.querySelector('.minutes')
let seconds = document.querySelector('.seconds')
let display = document.querySelector('.display')
const inputContainer = document.querySelector('.input-container')
const buttonAction = document.querySelector('.button-action')
const alarm = document.querySelector('.alarm')

let timer
let miliseconds = 0
let actionControler = true

const handleButtonAction = () => {
    if (actionControler) {
        startTimer()        
    } else {
        pauseTimer()        
        buttonAction.innerText = `Init`
    }
}

const startTimer = () => {
    
    if (!hours.value && !minutes.value && !seconds.value && miliseconds === 0) {
        alert('Insert a value to start the timer!')
        return
        
    } else if (+hours.value < 0 || +minutes.value < 0 || +seconds.value < 0) {
        alert('Insert only positive numbers!')
        
        hours.value = '' 
        minutes.value = '' 
        seconds.value = ''
        miliseconds = 0
        
        return
    }

    if (miliseconds === 0) {
        hours.value ? miliseconds += (+hours.value * 60 * 60) * 1000 : miliseconds = miliseconds
        
        minutes.value ? miliseconds += (+minutes.value * 60) * 1000 : miliseconds = miliseconds
        
        seconds.value ? miliseconds += +seconds.value * 1000 : miliseconds = miliseconds        
        
    }

    inputContainer.classList.add('hide')
    buttonAction.innerText = `Pause`
    actionControler = !actionControler

    timer = setInterval(() => {    
        miliseconds < 1 ? setTimeout(() => {
            inputContainer.classList.remove('hide')
            clearInterval(timer)
            miliseconds = 0
            actionControler = !actionControler
            buttonAction.innerText = `Init`
            alarm.play()
        }) : miliseconds = miliseconds

        const date = new Date(miliseconds) 

        display.innerHTML = date.toLocaleTimeString('pt-BR', {
            timeZone: 'GMT'       
        })

        miliseconds -= 1000

    }, [1000])

    hours.value = '' 
    minutes.value = '' 
    seconds.value = '' 
}

const pauseTimer = () => {
    setTimeout(() => {
        actionControler = !actionControler
        clearInterval(timer)
    })
}

const stopTimer = () => {
    actionControler = false
    pauseTimer()
    miliseconds = 0
    display.innerHTML = '00:00:00'
    inputContainer.classList.remove('hide')
    buttonAction.innerText = `Init`
}

document.addEventListener('keypress', (e) => {
    e.key === 'i' || e.key == 'I' || e.key == 'p' || e.key == 'P' ? handleButtonAction() : null
})

document.addEventListener('keypress', (e) => {
    e.key === 's' || e.key == 'S'  ? stopTimer() : null
})