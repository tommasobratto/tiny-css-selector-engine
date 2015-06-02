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
}

function idFinder(selector, elements) {
  var i, parts, element;

  parts = selector.split(/#/);

  if (selector.includes("div") || selector.includes("img")) {
    for (i = 0; i < parts.length; i++) {
        element = document.getElementById(parts[i]);

      if (element) {
        elements.push(element);
      }
    }
  }
}

function classFinder(selector, elements) {
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
