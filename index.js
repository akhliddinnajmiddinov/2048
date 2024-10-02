btn_nums = Array.from({length: 4}, () => Array.from({length: 4}, () => 0))
btn_nums[0][0] = 2
document.addEventListener("keydown", processEvent);

bg_colors = ["#f0f0f0", "#ede0c8", "#f2b179", "#f59563", "#f67c5f", "#f65e3b", "#edcf72"]

function add_style(...new_btn){
    console.log(new_btn)
    let buttons = document.querySelectorAll("button")
    for(let i = 0; i<buttons.length; i++){
        let x = Math.floor(i / 4), y = i % 4
        if(btn_nums[x][y] != 0){
            buttons[i].classList.remove(...buttons[i].classList)
            console.log(x, y, Math.floor(Math.log2(btn_nums[x][y])) - 1)
            buttons[i].style.backgroundColor = bg_colors[Math.floor(Math.log2(btn_nums[x][y])) - 1];
            buttons[i].textContent = String(btn_nums[x][y])
        }
        else{
            buttons[i].classList.remove(...buttons[i].classList)
            buttons[i].style.backgroundColor = "#eee4da";
            buttons[i].classList.add("btn-light-gray");
            buttons[i].textContent = ""
        }
        if(new_btn.length == 2){
            if(x == new_btn[0] && y == new_btn[1]){
                buttons[i].classList.add("new_btn");
            }
            else{
                buttons[i].classList.remove("new_btn");
            }   
        }
        else{
            buttons[i].classList.remove("new_btn");
        }
    }
}

function processEvent(event){
    // console.log(typeof(event.code))
    if(event.code == "ArrowRight"){
        btn_nums = processRight(btn_nums)
        add_random()
    }
    else if(event.code == "ArrowLeft"){
        btn_nums = processLeft(btn_nums)
        add_random()
    }
    else if(event.code == "ArrowUp"){
        btn_nums = processUp(btn_nums)
        add_random()
    }
    else if(event.code == "ArrowDown"){
        btn_nums = processDown(btn_nums)
        add_random()
    }
}

function processRight(btns){
    for(let i=0; i<4; i++){
        let qism = []
        for(let j=0; j<4; j++){
            if(btns[i][j] != 0)qism.push(btns[i][j])
            btns[i][j] = 0
        }

        let new_qism = []
        for(let i=qism.length - 1; i>=0; i--){
            if(i - 1 >= 0 && qism[i - 1] == qism[i]){
                new_qism.push(qism[i - 1] + qism[i])
                i --
            }
            else new_qism.push(qism[i])
        }
        new_qism = new_qism.reverse()

        for(let j=4-new_qism.length; j<4; j++){
            btns[i][j] = new_qism[j - (4-new_qism.length)]
        }
    }
    return btns
}

function processLeft(btns){
    btns = reverse(btns)
    btns = processRight(btns)
    btns = reverse(btns)
    return btns
}

function processUp(btns){
    btns = rotate(btns)
    btns = processRight(btns)
    btns = rotate(btns)
    btns = rotate(btns)
    btns = rotate(btns)
    return btns
}

function processDown(btns){
    btns = rotate(btns)
    btns = rotate(btns)
    btns = rotate(btns)
    btns = processRight(btns)
    btns = rotate(btns)
    return btns
}

function reverse(btns){
    new_btns = []
    for(let i = 0; i<4; i++){
        new_btns.push(btns[i].reverse())
    }
    return new_btns
}

function rotate(btns){
    new_btns = []
    for(let i = 0; i<4; i++){
        row = []
        for(let j = 3; j>=0; j--){
            row.push(btns[j][i])
        }
        new_btns.push(row)
    }
    return new_btns
}

function add_random(){
    let buttons = document.querySelectorAll("button")
    let random_num = Math.floor(Math.random() * 16)
    let x = Math.floor(random_num / 4), y = Math.floor(random_num % 4)
    while(btn_nums[x][y] != 0){
        random_num = Math.floor(Math.random() * 16)
        x = Math.floor(random_num / 4)
        y = Math.floor(random_num % 4)
    }
    
    btn_nums[x][y] = 2
    buttons[random_num].textContent = "2"
    add_style(x, y)
}

add_style()