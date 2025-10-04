import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CodeBracketSquareIcon } from '@heroicons/react/24/outline'

export const csharpCheatSheet: CheatSheetDefinition = {
  id: 'csharp',
  title: 'C#',
  description: 'Essential C# syntax, LINQ, async/await, .NET features, and modern development patterns',
  category: 'Development',
  tags: ['csharp', 'dotnet', '.net', 'microsoft', 'programming', 'linq', 'async'],
  lastUpdated: '2025-10-04',
  icon: createElement(CodeBracketSquareIcon),
  sections: [
    {
      title: 'Basic Syntax',
      items: [
        {
          title: 'Variable Declarations',
          code: 'int age = 25;\nstring name = "John";\nvar city = "NYC"; // type inference\nconst double PI = 3.14159;',
          description: 'Declare variables with explicit or inferred types',
          example: 'var requires initialization, const must be compile-time constant'
        },
        {
          title: 'Data Types',
          code: 'int, long, float, double, decimal, bool, char, string',
          description: 'Common C# data types',
          example: 'decimal for financial calculations, double for general use'
        },
        {
          title: 'String Operations',
          code: 'string fullName = $"{firstName} {lastName}";\nstring.IsNullOrEmpty(name);\nname.ToUpper().Trim()',
          description: 'String interpolation and manipulation',
          example: '$ for interpolation, @ for verbatim strings'
        },
        {
          title: 'Nullable Types',
          code: 'int? nullableInt = null;\nstring? nullableString = null; // C# 8+\nnullableInt?.ToString()',
          description: 'Handle null values safely',
          example: '? makes reference types nullable in C# 8+'
        },
        {
          title: 'Arrays and Lists',
          code: 'int[] numbers = {1, 2, 3};\nList<string> names = new List<string> {"John", "Jane"};\nvar items = new[] {"a", "b", "c"};',
          description: 'Collection initialization',
          example: 'Arrays are fixed size, Lists are dynamic'
        }
      ]
    },
    {
      title: 'Classes & Objects',
      items: [
        {
          title: 'Class Definition',
          code: 'public class Person\n{\n    public string Name { get; set; }\n    public int Age { get; set; }\n    \n    public Person(string name, int age)\n    {\n        Name = name;\n        Age = age;\n    }\n}',
          description: 'Basic class with properties and constructor'
        },
        {
          title: 'Properties',
          code: 'public string Name { get; set; } // Auto-property\npublic string FullName { get; } // Read-only\npublic int Age { get; private set; } // Private setter',
          description: 'Property declarations with different access levels',
          example: 'Auto-properties generate backing fields automatically'
        },
        {
          title: 'Methods',
          code: 'public string GetFullName() => $"{FirstName} {LastName}";\npublic static void PrintMessage(string msg) => Console.WriteLine(msg);',
          description: 'Method definitions with expression body syntax',
          example: '=> is expression body syntax for single expressions'
        },
        {
          title: 'Inheritance',
          code: 'public class Student : Person\n{\n    public string School { get; set; }\n    \n    public Student(string name, int age, string school) : base(name, age)\n    {\n        School = school;\n    }\n}',
          description: 'Class inheritance with base class constructor'
        },
        {
          title: 'Interfaces',
          code: 'public interface IRepository<T>\n{\n    void Add(T item);\n    T GetById(int id);\n}\n\npublic class UserRepository : IRepository<User> { }',
          description: 'Interface definition and implementation',
          example: 'Interfaces define contracts, classes implement behavior'
        },
        {
          title: 'Abstract Classes',
          code: 'public abstract class Animal\n{\n    public abstract void MakeSound();\n    public virtual void Sleep() => Console.WriteLine("Sleeping...");\n}',
          description: 'Abstract classes with abstract and virtual methods',
          example: 'abstract: must override, virtual: can override'
        }
      ]
    },
    {
      title: 'Control Flow',
      items: [
        {
          title: 'If Statements',
          code: 'if (age >= 18)\n{\n    Console.WriteLine("Adult");\n}\nelse if (age >= 13)\n{\n    Console.WriteLine("Teen");\n}\nelse\n{\n    Console.WriteLine("Child");\n}',
          description: 'Conditional statements'
        },
        {
          title: 'Switch Expressions (C# 8+)',
          code: 'string dayType = dayOfWeek switch\n{\n    DayOfWeek.Saturday or DayOfWeek.Sunday => "Weekend",\n    _ => "Weekday"\n};\n\nint result = value switch { 1 => "One", 2 => "Two", _ => "Other" };',
          description: 'Modern pattern matching syntax',
          example: '_ is discard pattern (default case)'
        },
        {
          title: 'For Loops',
          code: 'for (int i = 0; i < 10; i++)\n{\n    Console.WriteLine(i);\n}\n\nforeach (var item in collection)\n{\n    Console.WriteLine(item);\n}',
          description: 'Traditional and foreach loops'
        },
        {
          title: 'While Loops',
          code: 'while (condition)\n{\n    // code\n}\n\ndo\n{\n    // code\n} while (condition);',
          description: 'While and do-while loops',
          example: 'do-while executes at least once'
        }
      ]
    },
    {
      title: 'LINQ (Language Integrated Query)',
      items: [
        {
          title: 'Basic LINQ Methods',
          code: 'var adults = people.Where(p => p.Age >= 18);\nvar names = people.Select(p => p.Name);\nvar first = people.FirstOrDefault(p => p.Name == "John");',
          description: 'Filter, transform, and find elements',
          example: 'Method chaining enables fluent queries'
        },
        {
          title: 'Aggregation',
          code: 'var count = numbers.Count();\nvar sum = numbers.Sum();\nvar average = numbers.Average();\nvar max = numbers.Max();',
          description: 'Calculate aggregates from collections',
          example: 'Min(), Max(), Sum(), Average(), Count()'
        },
        {
          title: 'Grouping',
          code: 'var groupedByAge = people.GroupBy(p => p.Age);\nvar cityGroups = people.GroupBy(p => p.City).Select(g => new { City = g.Key, Count = g.Count() });',
          description: 'Group elements by key',
          example: 'Returns IGrouping<TKey, TElement> objects'
        },
        {
          title: 'Ordering',
          code: 'var sorted = people.OrderBy(p => p.Name);\nvar sortedDesc = people.OrderByDescending(p => p.Age);\nvar multiSort = people.OrderBy(p => p.City).ThenBy(p => p.Name);',
          description: 'Sort collections by one or more criteria'
        },
        {
          title: 'Set Operations',
          code: 'var union = list1.Union(list2);\nvar intersection = list1.Intersect(list2);\nvar difference = list1.Except(list2);\nvar distinct = list.Distinct();',
          description: 'Set operations on collections'
        },
        {
          title: 'Query Syntax',
          code: 'var query = from p in people\n            where p.Age >= 18\n            select new { p.Name, p.Age };\n\nvar grouped = from p in people\n              group p by p.City into g\n              select new { City = g.Key, Count = g.Count() };',
          description: 'SQL-like query syntax alternative to method syntax',
          example: 'Equivalent to method syntax but more readable for complex queries'
        }
      ]
    },
    {
      title: 'Async/Await Programming',
      items: [
        {
          title: 'Async Methods',
          code: 'public async Task<string> GetDataAsync()\n{\n    var result = await httpClient.GetStringAsync(url);\n    return result;\n}\n\npublic async Task ProcessDataAsync() => await SomeOperationAsync();',
          description: 'Define asynchronous methods',
          example: 'async methods should return Task, Task<T>, or void (avoid void except for events)'
        },
        {
          title: 'Awaiting Operations',
          code: 'var data = await GetDataAsync();\nvar results = await Task.WhenAll(task1, task2, task3);\nvar winner = await Task.WhenAny(task1, task2);',
          description: 'Wait for asynchronous operations to complete',
          example: 'WhenAll waits for all, WhenAny waits for first to complete'
        },
        {
          title: 'Exception Handling',
          code: 'try\n{\n    var result = await RiskyOperationAsync();\n}\ncatch (HttpRequestException ex)\n{\n    // Handle specific exception\n}\ncatch (Exception ex)\n{\n    // Handle any exception\n}',
          description: 'Handle exceptions in async methods',
          example: 'Exceptions are unwrapped from AggregateException'
        },
        {
          title: 'Task Creation',
          code: 'var task = Task.Run(() => LongRunningOperation());\nvar delayTask = Task.Delay(TimeSpan.FromSeconds(1));\nvar completedTask = Task.FromResult(42);',
          description: 'Create tasks for background operations',
          example: 'Task.Run for CPU-bound work, avoid for I/O-bound work'
        },
        {
          title: 'ConfigureAwait',
          code: 'var result = await SomeOperationAsync().ConfigureAwait(false);',
          description: 'Control context capture behavior',
          example: 'ConfigureAwait(false) avoids deadlocks in library code'
        },
        {
          title: 'Cancellation',
          code: 'public async Task<string> GetDataAsync(CancellationToken cancellationToken)\n{\n    var response = await httpClient.GetAsync(url, cancellationToken);\n    return await response.Content.ReadAsStringAsync();\n}',
          description: 'Support operation cancellation',
          example: 'Always pass CancellationToken through async call chains'
        }
      ]
    },
    {
      title: 'Collections & Generics',
      items: [
        {
          title: 'Generic Collections',
          code: 'List<T>, Dictionary<TKey, TValue>, HashSet<T>, Queue<T>, Stack<T>',
          description: 'Common generic collection types',
          example: 'Use appropriate collection for your use case'
        },
        {
          title: 'Dictionary Operations',
          code: 'var dict = new Dictionary<string, int> { ["apple"] = 1, ["banana"] = 2 };\ndict.TryGetValue("apple", out int value);\ndict.ContainsKey("banana");',
          description: 'Work with key-value pairs',
          example: 'TryGetValue is safer than indexer for unknown keys'
        },
        {
          title: 'Generic Constraints',
          code: 'public class Repository<T> where T : class, IEntity, new()\n{\n    public void Add(T item) { }\n}\n\npublic T Clone<T>(T item) where T : ICloneable => (T)item.Clone();',
          description: 'Constrain generic type parameters',
          example: 'class, struct, new(), interface constraints'
        },
        {
          title: 'Collection Initializers',
          code: 'var list = new List<string> { "a", "b", "c" };\nvar dict = new Dictionary<string, int> { { "one", 1 }, { "two", 2 } };\nvar set = new HashSet<int> { 1, 2, 3 };',
          description: 'Initialize collections inline'
        }
      ]
    },
    {
      title: 'Exception Handling',
      items: [
        {
          title: 'Try-Catch-Finally',
          code: 'try\n{\n    // risky code\n}\ncatch (SpecificException ex)\n{\n    // handle specific exception\n}\ncatch (Exception ex)\n{\n    // handle any exception\n}\nfinally\n{\n    // cleanup code\n}',
          description: 'Handle exceptions with proper cleanup',
          example: 'finally block always executes'
        },
        {
          title: 'Custom Exceptions',
          code: 'public class BusinessRuleException : Exception\n{\n    public BusinessRuleException(string message) : base(message) { }\n    public BusinessRuleException(string message, Exception innerException) : base(message, innerException) { }\n}',
          description: 'Create custom exception types',
          example: 'Inherit from Exception or specific exception types'
        },
        {
          title: 'Throwing Exceptions',
          code: 'throw new ArgumentNullException(nameof(parameter));\nthrow new InvalidOperationException("Object not initialized");\nthrow; // re-throw current exception',
          description: 'Throw exceptions with meaningful messages',
          example: 'Use nameof() for parameter names to avoid magic strings'
        },
        {
          title: 'Using Statement',
          code: 'using (var fileStream = new FileStream("file.txt", FileMode.Open))\n{\n    // use fileStream\n} // automatically disposed\n\nusing var stream = new MemoryStream(); // C# 8+ using declaration',
          description: 'Automatic resource disposal',
          example: 'using ensures Dispose() is called even if exception occurs'
        }
      ]
    },
    {
      title: 'Modern C# Features',
      items: [
        {
          title: 'Pattern Matching',
          code: 'if (obj is string str && str.Length > 5)\n{\n    Console.WriteLine($"Long string: {str}");\n}\n\nvar result = shape switch\n{\n    Circle c when c.Radius > 10 => "Big circle",\n    Rectangle r => $"Rectangle {r.Width}x{r.Height}",\n    _ => "Unknown shape"\n};',
          description: 'Advanced pattern matching capabilities',
          example: 'is patterns, switch expressions, guard clauses'
        },
        {
          title: 'Records (C# 9+)',
          code: 'public record Person(string FirstName, string LastName);\npublic record Point { public int X { get; init; } public int Y { get; init; } }',
          description: 'Immutable data containers with value semantics',
          example: 'Records provide structural equality and immutability'
        },
        {
          title: 'Init-only Properties (C# 9+)',
          code: 'public class Person\n{\n    public string Name { get; init; }\n    public int Age { get; init; }\n}\n\nvar person = new Person { Name = "John", Age = 30 };',
          description: 'Properties that can only be set during initialization',
          example: 'Enables immutable objects with object initializer syntax'
        },
        {
          title: 'Nullable Reference Types (C# 8+)',
          code: '#nullable enable\npublic string ProcessName(string? input)\n{\n    return input?.Trim() ?? "Default";\n}\n\npublic string GetName() => name ?? throw new InvalidOperationException();',
          description: 'Compile-time null safety for reference types',
          example: '? indicates nullable, compiler warns about potential null dereference'
        },
        {
          title: 'Local Functions',
          code: 'public int Calculate(int[] numbers)\n{\n    return numbers.Sum(Transform);\n    \n    int Transform(int x) => x * x; // local function\n}',
          description: 'Define functions inside methods',
          example: 'Useful for helper functions that are only used locally'
        },
        {
          title: 'Tuple Deconstruction',
          code: 'var (name, age) = GetPersonInfo();\nvar person = ("John", 30);\n(string firstName, string lastName) = GetFullName();',
          description: 'Destructure tuples into individual variables',
          example: 'ValueTuple provides efficient tuple operations'
        }
      ]
    },
    {
      title: 'Delegates & Events',
      items: [
        {
          title: 'Action and Func',
          code: 'Action<string> logger = Console.WriteLine;\nFunc<int, int, int> add = (x, y) => x + y;\nPredicate<int> isEven = x => x % 2 == 0;',
          description: 'Built-in delegate types for common scenarios',
          example: 'Action: void return, Func: non-void return, Predicate: bool return'
        },
        {
          title: 'Custom Delegates',
          code: 'public delegate void NotifyHandler(string message);\npublic event NotifyHandler? Notify;\n\npublic void Subscribe() => Notify += OnNotify;\nprotected virtual void OnNotify(string message) => Notify?.Invoke(message);',
          description: 'Define custom delegates and events',
          example: 'Events are special delegates with restricted access'
        },
        {
          title: 'Lambda Expressions',
          code: 'numbers.Where(x => x > 10)\n      .Select(x => x * 2)\n      .OrderBy(x => x);',
          description: 'Inline function definitions',
          example: 'Lambda expressions are converted to delegates or expression trees'
        },
        {
          title: 'Event Handling',
          code: 'button.Click += (sender, e) => Console.WriteLine("Clicked!");\nbutton.Click += Button_Click;\n\nprivate void Button_Click(object? sender, EventArgs e) { }',
          description: 'Subscribe to events with lambdas or method groups'
        }
      ]
    },
    {
      title: 'File I/O & Serialization',
      items: [
        {
          title: 'File Operations',
          code: 'var text = File.ReadAllText("file.txt");\nFile.WriteAllText("output.txt", content);\nvar lines = File.ReadAllLines("data.txt");\nawait File.WriteAllTextAsync("async.txt", content);',
          description: 'Read and write files synchronously and asynchronously',
          example: 'Use async versions for I/O-bound operations'
        },
        {
          title: 'Stream Operations',
          code: 'using var stream = new FileStream("file.bin", FileMode.Create);\nusing var reader = new StreamReader(stream);\nusing var writer = new StreamWriter(stream);',
          description: 'Work with streams for binary and text data'
        },
        {
          title: 'JSON Serialization',
          code: 'var json = JsonSerializer.Serialize(person);\nvar person = JsonSerializer.Deserialize<Person>(json);\n\n// With options\nvar options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };\nvar json = JsonSerializer.Serialize(person, options);',
          description: 'System.Text.Json serialization (.NET Core 3+)',
          example: 'Faster and more secure than Newtonsoft.Json'
        },
        {
          title: 'XML Operations',
          code: 'var doc = XDocument.Load("data.xml");\nvar elements = doc.Descendants("item");\nvar newDoc = new XDocument(new XElement("root", new XElement("item", "value")));',
          description: 'LINQ to XML operations',
          example: 'XDocument and XElement provide fluent XML manipulation'
        }
      ]
    },
    {
      title: 'Best Practices & Tips',
      items: [
        {
          title: 'Naming Conventions',
          code: 'public class CustomerService // PascalCase for types\npublic void ProcessOrder() // PascalCase for members\nvar customerName = ""; // camelCase for locals\nprivate readonly ILogger _logger; // underscore prefix for fields',
          description: 'Follow C# naming conventions',
          example: 'Consistent naming improves code readability'
        },
        {
          title: 'String Performance',
          code: 'var sb = new StringBuilder();\nsb.AppendLine("Line 1");\nsb.AppendLine("Line 2");\nvar result = sb.ToString();\n\n// For formatting\nvar formatted = string.Format("Hello {0}", name);\nvar interpolated = $"Hello {name}";',
          description: 'Use StringBuilder for multiple string operations',
          example: 'StringBuilder is more efficient than string concatenation in loops'
        },
        {
          title: 'Memory Management',
          code: 'using var disposable = new DisposableResource();\n// automatically disposed\n\nvar span = stackalloc int[100]; // stack allocation\nvar memory = new Memory<byte>(buffer);',
          description: 'Efficient memory usage patterns',
          example: 'Use using statements, Span<T>, Memory<T> for performance'
        },
        {
          title: 'Defensive Programming',
          code: 'public void ProcessItems(IEnumerable<string> items)\n{\n    ArgumentNullException.ThrowIfNull(items); // .NET 6+\n    \n    foreach (var item in items)\n    {\n        if (string.IsNullOrWhiteSpace(item)) continue;\n        // process item\n    }\n}',
          description: 'Validate inputs and handle edge cases',
          example: 'Guard clauses improve code reliability'
        },
        {
          title: 'Performance Tips',
          code: '// Use List<T> capacity if size known\nvar list = new List<string>(expectedCount);\n\n// Use StringComparison for string operations\nif (str.Equals(other, StringComparison.OrdinalIgnoreCase))\n\n// Avoid boxing\nvar hash = item.GetHashCode(); // instead of item.ToString().GetHashCode()',
          description: 'Common performance optimizations',
          example: 'Small optimizations can have significant impact in hot paths'
        }
      ]
    }
  ]
}