//variables
let anscolor = [];
let color;
let masterColor = ['red', 'blue', 'yellow', 'green', 'pink', 'purple'];
let num = 0;
let comum = 0;
let turn = 0;
let idx = 0;
let pturn = 0;// player's turn
let correctColor = 0;
let totallyCorrect = 0;
let user;
gameInit();
console.log(user);
//Generate random color and show the answer
for (i = 0; i < 4; i++) {
    do { (num = Math.floor(Math.random() * 6)) }
    while (anscolor.includes(num));
    anscolor.push(num);
}
console.log(anscolor);
//game init
async function gameInit(){
    const res = await fetch('/user')
    const result = await res.json();
    user = result.name;
    console.log(user);
    document.querySelector("#turns").innerHTML = `${user}'s turn now!`;
}
//upload game record
async function uploadRecord(){
    const formObject = {};
    formObject['color_id1']=color[0]+1;
    formObject['color_id2']=color[1]+1;
    formObject['color_id3']=color[2]+1;
    formObject['color_id4']=color[3]+1;
    const res = await fetch('/game', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject)
    })
    const result = await res.json();
    if (result.success) {
        alert(result.message);
    } else {
        alert('Upload Fail!');
    }
}
//upload log
async function uploadLogs(){
    const formObject = {};
    formObject['round'] = turn+1;
    formObject['correct'] = correctColor;
    formObject['correctPos'] = totallyCorrect;
    formObject['color_id1']=color[0]+1;
    formObject['color_id2']=color[1]+1;
    formObject['color_id3']=color[2]+1;
    formObject['color_id4']=color[3]+1;
    const res = await fetch('/logs', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject)
    })
}
// gameInit();
//ClickEvent
document.querySelector('#submit').addEventListener('click', async function (event) {
    let win = 0;
    color = [];
     correctColor = 0;
     totallyCorrect = 0;
    let comColor = [];
    let comWhite = 0;
    let comBlack = 0;
    if(document.querySelector('#color1').value&&document.querySelector('#color2').value&&document.querySelector('#color3').value&&document.querySelector('#color4').value){
        color.push(parseInt(document.querySelector('#color1').value));
        color.push(parseInt(document.querySelector('#color2').value));
        color.push(parseInt(document.querySelector('#color3').value));
        color.push(parseInt(document.querySelector('#color4').value));
    }
    else {
        alert("Please select colors!!!");
        window.location.reload();
        document.getElementById("#submit").removeEventListener("click", myFunction);   
    }
    //compare function
    function compare() {
        //same color and position
        // let arr=color.map((item,i)=>item===anscolor[i]);
        // totallyCorrect=arr.map((item,i)=>item==='true').length;
        //same color but different position
        for (let x in color) {
            for (let y in anscolor) {
                if ((color[x] === anscolor[y]) && (x === y)) {
                    totallyCorrect++;
                    
                    break;
                }
                else if ((color[x] === anscolor[y]) && (x != y)) {
                    correctColor++;
                    
                    break;
                }
            }
        }
        return { totallyCorrect, correctColor };
        
    }
    //print result
    document.querySelector('.showResult').innerHTML += `<div style="display:flex ;justify-content:center" class="result${turn}">Your guess:</div>`;
    console.log(color);
    console.log(compare());
    for (let x of color) {
        document.querySelector(`.result${turn}`).innerHTML += `<i class="fas fa-circle" style="font-size:20px; color:${masterColor[x]}"></i>
        `;
        
    }
    //computer player gaming{
    document.querySelector(".showResult").innerHTML += `<div style="display:flex ;justify-content:center" class="comresult${turn}">com guess:</div>`
    for (i = 0; i < 4; i++) {
        do { (comnum = Math.floor(Math.random() * 6)) }
        while (comColor.includes(comnum));
        comColor.push(comnum);

    }
    function compare2() {
        for (let z in comColor) {
            for (let y in anscolor) {
                if ((comColor[z] === anscolor[y]) && (z === y)) {
                    comBlack++;
                    break;
                }
                else if ((comColor[z] === anscolor[y]) && (z != y)) {
                    comWhite++;
                    break;
                }
            }
        }
        return { comBlack, comWhite };
    }
    console.log(compare2());
    for (let z of comColor) {
        document.querySelector(`.comresult${turn}`).innerHTML += `<i class="fas fa-circle" style="font-size:20px; color:${masterColor[z]}"></i>`
    }
    if (comBlack === 4) {
        alert("computer faster than you!You lose");
    } else {
        document.querySelector(`.comresult${turn}`).innerHTML += `<div style='display: inline-block;'> B=${comBlack} W=${comWhite}`
    }
    //upload when press submit
    uploadLogs();
    if (totallyCorrect === 4) {
        alert("You Win!");
        //upload
        uploadRecord();
    } else {
        document.querySelector(`.result${turn}`).innerHTML += `<div style='display: inline-block;'> B=${totallyCorrect} W=${correctColor}`
    }
    //Turns
    turn++;
    pturn = turn % 2 + 1;
    //chance

    const redChance = calculatingChanceEachColor();
    const finalChance = redChance(correctColor, totallyCorrect);//numOfCorrect:2 numOfCorrectPos:0
    document.querySelector('#chance0').innerHTML = `<i class="fas fa-circle" style="font-size:20px; color:red"></i>=${finalChance}%`;
    document.querySelector('#chance1').innerHTML = `<i class="fas fa-circle" style="font-size:20px; color:blue"></i>=${finalChance}%`;
    document.querySelector('#chance2').innerHTML = `<i class="fas fa-circle" style="font-size:20px; color:yellow"></i>=${finalChance}%`;
    document.querySelector('#chance3').innerHTML = `<i class="fas fa-circle" style="font-size:20px; color:green"></i>=${finalChance}%`;
    document.querySelector('#chance4').innerHTML = `<i class="fas fa-circle" style="font-size:20px; color:pink"></i>=${finalChance}%`;
    document.querySelector('#chance5').innerHTML = `<i class="fas fa-circle" style="font-size:20px; color:purple"></i>=${finalChance}%`;
    //reset
    let resetcolors = document.querySelectorAll(".reset");
    for (i of resetcolors) {
        console.log(i);
        i.style.display = "inline";
    }
})

