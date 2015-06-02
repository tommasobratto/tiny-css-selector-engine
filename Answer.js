// tests passing: A, C, D, G

var $ = function (selector) {
  var elements = [];
  var parts;

  if (selector.includes("#")) {
    parts = selector.replace("#", " #").split(" ");
    idFinder(parts, elements);
  } else if (selector.includes(".")) {
    parts = selector.replace(".", " .").split(" ");
    classFinder(parts, elements);
  } else if (selector.includes("#") && selector.includes(".")) {
    parts = selector.replace("#", " #").replace(".", " .").split(" ");
  } else {
    tagFinder(selector, elements);
  }

  // console.log(elements);
  return elements;
}

function idFinder(parts, elements) {
  var elementId, element;

  // parts[0] must be div or nothing for the method to work
  // if div, must be confronted with element retrieved
  // if not, leave it alone

  if (parts[0] !== "#" ) {
    elementId = parts[1].replace("#", "");
  } else {
    elementId = parts[0].replace("#", "")
  }

  element = document.getElementById(elementId);

  if (element) {
    elements.push(element);
  }
}

function classFinder(parts, elements) {
  var elementsFound, elementClass;
  
  // same block of code here and in idFinder
  if (parts[0] !== "." ) {
    elementClass = parts[1].replace(".", "");
  } else {
    elementClass = parts[0].replace(".", "")
  }

  elementsFound = document.getElementsByClassName(elementClass);

  for (i = 0; i < elementsFound.length; i++) {
    elements.push(elementsFound[i]);
  }
}

function tagFinder(selector, elements) {
  var i, elementsFound;

  elementsFound = document.getElementsByTagName(selector);

  for (i = 0; i < elementsFound.length; i++) {
    elements.push(elementsFound[i]);
  }
}
