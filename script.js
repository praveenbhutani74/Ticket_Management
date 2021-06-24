let filters=document.querySelectorAll(".filter");
let ticketCon=document.querySelector(".ticket-container");

let OpenModal=document.querySelector(".open-modal");
let CloseModal=document.querySelector(".close-modal");
let ticketSelector=false;
let isTextTyped=false;

for(let i=0;i<filters.length;i++){
    filters[i].addEventListener("click",selectfun);
}

function selectfun(e){

    if(e.target.classList.contains("active-filter")){

        // console.log("yes");
        e.target.classList.remove("active-filter");

        ticketCon.innerHTML="";
        loadTickets();
    }
    else{

        if(document.querySelector(".active-filter")){
            document.querySelector(".active-filter").classList.remove("active-filter");
        }

        e.target.classList.add("active-filter");
        let filterselected=e.target.classList[1];
        console.log(filterselected);
        ticketCon.innerHTML="";
        loadSelectedFilter(filterselected);



    }
    
 
}



OpenModal.addEventListener("click",openTicketModal);
CloseModal.addEventListener("click",closeTicketModal);

function openTicketModal(){
    if(ticketSelector){
        return;
    }


    let ticketModal=document.createElement("div");
    ticketModal.classList.add("ticket-Modals");
    ticketModal.innerHTML=`<div class="ticket-content" contenteditable="true" spellcheck="false">   Enter Your Text!!</div> <div class="tickets-filter">
        <div class="ticket-filter red selected-filter"></div>
        <div class="ticket-filter green"></div>
        <div class="ticket-filter blue"></div>
        <div class="ticket-filter cyan"></div>
        <div class="ticket-filter grey"></div>
    </div>`
    
    document.querySelector("body").append(ticketModal);
    ticketSelector=true;
    isTextTyped=false;

    let ticketText=ticketModal.querySelector(".ticket-content");
    ticketText.addEventListener("keypress", handlekeypress);

    let ticketFilter=ticketModal.querySelectorAll(".ticket-filter");
    for(let i=0;i<ticketFilter.length;i++){
        ticketFilter[i].addEventListener("click",function(e){
            if(e.target.classList.contains("selected-filter")){
                return;
            }
            document.querySelector(".selected-filter").classList.remove("selected-filter");
            e.target.classList.add("selected-filter");
        })
    }


}
function closeTicketModal(){

    if(ticketSelector){

        document.querySelector(".ticket-Modals").remove();
        ticketSelector=false;
        isTextTyped=false;
    }
    

}

function handlekeypress(e){


    if(e.key=="Enter"&&  isTextTyped&& e.target.textContent!=""){
        let filter=document.querySelector(".selected-filter").classList[1];
        let ticketId=uuid();
        let TicketInfoObject={ticketFilter:filter,ticketValue:e.target.textContent,ticketId:ticketId};
        appendTicket(TicketInfoObject);
    CloseModal.click();
    saveTicketToDB(TicketInfoObject);

    }


    if(!isTextTyped){
        isTextTyped=true;
        e.target.textContent="";
    }

}

