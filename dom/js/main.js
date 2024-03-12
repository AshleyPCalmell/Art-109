console.log("hello hell");

let pageTitle = document.querySelector("#page-title");

// javascript timeout changes h1 title after 3 seconds
setTimeout( function(){
    pageTitle.style.color = "red";  
}, 3000);

// click event on header changes background color
document.querySelector("header").onclick=function(){
   console.log("clicked header");
   document.querySelector("body").style.backgroundColor = "grey";
}

// document.querySelector("#image-0").addEventListener("click",function(){
    
//     document.querySelector("#image-0").style.visibility="visible";
//     alert("bark bark");
// })
// document.querySelector("#image-1").addEventListener("click",function(){
//     document.querySelector("#image-1").style.visibility="visible";
// })
// document.querySelector("#image-2").addEventListener("click",function(){
//     document.querySelector("#image-2").style.visibility="visible";
// })