$( document ).ready(function() {
  $(".calculator > .row > div > div").click(function() {
    var monitor = $("#monitor > span").html();
    var button = $(this).text();
    var tmp_operation = $("#tmp_operation").val();
    var tmp_monitor = $("#tmp_monitor").val();
    var tmp_o = $("#tmp_o").val();
    var tmp_or = $("#tmp_or").val();
    var tmp_m = $("#tmp_m").val();

    if( $(this).hasClass("operation") ) {
      // If Key Press Button Operation
      // Run Effect
      runIt();
      // Calculation
      result = calculation(tmp_operation, tmp_monitor, monitor, tmp_m, button, tmp_or);        
    }
    else {
      // If Key Press Button
      result = keyButtonCalculation(monitor, tmp_monitor, tmp_operation, tmp_o , button, tmp_or);      
    }

    // Monitor output
    $("#monitor > span").html(result);
    // Edit size
    fontSize();
  });

  // Clean calc
  $("#bc-ac").click(function() {
    // Run Effect
    runIt();
    $("#monitor span").html(0);
    $("#tmp_operation").val(0);
    $("#tmp_monitor").val(0);
    $("#tmp_o").val(0);
    $("#tmp_or").val(0);
    $("#tmp_m").val(0);
    $("#tmp_memory").val(0);
    $("#tmp_memory_num").val('false');
    // Edit size
    fontSize();
  });

   // Memory calc
  $("#bc-memory").click(function() {
    var result = $("#tmp_memory").val();
    var tmp_memory_num = $("#tmp_memory_num").val();
    var resultList = result.split(':');

    $("#tmp_or").val(1);
    
    if(tmp_memory_num=='false') {
      if(resultList.length==2) {
        var memory_num = 1;
      }
      else {
        $("#tmp_memory_num").val( (resultList.length - 2) );
        var memory_num = resultList.length-1;
      }
    }
    else {
      var mem = tmp_memory_num - 1;

      if(mem==0)
        $("#tmp_memory_num").val('false');
      else
        $("#tmp_memory_num").val( mem );

      var memory_num = tmp_memory_num;
    }

    result = resultList[ memory_num ];



    // Monitor output
    $("#monitor > span").html(result);
    // Edit size
    fontSize();
  });
});

function runIt() {
  $("#monitor > span").animate({"opacity": 0.0},50);
  $("#monitor > span").animate({"opacity": 1.0},50);
}

function fontSize() {
  var current = $("#monitor span").html().length;

  if(current<7)
    $("#monitor > span").css('font-size', '25px');

  if(current>=7)
    $("#monitor > span").css('font-size', '22px');

  if(current>=10)
    $("#monitor > span").css('font-size', '17px');
}

function calculation(tmp_operation, tmp_monitor, monitor, tmp_m, button, tmp_or) {
  var result = 0;
  var tmp_m = $("#tmp_m").val();
  var monitor = monitor;

  if( tmp_operation != '0') {
    // If press same substitute in last result display
    if(tmp_m!='0')
      monitor = tmp_m;

    // Calculation
    if(tmp_operation=='+')
      result = parseFloat(tmp_monitor) + parseFloat(monitor);
    if(tmp_operation=='−')
      result = parseFloat(tmp_monitor) - parseFloat(monitor);
    if(tmp_operation=='×')
      result = parseFloat(tmp_monitor) * parseFloat(monitor);
    if(tmp_operation=='÷')
      result = parseFloat(tmp_monitor) / parseFloat(monitor);

    // Write temp monitor
    $("#tmp_monitor").val(result);

    // If key press specifically
    if(button=='=') {
      $("#tmp_m").val(monitor);
      $("#tmp_or").val(1);
      //save result
      var memory = $("#tmp_memory").val();
      $("#tmp_memory").val(memory+':'+result);
      
    }
    else {
      if(tmp_m!='0') {
        $("#tmp_monitor").val(tmp_monitor);
        result = tmp_monitor;
      }

      $("#tmp_operation").val(button);
      $("#tmp_o").val(1);
      $("#tmp_m").val(0);
    }        
  }
  else {
    $("#tmp_operation").val(button);
    $("#tmp_monitor").val(monitor);
    $("#tmp_o").val(1);
    result = monitor;
  }

  
  return result;
}

function keyButtonCalculation(monitor, tmp_monitor, tmp_operation, tmp_o , button, tmp_or) {
  var result = 0;
  var monitor = monitor;
  var current = $("#monitor > span").html().length;
  if(button!='M') {
    if (current < 20) {
      if(monitor==0) {
        result = button;
      }
      else {
        if(tmp_monitor!='') {
          if(tmp_o==1) {
            result = button;
            $("#tmp_o").val(0);
          }
          else {
            if(tmp_or==1) {
              result = button;
              $("#tmp_or").val(0);
              $("#tmp_monitor").val(button);
            }
            else {
              result = monitor+button;
            }
          }
        }
        else {
          if( tmp_operation != '0')
            result = button;
          else
            result = monitor+button;
        }
      }
    }
    else {
      if(tmp_o==1)
        result = button;
      else
        result = monitor;
    }
  }
  return result;
}