let colorListener = document.querySelectorAll('.color');
for (i of colorListener) {
    i.addEventListener('change', function (event) {
        console.log(event.target.value);
        hideColor(event.target.value);
    })

}
//hide colors
function hideColor(value) {
    if (value == 0) {
        a = document.querySelectorAll(".red");
        for (i of a) {
            i.style.display = "none";
        }
    }
    if (value == 1) {
        a = document.querySelectorAll(".blue");
        for (i of a) {
            i.style.display = "none";
        }
    }
    if (value == 2) {
        a = document.querySelectorAll(".yellow");
        for (i of a) {
            i.style.display = "none";
        }
    }
    if (value == 3) {
        a = document.querySelectorAll(".green");
        for (i of a) {
            i.style.display = "none";
        }
    }
    if (value == 4) {
        a = document.querySelectorAll(".pink");
        for (i of a) {
            i.style.display = "none";
        }
    }
    if (value == 5) {
        a = document.querySelectorAll(".purple");
        for (i of a) {
            i.style.display = "none";
        }
    }
}
document.querySelector('#reset').style.display = "none"

document.querySelector('#restart').addEventListener('click', function (event) {
    window.location.reload()
})
document.querySelector('#profile').addEventListener('click', function (event) {
    window.location ='/profile.html'
})
document.querySelector('#signout').addEventListener('click', function (event) {
    window.location ='/user/logout'
})
//chance
function calculatingChanceEachColor(){
    let chance = 1;
        return (numOfCorrect,numOfCorrectPos)=>{
            //Event 1
            const fullCorrect = Math.pow(0.16666666,numOfCorrect);
            //Event 2
            const correctPOS = (1.0-fullCorrect)*Math.pow(0.16666666,numOfCorrectPos);
            
            const currentChance = (parseFloat( (fullCorrect*1000).toFixed(2) + (correctPOS*1000).toFixed(2) )/1000).toFixed(3);
            chance = chance * parseFloat(currentChance);
            return chance;
    }
}

