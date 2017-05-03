/**
 * Created by Matt on 10/17/16.
 *
 * This class handles new elements and functions being created on the program.
 */

/**
 * This function is a constructor that details what CreateElement does.
 *
 * @param options: The previous settings that the element already contains.
 * @return: The new updated element.
 * @constructor
 */
function CreateElement({
    type = 'div', className = null, inputType = null, text = null, html = null, opacity = null,
    appendTo = null, src = null, id = null, value = null, onClick = null, onMouseMove = null, onMouseDown = null,
    onMouseOut = null, onMouseOver = null, onMouseUp = null, onChange = null, elements = []
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
    if (onMouseMove != null) element.addEventListener("mousemove", onMouseMove);
    if (onMouseDown != null) element.addEventListener("mousedown", onMouseDown);
    if (onMouseUp != null) element.addEventListener("mouseup", onMouseUp);
    if (onMouseOut != null) element.addEventListener("mouseout", onMouseOut);
    if (onMouseOver != null) element.addEventListener("mouseover", onMouseOver);
    if (onChange != null) element.addEventListener("change", onChange);

    for (let addElement of elements) {
        element.appendChild(addElement);
    }

    return element;
}

/**
 * This function dictates how CreateFunction works.
 *
 * @param owner: Which class is the function being created in.
 * @param func: The new function that is being created in a class.
 * @return: The newly created function.
 * @constructor
 */
function CreateFunction(owner, func) {
    return function() {
        return func.apply(owner, arguments);
    }
}

/**
 * This function gets the Div that the mouse is currently on.
 *
 * @param event: Action that the user invoked.
 * @return: The current Div that the mouse is on.
 * @constructor
 */
function GetTargetFromMouseEvent(event) {
    var el = event.target || event.srcElement;
    return el.nodeType == 1? el : el.parentNode;
}

/**
 * Checks to see if an Div element is within another Div element.
 *
 * @param element1: The first Div element.
 * @param element2: The second Div element.
 * @return: Whether or not the elements are contained in one another.
 * @constructor
 */
function ElementIsOrContainsElement(element1, element2) {
    return element1.contains(element2) || element1 == element2;
}