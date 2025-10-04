import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CodeBracketIcon } from '@heroicons/react/24/outline'

export const javascriptCheatSheet: CheatSheetDefinition = {
  id: 'javascript',
  title: 'JavaScript',
  description: 'Essential JavaScript syntax, methods, ES6+ features, and modern development patterns',
  category: 'Development',
  tags: ['javascript', 'js', 'es6', 'frontend', 'backend', 'node', 'web-development'],
  lastUpdated: '2025-10-04',
  icon: createElement(CodeBracketIcon),
  sections: [
    {
      title: 'Variables & Data Types',
      items: [
        {
          title: 'Variable Declarations',
          code: 'let name = "John";\nconst age = 25;\nvar city = "NYC";',
          description: 'Modern variable declarations',
          example: 'let: block-scoped, const: immutable, var: function-scoped (avoid)'
        },
        {
          title: 'Data Types',
          code: 'typeof variable',
          description: 'Check variable type',
          example: 'string, number, boolean, object, undefined, null, symbol, bigint'
        },
        {
          title: 'Template Literals',
          code: 'const message = `Hello ${name}, you are ${age} years old`;',
          description: 'String interpolation with backticks',
          example: 'Supports multi-line strings and expressions'
        },
        {
          title: 'Type Conversion',
          code: 'Number("42"), String(42), Boolean(0)',
          description: 'Convert between types',
          example: 'parseInt(), parseFloat(), +value, !!value'
        },
        {
          title: 'Null vs Undefined',
          code: 'value == null (checks both), value === undefined',
          description: 'Check for null or undefined values',
          example: 'Use == null to check both null and undefined'
        }
      ]
    },
    {
      title: 'Functions',
      items: [
        {
          title: 'Function Declaration',
          code: 'function greet(name) {\n  return `Hello ${name}`;\n}',
          description: 'Traditional function syntax'
        },
        {
          title: 'Arrow Functions',
          code: 'const greet = (name) => `Hello ${name}`;',
          description: 'Concise function syntax',
          example: 'Lexical this binding, cannot be used as constructors'
        },
        {
          title: 'Default Parameters',
          code: 'function greet(name = "World") { return `Hello ${name}`; }',
          description: 'Set default parameter values'
        },
        {
          title: 'Rest Parameters',
          code: 'function sum(...numbers) { return numbers.reduce((a, b) => a + b); }',
          description: 'Accept variable number of arguments'
        },
        {
          title: 'Destructuring Parameters',
          code: 'function greet({name, age}) { return `${name} is ${age}`; }',
          description: 'Extract properties from object parameters'
        },
        {
          title: 'Higher-Order Functions',
          code: 'const withLogging = (fn) => (...args) => {\n  console.log("Calling function");\n  return fn(...args);\n};',
          description: 'Functions that take or return other functions'
        }
      ]
    },
    {
      title: 'Arrays & Methods',
      items: [
        {
          title: 'Array Creation',
          code: 'const arr = [1, 2, 3];\nconst arr2 = new Array(5);\nconst arr3 = Array.from({length: 3}, (_, i) => i);',
          description: 'Different ways to create arrays'
        },
        {
          title: 'Map, Filter, Reduce',
          code: 'arr.map(x => x * 2);\narr.filter(x => x > 1);\narr.reduce((sum, x) => sum + x, 0);',
          description: 'Essential functional array methods',
          example: 'Transform, filter, and accumulate array values'
        },
        {
          title: 'Find & Some/Every',
          code: 'arr.find(x => x > 2);\narr.some(x => x > 2);\narr.every(x => x > 0);',
          description: 'Search and test array elements'
        },
        {
          title: 'Spread & Destructuring',
          code: 'const newArr = [...arr, 4, 5];\nconst [first, second, ...rest] = arr;',
          description: 'Clone arrays and extract values',
          example: 'Spread: copy/merge arrays, Destructuring: extract values'
        },
        {
          title: 'Array Manipulation',
          code: 'arr.push(4), arr.pop(), arr.shift(), arr.unshift(0)',
          description: 'Add/remove elements',
          example: 'push/pop: end, shift/unshift: beginning'
        },
        {
          title: 'Array Utilities',
          code: 'arr.includes(2), arr.indexOf(2), arr.join(","), arr.slice(1, 3)',
          description: 'Common array utilities',
          example: 'Search, convert to string, create subarray'
        }
      ]
    },
    {
      title: 'Objects & Classes',
      items: [
        {
          title: 'Object Literals',
          code: 'const person = {\n  name: "John",\n  age: 30,\n  greet() { return `Hello ${this.name}`; }\n};',
          description: 'Create objects with properties and methods'
        },
        {
          title: 'Object Destructuring',
          code: 'const {name, age} = person;\nconst {name: personName, age = 25} = person;',
          description: 'Extract properties from objects',
          example: 'Support renaming and default values'
        },
        {
          title: 'Object Methods',
          code: 'Object.keys(obj), Object.values(obj), Object.entries(obj)',
          description: 'Get object keys, values, or key-value pairs',
          example: 'Object.assign(), Object.freeze(), Object.seal()'
        },
        {
          title: 'Classes',
          code: 'class Person {\n  constructor(name) { this.name = name; }\n  greet() { return `Hello ${this.name}`; }\n}',
          description: 'ES6 class syntax'
        },
        {
          title: 'Class Inheritance',
          code: 'class Student extends Person {\n  constructor(name, grade) {\n    super(name);\n    this.grade = grade;\n  }\n}',
          description: 'Extend classes with inheritance'
        },
        {
          title: 'Getters & Setters',
          code: 'class Circle {\n  get area() { return Math.PI * this.radius ** 2; }\n  set radius(r) { this._radius = Math.abs(r); }\n}',
          description: 'Define computed properties'
        }
      ]
    },
    {
      title: 'Async Programming',
      items: [
        {
          title: 'Promises',
          code: 'const promise = new Promise((resolve, reject) => {\n  // async operation\n  resolve(data);\n});',
          description: 'Handle asynchronous operations'
        },
        {
          title: 'Async/Await',
          code: 'async function fetchData() {\n  try {\n    const response = await fetch("/api/data");\n    return await response.json();\n  } catch (error) {\n    console.error(error);\n  }\n}',
          description: 'Modern async syntax',
          example: 'Cleaner than .then() chains'
        },
        {
          title: 'Promise Methods',
          code: 'Promise.all([p1, p2, p3])\nPromise.race([p1, p2])\nPromise.allSettled([p1, p2])',
          description: 'Handle multiple promises',
          example: 'all: wait for all, race: first to complete, allSettled: all results'
        },
        {
          title: 'Fetch API',
          code: 'fetch("/api/data", {\n  method: "POST",\n  headers: {"Content-Type": "application/json"},\n  body: JSON.stringify(data)\n})',
          description: 'Modern HTTP requests'
        },
        {
          title: 'Error Handling',
          code: 'promise.catch(error => console.error(error))',
          description: 'Handle promise rejections',
          example: 'Always add .catch() or try-catch with async/await'
        }
      ]
    },
    {
      title: 'DOM Manipulation',
      items: [
        {
          title: 'Element Selection',
          code: 'document.getElementById("id")\ndocument.querySelector(".class")\ndocument.querySelectorAll("div")',
          description: 'Select DOM elements',
          example: 'querySelector uses CSS selectors'
        },
        {
          title: 'Element Creation',
          code: 'const div = document.createElement("div");\ndiv.textContent = "Hello";\ndocument.body.appendChild(div);',
          description: 'Create and add elements to DOM'
        },
        {
          title: 'Event Listeners',
          code: 'element.addEventListener("click", (event) => {\n  event.preventDefault();\n  console.log("Clicked!");\n});',
          description: 'Handle user interactions'
        },
        {
          title: 'Element Properties',
          code: 'element.innerHTML = "<b>Bold</b>";\nelement.textContent = "Plain text";\nelement.style.color = "red";',
          description: 'Modify element content and styles'
        },
        {
          title: 'Class Manipulation',
          code: 'element.classList.add("active");\nelement.classList.remove("hidden");\nelement.classList.toggle("visible");',
          description: 'Manage CSS classes dynamically'
        },
        {
          title: 'Form Handling',
          code: 'const formData = new FormData(form);\nconst value = input.value;\ninput.addEventListener("input", handler);',
          description: 'Work with forms and inputs'
        }
      ]
    },
    {
      title: 'ES6+ Features',
      items: [
        {
          title: 'Modules',
          code: 'export const name = "John";\nexport default function() {}\nimport { name } from "./module.js";',
          description: 'Import and export functionality',
          example: 'Use type="module" in script tag'
        },
        {
          title: 'Symbols',
          code: 'const sym = Symbol("description");\nconst obj = { [sym]: "value" };',
          description: 'Unique identifiers for object properties'
        },
        {
          title: 'Map & Set',
          code: 'const map = new Map([[key, value]]);\nconst set = new Set([1, 2, 3]);',
          description: 'Advanced data structures',
          example: 'Map: key-value pairs, Set: unique values'
        },
        {
          title: 'Generators',
          code: 'function* generator() {\n  yield 1;\n  yield 2;\n  return 3;\n}',
          description: 'Functions that can pause and resume'
        },
        {
          title: 'Proxy',
          code: 'const proxy = new Proxy(target, {\n  get(obj, prop) { return obj[prop] || "default"; }\n});',
          description: 'Intercept object operations'
        },
        {
          title: 'Optional Chaining',
          code: 'obj?.property?.method?.()',
          description: 'Safely access nested properties',
          example: 'Returns undefined if any link is null/undefined'
        },
        {
          title: 'Nullish Coalescing',
          code: 'const result = value ?? "default";',
          description: 'Provide fallback for null/undefined',
          example: 'Different from || operator (considers 0, "", false as valid)'
        }
      ]
    },
    {
      title: 'Error Handling',
      items: [
        {
          title: 'Try-Catch',
          code: 'try {\n  riskyOperation();\n} catch (error) {\n  console.error(error.message);\n} finally {\n  cleanup();\n}',
          description: 'Handle runtime errors'
        },
        {
          title: 'Custom Errors',
          code: 'class CustomError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = "CustomError";\n  }\n}',
          description: 'Create specific error types'
        },
        {
          title: 'Error Properties',
          code: 'error.name, error.message, error.stack',
          description: 'Access error information',
          example: 'stack provides call trace for debugging'
        },
        {
          title: 'Global Error Handling',
          code: 'window.addEventListener("error", (event) => {\n  console.error("Global error:", event.error);\n});',
          description: 'Catch unhandled errors globally'
        }
      ]
    },
    {
      title: 'Regular Expressions',
      items: [
        {
          title: 'RegExp Creation',
          code: 'const regex = /pattern/flags;\nconst regex2 = new RegExp("pattern", "flags");',
          description: 'Create regular expressions',
          example: 'Flags: g(global), i(ignore case), m(multiline)'
        },
        {
          title: 'String Methods',
          code: 'str.match(regex), str.search(regex), str.replace(regex, replacement)',
          description: 'Use regex with strings',
          example: 'test() returns boolean, exec() returns match details'
        },
        {
          title: 'Common Patterns',
          code: '/\\d+/g (digits), /[a-z]/i (letters), /^\\w+@\\w+\\.\\w+$/ (email)',
          description: 'Useful regex patterns',
          example: '\\d: digit, \\w: word char, \\s: whitespace'
        },
        {
          title: 'Groups & Capture',
          code: 'const match = str.match(/(\\d{4})-(\\d{2})-(\\d{2})/);',
          description: 'Extract parts of matched text',
          example: 'match[1], match[2], match[3] contain captured groups'
        }
      ]
    },
    {
      title: 'Modern JavaScript Patterns',
      items: [
        {
          title: 'Module Pattern',
          code: 'const module = (() => {\n  const private = "secret";\n  return { public: "visible" };\n})();',
          description: 'Create encapsulated modules',
          example: 'IIFE (Immediately Invoked Function Expression)'
        },
        {
          title: 'Observer Pattern',
          code: 'class EventEmitter {\n  on(event, callback) { /* add listener */ }\n  emit(event, data) { /* trigger callbacks */ }\n}',
          description: 'Implement pub/sub pattern'
        },
        {
          title: 'Debounce/Throttle',
          code: 'const debounce = (fn, delay) => {\n  let timeoutId;\n  return (...args) => {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn(...args), delay);\n  };\n};',
          description: 'Control function execution frequency'
        },
        {
          title: 'Currying',
          code: 'const add = (a) => (b) => a + b;\nconst add5 = add(5);',
          description: 'Transform functions to take single arguments',
          example: 'Enables partial application and reusability'
        },
        {
          title: 'Memoization',
          code: 'const memoize = (fn) => {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    return cache.has(key) ? cache.get(key) : cache.set(key, fn(...args)).get(key);\n  };\n};',
          description: 'Cache function results for performance'
        }
      ]
    },
    {
      title: 'Performance & Best Practices',
      items: [
        {
          title: 'Performance Timing',
          code: 'console.time("operation");\n// code to measure\nconsole.timeEnd("operation");',
          description: 'Measure execution time'
        },
        {
          title: 'Memory Management',
          code: 'obj = null; // release reference\nRemoveEventListener when done',
          description: 'Prevent memory leaks',
          example: 'Clean up event listeners, timers, and references'
        },
        {
          title: 'Efficient Loops',
          code: 'for (const item of array) {} // fastest for iteration\narray.forEach() // functional style',
          description: 'Choose appropriate loop type',
          example: 'for...of > forEach > for...in for arrays'
        },
        {
          title: 'Strict Mode',
          code: '"use strict";',
          description: 'Enable strict mode for better error detection',
          example: 'Place at top of file or function'
        },
        {
          title: 'Type Checking',
          code: 'Array.isArray(value), typeof value === "string"',
          description: 'Reliable type checking methods',
          example: 'Avoid == comparisons, use === instead'
        }
      ]
    }
  ]
}