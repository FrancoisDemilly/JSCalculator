



window.onload = function(){

  var check = "";
  var result= "";
  var current = "";
  var memory = "";
  var operator ="";
  var MAXLENGTH = 16;
  var forbidden = ['+', '-', '/', '*', '.'];



  //getting the digit in the form of an array
  var digits = Array.prototype.slice.call(document.getElementsByTagName('button'));



    digits.forEach(function(item, index ){
      item.onclick = function(){
        key = this.value;
        keyType = this.dataset.name;
        addDigit();
        manageDot();
        manageOperator();
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
        if (key == "+"){
          memory += current;
          operator = "+";
          current = "";
          memory += operator;
        }else if (key == "-"){
          memory += current;
          operator = "-";
          current = "";
          memory += operator;
        }else if (key == "/"){
          memory += current;
          operator = "/";
          current = "";
          memory += operator;
        }else if (key == "*"){
          memory += current;
          operator = "*";
          current = "";
          memory += operator;
        }
    }
  }//end of manageOperator


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
// preventing that 2 operator can folows each other.

 function checkOperator (){
     var last = memory.charAt(memory.length-1);
     var previous = memory.charAt(memory.length-2);
     var lastIsOperator = forbidden.includes(last);
     var previousIsOperator = forbidden.includes(previous);

     if (lastIsOperator === true && previousIsOperator === true){
       memory = memory.slice(0,-1);
     }
 }//end of checkOperator

//clear last entry

 function clearLastEntry(){
      if(keyType === "clearLast"){
          if(current != "" ){
              current = current.slice(0,-1);
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
