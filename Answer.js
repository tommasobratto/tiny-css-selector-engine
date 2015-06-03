var $ = function (selector) {
  var elements = [];
  var parts;

  if (selector.includes("#") && !selector.includes(".")) {
    parts = selector.replace("#", " #").match(/\S+/g);
    idFinder(parts, elements);
  } else if (selector.includes(".") && !selector.includes("#")) {
    parts = selector.replace(".", " .").match(/\S+/g);
    classFinder(parts, elements);
  } else if (selector.includes("#") && selector.includes(".")) {
    parts = selector.replace("#", " #").replace(".", " .").match(/\S+/g);;
    elementFinder(parts, elements);
  } else {
    tagFinder(selector, elements);
  }

  return elements;
}


// 1st function tier
function idFinder(parts, elements) {
  var element;

  if (parts[0][0] !== "#") {
    element = getElementById(parts[1]);

    if (element) {
      elementHasId(element, parts[1]);
    }
  } else {
    element = getElementById(parts[0]);

    if (element) {
      elements.push(element);
    }
  }
}

function classFinder(parts, elements) {
  var elementsFound;

  if (parts[0][0] !== ".") {
    elementsFound = getElementsByClass(parts[1]);

    elementHasClass(elements, elementsFound, parts);
  } else {
    elementsFound = getElementsByClass(parts[0])

    for (i = 0; i < elementsFound.length; i++) {
      elements.push(elementsFound[i]);
    }
  }
}

function elementFinder(parts, elements) {
  var element, classElements;

  if (parts[0][0] !== "#" || parts[0][0] !== ".") {
    if (parts[1][0] === "#") {
      element = getElementById(parts[1]);
      classElements = getElementsByClass(parts[2]);

      if (element.tagName === parts[0].toUpperCase()) {
        checkIfElementSpecified(element, classElements, elements);
      }
    } else {
      element = getElementById(parts[2]);
      classElements = getElementsByClass(parts[1]);

      if (element.tagName === parts[0].toUpperCase()) {
        checkIfElementSpecified(element, classElements, elements);
      }
    }
  } else {
    if (parts[0][0] === "#") {
      element = getElementById(parts[1]);
      classElements = getElementsByClass(parts[2]);

      if (element && classElements) {
        checkIfElementSpecified(element, classElements, elements);
      }
    } else {
      element = getElementById(parts[1]);
      classElements = getElementsByClass(parts[2]);

      checkIfElementSpecified(element, classElements, elements);
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


// 2nd function tier
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


// 3rd function tier
function elementHasId(element, parts) {
  if (element.tagName === parts[0]) {
    elements.push(element);
  }
}

function elementHasClass(elements, elementsFound, parts) {
  for (i = 0; i < elementsFound.length; i++) {
    if (elementsFound[i].tagName === parts[0].toUpperCase()) {
      elements.push(elementsFound[i]);
    }
  }
}

function checkIfElementSpecified(element, classElements, elements) {
  for (i = 0; i < classElements.length; i++) {
    if (element.id === classElements[i].id) {
      elements.push(element);
    }
  }
}
