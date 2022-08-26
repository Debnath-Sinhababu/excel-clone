let container=document.querySelector('.midpart');
let s="";
function makemid(){
    s+=`<div class='topleft'></div>`;
            s+=`<div class='alphabet'>`;
            for(let k=0;k<26;k++){
                s+=`<div class='letter'>${String.fromCharCode(65 + k)}</div>`
            }
            s+=`</div>`
            s+=`<div class='numbergroup'>`;
            for(let i=0;i<100;i++){
                s+=`<div class='number'>${i+1}</div>`;
            }
            s+=`</div>`
            s+=`<div class='cellhub'>`
    for(let i=0;i<100;i++){
        
        s+=`<div class='cellcontainer'>`;
     for(let j=0;j<26;j++){
         s+=`<div class='cell' rowid='${i+1}' columnid='${j+1}'contenteditable></div>`;
     }
      s+=`</div>`;   
    }
    s+=`</div>`
   container.innerHTML=s; 
}

makemid();

let alphabet1=document.querySelector('.alphabet');
let numbergroup=document.querySelector('.numbergroup');
let topleft=document.querySelector('.topleft');
function scrollbar(){
    container.addEventListener('scroll',function(){
        alphabet1.style.top=container.scrollTop+"px";
         numbergroup.style.left=container.scrollLeft+"px";  
          topleft.style.top= container.scrollTop+"px";
          topleft.style.left=container.scrollLeft+"px";
       })
       
}
let count=2;
scrollbar();
let plus=document.querySelector('.fa-plus');
let sheetlist=document.querySelector('.sheetlist');
let sheet;
plus.addEventListener('click',function(){
   let div1=document.createElement('div');
   div1.setAttribute('class','sheet');
   div1.setAttribute('sheetid',`${count-1}`);
    div1.textContent=`sheet${count}`;
    count++;
    sheetlist.appendChild(div1);
     sheet=document.querySelectorAll('.sheet');
    
    for(let i=0;i<sheet.length;i++){
        if(sheet[i].classList.contains("activesheet")){
            sheet[i].classList.remove("activesheet");
            div1.classList.add("activesheet");
            break;
        }
    }
    updatearr();
    storedata();
    let allcell=document.querySelectorAll('.cell');
    for(let i=0;i<allcell.length;i++){
        if(allcell[i].textContent!=null){
            allcell[i].textContent=null;
        }
    }
    div1.addEventListener('click',function(e){
        let element=e.target;
        let sheetid=parseInt(element.getAttribute('sheetid'));
        for(let i=0;i<sheet.length;i++){
            if(sheet[i].classList.contains("activesheet")){
                sheet[i].classList.remove("activesheet");
                 break;
            }
        }
        sheet[sheetid].classList.add("activesheet");
       restorearr(sheetid);

    })
   
    
})
let fastsheet=document.querySelector('.sheet');
fastsheet.addEventListener('click',function(){
    for(let i=0;i<sheet.length;i++){
        if(sheet[i].classList.contains("activesheet")){
            sheet[i].classList.remove("activesheet");
             break;
        }
    }
    fastsheet.classList.add("activesheet");
    restorearr(0);

})
let bold=document.querySelector('.fa-bold');
let italic=document.querySelector('.fa-italic');
let underline=document.querySelector('.fa-underline');
bold.addEventListener('click',function(){
    bold.classList.toggle('fix');
    let rowid=parseInt(lastselectedcell.getAttribute("rowid"));
    let columnid=parseInt(lastselectedcell.getAttribute("columnid"));
   if(twodarr[rowid-1][columnid-1].bold==false){
    twodarr[rowid-1][columnid-1].bold=true;
    let element=document.querySelector(`div[rowid='${rowid}'][columnid='${columnid}']`);
    element.style.fontWeight="bold";

   }
   else{
    twodarr[rowid-1][columnid-1].bold=false; 
    let element=document.querySelector(`div[rowid='${rowid}'][columnid='${columnid}']`);
    element.style.fontWeight="normal";
   }
    
})
italic.addEventListener('click',function(){
    italic.classList.toggle('fix');
    let rowid=parseInt(lastselectedcell.getAttribute("rowid"));
    let columnid=parseInt(lastselectedcell.getAttribute("columnid"));
   if(twodarr[rowid-1][columnid-1].italic==false){
    twodarr[rowid-1][columnid-1].italic=true;
    let element=document.querySelector(`div[rowid='${rowid}'][columnid='${columnid}']`);
    element.style.fontStyle="italic";

   }
   else{
    twodarr[rowid-1][columnid-1].italic=false; 
    let element=document.querySelector(`div[rowid='${rowid}'][columnid='${columnid}']`);
    element.style.fontStyle="normal";
   }
    
})
underline.addEventListener('click',function(){
    underline.classList.toggle('fix');
    let rowid=parseInt(lastselectedcell.getAttribute("rowid"));
    let columnid=parseInt(lastselectedcell.getAttribute("columnid"));
   if(twodarr[rowid-1][columnid-1].underline==false){
    twodarr[rowid-1][columnid-1].underline=true;
    let element=document.querySelector(`div[rowid='${rowid}'][columnid='${columnid}']`);
    element.style.textDecoration="underline";

   }
   else{
    twodarr[rowid-1][columnid-1].underline=false; 
    let element=document.querySelector(`div[rowid='${rowid}'][columnid='${columnid}']`);
    element.style.textDecoration="none";
   }
    
})
// for(let i=0;i<allsheet.length;i++){
//     allsheet[i].addEventListener('click')
// }
//This is made by my new technology
let color=document.querySelector('#color');
color.addEventListener('input',function(){
    container.style.backgroundColor=color.value;
})


