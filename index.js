let mylinks=[]
const inputEl =document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl =document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")
const linkFromLocalStorage=JSON.parse(localStorage.getItem("mylinks"))
if(linkFromLocalStorage){
    mylinks=linkFromLocalStorage
    renderLeads(mylinks)
}
inputBtn.addEventListener("click",function(){
    mylinks.push(inputEl.value)
    inputEl.value="";
    localStorage.setItem("mylinks",JSON.stringify(mylinks))
    renderLeads(mylinks);
})
// const tab=[{url: "https://github.com/amshiv057"}]
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        mylinks.push(tabs[0].url)
        localStorage.setItem("mylinks", JSON.stringify(mylinks) )
        renderLeads(mylinks)
    })
})
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    mylinks=[]
    renderLeads(mylinks)
})
function  renderLeads(links){
    let listItems="" 
    for(let i =0;i<links.length;i++){
        listItems+=`
        <li>
            <a target='_blank' href='${links[i]}'>
                ${links[i]}
            </a>
            </li>
            `
    }
    ulEl.innerHTML=listItems;
}