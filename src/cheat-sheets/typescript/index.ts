import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CodeBracketSquareIcon } from '@heroicons/react/24/outline'

export const typeScriptCheatSheet: CheatSheetDefinition = {
  id: 'typescript',
  title: 'TypeScript',
  description: 'Essential TypeScript syntax, types, interfaces, generics, and advanced patterns for type-safe development',
  category: 'Development',
  tags: ['typescript', 'javascript', 'types', 'static-typing', 'web-development', 'node'],
  lastUpdated: '2025-10-04',
  icon: createElement(CodeBracketSquareIcon),
  sections: [
    {
      title: 'Basic Types',
      items: [
        {
          title: 'Primitive Types',
          code: `// Basic primitive types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let value: null = null;
let data: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Tuple - fixed length array with specific types
let person: [string, number] = ["John", 30];
let rgb: [number, number, number] = [255, 0, 0];

// Enum
enum Color {
    Red,
    Green,
    Blue
}
let color: Color = Color.Red;

// Enum with values
enum Status {
    Active = "active",
    Inactive = "inactive",
    Pending = "pending"
}

// Any and unknown
let anything: any = "hello";  // Avoid when possible
let something: unknown = "hello";  // Safer than any`,
          description: 'TypeScript\'s built-in primitive types and collections'
        },
        {
          title: 'Type Annotations & Inference',
          code: `// Explicit type annotation
let message: string = "Hello";

// Type inference (TypeScript infers the type)
let inferredMessage = "Hello";  // TypeScript knows this is string

// Function parameter and return types
function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

// Function with optional parameters
function buildName(firstName: string, lastName?: string): string {
    return lastName ? \`\${firstName} \${lastName}\` : firstName;
}

// Default parameters
function createUser(name: string, age: number = 18): object {
    return { name, age };
}

// Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0);
}

// Arrow functions
const multiply = (a: number, b: number): number => a * b;`,
          description: 'Type annotations, inference, and function typing'
        }
      ]
    },
    {
      title: 'Interfaces & Objects',
      items: [
        {
          title: 'Interface Definitions',
          code: `// Basic interface
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

// Optional properties
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;  // Optional
    tags?: string[];       // Optional array
}

// Readonly properties
interface Config {
    readonly apiUrl: string;
    readonly timeout: number;
}

// Index signatures
interface StringDictionary {
    [key: string]: string;
}

interface NumberDictionary {
    [key: string]: number;
}

// Method signatures
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}`,
          description: 'Defining object shapes with interfaces'
        },
        {
          title: 'Interface Extension & Implementation',
          code: `// Interface extension
interface Animal {
    name: string;
    age: number;
}

interface Dog extends Animal {
    breed: string;
    bark(): void;
}

// Multiple inheritance
interface Flyable {
    fly(): void;
}

interface Bird extends Animal, Flyable {
    wingspan: number;
}

// Class implementing interface
class GermanShepherd implements Dog {
    name: string;
    age: number;
    breed: string = "German Shepherd";
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    bark(): void {
        console.log("Woof!");
    }
}

// Interface merging (declaration merging)
interface User {
    name: string;
}

interface User {
    age: number;
}
// Now User has both name and age properties`,
          description: 'Extending and implementing interfaces'
        }
      ]
    },
    {
      title: 'Advanced Types',
      items: [
        {
          title: 'Union & Intersection Types',
          code: `// Union types (OR)
type StringOrNumber = string | number;
type Status = "loading" | "success" | "error";

function formatValue(value: string | number): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value.toString();
}

// Intersection types (AND)
interface Person {
    name: string;
    age: number;
}

interface Employee {
    employeeId: number;
    department: string;
}

type PersonEmployee = Person & Employee;

const worker: PersonEmployee = {
    name: "John",
    age: 30,
    employeeId: 123,
    department: "Engineering"
};

// Discriminated unions
interface LoadingState {
    status: "loading";
}

interface SuccessState {
    status: "success";
    data: any;
}

interface ErrorState {
    status: "error";
    error: string;
}

type AppState = LoadingState | SuccessState | ErrorState;`,
          description: 'Combining types with unions and intersections'
        },
        {
          title: 'Type Guards & Narrowing',
          code: `// Type guards
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isUser(obj: any): obj is User {
    return obj && typeof obj.name === "string" && typeof obj.age === "number";
}

// Using type guards
function processValue(value: unknown) {
    if (isString(value)) {
        // TypeScript knows value is string here
        console.log(value.toUpperCase());
    }
}

// Built-in type guards
function handleValue(value: string | number | null) {
    if (typeof value === "string") {
        // value is string
    } else if (typeof value === "number") {
        // value is number
    } else if (value === null) {
        // value is null
    }
}

// Instanceof type guard
class Car {}
class Bike {}

function getVehicleType(vehicle: Car | Bike) {
    if (vehicle instanceof Car) {
        // vehicle is Car
    } else {
        // vehicle is Bike
    }
}

// In operator
interface A { a: string; }
interface B { b: string; }

function handle(x: A | B) {
    if ('a' in x) {
        // x is A
    } else {
        // x is B
    }
}`,
          description: 'Runtime type checking and type narrowing'
        }
      ]
    },
    {
      title: 'Generics',
      items: [
        {
          title: 'Generic Functions & Classes',
          code: `// Generic function
function identity<T>(arg: T): T {
    return arg;
}

// Usage
let stringResult = identity<string>("hello");
let numberResult = identity<number>(42);
let inferredResult = identity("hello");  // Type inferred

// Generic function with constraints
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

logLength("hello");        // OK, string has length
logLength([1, 2, 3]);      // OK, array has length
// logLength(42);          // Error, number doesn't have length

// Generic class
class GenericStorage<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    get(index: number): T | undefined {
        return this.items[index];
    }
    
    getAll(): T[] {
        return [...this.items];
    }
}

const stringStorage = new GenericStorage<string>();
const numberStorage = new GenericStorage<number>();`,
          description: 'Creating reusable components with generics'
        },
        {
          title: 'Generic Constraints & Utility Types',
          code: `// Generic constraints
interface HasId {
    id: number;
}

function updateEntity<T extends HasId>(entity: T, updates: Partial<T>): T {
    return { ...entity, ...updates };
}

// Keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "John", age: 30, email: "john@email.com" };
const name = getProperty(person, "name");  // Type is string
const age = getProperty(person, "age");    // Type is number

// Utility types
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type PublicUser = Pick<User, "id" | "name" | "email">;

// Omit - exclude specific properties
type CreateUser = Omit<User, "id">;

// Required - make all properties required
type RequiredUser = Required<PartialUser>;

// Readonly - make all properties readonly
type ImmutableUser = Readonly<User>;`,
          description: 'Advanced generic patterns and built-in utility types'
        }
      ]
    },
    {
      title: 'Classes & Decorators',
      items: [
        {
          title: 'Class Features',
          code: `// Class with access modifiers
class User {
    private id: number;
    protected name: string;
    public email: string;
    readonly createdAt: Date;
    
    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
    
    // Getter
    get displayName(): string {
        return this.name.toUpperCase();
    }
    
    // Setter
    set displayName(value: string) {
        this.name = value.toLowerCase();
    }
    
    // Static method
    static createGuest(): User {
        return new User(0, "Guest", "guest@example.com");
    }
    
    // Private method
    private validateEmail(email: string): boolean {
        return email.includes("@");
    }
}

// Parameter properties (shorthand)
class Product {
    constructor(
        public id: number,
        public name: string,
        private price: number
    ) {}
    
    getPrice(): number {
        return this.price;
    }
}

// Abstract class
abstract class Shape {
    abstract area(): number;
    
    describe(): string {
        return \`Area: \${this.area()}\`;
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }
    
    area(): number {
        return Math.PI * this.radius ** 2;
    }
}`,
          description: 'Class syntax, access modifiers, and inheritance'
        },
        {
          title: 'Decorators (Experimental)',
          code: `// Enable in tsconfig.json: "experimentalDecorators": true

// Class decorator
function Component(target: any) {
    target.prototype.isComponent = true;
}

@Component
class MyComponent {
    name = "MyComponent";
}

// Method decorator
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(\`Calling \${propertyName} with args: \${JSON.stringify(args)}\`);
        return method.apply(this, args);
    };
}

class Calculator {
    @Log
    add(a: number, b: number): number {
        return a + b;
    }
}

// Property decorator
function MinLength(length: number) {
    return function(target: any, propertyName: string) {
        let value: string;
        
        const getter = () => value;
        const setter = (newVal: string) => {
            if (newVal.length < length) {
                throw new Error(\`\${propertyName} must be at least \${length} characters\`);
            }
            value = newVal;
        };
        
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter
        });
    };
}

class User {
    @MinLength(3)
    username: string;
}`,
          description: 'Decorators for classes, methods, and properties'
        }
      ]
    },
    {
      title: 'Configuration & Modules',
      items: [
        {
          title: 'Module System',
          code: `// Named exports
export const PI = 3.14159;
export function calculateArea(radius: number): number {
    return PI * radius ** 2;
}

export class MathUtils {
    static add(a: number, b: number): number {
        return a + b;
    }
}

// Default export
export default class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
}

// Re-exports
export { User } from './user';
export * from './constants';
export { default as Logger } from './logger';

// Import syntax
import Calculator from './calculator';           // Default import
import { PI, calculateArea } from './math';     // Named imports
import { MathUtils as Math } from './math';     // Aliased import
import * as MathLib from './math';              // Namespace import

// Dynamic imports
async function loadModule() {
    const { default: Calculator } = await import('./calculator');
    return new Calculator();
}

// Type-only imports/exports
import type { User } from './types';
export type { APIResponse } from './api';`,
          description: 'ES6 modules and TypeScript-specific import/export syntax'
        },
        {
          title: 'TSConfig Essentials',
          code: `{
  "compilerOptions": {
    // Target JavaScript version
    "target": "ES2020",
    
    // Module system
    "module": "ESNext",
    "moduleResolution": "node",
    
    // Output settings
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,        // Generate .d.ts files
    "sourceMap": true,          // Generate source maps
    
    // Type checking
    "strict": true,             // Enable all strict checks
    "noImplicitAny": true,      // Error on implicit 'any'
    "noImplicitReturns": true,  // Error on missing returns
    "noUnusedLocals": true,     // Error on unused variables
    "noUnusedParameters": true, // Error on unused parameters
    
    // Advanced options
    "skipLibCheck": true,       // Skip lib file checking
    "forceConsistentCasingInFileNames": true,
    
    // Path mapping
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    },
    
    // Library files
    "lib": ["ES2020", "DOM"],
    
    // JSX support
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
          description: 'Essential TypeScript compiler configuration'
        }
      ]
    }
  ]
}