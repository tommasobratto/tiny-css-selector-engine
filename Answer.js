var $ = function (selector) {
  var elements = [];
  var parts;

  if (selector.includes("#") && !selector.includes(".")) {
    // Create whitespace around symbols, splitting the selector array
    // into tokens using the newly created whitespace
    parts = selector.replace("#", " #").match(/\S+/g);
    cssEngine.idFinder(parts, elements);
  } else if (selector.includes(".") && !selector.includes("#")) {
    parts = selector.replace(".", " .").match(/\S+/g);
    cssEngine.classFinder(parts, elements);
  } else if (selector.includes("#") && selector.includes(".")) {
    parts = selector.replace("#", " #").replace(".", " .").match(/\S+/g);;
    cssEngine.elementFinder(parts, elements);
  } else {
    cssEngine.tagFinder(selector, elements);
  }

  console.log(elements);
  return elements;
}

cssEngine = function() {
    // 1st function tier: input scanner
  function idFinder(parts, elements) {
    var element;

    // if first character isn't an id symbol,
    // we have to check if the elements returned 
    // have the same tag picked up by the input
    if (parts[0][0] !== "#") {
      element = getElementById(parts[1]);

      elementHasTag(element, parts[1]);
    } else {
      // else just get the element using its id
      element = getElementById(parts[0]);

      elements.push(element);
    }
  }

  function classFinder(parts, elements) {
    var elementsFound;

    // if first character isn't a symbol
    if (parts[0][0] !== ".") {
      // case "class"
      elementsFound = getElementsByClass(parts[1]);

      // we have to check if the elements returned have the same
      // tag name as per input
      elementsHaveTag(elements, elementsFound, parts);
    } else {
      // case "id"
      elementsFound = getElementsByClass(parts[0])

      // just populating the "elements" array with each element of 
      // the HTML collection
      for (i = 0; i < elementsFound.length; i++) {
        elements.push(elementsFound[i]);
      }
    }
  }

  function elementFinder(parts, elements) {
    var element, classElements;

    // if first character isn't a symbol
    if (parts[0][0] !== "#" || parts[0][0] !== ".") {
      // case: second character is id symbol
      if (parts[1][0] === "#") {
        element = getElementById(parts[1]);
        classElements = getElementsByClass(parts[2]);

        if (element.tagName === parts[0].toUpperCase()) {
          matchElements(element, classElements, elements);
        }
      } else {
        // case: second character is class symbol
        element = getElementById(parts[2]);
        classElements = getElementsByClass(parts[1]);

        if (element.tagName === parts[0].toUpperCase()) {
          matchElements(element, classElements, elements);
        }
      }
    } else {
      // if first character is a symbol
      if (parts[0][0] === "#") {
        // and second character is id symbol
        element = getElementById(parts[1]);
        classElements = getElementsByClass(parts[2]);

        matchElements(element, classElements, elements);
      } else {
        // or second character is class symbol
        element = getElementById(parts[1]);
        classElements = getElementsByClass(parts[2]);

        matchElements(element, classElements, elements);
      }
    }
  }

  function tagFinder(selector, elements) {
    var i, elementsFound;

    elementsFound = document.getElementsByTagName(selector);

    for (i = 0; i < elementsFound.length; i++) {
      elements.push(elementsFound[i]);
    }
  }


  // 2nd function tier: DOM element getters
  function getElementById(value) {
    var elementId;

    elementId = value.replace("#", "");
    return document.getElementById(elementId);
  }

  function getElementsByClass(value) {
    var elementClass;

    elementClass = value.replace(".", "");
    return document.getElementsByClassName(elementClass);
  }


  // 3rd function tier: checks against input
  function elementHasTag(element, parts) {
    // check if the element found has the same tag
    // as per input
    if (element.tagName === parts[0]) {
      elements.push(element);
    }
  }

  function elementsHaveTag(elements, elementsFound, parts) {
    // as the previous one, it checks if the elements found have
    // the same tag as per input
    for (i = 0; i < elementsFound.length; i++) {
      if (elementsFound[i].tagName === parts[0].toUpperCase()) {
        elements.push(elementsFound[i]);
      }
    }
  }

  function matchElements(element, classElements, elements) {
    // this function matches the element found by id
    // with the elements found using the class method
    for (i = 0; i < classElements.length; i++) {
      if (element.id === classElements[i].id) {
        elements.push(element);
      }
    }
  }

  return {
    idFinder: idFinder,
    classFinder: classFinder,
    elementFinder: elementFinder,
    tagFinder: tagFinder
  }
}();
