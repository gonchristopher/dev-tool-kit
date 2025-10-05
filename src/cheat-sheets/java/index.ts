import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CodeBracketIcon } from '@heroicons/react/24/outline'

export const javaCheatSheet: CheatSheetDefinition = {
  id: 'java',
  title: 'Java',
  description: 'Essential Java syntax, OOP concepts, collections, streams, and modern Java features',
  category: 'Development',
  tags: ['java', 'programming', 'oop', 'jvm', 'spring', 'enterprise'],
  lastUpdated: '2025-10-04',
  icon: createElement(CodeBracketIcon),
  sections: [
    {
      title: 'Basic Syntax',
      items: [
        {
          title: 'Variables & Data Types',
          code: `// Primitive data types
byte smallNumber = 127;          // -128 to 127
short number = 32767;            // -32,768 to 32,767
int age = 25;                    // -2^31 to 2^31-1
long bigNumber = 123456789L;     // -2^63 to 2^63-1
float price = 19.99f;            // 32-bit floating point
double precise = 3.14159;        // 64-bit floating point
char grade = 'A';                // Single Unicode character
boolean isActive = true;         // true or false

// Reference types
String name = "John Doe";
String[] names = {"Alice", "Bob", "Charlie"};
int[] numbers = {1, 2, 3, 4, 5};

// Constants
final int MAX_SIZE = 100;
static final String COMPANY_NAME = "Tech Corp";

// Type inference (Java 10+)
var message = "Hello World";     // String inferred
var count = 42;                  // int inferred`,
          description: 'Java primitive types, variables, and constants'
        },
        {
          title: 'Control Flow',
          code: `// If statements
if (age >= 18) {
    System.out.println("Adult");
} else if (age >= 13) {
    System.out.println("Teenager");
} else {
    System.out.println("Child");
}

// Switch statement
switch (grade) {
    case 'A':
        System.out.println("Excellent");
        break;
    case 'B':
        System.out.println("Good");
        break;
    default:
        System.out.println("Unknown grade");
}

// Loops
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// Enhanced for loop
for (String name : names) {
    System.out.println(name);
}

// While loop
int count = 0;
while (count < 5) {
    System.out.println(count++);
}`,
          description: 'Control structures and loops in Java'
        }
      ]
    },
    {
      title: 'Object-Oriented Programming',
      items: [
        {
          title: 'Classes & Objects',
          code: `// Class definition
public class Person {
    private String name;
    private int age;
    private static int personCount = 0;
    
    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        personCount++;
    }
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // Setter methods
    public void setName(String name) {
        this.name = name;
    }
    
    // Instance method
    public void introduce() {
        System.out.println("Hi, I'm " + name);
    }
    
    // Static method
    public static int getPersonCount() {
        return personCount;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}`,
          description: 'Class structure with constructors and methods'
        },
        {
          title: 'Inheritance & Interfaces',
          code: `// Abstract class
public abstract class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public abstract void makeSound();
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Interface
public interface Flyable {
    void fly();
    
    default void land() {
        System.out.println("Landing safely");
    }
}

// Inheritance and implementation
public class Bird extends Animal implements Flyable {
    public Bird(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " chirps");
    }
    
    @Override
    public void fly() {
        System.out.println(name + " is flying");
    }
}`,
          description: 'Inheritance, abstract classes, and interfaces'
        }
      ]
    },
    {
      title: 'Collections Framework',
      items: [
        {
          title: 'Lists & Arrays',
          code: `import java.util.*;

// ArrayList - resizable array
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add(0, "Orange");           // Insert at index
String first = list.get(0);      // Access by index
list.set(1, "Blueberry");       // Update by index
list.remove("Apple");           // Remove by value
boolean contains = list.contains("Banana");
int size = list.size();

// LinkedList - better for insertions
LinkedList<Integer> linkedList = new LinkedList<>();
linkedList.addFirst(1);
linkedList.addLast(3);

// List operations
Collections.sort(list);         // Sort in place
Collections.reverse(list);      // Reverse in place

// Convert array to list
List<String> fromArray = Arrays.asList("A", "B", "C");`,
          description: 'Working with arrays and List collections'
        },
        {
          title: 'Sets & Maps',
          code: `// Set - unique elements
Set<String> uniqueNames = new HashSet<>();
uniqueNames.add("Alice");
uniqueNames.add("Bob");
uniqueNames.add("Alice");       // Duplicate ignored

// TreeSet - sorted order
Set<Integer> sortedNumbers = new TreeSet<>();
sortedNumbers.addAll(Arrays.asList(3, 1, 4, 5));

// Map - key-value pairs
Map<String, Integer> ages = new HashMap<>();
ages.put("Alice", 25);
ages.put("Bob", 30);

// Map operations
int aliceAge = ages.get("Alice");
int defaultAge = ages.getOrDefault("David", 0);
ages.putIfAbsent("David", 28);
ages.replace("Bob", 31);

// Iterate over map
for (Map.Entry<String, Integer> entry : ages.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// Lambda iteration (Java 8+)
ages.forEach((name, age) -> System.out.println(name + ": " + age));`,
          description: 'Sets for unique values and Maps for key-value pairs'
        }
      ]
    },
    {
      title: 'Streams & Lambda Expressions',
      items: [
        {
          title: 'Lambda Expressions',
          code: `import java.util.function.*;

// Basic lambda syntax
Runnable task = () -> System.out.println("Running task");

// Lambda with parameters
Function<String, String> upperCase = s -> s.toUpperCase();
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// Method references
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// Static method reference
names.forEach(System.out::println);

// Instance method reference
names.stream()
     .map(String::toUpperCase)
     .forEach(System.out::println);

// Common functional interfaces
Predicate<String> isEmpty = String::isEmpty;
Consumer<String> printer = System.out::println;
Supplier<Double> random = Math::random;`,
          description: 'Lambda expressions and method references'
        },
        {
          title: 'Stream API',
          code: `List<String> words = Arrays.asList("apple", "banana", "cherry");
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Filter and collect
List<String> longWords = words.stream()
    .filter(word -> word.length() > 5)
    .collect(Collectors.toList());

// Map transformation
List<String> upperWords = words.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// Reduce operations
int sum = numbers.stream()
    .reduce(0, Integer::sum);

Optional<Integer> max = numbers.stream()
    .max(Integer::compareTo);

// Find operations
Optional<String> firstLongWord = words.stream()
    .filter(word -> word.length() > 5)
    .findFirst();

// Sorting
List<String> sorted = words.stream()
    .sorted()
    .collect(Collectors.toList());

// Group by
Map<Integer, List<String>> wordsByLength = words.stream()
    .collect(Collectors.groupingBy(String::length));

// Parallel streams
long count = numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .count();`,
          description: 'Stream API for functional-style operations'
        }
      ]
    },
    {
      title: 'Exception Handling',
      items: [
        {
          title: 'Try-Catch & Custom Exceptions',
          code: `// Basic exception handling
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}

// Multiple catch blocks
try {
    String[] array = new String[5];
    array[10] = "test";
    Integer.parseInt("abc");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array index error");
} catch (NumberFormatException e) {
    System.out.println("Number format error");
} catch (Exception e) {
    System.out.println("Unexpected error");
} finally {
    System.out.println("This always executes");
}

// Try-with-resources (Java 7+)
try (FileReader file = new FileReader("data.txt");
     BufferedReader reader = new BufferedReader(file)) {
    String line = reader.readLine();
} catch (IOException e) {
    System.out.println("File error: " + e.getMessage());
}

// Custom exception
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public void validateAge(int age) throws InvalidAgeException {
    if (age < 0 || age > 150) {
        throw new InvalidAgeException("Invalid age");
    }
}`,
          description: 'Exception handling patterns and best practices'
        }
      ]
    },
    {
      title: 'Modern Java Features',
      items: [
        {
          title: 'Records & Optional',
          code: `// Records (Java 14+) - immutable data classes
public record Person(String name, int age) {
    public Person {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
    }
    
    public boolean isAdult() {
        return age >= 18;
    }
}

// Usage
Person person = new Person("Alice", 25);
String name = person.name();     // Automatic getter
int age = person.age();         // Automatic getter

// Optional to handle null values
Optional<String> optional = Optional.ofNullable(getString());

optional.ifPresent(System.out::println);
String result = optional.orElse("Default");
String result2 = optional.orElseThrow(() -> 
    new RuntimeException("No value"));

// Optional chaining
Optional<String> processed = optional
    .filter(s -> s.length() > 5)
    .map(String::toUpperCase);

// Date and Time API (Java 8+)
LocalDate today = LocalDate.now();
LocalDateTime now = LocalDateTime.now();
LocalDate birthday = LocalDate.of(1990, Month.JANUARY, 15);

DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
String formatted = today.format(formatter);`,
          description: 'Records, Optional, and modern Date/Time API'
        }
      ]
    }
  ]
}