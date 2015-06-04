var $ = function (selector) {
  var elements = [];
  var parts;
  var result;

  if (selector.includes("#") && !selector.includes(".")) {

    parts = selector.replace("#", " #").match(/\S+/g);
    result = cssEngine.elementByIdFinder(parts);
    elements.push(result);

  } else if (selector.includes(".") && !selector.includes("#")) {

    parts = selector.replace(".", " .").match(/\S+/g);
    elements = cssEngine.elementByClassFinder(parts);

  } else if (selector.includes("#") && selector.includes(".")) {

    parts = selector.replace("#", " #").replace(".", " .").match(/\S+/g);;
    elements = cssEngine.elementMatcher(parts);

  } else {
    elements = cssEngine.elementByTagFinder(selector);
  }

  // console.log(elements);
  return elements;
}

cssEngine = function() {

  function elementByIdFinder(parts) {
    var element, result, firstToken, secondToken;

    firstToken = parts[0];
    secondToken = parts[1];

    if (firstToken[0] !== "#") {
      element = getElementById(secondToken);
      result = elementHasTag(element, secondToken);
    } else {
      element = getElementById(firstToken);
      result = element;
    }
    return result;
  }

  function elementByClassFinder(parts) {
    var elementsFound, result, firstToken, secondToken;

    firstToken = parts[0];
    secondToken = parts[1];

    if (firstToken[0] !== ".") {
      elementsFound = getElementsByClass(secondToken);

      result = elementsHaveTag(elementsFound, firstToken);
    } else {
      elementsFound = getElementsByClass(firstToken);

      result = [].slice.call(elementsFound);
    }
    return result;
  }

  function elementMatcher(parts) {
    var element, classElements, result, firstToken, secondToken, thirdToken;

    firstToken = parts[0];
    secondToken = parts[1];
    thirdToken = parts[2];

    if (thirdToken) {
      if (secondToken[0] === "#") {
        element = getElementById(secondToken);
        classElements = getElementsByClass(thirdToken);

        if (element.tagName === firstToken.toUpperCase()) {
          result = matchElements(element, classElements);
        }
      } else {
        element = getElementById(thirdToken);
        classElements = getElementsByClass(secondToken);

        if (element.tagName === firstToken.toUpperCase()) {
          result = matchElements(element, classElements);
        }
      }
    } else {
      if (firstToken === "#") {
        element = getElementById(secondToken);
        classElements = getElementsByClass(thirdToken);

        result = matchElements(element, classElements);
      } else {
        element = getElementById(thirdToken);
        classElements = getElementsByClass(secondToken);

        result = matchElements(element, classElements);
      }
    }
    return result;
  }

  function elementByTagFinder(selector) {
    var elementsFound;

    elementsFound = document.getElementsByTagName(selector);

    return [].slice.call(elementsFound);
  }



  function getElementById(token) {
    var elementId;

    elementId = token.replace("#", "");
    return document.getElementById(elementId);
  }

  function getElementsByClass(token) {
    var elementClass;

    elementClass = token.replace(".", "");
    return document.getElementsByClassName(elementClass);
  }



  function elementHasTag(element, firstToken) {
    if (element.tagName === firstToken.toUpperCase()) {
      return element;
    } else {
      return [];
    }
  }

  function elementsHaveTag(elementsFound, firstToken) {
    filterByTag = function(element) {
      if (element.tagName === firstToken.toUpperCase()) {
        return element;
      }    
    }

    var filteredResult = [].slice.call(elementsFound).filter(filterByTag);
      console.log(filteredResult);
    return filteredResult;
  }

  function matchElements(element, classElements) {
    filterById = function(classElement) {
      if (classElement.id === element.id) {
        return classElement;
      }
    }
    var filteredResult = [].slice.call(classElements).filter(filterById);

    return filteredResult;
  }

  return {
    elementByIdFinder: elementByIdFinder,
    elementByClassFinder: elementByClassFinder,
    elementMatcher: elementMatcher,
    elementByTagFinder: elementByTagFinder
  }
}();
