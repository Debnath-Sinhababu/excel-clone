let twodarr=[];
let storearr=[];
let input2=document.querySelector('#input2');
let lastselectedcell;
function updatearr(){
let arr=[];
twodarr=arr;

}
function restorearr(x){
    
    let arr1=storearr[x];
  twodarr=arr1;
  for(let i=0;i<100;i++){
     for(let j=0;j<26;j++){
         console.log(twodarr[i][j].value);
         if(twodarr[i][j].value!=''){
             let getcell=document.querySelector(`div[rowid='${i+1}'][columnid='${j+1}']`);
             getcell.textContent=twodarr[i][j].value;
         }
         else{
            let getcell=document.querySelector(`div[rowid='${i+1}'][columnid='${j+1}']`);
            getcell.textContent=""; 
         }
     } 
  }

}
function storedata(){
    
    for(let i=0;i<100;i++){
        let arr=[];
        let a=i+1;
        for(let j=0;j<26;j++){
            let obj={
                name:String.fromCharCode(65 + j)+a+"",
                value:"",
                formula:"",
                children:[],
                parent:[],
                bold:false,
                italic:false,
                underline:false
            }
            arr.push(obj);
        }
        twodarr.push(arr);
    }
    storearr.push(twodarr);
  
}
storedata();
let allcells=document.querySelectorAll('.cell');
let input1=document.querySelector('#input1');
for(let i=0;i<allcells.length;i++){
    allcells[i].addEventListener('click',function(e){
       let value=e.target.textContent;
       lastselectedcell=e.target;
      
       let rowid=Number(e.target.getAttribute('rowid'));
       let columnid=Number(e.target.getAttribute('columnid'));
       if(twodarr[rowid-1][columnid-1].bold==false){
           bold.classList.remove("fix");
       }
       if(twodarr[rowid-1][columnid-1].bold==true)
       bold.classList.add("fix");
       input1.value=String.fromCharCode(65+columnid-1)+rowid;
     input2.value=twodarr[rowid-1][columnid-1].formula;
    })
    
    allcells[i].addEventListener('blur',function(e){
        let rowid=Number(e.target.getAttribute('rowid'));
       let columnid=Number(e.target.getAttribute('columnid'));
       twodarr[rowid-1][columnid-1].value=e.target.textContent;
     
      
         // twodarr[rowid-1][columnid-1].value=e.target.textContent;
           updatechildren(twodarr[rowid-1][columnid-1]);
      
    })
    allcells[i].addEventListener('keydown',function(e){
        
        if(e.key=='Backspace'){
          
       let rowid=Number(e.target.getAttribute('rowid'));
        let columnid=Number(e.target.getAttribute('columnid'));
        let targetobj=twodarr[rowid-1][columnid-1];
        targetobj.value='';
        e.target.textContent='';
        targetobj.formula='';
        input2.value= targetobj.formula;
        let allparent=targetobj.parent;
        for(let i=0;i<allparent.length;i++){
           let parentname=allparent[i];
           let col=parentname[0].charCodeAt(0)-65;
           let row=parseInt(parentname[1]);
             row=row-1;
         let finalarr=twodarr[row][col].children.filter(function(x){
                return x!=targetobj.name;
             })
             twodarr[row][col].children=finalarr;
        console.log(twodarr[row][col]);
        }

        targetobj.parent=[];

        }
      
    })
    

}
function updatechildren(childobj){
    let childarr=childobj.children;
    
    for(let i=0;i<childarr.length;i++){
     let col=childarr[i][0].charCodeAt(0)-65;
     let row=parseInt(childarr[i][1]);
      row=row-1;
  
  let calculatedval=calculate(twodarr[row][col].formula);
  twodarr[row][col].value=calculatedval;
//   console.log(calculatedval);
  let childdiv=document.querySelectorAll(`div[rowid='${row+1}']`);
  for(let j=0;j<childdiv.length;j++){
      if(parseInt(childdiv[j].getAttribute('columnid'))==col+1){
       childdiv[j].textContent=calculatedval;
    //    console.log(childdiv[j]);
      
       break;
      }

  }
  updatechildren(twodarr[row][col]);
 // childdiv.textContent=calculatedval;
    } 
}


function calculate(form,lastobj){
  
    let arr=form.split(" ");
    let col,row;
    
    for(let i=0;i<arr.length;i++){
        if(arr[i][0]>='A' && arr[i][0]<='Z'){
         col=arr[i][0].charCodeAt(0)-65;
         row=parseInt(arr[i][1]);
         row=row-1;
         if(lastobj){
         twodarr[row][col].children.push(lastobj.name);
         lastobj.parent.push(twodarr[row][col].name);
         }
        let s=twodarr[row][col].value;
       
       form= form.replace(arr[i],s);

        }
      
    }
    
   let resolvevalue=eval(form);
   return resolvevalue;
}
input2.addEventListener('blur',function(e){
    let formula=e.target.value;
   
    if(formula){
        let rowid=Number(lastselectedcell.getAttribute('rowid'));
        let columnid=Number(lastselectedcell.getAttribute('columnid'));
        let lastobj=twodarr[rowid-1][columnid-1];

        let resolvevalue=calculate(formula,lastobj);
        twodarr[rowid-1][columnid-1].formula=formula;
        twodarr[rowid-1][columnid-1].value=resolvevalue;
       
        lastselectedcell.textContent=resolvevalue;
        updatechildren(lastobj);
    }
})