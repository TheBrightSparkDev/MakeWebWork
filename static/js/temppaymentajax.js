// This is for course sake only gathers data needed for invoice never going to be used after course 
// so reusability is not accounted for neither is testing

function gettotal(){
    data = new Object 
    let total = document.getElementById("upfronttotalbabs").textContent
    if (total.includes("£")){
        total = total.replace("£","")
    }
    data.amount = Number(total)
    $.ajax({
        type: "POST",
        url: window.location.href,
        data: data,
        success: function redirect(){
            window.location.assign("checkout")
        }
    });

}


