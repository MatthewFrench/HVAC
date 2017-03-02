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
function CreateElement(options) {
    //type : Element type to create
    //class : Class name of element
    //text : Inner text
    //html : Set inner html
    //appendTo : Append to element
    //elements : Inner elements to append to this element
    var element = null;

    if (options.hasOwnProperty('type')) {
        element = document.createElement(options['type']);
        if (options.hasOwnProperty('class')) element.className = options['class'];
        if (options.hasOwnProperty('inputType')) {
            element.type = options['inputType'];
            if (options.hasOwnProperty('text')) element.text = options['text'];
        } else {
            if (options.hasOwnProperty('text')) element.innerText = options['text'];
        }
        if (options.hasOwnProperty('html')) element.innerHTML = options['html'];
        if (options.hasOwnProperty('opacity')) element.style.opacity = options['opacity'];
        if (options.hasOwnProperty('appendTo')) options['appendTo'].appendChild(element);
        if (options.hasOwnProperty('src')) element.src = options['src'];
        if (options.hasOwnProperty('id')) element.id = options['id'];
        if (options.hasOwnProperty('value')) element.value = options['value'];
        if (options.hasOwnProperty('onClick')) element.onclick = options['onClick'];
        if (options.hasOwnProperty('onMouseMove')) element.onmousemove = options['onMouseMove'];
        if (options.hasOwnProperty('onMouseDown')) element.onmousedown = options['onMouseDown'];
        if (options.hasOwnProperty('onMouseUp')) element.onmouseup = options['onMouseUp'];
        if (options.hasOwnProperty('elements')) {
            var elements = options['elements'];
            for (var i = 0; i < elements.length; i++) {
                var addElement = elements[i];
                element.appendChild(addElement);
            }
        }
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
/*
 (function(index) {
 console.log('iterator: ' + index);
 })(i);

function runBlock(func, arguments) {
    return func.apply(this, arguments);
}
    */

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