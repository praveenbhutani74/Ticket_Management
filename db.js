let MyDb = window.localStorage;

let allFilters=["red","green","blue","cyan","grey"];
function loadTickets() {
    let allTickets = MyDb.getItem("allTickets");

    if (allTickets) {
        allTickets = JSON.parse(allTickets);
        for (let i = 0; i < allTickets.length; i++) {
            let TicketInfoObject = allTickets[i];
            appendTicket(TicketInfoObject);
        }
    }

}
loadTickets();

function loadSelectedFilter(filter){

let allTickets=MyDb.getItem("allTickets");

allTickets=JSON.parse(allTickets);

for(let i=0;i<allTickets.length;i++){
    let TicketInfoObject=allTickets[i];
    if(TicketInfoObject.ticketFilter==filter){
        appendTicket(TicketInfoObject);
    }
}

}

function saveTicketToDB(ticketInfoObject) {

    let allTickets = MyDb.getItem("allTickets");
    if (allTickets) {
        //alreday all tickets are present 
        allTickets = JSON.parse(allTickets);
        allTickets.push(ticketInfoObject);
        MyDb.setItem("allTickets", JSON.stringify(allTickets));

    }
    else {
        //no all tickets key found 
        let allTickets = [ticketInfoObject];
        MyDb.setItem("allTickets", JSON.stringify(allTickets));
    }

}




function appendTicket(TicketInfoObject) {

    let { ticketFilter, ticketValue, ticketId } = TicketInfoObject;
    let ticketDiv = document.createElement("div");
    ticketDiv.classList.add("ticket");
    ticketDiv.innerHTML = ` <div class="ticket-header ${ticketFilter}"></div>
    <div class="ticket-content-div">
        <div class="ticket-info">
            <div class="ticket-id">#${ticketId}</div>
            <div class="ticket-delete">
                <i class="fas fa-trash"></i>
            </div>
        </div>
        <div class="ticket-value">
        ${ticketValue}
        </div>
    </div>`

    let TicketHeader=ticketDiv.querySelector(".ticket-header");
    TicketHeader.addEventListener("click",function(e){

        let curr=e.target.classList[1];
        let currindex=allFilters.indexOf(curr);
        let newIndex=(currindex+1)%allFilters.length;
        let newFilter=allFilters[newIndex];

        TicketHeader.classList.remove(curr);
        TicketHeader.classList.add(newFilter);
        console.log(ticketId);

        let allTickets= JSON.parse( MyDb.getItem("allTickets"));
        for(let i=0;i<allTickets.length;i++){
            if(allTickets[i].ticketId==ticketId){
                console.log(allTickets[i].ticketId);

                allTickets[i].ticketFilter=newFilter;   
            }
        }
        MyDb.setItem("allTickets",JSON.stringify(allTickets));

    })



    let deleteTicket = ticketDiv.querySelector(".ticket-delete");

    deleteTicket.addEventListener("click", function (e) {
        ticketDiv.remove();
        deleteTicketFromDb(ticketId);
    });

    document.querySelector(".ticket-container").append(ticketDiv);


}

function deleteTicketFromDb(ticketId) {

    let allTickets = JSON.parse(MyDb.getItem("allTickets"));

    let updatedList = allTickets.filter(function (Obj) {
        if (Obj.ticketId == ticketId) {
            return false;
        } else {
            return true;
        }
        // MyDb.setItem("all")
    });
    MyDb.setItem("allTickets", JSON.stringify(updatedList));
}