// function displayTime() {
//     var date = new Date();
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var seconds = date.getSeconds();
//     var ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     seconds = seconds < 10 ? '0' + seconds : seconds;
//     var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
//     document.getElementById('clock').innerHTML = strTime;
//     setTimeout(displayTime, 1000);
// }
console.log("WOWOOWOW")
function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    if(hrs >12){
        hrs= hrs-12;
    }
    document.getElementById("hours").innerHTML = hrs;
    document.getElementById("minutes").innerHTML = min;
    document.getElementById("seconds").innerHTML = sec;

}
setInterval(displayTime, 10);



window.onload=function(){

    chrome.storage.sync.get(["background"], function(mainBackground){
        console.log(mainBackground.background);
        document.body.style.background = mainBackground.background;
    })

    let isOpen = false;
    document.getElementById("tester").addEventListener("click", test);
    function test(){
        if(isOpen == false){
        document.getElementById("tester").style.marginLeft="300px";
        document.getElementById("sidebar").style.width="300px";
        isOpen = true;
    } else {
        document.getElementById("sidebar").style.width="0px";
        document.getElementById("tester").style.marginLeft="0px";
        isOpen = false;
    }
    }
    
    const backgrounds = document.querySelectorAll('[data-background]')
    backgrounds.forEach(bg => {
        bg.addEventListener("click", () => {            
            let savedBg = "";

            console.log(bg.id)
            if(bg.id == "1"){
                savedBg = "linear-gradient(-45deg, #c44343,rgb(221, 125, 125), rgb(235, 97, 120),#ce2727)";
                document.body.style.background = savedBg;
                console.log(savedBg);
            } else if(bg.id == "2"){
                savedBg = "linear-gradient(-45deg, #151453,rgb(31, 24, 119), rgb(21, 35, 39),#050c1d)";
                document.body.style.background = savedBg
            } else if(bg.id == "3"){
                savedBg = "linear-gradient(-45deg, #6a43c4,rgb(132, 125, 221), rgb(97, 203, 235),#275cce)";
                document.body.style.background = savedBg;
            } else if(bg.id == "4"){
                savedBg = "linear-gradient(-45deg, #145339,rgb(14, 90, 37), rgb(21, 35, 39),#050c1d)";
                document.body.style.background = savedBg;
            } else if(bg.id == "5"){
                savedBg = "linear-gradient(-45deg,black,gray,black,gray,black,gray,black,gray,black,gray,black,gray)";
                document.body.style.background = savedBg;
            } else if (bg.id == "6"){
                savedBg = "linear-gradient(-45deg,black,yellow,black,rgb(209, 209, 183),black,yellow,black,rgb(255, 255, 248),black,yellow,black,yellow)";
                document.body.style.background = savedBg;
            } else if (bg.id == "7"){
                savedBg = "linear-gradient(to top, #a8edea 0%, #4b1929 100%)";
                document.body.style.background = savedBg;
            } else if (bg.id == "8"){
                savedBg = "linear-gradient(-20deg, #d558c8 0%, #24d292 100%)";
                document.body.style.background = savedBg;
            } else if (bg.id == "9"){
                savedBg = "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)";
                document.body.style.background = savedBg;
            } else if (bg.id == "10"){
                savedBg = "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)";
                document.body.style.background = savedBg;
            } else if (bg.id == "11"){
                savedBg = "radial-gradient( circle farthest-corner at 10% 20%,  rgba(37,145,251,0.98) 0.1%, rgba(0,7,128,1) 99.8% )";
                document.body.style.background = savedBg;
            }
            chrome.storage.sync.set({background:savedBg}, function(){
                console.log("background saved");
            })
        })
    })

    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = input.value;

        if(!task) {
            alert("No note was added");
            return;
        }

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');
        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('texts');
        task_input_el.type = 'texts';
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerHTML = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);
        console.log("THis is the task:"+task_el + task_actions_el, task_input_el, task_content_el,input.value);

        input.value = '';

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute('readonly', 'readonly');
                task_edit_el.innerText = "Edit";
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            console.log("DELTED BIUCHRTHCHHhh")
        });

        chrome.storage.sync.get(function(cfg) {
            if(typeof(cfg["Note"]) !== 'undefined' && cfg["Note"] instanceof Array) { 
              cfg["Note"].push(task);
            } else {
              cfg["Note"] = [task];
            }
            chrome.storage.sync.set(cfg);
          });
    });
    chrome.storage.sync.get(["Note"], function(notey){
        console.log("THIS IS THE NEW TAB ARAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" + notey.Note);
        theNotes = notey.Note;
        theNotes.forEach(text => {
            const task = text
            const task_el = document.createElement('div');
            task_el.classList.add('task');
    
            const task_content_el = document.createElement('div');
            task_content_el.classList.add('content');
            task_el.appendChild(task_content_el);
    
            const task_input_el = document.createElement('input');
            task_input_el.classList.add('texts');
            task_input_el.type = 'texts';
            task_input_el.value = task;
            task_input_el.setAttribute("readonly", "readonly");
    
            task_content_el.appendChild(task_input_el);
    
            const task_actions_el = document.createElement('div');
            task_actions_el.classList.add('actions');
    
            const task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit');
            task_edit_el.innerHTML = 'Edit';
    
            const task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete');
            task_delete_el.innerHTML = 'Delete';
    
            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);
    
            task_el.appendChild(task_actions_el);
    
            list_el.appendChild(task_el);

            task_edit_el.addEventListener('click', () => {
                if (task_edit_el.innerText.toLowerCase() == "edit") {
                    task_input_el.removeAttribute('readonly');
                    task_input_el.focus();
                    task_edit_el.innerText = "Save";
                } else {
                    task_input_el.setAttribute('readonly', 'readonly');
                    task_edit_el.innerText = "Edit";
                }
            });
    
            task_delete_el.addEventListener('click', () => {
                chrome.storage.sync.get(["Note"], function(removing){
                    // let work = emoving.Note.splice(removing.Note.indexOf(task), 1);
                    // console.log(work)
                    // chrome.storage.sync.set(removing);
                    console.log("REMOVING STUFF" + removing.Note)
                    var myArray = removing.Note;
                    var myIndex = myArray.indexOf(task);
                    console.log("This is the index of the note: " + myIndex);
                    if (myIndex > -1) {
                        myArray.splice(myIndex, 1);
                    }

                    console.log("This is the new array: " + myArray);

                    chrome.storage.sync.remove("Note", function(){
                        console.log("removed the array")
                    });
                    chrome.storage.sync.get(["lmfao"], function(bro){
                        console.log("--------------------------------------------------------------------------")
                        if (bro.lmfao == undefined) {
                            chrome.storage.sync.set({"lmfao": "OMG"});
                            console.log("BRO THIS IS THE LMFAO THINGY: " + bro.lmfao);
                        } else {
                            console.log("hopefully worky")
                            console.log(bro)
                            console.log("XDCDDDDDDDDDDDDDDDDD: " + bro.lmfao);
                            bro.push("HIIIIIIIIIIIIIIII")
                            console.log("XDCDDDDDDDDDDDDDDDDD: " + bro.lmfao);
                            console.log(bro)
                        }
                    })
                    myArray.forEach(texty => {
                        chrome.storage.sync.get(function(boo) {
                            console.log("ran the function " + texty)
                            console.log("This is the boo note shitz " + boo["Note"])
                            console.log("THIS IS THE TYPe OF BOO " + typeof(boo["Note"]))
                            if(typeof(boo["Note"]) == 'undefined') { 
                                boo["Note"] = texty;
                                console.log("WE SET IT BOIIISSS LETS FRINKEN GOOOOOOOOO")
                                console.log("AFTER THE SET " + boo["Note"])
                            } else {
                                console.log("WEEEE ADDED IT BOISSS LETS FRINKENGFDNGDFGJKLDFJGLFDG")
                                 ["Note"].push(texty);
                            }
                            chrome.storage.sync.set(boo);
                          });
                    });
                    // && boo["Note"] instanceof Array

                })
                console.log(task_el)
                console.log("This is the task: " + task)
                console.log("This is acutal: " + text)
                chrome.storage.sync.remove(task, function(removed){
                    console.log("We have successfully removed: " + removed)
                    console.log("We have removed it and this has worked omg lololoooo")
                })
                list_el.removeChild(task_el);
                console.log(list_el)
                console.log("DELTED BIUCHRTHCHHhh")
            });
        })
    });

    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget)
            tabContents.forEach(tabContents => {
                tabContents.classList.remove('active')
            })    
            target.classList.add("active")
        })    
    })
    
    
}
