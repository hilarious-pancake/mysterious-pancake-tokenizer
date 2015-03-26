// color generator from http://stackoverflow.com/a/1484514
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

// Function for wrapping nodes in jason tags
function wrapNodes(node) {
  // Keep running this script as long as we have nodes
  while (node !== null) {
    // Split nodes at sentence breaks
    var sentences = node.innerText.split(regex);

    // If we have at least one sentence
    if (sentences.length) {
      // Initialize cutoff point to zero
      // and counter for child nodes to zero
      var cutoff = 0;
      var childNodeCount = 0;

      for (var sentCount = 0; sentCount < sentences.length; sentCount++) {
        // save current child node
        var currentChildNode = node.childNodes[childNodeCount];
        // console.log('cutoff: ', cutoff);
        // console.log('childNodeCount: ', childNodeCount);
        // console.log('sentCount: ', sentCount);

        if (currentChildNode !== undefined && currentChildNode.nodeType === 3) {
          // console.log('current childNode: ', currentChildNode);
          // console.log('current childNode content: ', currentChildNode.innerText);
          // console.log(/\S/.test(currentChildNode.innerText));

          // set cutoff point to length of current sentence
          cutoff = sentences[sentCount].length + 2;

          if (cutoff <= currentChildNode.textContent.length) {
            // split current child node at cutoff point
            currentChildNode.splitText(cutoff);
          }

          // create span with text content of current child node
          var newSpan = document.createElement('span');
          var content = document.createTextNode(currentChildNode.textContent);
          newSpan.className = 'jason';
          newSpan.appendChild(content);
          newSpan.style.color = getRandomColor();

          // replace child node with new span
          node.replaceChild(newSpan, currentChildNode);
        }

        // increment child count
        childNodeCount++;
      }

    } else {
      node.style.color = getRandomColor();
    }

    node = nodeIterator.nextNode();
  }
  
}

var nodeIterator = document.createNodeIterator(
  // Use body node as root
  document.getElementsByTagName('body')[0],

  // Only consider nodes that are element nodes
  NodeFilter.SHOW_ELEMENT,

  // Object containing the function to use for the acceptNode method
  // of the NodeFilter
    { acceptNode: function(node) {
      // Only accept nodes that have content other than whitespace
      // and do not have tags named body, script, or jason.
      // Our script dynamically creates jason elements from existing text.
      // (If we did not reject these elements, the NodeIterator
      // would add them to the list of nodes to traverse,
      // and as a result, we would have an infinite loop.)
      if (!/^\s*$/.test(node.data) && /\S/.test(node.innerText) &&
        (node.tagName === 'P' || node.tagName === 'DIV' ||
          node.tagName === 'H1' || node.tagName === 'H2' ||
          node.tagName === 'A') &&
        node.className !== 'jason' && node.firstChild.nodeType === 3) {
        return NodeFilter.FILTER_ACCEPT;
      } else {
        return NodeFilter.FILTER_REJECT;
      }
    }
  },
  false
);

// Regular expression for filtering sentences
var regex = /[\.?!]\s/g;

// Initialize node to the first node in our NodeIterator
var startNode = nodeIterator.nextNode();

// Call wrap nodes on startNode
wrapNodes(startNode);