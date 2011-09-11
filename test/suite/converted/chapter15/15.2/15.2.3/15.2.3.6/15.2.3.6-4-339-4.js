/// Copyright (c) 2009 Microsoft Corporation 
/// 
/// Redistribution and use in source and binary forms, with or without modification, are permitted provided
/// that the following conditions are met: 
///    * Redistributions of source code must retain the above copyright notice, this list of conditions and
///      the following disclaimer. 
///    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and 
///      the following disclaimer in the documentation and/or other materials provided with the distribution.  
///    * Neither the name of Microsoft nor the names of its contributors may be used to
///      endorse or promote products derived from this software without specific prior written permission.
/// 
/// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
/// IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
/// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
/// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
/// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
/// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
/// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
/// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/**
 * @path: chapter15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-339-4.js;
 * @description: Object.defineProperty - Updating indexed data property 'P' with attributes [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: false to an accessor property does not succeed, 'O' is an Arguments object (8.12.9 - step 9.a);
 */


function testcase() {
        var obj = (function () {
            return arguments;
        }());

        Object.defineProperty(obj, "0", {
            value: 2010,
            writable: true,
            enumerable: true,
            configurable: false
        });
        var propertyDefineCorrect = obj.hasOwnProperty("0");
        var desc1 = Object.getOwnPropertyDescriptor(obj, "0");

        function getFunc() {
            return 20;
        }
        try {
            Object.defineProperty(obj, "0", {
                get: getFunc
            });
            return false;
        } catch (e) {
            var desc2 = Object.getOwnPropertyDescriptor(obj, "0");
            return propertyDefineCorrect && desc1.value === 2010 && obj[0] === 2010 &&
                typeof desc2.get === "undefined" && e instanceof TypeError;
        }
    }
runTestCase(testcase);