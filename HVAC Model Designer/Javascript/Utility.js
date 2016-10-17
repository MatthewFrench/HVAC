/**
 * Created by Matt on 10/17/16.
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