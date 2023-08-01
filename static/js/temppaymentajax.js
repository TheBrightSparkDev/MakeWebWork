// This is for course sake only gathers data needed for invoice never going to be used after course 
// so reusability is not accounted for neither is testing

function gettotal(){
    var data = new Object();
    let total = document.getElementById("upfronttotalbabs").textContent;
    if (total.includes("£")){
        total = total.replace("£","");
    }
    data.amount = Number(total);
    var currenturl = window.location.href;
    var newurl = currenturl.replace("price_calculator", "checkout");

    data.newurl = "newurl";
    $.ajax({
        type: "POST",
        url: window.location.href,
        data: data,
        success: function redirect(){
            window.location.assign(newurl);
        }
    });

}


