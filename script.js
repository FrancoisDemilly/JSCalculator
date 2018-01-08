



window.onload = function(){

  var check = "";
  var result= "";
  var current = "";
  var memory = "";
  var operator ="";
  var MAXLENGTH = 16;
  var operatorList = ['+', '-', '/', '*', '.']; // see note function checkOperator,



  //getting the digit in the form of an array
  var digits = Array.prototype.slice.call(document.getElementsByTagName('button'));



    digits.forEach(function(item, index ){
      item.onclick = function(){
        key = this.value;
        keyType = this.dataset.name;
        addDigit();
        manageDot();
        manageOperator();
        manageParenthesis();
        compute();
        afterComputing();
        checkOperator();
        clearAllEntries();
        clearLastEntry();
        displayElement();
    }//end of item.onclick (digit)
  })//end of forEach


function addDigit(){
    if (keyType === "digits"){
      if(current.length > MAXLENGTH){
            current = "Too Long";
        }
          else {
            current += key;
          }
    }
  }; //end of addDigit




  function manageDot(){
    if (keyType == "dot" & current == ""){
      current += "0.";
    } else if (keyType == "dot" & (current.indexOf(".") == -1)){
      current += "."
    };
  } // end of manageDot


  function manageOperator(){
    if(keyType === "operators"){
        memory += current;
        operator = key;
        current = "";
        memory += operator

    }//end of if operator
  }//end of manageOperator

  function manageParenthesis(){
    if(keyType === "parenthesis"){
      var lastOfCurrent = current.charAt(current.length-1);
      var lastOfMemory = memory.charAt(memory.length-1);
      var currentIsOp = operatorList.includes(lastOfCurrent);
      var memoryIsOp = operatorList.includes(lastOfMemory);


        if (key === "("){
          if(current === "" && memory === ""){
            current += key;
          }
          else if ((currentIsOp === false || current === "") &&
            (memoryIsOp  === true  )){
          current += key;
          }
      }

        if(key === ")"){
          if (current !== "" && lastOfCurrent !== "("){
            current += key;
          }
        }



        //prevent enterring ) before (
        if (current.indexOf("(") === -1 && memory.indexOf("(") === -1){

          if(key === ")"){
            current = current.slice(0,-1);
          }
        }
    }//end of if Keytype
  }//end of manageParenthesis


// make the calculus
  function compute(){
      if(keyType === "equal"){
        memory +=current;
        current = "";
        result = eval(memory);
        memory = "";
      }
  }

//manage the carry on of the result
  function afterComputing(){
    if (result != "" && (keyType == 'digits' || keyType == 'dot')){
      result= result;
      current = "";
    }else if (result != "" && keyType == 'operators'){
      memory = result + key ;
      result = "";
    }
  }


// preventing that 2 operators can be enter as first or
// preventing that 2 operator can folows each other exept for minus

 function checkOperator (){
     var last = memory.charAt(memory.length-1);
     var previous = memory.charAt(memory.length-2);
     var third = memory.charAt(memory.length-3);
     var lastIsOperator = operatorList.includes(last);
     var previousIsOperator = operatorList.includes(previous);
// preventing that 2 operators can be enter as first or
// preventing that 2 operator can folows each other exept for minus
      if (lastIsOperator === true   && previousIsOperator === true ){
        memory = memory.slice(0,-1);
        };


      //preventing entering / * + after a (
      if (previous === "(" ){
        if(last === "/"
        || last === "*" || last === "+"  ){
          memory = memory.slice(0, -1);
      }
    }

      //preventing entering / * + as at the beguinig
      if ((last === "/"
        || last === "*" || last === "+") && memory.length === 1 ){
          memory = memory.slice(0, -1);
      }


 }//end of checkOperator

//clear last entry

 function clearLastEntry(){
      if(keyType === "clearLast"){
          if(current != "" ){
          //clear the "too long at with CE click"
            if(current.charAt(current.length-1) === "g"){
                current = current.slice(0,-8);
            }else{
              current = current.slice(0,-1);
              }
            }
          else if (current === "" ){
              memory = memory.slice(0,-1);
              }
          }
        }//end of clearLastEntry


//clear all entries

 function clearAllEntries(){
      if(keyType === "clearAll"){
              current = "";
              memory = "";
              result = "";
              }
        };//end of clearAllEntries



  function displayElement(){
    if (result == ""){
      document.getElementById('memoryScreenInternal').innerHTML = memory;
    } else {
      document.getElementById('memoryScreenInternal').innerHTML = result;
    }
  document.getElementById('currentScreenInternal').innerHTML = current;
  }


}; //end of onload
