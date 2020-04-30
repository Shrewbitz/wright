    export default function dragElement(ele) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
   
        ele.onmousedown = dragMouseDown;
    
    
      function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        ele.style.top = (ele.offsetTop - pos2) + "px";
        if (ele.offsetTop > 540) {ele.style.top = "540px"}
        if (ele.offsetTop < -26) {ele.style.top = "-26px"}
        // debugger
        ele.style.left = (ele.offsetLeft - pos1) + "px";
        // debugger
        if (ele.offsetLeft + (ele.innerText.length * 12) > 1188) {ele.style.left = `${1188 - (ele.innerText.length * 12)}px`}
        if (ele.offsetLeft < -3) {ele.style.left = "-3px"}
      }
    
      function closeDragElement() {
        document.onmousemove = null;
      }
    }
