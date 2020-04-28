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
        ele.style.left = (ele.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        document.onmousemove = null;
      }
    }
