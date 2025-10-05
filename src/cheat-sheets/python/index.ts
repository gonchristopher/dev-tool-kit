import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CommandLineIcon } from '@heroicons/react/24/outline'

export const pythonCheatSheet: CheatSheetDefinition = {
  id: 'python',
  title: 'Python',
  description: 'Essential Python syntax, data structures, functions, and common programming patterns',
  category: 'Development',
  tags: ['python', 'programming', 'scripting', 'data-science', 'web-development'],
  lastUpdated: '2025-10-04',
  icon: createElement(CommandLineIcon),
  sections: [
    {
      title: 'Basic Syntax',
      items: [
        {
          title: 'Variables & Types',
          code: `# Variable assignment
name = "John"
age = 25
height = 5.9
is_student = True

# Type hints (Python 3.5+)
name: str = "John"
age: int = 25
numbers: list[int] = [1, 2, 3]`,
          description: 'Basic variable declaration and type annotations'
        },
        {
          title: 'Print & Input',
          code: `# Print statements
print("Hello, World!")
print(f"Name: {name}, Age: {age}")
print("Value:", 42, "Type:", type(42))

# Input from user
name = input("Enter your name: ")
age = int(input("Enter your age: "))`,
          description: 'Output and input operations'
        },
        {
          title: 'Comments',
          code: `# Single line comment

"""
Multi-line comment
or docstring
"""

def function_with_docstring():
    """This function does something."""
    pass`,
          description: 'Different ways to add comments'
        }
      ]
    },
    {
      title: 'Data Structures',
      items: [
        {
          title: 'Lists',
          code: `# Create lists
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# List operations
fruits.append("orange")        # Add to end
fruits.insert(0, "grape")     # Insert at index
fruits.remove("banana")       # Remove by value
fruits.pop()                  # Remove last item
fruits[0] = "kiwi"            # Update by index

# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]`,
          description: 'Creating and manipulating lists'
        },
        {
          title: 'Dictionaries',
          code: `# Create dictionaries
person = {"name": "John", "age": 30, "city": "NYC"}
scores = dict(math=95, english=87, science=92)

# Dictionary operations
person["age"] = 31             # Update value
person["email"] = "john@email.com"  # Add new key
del person["city"]             # Delete key
age = person.get("age", 0)     # Safe get with default

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}`,
          description: 'Working with key-value pairs'
        },
        {
          title: 'Sets & Tuples',
          code: `# Sets (unique elements)
colors = {"red", "green", "blue"}
colors.add("yellow")
colors.remove("red")
colors.discard("purple")  # Won't error if not found

# Set operations
set1 = {1, 2, 3}
set2 = {3, 4, 5}
intersection = set1 & set2  # {3}
union = set1 | set2         # {1, 2, 3, 4, 5}

# Tuples (immutable)
point = (10, 20)
person = ("John", 25, "Engineer")
x, y = point  # Unpacking`,
          description: 'Sets for unique values, tuples for immutable sequences'
        }
      ]
    },
    {
      title: 'Control Flow',
      items: [
        {
          title: 'Conditionals',
          code: `# If statements
age = 18
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")

# Ternary operator
status = "Adult" if age >= 18 else "Minor"

# Multiple conditions
if age >= 18 and has_license:
    print("Can drive")
    
if name == "admin" or user_id == 1:
    print("Has access")`,
          description: 'Conditional statements and logical operators'
        },
        {
          title: 'Loops',
          code: `# For loops
for i in range(5):          # 0 to 4
    print(i)

for i in range(1, 6):       # 1 to 5
    print(i)

for fruit in ["apple", "banana"]:
    print(fruit)

# While loops
count = 0
while count < 5:
    print(count)
    count += 1

# Loop control
for i in range(10):
    if i == 3:
        continue  # Skip this iteration
    if i == 7:
        break     # Exit loop
    print(i)`,
          description: 'Iteration with for and while loops'
        }
      ]
    },
    {
      title: 'Functions',
      items: [
        {
          title: 'Function Definition',
          code: `# Basic function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameters
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Multiple return values
def get_name_age():
    return "John", 25

name, age = get_name_age()

# Variable arguments
def sum_all(*args):
    return sum(args)

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Lambda functions
square = lambda x: x**2
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))`,
          description: 'Function definitions, parameters, and lambda expressions'
        }
      ]
    },
    {
      title: 'Classes & Objects',
      items: [
        {
          title: 'Class Definition',
          code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self._private = "private"
    
    def introduce(self):
        return f"Hi, I'm {self.name}, {self.age} years old"
    
    @property
    def is_adult(self):
        return self.age >= 18
    
    @staticmethod
    def species():
        return "Homo sapiens"
    
    @classmethod
    def from_birth_year(cls, name, birth_year):
        age = 2025 - birth_year
        return cls(name, age)

# Usage
person = Person("John", 25)
print(person.introduce())
john = Person.from_birth_year("John", 1998)`,
          description: 'Class definition with methods, properties, and class methods'
        },
        {
          title: 'Inheritance',
          code: `class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent constructor
        self.breed = breed
    
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Usage
dog = Dog("Buddy", "Golden Retriever")
cat = Cat("Whiskers")
print(dog.speak())  # Buddy says Woof!
print(cat.speak())  # Whiskers says Meow!`,
          description: 'Class inheritance and method overriding'
        }
      ]
    },
    {
      title: 'File Handling',
      items: [
        {
          title: 'File Operations',
          code: `# Reading files
with open('file.txt', 'r') as file:
    content = file.read()           # Read entire file
    
with open('file.txt', 'r') as file:
    lines = file.readlines()        # Read all lines
    
with open('file.txt', 'r') as file:
    for line in file:               # Read line by line
        print(line.strip())

# Writing files
with open('output.txt', 'w') as file:
    file.write('Hello, World!')
    
with open('log.txt', 'a') as file:  # Append mode
    file.write('New log entry\\n')

# JSON files
import json

# Write JSON
data = {"name": "John", "age": 30}
with open('data.json', 'w') as file:
    json.dump(data, file, indent=2)

# Read JSON
with open('data.json', 'r') as file:
    data = json.load(file)`,
          description: 'Reading and writing files, including JSON'
        }
      ]
    },
    {
      title: 'Error Handling',
      items: [
        {
          title: 'Try-Except',
          code: `# Basic exception handling
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Multiple exceptions
try:
    value = int(input("Enter number: "))
    result = 10 / value
except ValueError:
    print("Invalid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"Unexpected error: {e}")

# Finally block
try:
    file = open('file.txt')
    # Do something with file
except FileNotFoundError:
    print("File not found!")
finally:
    if 'file' in locals():
        file.close()

# Raising exceptions
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age`,
          description: 'Exception handling and error management'
        }
      ]
    },
    {
      title: 'Common Libraries',
      items: [
        {
          title: 'Built-in Functions',
          code: `# String methods
text = "Hello World"
print(text.lower())         # hello world
print(text.upper())         # HELLO WORLD
print(text.split())         # ['Hello', 'World']
print(text.replace("World", "Python"))  # Hello Python

# Math operations
import math
print(math.sqrt(16))        # 4.0
print(math.ceil(4.2))       # 5
print(math.floor(4.8))      # 4

# Random numbers
import random
print(random.randint(1, 10))      # Random integer 1-10
print(random.choice(['a', 'b', 'c']))  # Random choice
random.shuffle([1, 2, 3, 4])     # Shuffle list in place

# Date and time
from datetime import datetime, date
now = datetime.now()
today = date.today()
print(now.strftime("%Y-%m-%d %H:%M:%S"))`,
          description: 'Essential built-in functions and common imports'
        }
      ]
    }
  ]
}