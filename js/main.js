let runHighlighter = true
let highlighter = undefined
let counter = 0
function highlightSkills() {
  let devIcons = document.querySelectorAll(".dev-icons .list-inline-item i")
  return setInterval(function(){
    if (counter === devIcons.length) {
      counter = 0
    }
    if (counter === 0){
      last = devIcons.length - 1
    } else {
      last = counter - 1
    }

    devIcons[last].style.color = "#868e96" // gray
    devIcons[counter].style.color = "#176A73"
    counter = counter + 1
  },1000)
}
//toggle classes
function switchClass(el, class1, class2, class1a, class2a){
  if (el.classList.contains(class1)){
    el.classList.remove(class1)
    el.classList.remove(class1a)
    el.classList.add(class2)
    el.classList.add(class2a)
  } else {
    el.classList.remove(class2)
    el.classList.remove(class2a)
    el.classList.add(class1)
    el.classList.add(class1a)
  }

}
document.addEventListener("DOMContentLoaded",event =>{
  highlighter = highlightSkills()
  let switchHighlighter = document.querySelector(".switch-highlighter")
 
  switchHighlighter.style.cursor = "hand"
  switchHighlighter.addEventListener('click',event=>{
    console.log("highlighter switch clicked")
    // turn on intervals/turn off intervals
    if (switchHighlighter.classList.contains("turn-on")){
      clearInterval(highlighter)
    } else {
      highlighter = highlightSkills()
    }
    switchClass(switchHighlighter,"turn-on","turn-off", "fa-toggle-on", "fa-toggle-off")
    
    // if (switchHighlighter.style.color === "red") switchHighlighter.style.color = "lime" // toggle 
    // else switchHighlighter.style.color = "red"
  })
  
})