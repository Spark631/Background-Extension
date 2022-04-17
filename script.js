let Military = false;
let secondsOn = true;
let dateOn = true;

function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();

    var date_day = dateTime.getDate();

    const weekday = ["Sunday,"
                    ,"Monday,",
                    "Tuesday,",
                    "Wednesday,",
                    "Thursday,",
                    "Friday,",
                    "Saturday,"];

    const months = ["January", 
                    "February", 
                    "March", 
                    "April", 
                    "May", 
                    "June", 
                    "July", 
                    "August", 
                    "September", 
                    "October", 
                    "November", 
                    "December"];

    let month = months[dateTime.getMonth()];
    let day = weekday[dateTime.getDay()];
    if(dateOn == true){
        document.getElementById("day").innerHTML = day;
        document.getElementById("date").innerHTML = date_day;
        document.getElementById("month").innerHTML = month;
    } else{
        document.getElementById("day").innerHTML = "";
        document.getElementById("date").innerHTML = "";
        document.getElementById("month").innerHTML = "";
    }
    if(Military == false){
        if(hrs >12){
            hrs = hrs-12;
        }
    }
    if(min < 10){
        min = "0" + min;
    }
    if(secondsOn == true){
        document.getElementById("seconds").innerHTML = sec;
    } else {
        document.getElementById("seconds").innerHTML = "";
    }
    document.getElementById("hours").innerHTML = hrs;
    document.getElementById("minutes").innerHTML = min;

}
setInterval(displayTime, 10);

window.onload=function(){
    chrome.storage.sync.get(["font_size"], function(result){
        document.getElementById("Sclock").style.fontSize = result.font_size + "em";
        for(var option of document.getElementById("font-size").options){
            if(option.value == result.font_size){
                option.selected = true;
            }
        }
    });
    chrome.storage.sync.get(["dates"], function(result){
        dateys = result.dates;
        dateys == "true" ?  dateOn = true : dateOn = false;
        for(var option of document.getElementById("Cdate").options){
            if(option.value == dateys){
                option.selected = true;
            }
        }
    });
    chrome.storage.sync.get(["seconds"], function(result){
        secondys = result.seconds;
        secondys == "true" ?  secondsOn = true : secondsOn = false;
        for(var option of document.getElementById("Cseconds").options){
            if(option.value == secondys){
                option.selected = true;
            }
        }
    });
    chrome.storage.sync.get(["font"], function(result){
        document.getElementById("Sclock").style.fontFamily = result.font;
        document.getElementById("Sdays").style.fontFamily = result.font;
        for (var option of document.getElementById("fonts").options){
            if (option.value === result.font){
                option.selected = true;
                return;
            }
        }
    });
    chrome.storage.sync.get(["time"], function(result){
        result.time == "true" ? Military = true : Military = false;
        for(var option of document.getElementById("Ctime").options){
            if(option.value == result.time){
                option.selected = true;
            }
        }
    });
    chrome.storage.sync.get(["background"], function(mainBackground){
        document.body.style.background = mainBackground.background;
    })

    var fontSize = document.getElementById("font-size");
    fontSize.addEventListener("change", function(){
        let fontSizeValue = parseInt(fontSize.options[fontSize.selectedIndex].value);
        document.getElementById("Sclock").style.fontSize = fontSizeValue + "em";
        chrome.storage.sync.set({font_size: fontSizeValue}, function(){
        })
    });

    var datey = document.getElementById("Cdate")
    datey.addEventListener("click", function(){
        var dateys =  datey.options[datey.selectedIndex].value;
        dateys == "true" ?  dateOn = true : dateOn = false;
        chrome.storage.sync.set({dates: dateys}, function(){
        })
    });

    var secondy = document.getElementById("Cseconds");
    secondy.addEventListener("click", function(){
        var secondys = secondy.options[secondy.selectedIndex].value;
        secondys == "true" ?  secondsOn = true : secondsOn = false;
        chrome.storage.sync.set({seconds: secondys}, function(){
        })
    });

    var fonty = document.getElementById("fonts");
    fonty.addEventListener("click", function(){
        var font = fonty.options[fonty.selectedIndex].value;
        document.getElementById("Sclock").style.fontFamily = font;
        document.getElementById("Sdays").style.fontFamily = font;
        chrome.storage.sync.set({font: font}, function(){
        });
    });

    var choice = document.getElementById("Ctime")
    choice.addEventListener("click", function(){
        var text = choice.options[choice.selectedIndex].value;
        text == "true" ? Military = true : Military = false;
        chrome.storage.sync.set({time: text}, function(){
        })
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
            if(bg.id == "1"){
                savedBg = "linear-gradient(-45deg, #c44343,rgb(221, 125, 125), rgb(235, 97, 120),#ce2727)";
                document.body.style.background = savedBg;
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
            })
        })
    })
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
