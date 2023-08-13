const titleSize=2.5;

function checkWindowDimensions() {

    let titleSpans = document.querySelectorAll(".title span");
    let html=document.querySelector("html");
    if(window.innerWidth > window.innerHeight){
        //LandScape
        titleSpans.forEach(titleSpan => {
            titleSpan.style.fontSize=titleSize+"vh";
        });
        html.style.fontSize="1vh";
    } else {
        //Portrait
        titleSpans.forEach(titleSpan => {
            titleSpan.style.fontSize=titleSize+"vw";
        });
        html.style.fontSize="1vw";
    }



    let pElements = document.querySelectorAll(".stickyNote p");

    pElements.forEach(p => {
        let fontSize = parseInt(window.getComputedStyle(p).fontSize);

        while (p.scrollHeight > p.offsetHeight && fontSize > 0) {
            fontSize--;
            p.style.fontSize = fontSize + "px";
        }

        // Increase font size until it's just about to overflow
        while (p.scrollHeight <= p.offsetHeight && fontSize <= 100) { // 100 is just an arbitrary upper limit
            fontSize++;
            p.style.fontSize = fontSize + "px";
        }

        // Revert one step back to ensure the content fits
        fontSize--;
        p.style.fontSize = fontSize + "px";
    });


    let p2Elements = document.querySelectorAll(".descriptionContainer p");

    p2Elements.forEach(p => {
        let fontSize = parseInt(window.getComputedStyle(p).fontSize);

        while (p.scrollHeight > p.offsetHeight && fontSize > 0) {
            fontSize--;
            p.style.fontSize = fontSize + "px";
        }

        // Increase font size until it's just about to overflow
        while (p.scrollHeight <= p.offsetHeight && fontSize <= 100) { // 100 is just an arbitrary upper limit
            fontSize++;
            p.style.fontSize = fontSize + "px";
        }

        // Revert one step back to ensure the content fits
        fontSize--;
        p.style.fontSize = fontSize + "px";
    });
    
}

checkWindowDimensions();
window.addEventListener('resize', checkWindowDimensions);





let currentSection=-1;
//Create Section
let createSection=document.getElementById("createSection");
createSection.style.display="none";

let createSectionButton=document.getElementById("createSectionButton");
createSectionButton.addEventListener("click", function(){createSection.style.display="flex";});


let createSectionCancel=document.getElementById("createSectionCancel");
createSectionCancel.addEventListener("click",function(){createSection.style.display="none";});

let sections=document.getElementById("sections");

let stickyNotesContainer=document.getElementById("stickyNotesContainer");
function CreateSection(){
    let createSectionInputValue=document.getElementById("createSectionInput").value;
    if(createSectionInputValue.trim() !== ""){
        createStickyButton.addEventListener("click", function(){createSticky.style.display="flex";});createStickyButton.style.opacity="1";
        currentSection++;

        document.getElementById("createSectionInput").value="";
        let div=document.createElement("div");
        div.addEventListener("click",SwitchSection);
        div.classList.add("sectionButton");
        div.classList.add("sectionButtonActive");
        let p=document.createElement("p");
        div.appendChild(p);
        p.innerHTML=createSectionInputValue;

        let bin=document.createElement("i");
        bin.classList.add("bi");
        bin.classList.add("bi-trash-fill");
        bin.classList.add("SectionsBin");
        bin.addEventListener("click",function(){
            setTimeout(function() {
                console.log("bin");
                const childrenArray = Array.from(sections.children);
                console.log(childrenArray);
                let parentDiv=bin.parentElement;
                console.log(parentDiv);
                const childIndex = childrenArray.indexOf(parentDiv);
                console.log("asdsa:", childIndex);
                stickyNotesContainer.children[childIndex].remove();
                parentDiv.remove();
            }, 10);
        });
        div.appendChild(bin);

        sections.appendChild(div);
        createSection.style.display="none";

        let stickyNotes=document.createElement("div");
        stickyNotes.classList.add("stickyNotes");
        stickyNotes.style.backgroundColor=document.getElementById("choseBackgroundInput").value;
        stickyNotesContainer.appendChild(stickyNotes);

        for (let i = 0; i < stickyNotesContainer.children.length-1; i++) {
            let childElement = stickyNotesContainer.children[i];
            childElement.style.display="none";
        }
        for (let i = 0; i < sections.children.length-1; i++) {
            let childElement = sections.children[i];
            if(childElement.classList.contains("sectionButtonActive"))
                childElement.classList.remove("sectionButtonActive");
            if(!childElement.classList.contains("sectionButtonNotActive"))
                childElement.classList.add("sectionButtonNotActive");
        }
        checkWindowDimensions();
    }
}

let createSectionCreate=document.getElementById("createSectionCreate");
createSectionCreate.addEventListener("click",CreateSection);


function SwitchSection(){
    console.log("swith!");
    const parentDiv = this.parentElement;
    const childrenArray = Array.from(parentDiv.children);
    const childIndex = childrenArray.indexOf(this);

    for (let i = 0; i < sections.children.length; i++) {
        let childElement = sections.children[i];
        if(childElement.classList.contains("sectionButtonActive"))
            childElement.classList.remove("sectionButtonActive");
        if(!childElement.classList.contains("sectionButtonNotActive"))
            childElement.classList.add("sectionButtonNotActive");
    }

    for (let i = 0; i < stickyNotesContainer.children.length; i++) {
        let childElement = stickyNotesContainer.children[i];
        childElement.style.display="none";
    }

    let childElement = sections.children[childIndex];
    if(!childElement.classList.contains("sectionButtonActive"))
        childElement.classList.add("sectionButtonActive");
    if(childElement.classList.contains("sectionButtonNotActive"))
        childElement.classList.remove("sectionButtonNotActive");
    
    stickyNotesContainer.children[childIndex].style.display="flex";

    checkWindowDimensions();
}


