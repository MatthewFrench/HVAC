/**
 * Created by Matt on 10/17/16.
 */

//This function is a constructor that details what CreateElement does
function CreateElement({
    type = 'div', className = null, inputType = null, text = null, html = null, opacity = null,
    appendTo = null, src = null, id = null, value = null, onClick = null, onMouseMove = null, onMouseDown = null,
    onMouseUp = null, elements = []
} = {}) {
    //type : Element type to create
    //class : Class name of element
    //text : Inner text
    //html : Set inner html
    //appendTo : Append to element
    //elements : Inner elements to append to this element
    let element = document.createElement(type);

    if (className != null) element.className = className;
    if (inputType != null) {
        element.type = inputType;
        if (text != null) element.text = text;
    } else {
        if (text != null) element.innerText = text;
    }
    if (html != null) element.innerHTML = html;
    if (opacity != null) element.style.opacity = opacity;
    if (appendTo != null) appendTo.appendChild(element);
    if (src != null) element.src = src;
    if (id != null) element.id = id;
    if (value != null) element.value = value;
    if (onClick != null) element.onclick = onClick;
    if (onMouseMove != null) element.addEventListener("onmousemove", onMouseMove);
    if (onMouseDown != null) element.addEventListener("onmousedown", onMouseDown);
    if (onMouseUp != null) element.addEventListener("onmouseup", onMouseUp);

    for (let addElement of elements) {
        element.appendChild(addElement);
    }

    return element;
}

//This function dictates how CreateFunction works
function CreateFunction(owner, func) {
    return function() {
        return func.apply(owner, arguments);
    }
}