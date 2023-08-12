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
        while (p.scrollHeight <= p.offsetHeight) { // 100 is just an arbitrary upper limit
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



const stickyNotes = document.querySelectorAll(".stickyNote");

stickyNotes.forEach(stickyNote => {
    let img = stickyNote.querySelector("img");

    stickyNote.addEventListener("mouseover", function() {
        // Apply hover animation
        img.classList.remove("animateNotPoint");
        stickyNote.classList.remove("animateNotPoint2");
        img.classList.add("animatePoint");
        stickyNote.classList.add("animatePoint2");
        console.log(window.getComputedStyle(img));
    });
    stickyNote.addEventListener("mouseleave", function() {
        // Apply hover animation
        img.classList.remove("animatePoint");
        stickyNote.classList.remove("animatePoint2");
        img.classList.add("animateNotPoint");
        stickyNote.classList.add("animateNotPoint2");
    });

});





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
        sections.appendChild(div);
        createSection.style.display="none";

        let stickyNotes=document.createElement("div");
        stickyNotes.classList.add("stickyNotes");
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
    }
}

let createSectionCreate=document.getElementById("createSectionCreate");
createSectionCreate.addEventListener("click",CreateSection);


function SwitchSection(){
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



    console.log("Clicked on child number:", childIndex);
}


//Create sticky
let createSticky=document.getElementById("createSticky");
createSticky.style.display="none";

let createStickyButton=document.getElementById("createStickyButton");
createStickyButton.style.opacity="0.5";


let createStickyCancel=document.getElementById("createStickyCancel");
createStickyCancel.addEventListener("click",function(){createSticky.style.display="none";});

function CreateStickyNote(){
    let createStickyInputValue=document.getElementById("createStickyInput").value;
    let createStickyInputDescriptionValue=document.getElementById("createStickyInputDescription").value;
    if(createStickyInputValue.trim() !== "" && createStickyInputDescriptionValue.trim()!=""){
        for (let i = 0; i < stickyNotesContainer.children.length; i++) {
            let childElement = stickyNotesContainer.children[i];
            if(childElement.style.display!="none"){
                document.getElementById("createStickyInput").value="";
                document.getElementById("createStickyInputDescription").value="";
                createSticky.style.display="none";

                let stickyNote=document.createElement("div");
                stickyNote.classList.add("stickyNote");

                let PinImg=document.createElement("img");
                PinImg.src="./Src/Pin.png";
                stickyNote.appendChild(PinImg);

                let p=document.createElement("p");
                p.innerHTML=createStickyInputValue;
                stickyNote.appendChild(p);

                childElement.appendChild(stickyNote);
            }
        }
        checkWindowDimensions();
    }

}

let createStickyCreate=document.getElementById("createStickyCreate");
createStickyCreate.addEventListener("click",CreateStickyNote);