//Create sticky
let createSticky=document.getElementById("createSticky");
createSticky.style.display="none";

let createStickyButton=document.getElementById("createStickyButton");
createStickyButton.style.opacity="0.5";


let createStickyCancel=document.getElementById("createStickyCancel");
createStickyCancel.addEventListener("click",function(){createSticky.style.display="none";});


let description;
let stickyParent;
let stickyremove=false;


function CreateStickyNote(){
    let createStickyInputValue=document.getElementById("createStickyInput").value;
    let createStickyInputDescriptionValue=document.getElementById("createStickyInputDescription").value;
    let createStickyInputBackgroundColorValue=document.getElementById("createStickyInputBackgroundColor").value;
    let createStickyInputTextColorValue=document.getElementById("createStickyInputTextColor").value;
    if(createStickyInputValue.trim() !== ""){
        for (let i = 0; i < stickyNotesContainer.children.length; i++) {
            let childElement = stickyNotesContainer.children[i];
            if(childElement.style.display!="none"){
                document.getElementById("createStickyInput").value="";
                document.getElementById("createStickyInputDescription").value="";
                createSticky.style.display="none";

                let stickyNote=document.createElement("div");

                stickyNote.classList.add("stickyNote");
                stickyNote.style.backgroundColor=createStickyInputBackgroundColorValue;
                stickyNote.style.color=createStickyInputTextColorValue;

                let PinImg=document.createElement("img");
                PinImg.src="./Src/Pin.png";
                stickyNote.appendChild(PinImg);


                let p=document.createElement("p");
                p.innerHTML=createStickyInputValue;
                stickyNote.appendChild(p);

                let bin=document.createElement("i");
                bin.classList.add("bi");
                bin.classList.add("bi-trash-fill");
                bin.classList.add("StickyBin");
                bin.style.color=createStickyInputTextColorValue;
                bin.addEventListener("click",function(){
                    bin.parentElement.remove();
                    stickyremove=true;
                });
                stickyNote.appendChild(bin);

                //            -----Animation-----
                if(createStickyInputDescriptionValue.trim() !== ""){
                //
                    stickyNote.addEventListener("mouseover", function() {
                        // Apply hover animation
                        PinImg.classList.remove("animateNotPoint");
                        stickyNote.classList.remove("animateNotPoint2");
                        PinImg.classList.add("animatePoint");
                        stickyNote.classList.add("animatePoint2");
                    });
                    stickyNote.addEventListener("mouseleave", function() {
                        // Apply hover animation
                        console.log("leave");
                        PinImg.classList.remove("animatePoint");
                        stickyNote.classList.remove("animatePoint2");
                        PinImg.classList.add("animateNotPoint");
                        stickyNote.classList.add("animateNotPoint2");
                    });
                    


                    let descriptionView=document.createElement("div");
                    descriptionView.classList.add("descriptionView");
                    descriptionView.style.backgroundColor=createStickyInputBackgroundColorValue;
                    descriptionView.style.color=createStickyInputTextColorValue;
                    //container
                    let descriptionContainer=document.createElement("div");
                    descriptionContainer.classList.add("descriptionContainer");

                    let text=document.createElement("p");
                    text.innerHTML=createStickyInputDescriptionValue;
                    descriptionContainer.appendChild(text);

                    //button
                    

                    let descriptionBack=document.createElement("div");
                    descriptionBack.classList.add("descriptionBack");
                    descriptionBack.addEventListener("click", function() {descriptionView.style.display="none";stickyParent.appendChild(description);});

                    let h1=document.createElement("h1");
                    h1.innerHTML="BACK";
                    descriptionBack.appendChild(h1);


                    descriptionView.appendChild(descriptionContainer);
                    descriptionView.appendChild(descriptionBack);
                    descriptionView.style.display="none";

                    stickyNote.appendChild(descriptionView);

                    stickyNote.addEventListener("click",function(){
                        if(!stickyremove){
                            console.log("open!!!");
                            stickyParent=this;
                            description=stickyNote.lastChild;
                            let main=document.querySelector("main");
                            main.appendChild(description);
                            description.style.display="flex";
                        }
                        stickyremove=false;
                    });

                }else{
                    stickyNote.style["cursor"]="default";
                }

                childElement.appendChild(stickyNote);
            }
        }
        checkWindowDimensions();
    }

}

let createStickyCreate=document.getElementById("createStickyCreate");
createStickyCreate.addEventListener("click",CreateStickyNote);




function SwitchFullScreen(){
    if (!document.fullscreenElement) { // Check if we are not in fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
        document.getElementById('FullScreenButton').children[0].src="./Src/WindowScreen.png";
    } else { // We are in fullscreen, let's exit
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
        document.getElementById('FullScreenButton').children[0].src="./Src/FullScreen.png";
    }
}

document.getElementById('FullScreenButton').addEventListener('click',SwitchFullScreen);


let choseBackgroundBox=document.getElementById("choseBackgroundBox");
choseBackgroundBox.style.display="none";

let choseBackground=document.getElementById("choseBackground");
choseBackground.addEventListener("click",function(){choseBackgroundBox.style.display="flex"});

choseBackgroundOk=document.getElementById("choseBackgroundOk");
choseBackgroundOk.addEventListener("click",function(){
    choseBackgroundBox.style.display="none";
    document.querySelector("main").style.backgroundColor=document.getElementById("choseBackgroundInput").value;
    let stickyNotesList=document.querySelectorAll(".stickyNotes");
    stickyNotesList.forEach(stickyNotes=>{
        stickyNotes.style.backgroundColor=document.getElementById("choseBackgroundInput").value;
    });
});