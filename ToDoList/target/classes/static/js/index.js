$(function(){
    var deals = [];
    const colors = ["secondary","success","danger","warning","info","dark"];
    $.get("/tasks/", function(response){
        for(i in response) {
            deals.push(response[i])
        }
        generateDeals();
    });
    function generateDeals() {
        var code = "";
        for(i in deals){
            var number = parseInt(i,10)+1;
            code += "<div data-id='"+deals[i].id+"'class='deal alert alert-"+colors[Math.floor( Math.random()*colors.length )]+"'>"+
            "<div class='input-group d-none'>"+
            "<input type='text' class='form-control change' value = '" + deals[i].task + "' name='value'>"+
                        "<div class='input-group-prepend'>"+
                            "<button type='button' class='btn btn-primary submit-change'>Save</button></div></div>"+
            "<h3>"+number+". <span class='dealText'>"+deals[i].task+"</span><span class='edit'>&#9998;</span><span class='cross'>&times;</span></h3></div>"
        }
        $("#list").empty();
        $("#list").append(code);
    }
    function addDeal(){
        if($("#mainInput").val()!="") {
            var data = $("#mainInput").serialize();
                $.ajax({
                method:"POST",
                url:"/tasks/",
                data: data,
                success:function(response){
                    deals.push({
                    id : response,
                    task : $("#mainInput").val()
                    });
                    generateDeals();
                    $("#mainInput").val("");
                }
            });
        }
    }
    $("#submit").click(function(){
        addDeal();
    });
    $('#mainInput').on('keypress', function (e) {
          if(e.which === 13){
             addDeal();
          }
    })

    $(document).on("click",".cross",function(){
        var deal = $(this).parent().parent();
        $.ajax({
           type:"DELETE",
           url:"/tasks/"+deal.data("id"),
           success:function(response) {
                 for(i in deals){
                       if(deals[i].id == deal.data("id")){
                            deals.splice(i,1)
                       }
                 }
                 generateDeals();
           }
        });
    })
    $(document).on("click",".edit",function(){
          $(this).parents(".deal").children(".input-group").toggleClass("d-none");
     })
     $(document).on("keyup",".change",function(){
        $(this).parents(".deal").find(".dealText").text( $(this).val())
     })



     $(document).on("click",".submit-change",function(){
           $(this).parents(".input-group").toggleClass("d-none");
           var newVal = $(this).parents(".input-group").children(".change").val();
           var id = $(this).parents(".deal").data("id");

            $.ajax({
            type:"PATCH",
            url:"/tasks/"+id,
            data:"value="+newVal,
            success:function(response) {
                 for(i in deals){
                       if(deals[i].id == id){
                            deals[i].task = newVal;
                       }
                 }
                 generateDeals();
            }
            });

     })
})

