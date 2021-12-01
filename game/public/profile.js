let masterColor = ['red', 'blue', 'yellow', 'green', 'pink', 'purple'];
let pic,win=1,total=1;
let isWin;
async function getUser(){
    const res = await fetch('/user', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const result = await res.json();
    // document.querySelector('#User').innerHTML = `${result.username}`;
    let x =1;
    document.querySelector('#user').innerHTML =result[result.length-1];
    for (let i in result) {
        if(i==(parseInt(result.length-1))){
            break;
        }
        console.log(result[i].date);
        if ((result[i].color1-1<=5)&&(result[i].color1-1>=0)){
            isWin='WIN';
        }
        else{
            isWin='Lose';
        }
        console.log(`${masterColor[result[i].color1-1]}`);
        document.querySelector('.center').innerHTML += `
        <tr class='content${x%2}'>
        <td class='date'>${result[i].date}</td>
        <td>${isWin}</td>
        <td>${result[i].round}</td>
        <td><i class="fas fa-circle" style="color:${masterColor[result[i].color1-1]}"></i><i class="fas fa-circle" style="color:${masterColor[result[i].color2-1]}"></i><i class="fas fa-circle" style="color:${masterColor[result[i].color3-1]}"></i><i class="fas fa-circle" style="color:${masterColor[result[i].color4-1]}"></i></td>
    </tr>`;
    x++;
    }
}
document.querySelector('#game').addEventListener('click', function (event) {
    window.location ='/game'
})
getUser();

document.querySelector("#uploadimage").addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    let formData = new FormData();
    formData.append("pic",form.pic.files[0],form.pic.files[0].name);
    const res = await fetch('/user/uploadimage', {
        method: "POST",
        body: formData
    });
    const result = await res.json();
    if (result.success) {
        alert('Upload Success!');
    }
    window.location ='/profile.html'
})
document.querySelector("#clear").addEventListener('click', async (event) => {
    document.querySelector('.center').innerHTML =''
    alert("Clear Success!!!")

});
document.querySelector('#signout').addEventListener('click', function (event) {
    window.location ='/user/logout'
})
async function getImage() {
    const res = await fetch('/user/image', {
        method: "POST",
    });
    const result = await res.json();
    console.log(result.total);
    total=parseInt(result.total);
    console.log(result.total);
    win=parseInt(result.win);
    if(result.success){
            pic = result.name;
    document.querySelector("#image").src = `${pic}`;
    document.querySelector("#image").width = `200`;
    document.querySelector("#image").height = `200`;
    }
    else{
        alert("Please Upload your profile picture!")
    }
    //pie setup
const labels = [
    'Hit',
    'Miss',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Hit rates',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [(win/total)*100,((total-win)/total)*100],
    }]
  };
//pie config
 const config = {
    type: 'pie',
    data,
    options: {}
  };



var myChart = new Chart(document.getElementById('myChart'), config)
}
 getImage();
