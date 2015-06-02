var $ = function (selector) {
  var elements = [];

  if (selector.includes("#")) {
    idFinder(selector, elements);
  } else if (selector.includes(".")) {
    classFinder(selector, elements);
  } else {
    tagFinder(selector, elements);
  }

  // console.log(elements);
  return elements;

  var input = document.getElementById("")
  console.log(input);
}

function idFinder(selector, elements) {
  // answer to E, G
  var i, parts, element;

  parts = selector.split(/#/);

  for (i = 0; i < parts.length; i++) {
    element = document.getElementById(parts[i]);
    
    if (element && selector.includes(element.tagName.toLowerCase())) {
      elements.push(element);
    }
  }
}

function classFinder(selector, elements) {
  // answer to D
  var i, parts, elementsFound;

  parts = selector.split(".");

  for (i = 0; i < parts.length; i++) {
    if(document.getElementsByClassName(parts[i])) {
      elementsFound = document.getElementsByClassName(parts[i]);
    }
  }

  for (i = 0; i < elementsFound.length; i++) {
    elements.push(elementsFound[i]);
  }
}

function tagFinder(selector, elements) {
  // answer to A
  var i, elementsFound;

  elementsFound = document.getElementsByTagName(selector);

  for (i = 0; i < elementsFound.length; i++) {
    elements.push(elementsFound[i]);
  }
}
