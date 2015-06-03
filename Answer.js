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
    // here goes an "elementFinder()" function
  } else {
    tagFinder(selector, elements);
  }

  // console.log(elements);
  return elements;
}

function tagFinder(selector, elements) {
  var i, elementsFound;

  elementsFound = document.getElementsByTagName(selector);

  for (i = 0; i < elementsFound.length; i++) {
    elements.push(elementsFound[i]);
  }
}

function idFinder(parts, elements) {
  var element, elementId;
  if (parts[0][0] !== "#") {
    elementId = parts[1].replace("#", "");
    element = document.getElementById(elementId);

    if (element) {
      elementHasId(element, parts);
    }
  } else {
    elementId = parts[0].replace("#", "");
    element = document.getElementById(elementId);

    if (element) {
      elements.push(element);
    }
  }
}

function classFinder(parts, elements) {
  var elementsFound, elementClass;

  if (parts[0][0] !== ".") {
    elementClass = parts[1].replace(".", "");
    elementsFound = document.getElementsByClassName(elementClass);
    elementHasClass(elements, elementsFound, parts);
    console.log(parts);
  } else {
    elementClass = parts[0].replace(".", "");
    elementsFound = document.getElementsByClassName(elementClass);

    for (i = 0; i < elementsFound.length; i++) {
      elements.push(elementsFound[i]);
    }
  }
}

function elementHasId(element, parts) {
  if (element.tagName === parts[0]) {
    elements.push(element);
  }
}

function elementHasClass(elements, elementsFound, parts) {
  for (i = 0; i < elementsFound.length; i++) {
    if(elementsFound[i].tagName.toLowerCase() === parts[0]) {
      elements.push(elementsFound[i]);
    }
  }
}
