let box = document.querySelector("#box")
let hlines;
let vlines;
let player = 'r';
let pattern = []
let filledboxes = document.querySelectorAll(".fill")
let winselected = false;

function checkpattern(cur){
    for(let p of pattern){
        if(p.top == cur.top && p.bottom == cur.bottom && p.left == cur.left && p.right == cur.right)
        {
            return true
        }
    }
    return false
}
function selectwinner(){
    let greenboxes=0
    let redboxes = 0
    for(let i=0;i<filledboxes.length;i++){
        if(filledboxes[i].innerText == 'g'){
            greenboxes++
        }
        else{
            redboxes++
        }
    }
    winselected = true
    if(redboxes>greenboxes){
        let element = document.createElement("div")
        element.id = "winner"
        let text = document.createElement("p")
        text.innerHTML = "RED WINS"
        element.appendChild(text)
        box.appendChild(element)
    }
    else if(redboxes<greenboxes){
        let element = document.createElement("div")
        element.id = "winner"
        let text = document.createElement("p")
        text.innerHTML = "GREEN WINS"
        element.appendChild(text)
        box.appendChild(element)
    }
    else{
        let element = document.createElement("div")
        element.id = "winner"
        let text = document.createElement("p")
        text.innerHTML = "IT'S DRAW"
        element.appendChild(text)
        box.appendChild(element)
    }
}

function assignlines(){
    
let s = 10
let b = 95

let x
let y = s

for(let i=0;i<7;i++){
    x=s*2
    for(let j=0;j<6;j++){
        let element = document.createElement("div")
        element.setAttribute("style",`top:${y}px;left:${x}px;`);
        element.className = "horizontallines"
        element.innerText = 'o';
        box.appendChild(element)
        x=x+b+s
    }
    y = y+b+s;
}

y=s*2
x=s

for(let i=0;i<6;i++){
    x=s
    for(let j=0;j<7;j++){    
        let element = document.createElement("div")
        element.setAttribute("style",`top:${y}px;left:${x}px;`);
        element.className = "verticallines"
        element.innerText = 'o';
        box.appendChild(element)
        x=x+b+s
    }
    y=y+b+s
}

hlines = document.querySelectorAll(".horizontallines")
vlines = document.querySelectorAll(".verticallines")

}
function addboxes(){
    let x = 0;
    let repeat = false;
    for(let i=0;i<36;i++){        
        if(hlines[i].innerText != 'o' && hlines[i+6].innerText != 'o' && vlines[i+x].innerText != 'o' && vlines[i+1+x].innerText != 'o' ){
            // add fill
            let currentpattern = {
                top : i,
                left : i+6,
                right : i+x,
                bottom : i+1+x 
            }
           
            let element = document.createElement('div')
            element.className = 'fill'

            if(repeat == false){
                if(player == 'g'){
                    element.classList.add('redfill')
                    element.innerText = 'r'
                }
                else if(player == 'r'){
                    element.classList.add('greenfill')
                    element.innerText = 'g'
                }
            }
            else{
                if(player == 'r'){
                    element.classList.add('redfill')
                    element.innerText = 'r'
                }
                else if(player == 'g'){
                    element.classList.add('greenfill')
                    element.innerText = 'g'
                }
            }

            let top = hlines[i].style['top']
            let left = hlines[i].style['left']
            top = parseInt(top.slice(0,top.indexOf('p')))
            left = parseInt(left.slice(0,left.indexOf('p')))
            top = top +5
            left = left -5
            element.setAttribute("style",`top:${top}px;left:${left}px;`);            

            if(checkpattern(currentpattern)==false){
                box.appendChild(element)
                pattern.push(currentpattern)
                if(repeat == false){
                    if(player == 'g'){
                        player = 'r'
                    }
                    else{
                        player = 'g'
                    }
                }
                repeat = true
                filledboxes = document.querySelectorAll(".fill")
                if(filledboxes.length == 36){
                    selectwinner()
                }
            }   
        }

        if(i%6 == 5){
            x=x+1;
        }
    }
}

assignlines()

for(let line of hlines){
    line.onclick=()=>{
        if(!winselected){
            if(player == 'r' && line.innerText == 'o'){
                line.classList.add('red')
                line.classList.remove('green')
                line.innerText = 'r'
                player = 'g'
                addboxes()
                
            }
            else if (player == 'g' && line.innerText == 'o'){
                line.classList.add('green')
                line.classList.remove('red')
                line.innerText = 'g'
                player = 'r'
                addboxes()   
            }
        }
        
    }
}
for(let line of vlines){
    line.onclick=()=>{
        if(!winselected){
            if(player == 'r' && line.innerText == 'o'){
                line.classList.add('red')
                line.classList.remove('green')
                line.innerText = 'r'
                player = 'g'
                addboxes()
    
            }
            else if(player == 'g' && line.innerText == 'o'){
                line.classList.add('green')
                line.classList.remove('red')
                line.innerText = 'g'
                player = 'r'
                addboxes()    
            }
        }        
    }
}
