const checkboxes = document.querySelectorAll('input[name="option"]')
const checkbox1 = document.querySelector('#checkbox1')
const checkbox2 = document.querySelector('#checkbox2')
const allInputs = document.querySelectorAll("#input")

const amountInput = document.querySelector('.input-amount')
const rateInput = document.querySelector('.input-rate')
const termInput = document.querySelector('.input-term')

const monthlyRepayment = document.querySelector('.monthly-repayment')
const accumulatedPayment = document.querySelector('.accumulated-payment')

const clearAll = document.querySelector('.erase')
const required = document.querySelector('.required')

const noResultsPage = document.querySelector('.results')
const resultPage = document.querySelector('.results-page-2')


        // monthlyRepayment.innerText = '0.00'
resultPage.style.display = 'none'
noResultsPage.style.display = 'flex'

//CHECKED BOX FUNCTIONALITY
checkboxes.forEach((checkbox)=>{
    checkbox.addEventListener('change', () => {  
        const label = document.querySelector(`label[for="${checkbox.id}"]`)
        if (checkbox.checked == true) {
        label.style.backgroundColor = 'hsl(61, 93%, 83%)'
        label.style.border = '1px solid hsl(61, 70%, 52%)'
    }else{
        label.style.backgroundColor = 'white'
        label.style.border = '1px solid hsl(200, 26%, 54%)'
        
    }
    checkboxes.forEach((box)=> {
            if(box !== checkbox){
                box.checked = false
                if(box.checked == false){
                    const label = document.querySelector(`label[for="${box.id}"]`)
                    label.style.backgroundColor = 'white'  
                    label.style.border = '1px solid hsl(200, 26%, 54%)'
            }
            }
        });
    })
})

// INPUT FOCUS FUNCTIONALITY 
allInputs.forEach(input => {
    const container = input.parentElement
    const placeholder = container.querySelector('.placeholder')
    input.addEventListener('click', () =>{
        container.style.borderColor = 'hsl(61, 70%, 52%)'
        placeholder.style.backgroundColor= 'hsl(61, 70%, 52%)'
        placeholder.style.color= 'hsl(202, 55%, 16%)'
    })    
    input.addEventListener('blur', () =>{
        placeholder.style.backgroundColor= 'hsl(200, 26%, 54%)'
        input.parentElement.style.borderColor = 'hsl(200, 26%, 54%)'
        placeholder.style.color= 'hsl(200, 24%, 40%)'
})

})

// CLEAR ALL FUNCTIONALITY
function erase() {  
    monthlyRepayment.innerHTML = '0.00'
    allInputs.forEach(input =>{
        if (String(input.value).length > 0) {
            input.value = ''
        }
    })
    noResultsPage.style.display = 'flex'
    resultPage.style.display = 'none'
}

clearAll.addEventListener('click', () =>{
    checkboxes.forEach(box =>{
        box.checked = false
        if (box.checked == false) {
            const label = document.querySelector(`label[for="${box.id}"]`)
            label.style.backgroundColor = 'white'  
            label.style.border = '1px solid hsl(200, 26%, 54%)'
        }
    })
})

//LIMIT INPUTS 
amountInput.addEventListener("input", function (e) {
    let input = e.target.value
    input = input.replace(/[^0-9.]/g, '')

    const parts = input.split('.')
    let integerPart = parts[0]
    const decimalPart = parts[1] ? '.' + parts[1] : ''

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    e.target.value = integerPart + decimalPart
    // input = Number(input)
    
    if (input > 9999999) {
        e.target.value = input.slice(0,7)
        // input = e.target.value
        console.log(input);
    }    

    
})

termInput.addEventListener("input", function (e) {
    let input = e.target.value
    input = input.replace(/[^0-9.]/g, '')
    if (Number(input) > 99) {
        e.target.value =input.slice(0,2)
        input = e.target.value
    }    
})

rateInput.addEventListener("input", function (e) {
    let input = e.target.value
    input = input.replace(/[^0-9.]/g, '')
    if (Number(input) > 99) {
        e.target.value =input.slice(0,2)
        input = e.target.value
    }
})

//CALCULATE
function calculate() {
    allInputs.forEach(input => {
        const inputGrandParent = input.parentElement.parentElement
        const required = inputGrandParent.querySelector('.required')
        const placeholder = inputGrandParent.querySelector('.placeholder')
        if (String(input.value).length == 0) {
         required.style.display = 'block'   
         placeholder.style.backgroundColor = 'hsl(4, 69%, 50%)'
         placeholder.style.color = 'white'
         input.parentElement.style.border = '1px solid hsl(4, 69%, 50%)'
        }else{
            required.style.display = 'none'   
        }
    })
    
    if (checkbox1.checked == false && checkbox2.checked == false) {
    const checkBoxParentContainer = checkbox1.parentElement.parentElement.parentElement
    const required = checkBoxParentContainer.querySelector('.required')
    required.style.display = 'block'
}else{
    const checkBoxParentContainer = checkbox1.parentElement.parentElement.parentElement
    const required = checkBoxParentContainer.querySelector('.required')
    required.style.display = 'none'

    }
    
    const amount = parseFloat(amountInput.value)
    const interestRate = parseFloat(rateInput.value)/100/12 
    const term = parseFloat(termInput.value) * 12
    
    if (isNaN(amount) || isNaN(interestRate) || isNaN(term) || checkbox1.checked == false && checkbox2.checked == false) {
        console.log('fill up all inputs')
        noResultsPage.style.display = 'flex'
        resultPage.style.display = 'none'
        return
    }else{
        // monthlyRepayment.innerText = '0.00'
        noResultsPage.style.display = 'none'
        resultPage.style.display = 'flex'
    }

    // MONTHLY REPAYMENT
    const calculatedPayment = (Number(amount) * interestRate * Math.pow(1 + interestRate, term)) / (Math.pow(1 + interestRate, term) - 1)*1000
    let approximatedPayment = calculatedPayment.toFixed(2)

    const parts = approximatedPayment.split('.')
    let integerPart = parts[0]
    const decimalPart = parts[1] ? '.' + parts[1] : ''

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    approximatedPayment = integerPart + decimalPart

    monthlyRepayment.innerText = approximatedPayment
    console.log(approximatedPayment);
    
    // REPAY OVER THE TERM
    const totalTimeInMonths = termInput.value * 12
    let repaymentOverTime = (calculatedPayment * totalTimeInMonths).toFixed(2)

    const parts2 = repaymentOverTime.split('.')
    let integerPart2 = parts2[0]
    const decimalPart2 = parts2[1] ? '.' + parts2[1] : ''

    integerPart2 = integerPart2.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    repaymentOverTime = integerPart2 + decimalPart2

    accumulatedPayment.innerText = repaymentOverTime
    console.log(repaymentOverTime);

    // console.log(`i multiplied ${totalTimeInMonths} by ${approximatedPayment} which gave ${repaymentOverTime}`);
    
    
}



