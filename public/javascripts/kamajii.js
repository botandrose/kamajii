window.onerror = function(message, url, line) {
  var exc = {
    exception_class: "JavaScript",
    controller_name: 'javascript',
    action_name: 'javascript',
    message: escape(message),
    backtrace: escape(printStackTrace().join('<br>')),
    request: escape("* "+location.pathname+location.search),
    environment: escape("* referrer: "+document.referrer+"\n* user agent: "+navigator.userAgent)
  }

  var i = new Image();
  target = 'http://kamajii.botandrose.com/create?'
  for(attr in exc) {
    target += 'exc['+attr+']='+exc[attr]+'&'
  }
  i.src = target
  window.onerror = function() { return true; };
  return true;
/*
        :exception_class => exception.class.name,
        :controller_name => controller.controller_path,
        :action_name     => controller.action_name,
        :message         => message,
        :backtrace       => exception.backtrace,
        :request         => controller.request
*/
};

function printStackTrace(options) {
  if(options && options.guess) {
	  var p = new printStackTrace.implementation();
	  var result = p.run();
	  return p.guessFunctions(result);
  }
  return (new printStackTrace.implementation()).run();
}

printStackTrace.implementation = function() {};

printStackTrace.implementation.prototype = {
  run: function() {
    mode = this.mode();
    if(mode != 'other') {
      try {(0)();} catch (e) {
        return this[mode](e);
      }
    } else {
      return this.other(arguments.callee);
    }
  },

  mode: function() {
    var mode;
    try {(0)();} catch (e) {
      mode = e.stack ? 'firefox' : window.opera ? 'opera' : 'other';
    }
    return mode;
  },
  
  firefox: function(e) {
    return e.stack.replace("^.*?\\n",'').
      replace(new RegExp("(?:\\n@:0)?\\s+$","m"), '').
      replace(new RegExp("^\\(","gm"), '{anonymous}(').
      split("\n");
  },

  opera: function(e) {
    /*
    var lines = e.message.split("\n"),
      ANON = '{anonymous}',
      lineRE = /Line\s+(\d+).*?script\s+(http\S+)(?:.*?in\s+function\s+(\S+))?/i,
      i,j,len;

    for(i=4, j=0, len=lines.length; i<len; i+=2) {
      if(lineRE.test(lines[i])) {
        lines[j++] = (RegExp.$3 ? 
                      RegExp.$3 + '()@' + RegExp.$2 + RegExp.$1 :
                      ANON + '()@' + RegExp.$2 + ':' + RegExp.$1) +
                      ' -- ' + lines[i+1].replace(/^\s+/,'');
      }
    }

    lines.splice(j,lines.length-j);
    return lines;
    */
  },

  other: function(curr) {
    var ANON = "{anonymous}"
    // fnRE  = /function\s*([\w\-$]+)?\s*\(/i
    var fnRE = new RegExp("function\\s*([\\w\\-$]+)?\\s*\\(", "i")
    var stack = [],j=0
    var fn, args

    while(curr) {
      fn = fnRE.test(curr.toString()) ? RegExp.$1 || ANON : ANON;
      args = Array.prototype.slice(curr['arguments']);
      stack[j++] = fn + '(' + printStackTrace.implementation.prototype.stringifyArguments(args) + ')';
      curr = curr.caller;
    }

    return stack;
  },

  stringifyArguments: function(args) {
	  for(var i = 0; i < args.length; ++i) {
	    var argument = args[i];
	    if(typeof argument  == 'object') {
  		  args[i] = '#object';
	    } else if(typeof argument == 'function') {
  		  args[i] = '#function';
	    } else if(typeof argument == 'string') {
  		  args[i] = '"'+argument+'"';
	    }
	  }
	  return args.join(',');
  }

  /*,
  // doesnt parse in IE6 
  sourceCache: {},

  ajax: function(url) {
	  return jQuery.ajax({
		  url: url,
		  async: false
	    }).responseText;	
  },

  getSource: function(url) {
	  var self = this;
	  if(!(url in self.sourceCache)) {
	    self.sourceCache[url] = self.ajax(url).split("\n");
	  }
	  return self.sourceCache[url];
  },

  guessFunctions: function(stack) {
	  for(var i = 0; i < stack.length; ++i) {
	    var reStack = /{anonymous}\(.*\)@(.*):(\d+)/;
	    var frame = stack[i];
	    var m = reStack.exec(frame);
	    if(m) {
		    var file = m[1];
		    var lineno = m[2];
		    if(file && lineno) {
		      var functionName = this.guessFunctionName(file, lineno);
		      stack[i] = frame.replace('{anonymous}', functionName);
		    }
	    }
	  }
	  return stack;
  },

  guessFunctionName: function(url, lineNo) {
	  var source = this.getSource(url);
	  return this.guessFunctionNameFromLines(lineNo, source);
  },

  guessFunctionNameFromLines: function(lineNo, source) {
	  var reFunctionArgNames = /function ([^(]*)\(([^)]*)\)/;
	  var reGuessFunction = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(function|eval|new Function)/;
	  // Walk backwards from the first line in the function until we find the line which
	  // matches the pattern above, which is the function definition
	  var line = "";
	  var maxLines = 10;
	  for(var i = 0; i < maxLines; ++i) {
		  line = source[lineNo-i] + line;
		  if(line !== undefined) {
			  var m = reGuessFunction.exec(line);
			  if(m) {
			    return m[1];
			  } else {
			    m = reFunctionArgNames.exec(line);
			  }
			  if(m && m[1]) {
			    return m[1];
			  }
		  }
	  }
	  return "(?)";
  }
  */
};
