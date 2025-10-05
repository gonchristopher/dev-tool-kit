import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CodeBracketIcon } from '@heroicons/react/24/outline'

export const phpCheatSheet: CheatSheetDefinition = {
  id: 'php',
  title: 'PHP',
  description: 'Essential PHP syntax for web development, server-side programming, and database operations',
  category: 'Development',
  tags: ['php', 'web-development', 'server-side', 'backend', 'mysql', 'laravel'],
  lastUpdated: '2025-10-04',
  icon: createElement(CodeBracketIcon),
  sections: [
    {
      title: 'Basic Syntax',
      items: [
        {
          title: 'PHP Tags & Variables',
          code: `<?php
// PHP opening tag

// Variables (always start with $)
$name = "John";
$age = 25;
$price = 19.99;
$isActive = true;

// Constants
define('SITE_NAME', 'My Website');
const DB_HOST = 'localhost';

// Variable variables
$var = 'hello';
$$var = 'world';  // $hello = 'world'`,
          description: 'Basic PHP syntax and variable declaration'
        },
        {
          title: 'Data Types & Output',
          code: `<?php
// Data types
$string = "Hello World";
$integer = 42;
$float = 3.14;
$boolean = true;
$array = [1, 2, 3];
$null = null;

// Output
echo "Hello World";
print "Hello World";
print_r($array);      // Print array structure
var_dump($variable);  // Debug output

// String interpolation
echo "Hello $name";
echo "Hello {$name}";`,
          description: 'PHP data types and output methods'
        }
      ]
    },
    {
      title: 'Arrays & Data Structures',
      items: [
        {
          title: 'Arrays',
          code: `<?php
// Indexed arrays
$fruits = ["apple", "banana", "orange"];
$numbers = array(1, 2, 3, 4, 5);

// Associative arrays
$person = [
    "name" => "John",
    "age" => 30,
    "email" => "john@email.com"
];

// Multidimensional arrays
$users = [
    ["name" => "John", "age" => 30],
    ["name" => "Jane", "age" => 25]
];

// Array operations
$fruits[] = "grape";              // Add to end
array_push($fruits, "kiwi");      // Add to end
array_unshift($fruits, "mango");  // Add to beginning
$last = array_pop($fruits);       // Remove last
$first = array_shift($fruits);    // Remove first`,
          description: 'Working with indexed and associative arrays'
        },
        {
          title: 'Array Functions',
          code: `<?php
$numbers = [1, 2, 3, 4, 5];

// Common array functions
count($numbers);                  // Array length
in_array(3, $numbers);           // Check if value exists
array_search("apple", $fruits);   // Find key of value
array_keys($person);             // Get all keys
array_values($person);           // Get all values

// Array manipulation
$doubled = array_map(function($n) { return $n * 2; }, $numbers);
$evens = array_filter($numbers, function($n) { return $n % 2 == 0; });
$sum = array_reduce($numbers, function($carry, $n) { return $carry + $n; }, 0);

// Array merging and sorting
$merged = array_merge($array1, $array2);
sort($numbers);           // Sort values
asort($person);          // Sort associative array by value
ksort($person);          // Sort by key`,
          description: 'Essential array manipulation functions'
        }
      ]
    },
    {
      title: 'Control Structures',
      items: [
        {
          title: 'Conditionals',
          code: `<?php
// If statements
if ($age >= 18) {
    echo "Adult";
} elseif ($age >= 13) {
    echo "Teenager";
} else {
    echo "Child";
}

// Ternary operator
$status = ($age >= 18) ? "Adult" : "Minor";

// Switch statement
switch ($grade) {
    case 'A':
        echo "Excellent";
        break;
    case 'B':
        echo "Good";
        break;
    case 'C':
        echo "Average";
        break;
    default:
        echo "Unknown grade";
}

// Null coalescing (PHP 7+)
$username = $user['name'] ?? 'Guest';`,
          description: 'Conditional statements and decision making'
        },
        {
          title: 'Loops',
          code: `<?php
// For loop
for ($i = 0; $i < 10; $i++) {
    echo $i;
}

// While loop
$count = 0;
while ($count < 5) {
    echo $count;
    $count++;
}

// Do-while loop
do {
    echo $count;
    $count++;
} while ($count < 5);

// Foreach loops
foreach ($fruits as $fruit) {
    echo $fruit;
}

foreach ($person as $key => $value) {
    echo "$key: $value";
}

// Loop control
for ($i = 0; $i < 10; $i++) {
    if ($i == 3) continue;  // Skip iteration
    if ($i == 7) break;     // Exit loop
    echo $i;
}`,
          description: 'Different types of loops in PHP'
        }
      ]
    },
    {
      title: 'Functions & Classes',
      items: [
        {
          title: 'Functions',
          code: `<?php
// Basic function
function greet($name) {
    return "Hello, " . $name;
}

// Default parameters
function greet($name, $greeting = "Hello") {
    return $greeting . ", " . $name;
}

// Type declarations (PHP 7+)
function add(int $a, int $b): int {
    return $a + $b;
}

// Variable arguments
function sum(...$numbers) {
    return array_sum($numbers);
}

// Anonymous functions (closures)
$multiply = function($a, $b) {
    return $a * $b;
};

// Arrow functions (PHP 7.4+)
$double = fn($x) => $x * 2;`,
          description: 'Function definition and various function types'
        },
        {
          title: 'Classes & Objects',
          code: `<?php
class Person {
    private $name;
    protected $age;
    public $email;
    
    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }
    
    public function getName() {
        return $this->name;
    }
    
    public function setName($name) {
        $this->name = $name;
    }
    
    public static function getSpecies() {
        return "Homo sapiens";
    }
}

// Inheritance
class Employee extends Person {
    private $jobTitle;
    
    public function __construct($name, $age, $jobTitle) {
        parent::__construct($name, $age);
        $this->jobTitle = $jobTitle;
    }
    
    public function getJobTitle() {
        return $this->jobTitle;
    }
}

// Usage
$person = new Person("John", 30);
echo $person->getName();`,
          description: 'Object-oriented programming in PHP'
        }
      ]
    },
    {
      title: 'Web Development',
      items: [
        {
          title: 'Superglobals',
          code: `<?php
// $_GET - URL parameters
$name = $_GET['name'] ?? '';
$age = $_GET['age'] ?? 0;

// $_POST - Form data
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// $_REQUEST - Both GET and POST
$data = $_REQUEST['data'] ?? '';

// $_SESSION - Session variables
session_start();
$_SESSION['user_id'] = 123;
$userId = $_SESSION['user_id'] ?? null;

// $_COOKIE - Cookies
setcookie('user_pref', 'dark_mode', time() + 3600);
$userPref = $_COOKIE['user_pref'] ?? 'light_mode';

// $_SERVER - Server information
$serverName = $_SERVER['SERVER_NAME'];
$requestMethod = $_SERVER['REQUEST_METHOD'];
$userAgent = $_SERVER['HTTP_USER_AGENT'];`,
          description: 'PHP superglobal variables for web development'
        },
        {
          title: 'Form Handling',
          code: `<?php
// HTML form processing
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = trim($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $age = (int)$_POST['age'];
    
    // Validation
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (!$email) {
        $errors[] = "Valid email is required";
    }
    
    if ($age < 1 || $age > 120) {
        $errors[] = "Age must be between 1 and 120";
    }
    
    if (empty($errors)) {
        // Process form data
        echo "Form submitted successfully!";
    } else {
        // Display errors
        foreach ($errors as $error) {
            echo "<p class='error'>$error</p>";
        }
    }
}

// CSRF protection
session_start();
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}`,
          description: 'Processing and validating form data'
        }
      ]
    },
    {
      title: 'Database Operations',
      items: [
        {
          title: 'PDO Database Connection',
          code: `<?php
// Database connection with PDO
try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=mydb',
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Select data
$stmt = $pdo->prepare("SELECT * FROM users WHERE age > ?");
$stmt->execute([18]);
$users = $stmt->fetchAll();

// Insert data
$stmt = $pdo->prepare("INSERT INTO users (name, email, age) VALUES (?, ?, ?)");
$stmt->execute(['John Doe', 'john@email.com', 30]);
$lastId = $pdo->lastInsertId();

// Update data
$stmt = $pdo->prepare("UPDATE users SET email = ? WHERE id = ?");
$stmt->execute(['newemail@email.com', 1]);

// Delete data
$stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
$stmt->execute([1]);`,
          description: 'Database operations using PDO'
        }
      ]
    },
    {
      title: 'Error Handling & Security',
      items: [
        {
          title: 'Error Handling',
          code: `<?php
// Exception handling
try {
    $result = riskyOperation();
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    echo "Something went wrong. Please try again.";
} finally {
    // Cleanup code
    cleanup();
}

// Custom exceptions
class ValidationException extends Exception {}

function validateAge($age) {
    if ($age < 0 || $age > 120) {
        throw new ValidationException("Invalid age: $age");
    }
    return true;
}

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);  // Development only
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/error.log');`,
          description: 'Exception handling and error management'
        },
        {
          title: 'Security Essentials',
          code: `<?php
// Input validation and sanitization
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$age = filter_input(INPUT_POST, 'age', FILTER_VALIDATE_INT);

// Escape output to prevent XSS
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');

// Password hashing
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Password verification
if (password_verify($inputPassword, $hashedPassword)) {
    echo "Password is correct";
}

// Generate secure random tokens
$token = bin2hex(random_bytes(32));

// File upload security
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
$maxSize = 5 * 1024 * 1024; // 5MB

if (in_array($_FILES['upload']['type'], $allowedTypes) && 
    $_FILES['upload']['size'] <= $maxSize) {
    // Process upload
}`,
          description: 'Essential security practices in PHP'
        }
      ]
    }
  ]
}