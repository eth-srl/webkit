description("Test the Blob constructor.");

// Test the diffrent ways you can construct a Blob.
shouldBeTrue("(new Blob()) instanceof window.Blob");
shouldBeTrue("(new Blob([])) instanceof window.Blob");
shouldBeTrue("(new Blob(['hello'])) instanceof window.Blob");
shouldBeTrue("(new Blob(['hello'], {})) instanceof window.Blob");
shouldBeTrue("(new Blob(['hello'], {type:'text/html'})) instanceof window.Blob");
shouldBeTrue("(new Blob(['hello'], {type:'text/html', endings:'native'})) instanceof window.Blob");
shouldBeTrue("(new Blob(['hello'], {type:'text/html', endings:'transparent'})) instanceof window.Blob");

// Test invalid blob parts
shouldThrow("new Blob('hello')", "'TypeError: First argument of the constructor is not of type Array'");
shouldThrow("new Blob(0)", "'TypeError: First argument of the constructor is not of type Array'");

// Test valid blob parts.
shouldBeTrue("(new Blob([])) instanceof window.Blob");
shouldBeTrue("(new Blob([new ArrayBuffer(8)])) instanceof window.Blob");
shouldBeTrue("(new Blob(['stringPrimitive'])) instanceof window.Blob");
shouldBeTrue("(new Blob([String('stringObject')])) instanceof window.Blob");
shouldBeTrue("(new Blob([new Blob])) instanceof window.Blob");
shouldBeTrue("(new Blob([new Blob([new Blob])])) instanceof window.Blob");

// Test some conversions to string in the parts array.
shouldBe("(new Blob([12])).size", "2");
shouldBe("(new Blob([[]])).size", "0");         // [].toString() is the empty string
shouldBe("(new Blob([{}])).size", "15");;       // {}.toString() is the string "[object Object]"
shouldBe("(new Blob([document])).size", "21");  // document.toString() is the string "[object HTMLDocument]" 

var toStringingObj = { toString: function() { return "A string"; } };
shouldBe("(new Blob([toStringingObj])).size", "8");

var throwingObj = { toString: function() { throw "Error"; } };
shouldThrow("new Blob([throwingObj])", "'Error'");

// Test some invalid property bags
shouldBeTrue("(new Blob([], {unknownKey:'value'})) instanceof window.Blob");    // Ignore invalid keys
shouldThrow("new Blob([], {endings:'illegalValue'})", "'TypeError: The endings property must be either \"transparent\" or \"native\"'");
shouldThrow("new Blob([], {endings:throwingObj})", "'Error'");
shouldThrow("new Blob([], {type:throwingObj})", "'Error'");

// Test that order of property bag evaluation is lexigraphical
var throwingObj1 = { toString: function() { throw "Error 1"; } };
var throwingObj2 = { toString: function() { throw "Error 2"; } };
shouldThrow("new Blob([], {endings:throwingObj1, type:throwingObj2})", "'Error 1'");
shouldThrow("new Blob([], {type:throwingObj2, endings:throwingObj1})", "'Error 1'");
shouldThrow("new Blob([], {type:throwingObj2, endings:'illegal'})", "'TypeError: The endings property must be either \"transparent\" or \"native\"'");

// Test various non-object literals being used as property bags
shouldThrow("(new Blob([], null)) instanceof window.Blob", "'TypeError: Second argument of the constructor is not of type Object'");
shouldThrow("(new Blob([], undefined)) instanceof window.Blob", "'TypeError: Second argument of the constructor is not of type Object'");
shouldThrow("(new Blob([], 123)) instanceof window.Blob", "'TypeError: Second argument of the constructor is not of type Object'");
shouldThrow("(new Blob([], 123.4)) instanceof window.Blob", "'TypeError: Second argument of the constructor is not of type Object'");
shouldThrow("(new Blob([], true)) instanceof window.Blob", "'TypeError: Second argument of the constructor is not of type Object'");
shouldThrow("(new Blob([], 'abc')) instanceof window.Blob", "'TypeError: Second argument of the constructor is not of type Object'");
shouldBeTrue("(new Blob([], [])) instanceof window.Blob");
shouldBeTrue("(new Blob([], /abc/)) instanceof window.Blob");
shouldBeTrue("(new Blob([], function () {})) instanceof window.Blob");

// Test that the type/size is correctly added to the Blob
shouldBe("(new Blob([], {type:'text/html'})).type", "'text/html'");
shouldBe("(new Blob([], {type:'text/html'})).size", "0");

// Odds and ends
shouldBe("window.Blob.length", "2");
