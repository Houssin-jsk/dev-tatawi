export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonContent {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  quiz: QuizQuestion[];
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  lessons: LessonContent[];
}

export const courseContent: Record<string, CourseData> = {
  html: {
    id: 'html',
    title: 'HTML Fundamentals',
    description: 'Learn the building blocks of web development - tags, elements, and structure',
    lessons: [
      {
        id: 'html-1',
        title: 'Introduction to HTML',
        content: `HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements and tags.

HTML elements are the building blocks of HTML pages. An HTML element is defined by a start tag, some content, and an end tag.

Key concepts:
• HTML uses tags to define elements
• Tags are enclosed in angle brackets < >
• Most tags come in pairs (opening and closing)
• HTML documents have a specific structure`,
        codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is my first paragraph.</p>
</body>
</html>`,
        quiz: [
          {
            id: 'q1',
            question: 'What does HTML stand for?',
            options: [
              'HyperText Markup Language',
              'High Tech Modern Language',
              'Home Tool Markup Language',
              'Hyperlink and Text Markup Language'
            ],
            correctAnswer: 0,
            explanation: 'HTML stands for HyperText Markup Language, which is the standard markup language for creating web pages.'
          },
          {
            id: 'q2',
            question: 'Which tag is used to define the largest heading?',
            options: ['<h6>', '<h1>', '<header>', '<heading>'],
            correctAnswer: 1,
            explanation: 'The <h1> tag defines the largest heading in HTML, with <h6> being the smallest.'
          },
          {
            id: 'q3',
            question: 'HTML tags are enclosed in which characters?',
            options: ['( )', '[ ]', '< >', '{ }'],
            correctAnswer: 2,
            explanation: 'HTML tags are enclosed in angle brackets < >.'
          }
        ]
      },
      {
        id: 'html-2',
        title: 'HTML Document Structure',
        content: `Every HTML document follows a basic structure that includes several essential elements. Understanding this structure is crucial for creating valid web pages.

The basic structure includes:
• DOCTYPE declaration - tells the browser which version of HTML to use
• <html> element - the root element that contains all other elements
• <head> element - contains metadata about the document
• <body> element - contains the visible content of the page

The head section typically includes:
• <title> - sets the page title shown in browser tabs
• <meta> tags - provide metadata about the document
• Links to CSS files and other resources`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Structure</title>
</head>
<body>
    <header>
        <h1>Page Header</h1>
    </header>
    <main>
        <p>Main content goes here</p>
    </main>
    <footer>
        <p>Footer content</p>
    </footer>
</body>
</html>`,
        quiz: [
          {
            id: 'q1',
            question: 'What is the purpose of the DOCTYPE declaration?',
            options: [
              'To style the document',
              'To tell the browser which HTML version to use',
              'To add JavaScript functionality',
              'To create a link to another page'
            ],
            correctAnswer: 1,
            explanation: 'The DOCTYPE declaration tells the browser which version of HTML the document is using.'
          },
          {
            id: 'q2',
            question: 'Which element contains the visible content of a web page?',
            options: ['<head>', '<html>', '<body>', '<title>'],
            correctAnswer: 2,
            explanation: 'The <body> element contains all the visible content of a web page.'
          },
          {
            id: 'q3',
            question: 'Where should the <title> element be placed?',
            options: ['In the <body>', 'In the <head>', 'In the <html>', 'Anywhere in the document'],
            correctAnswer: 1,
            explanation: 'The <title> element should be placed in the <head> section of the document.'
          }
        ]
      },
      {
        id: 'html-3',
        title: 'Text Elements and Formatting',
        content: `HTML provides various elements for formatting and structuring text content. These elements help create readable and well-organized web pages.

Common text elements include:
• Headings (h1-h6) - for titles and section headers
• Paragraphs (p) - for blocks of text
• Line breaks (br) - for single line breaks
• Emphasis elements (em, strong) - for highlighting text
• Lists (ul, ol, li) - for organizing items

Text formatting elements:
• <strong> - important text (usually bold)
• <em> - emphasized text (usually italic)
• <mark> - highlighted text
• <small> - smaller text
• <del> - deleted text (strikethrough)`,
        codeExample: `<h1>Main Title</h1>
<h2>Subtitle</h2>

<p>This is a <strong>paragraph</strong> with some <em>emphasized text</em>.</p>

<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>

<ol>
    <li>Step one</li>
    <li>Step two</li>
    <li>Step three</li>
</ol>

<p>This text has a <mark>highlighted</mark> word.</p>`,
        quiz: [
          {
            id: 'q1',
            question: 'Which element is used for the most important heading?',
            options: ['<h6>', '<h3>', '<h1>', '<header>'],
            correctAnswer: 2,
            explanation: '<h1> is used for the most important heading, with <h6> being the least important.'
          },
          {
            id: 'q2',
            question: 'What is the difference between <ul> and <ol>?',
            options: [
              '<ul> is for unordered lists, <ol> is for ordered lists',
              '<ul> is for ordered lists, <ol> is for unordered lists',
              'They are the same',
              '<ul> is for text, <ol> is for numbers'
            ],
            correctAnswer: 0,
            explanation: '<ul> creates unordered (bulleted) lists, while <ol> creates ordered (numbered) lists.'
          },
          {
            id: 'q3',
            question: 'Which element makes text appear bold by default?',
            options: ['<em>', '<i>', '<strong>', '<bold>'],
            correctAnswer: 2,
            explanation: 'The <strong> element makes text appear bold by default and indicates importance.'
          }
        ]
      }
    ]
  },
  css: {
    id: 'css',
    title: 'CSS Styling',
    description: 'Master layout, colors, animations and responsive design techniques',
    lessons: [
      {
        id: 'css-1',
        title: 'Introduction to CSS',
        content: `CSS (Cascading Style Sheets) is used to style and layout web pages. It controls how HTML elements are displayed on screen, in print, or in other media.

CSS allows you to:
• Change colors, fonts, and spacing
• Create layouts and position elements
• Add animations and transitions
• Make responsive designs for different devices

CSS works by selecting HTML elements and applying styles to them. The "cascading" nature means styles can inherit from parent elements and be overridden by more specific rules.

There are three ways to add CSS:
• Inline styles (style attribute)
• Internal styles (<style> tag in <head>)
• External stylesheets (separate .css file)`,
        codeExample: `/* External CSS file */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
    text-align: center;
    font-size: 2em;
}

p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 15px;
}

.highlight {
    background-color: yellow;
    padding: 5px;
}`,
        quiz: [
          {
            id: 'q1',
            question: 'What does CSS stand for?',
            options: [
              'Computer Style Sheets',
              'Cascading Style Sheets',
              'Creative Style Sheets',
              'Colorful Style Sheets'
            ],
            correctAnswer: 1,
            explanation: 'CSS stands for Cascading Style Sheets, used for styling web pages.'
          },
          {
            id: 'q2',
            question: 'Which is the best way to include CSS for multiple pages?',
            options: [
              'Inline styles',
              'Internal styles',
              'External stylesheet',
              'JavaScript styles'
            ],
            correctAnswer: 2,
            explanation: 'External stylesheets are best for multiple pages as they can be reused and cached.'
          },
          {
            id: 'q3',
            question: 'What does "cascading" mean in CSS?',
            options: [
              'Styles flow like water',
              'Styles inherit and can be overridden',
              'Styles are applied randomly',
              'Styles only work on certain elements'
            ],
            correctAnswer: 1,
            explanation: 'Cascading means styles inherit from parent elements and more specific rules override general ones.'
          }
        ]
      }
    ]
  },
  javascript: {
    id: 'javascript',
    title: 'JavaScript Magic',
    description: 'Variables, functions, DOM manipulation and interactive web experiences',
    lessons: [
      {
        id: 'js-1',
        title: 'JavaScript Basics',
        content: `JavaScript is a programming language that makes web pages interactive. It can change HTML content, modify CSS styles, validate forms, and respond to user events.

Key concepts:
• Variables - store data values
• Functions - reusable blocks of code
• Events - user interactions like clicks
• DOM - Document Object Model for manipulating HTML

JavaScript can be added to HTML in several ways:
• Inline event handlers
• <script> tags in HTML
• External .js files

Variables in JavaScript:
• let - for variables that can change
• const - for constants that don't change
• var - older way (avoid in modern code)`,
        codeExample: `// Variables
let userName = "John";
const age = 25;

// Function
function greetUser() {
    console.log("Hello, " + userName + "!");
}

// Event handling
document.getElementById("myButton").addEventListener("click", function() {
    alert("Button clicked!");
});

// Changing HTML content
document.getElementById("demo").innerHTML = "New content!";

// Simple calculation
let x = 10;
let y = 5;
let result = x + y;
console.log("Result: " + result);`,
        quiz: [
          {
            id: 'q1',
            question: 'Which keyword is used to declare a constant in JavaScript?',
            options: ['var', 'let', 'const', 'constant'],
            correctAnswer: 2,
            explanation: 'The "const" keyword is used to declare constants that cannot be reassigned.'
          },
          {
            id: 'q2',
            question: 'What does DOM stand for?',
            options: [
              'Document Object Model',
              'Data Object Management',
              'Dynamic Object Method',
              'Document Oriented Model'
            ],
            correctAnswer: 0,
            explanation: 'DOM stands for Document Object Model, which represents the HTML document structure.'
          },
          {
            id: 'q3',
            question: 'How do you add an event listener to an element?',
            options: [
              'element.onClick()',
              'element.addEventListener()',
              'element.addEvent()',
              'element.listen()'
            ],
            correctAnswer: 1,
            explanation: 'The addEventListener() method is used to attach event handlers to elements.'
          }
        ]
      }
    ]
  },
  github: {
    id: 'github',
    title: 'GitHub & Git',
    description: 'Version control, commits, branches and collaboration workflows',
    lessons: [
      {
        id: 'git-1',
        title: 'Introduction to Git',
        content: `Git is a version control system that tracks changes in your code over time. It allows you to save different versions of your project and collaborate with other developers.

Key concepts:
• Repository (repo) - a project folder tracked by Git
• Commit - a saved snapshot of your code
• Branch - a separate line of development
• Merge - combining changes from different branches

Why use Git:
• Track changes and history
• Collaborate with team members
• Backup your code
• Experiment with new features safely
• Revert to previous versions if needed

Basic Git workflow:
1. Initialize a repository
2. Add files to staging area
3. Commit changes with a message
4. Push to remote repository (like GitHub)`,
        codeExample: `# Initialize a new Git repository
git init

# Check status of files
git status

# Add files to staging area
git add filename.txt
git add .  # Add all files

# Commit changes
git commit -m "Add new feature"

# Connect to remote repository
git remote add origin https://github.com/username/repo.git

# Push changes to GitHub
git push origin main

# Clone a repository
git clone https://github.com/username/repo.git`,
        quiz: [
          {
            id: 'q1',
            question: 'What is a Git repository?',
            options: [
              'A website for code',
              'A project folder tracked by Git',
              'A type of file',
              'A programming language'
            ],
            correctAnswer: 1,
            explanation: 'A Git repository is a project folder that is tracked by Git version control.'
          },
          {
            id: 'q2',
            question: 'What command is used to save changes in Git?',
            options: ['git save', 'git commit', 'git push', 'git add'],
            correctAnswer: 1,
            explanation: 'The "git commit" command saves changes to the repository with a descriptive message.'
          },
          {
            id: 'q3',
            question: 'What does "git push" do?',
            options: [
              'Downloads code from remote',
              'Uploads local changes to remote repository',
              'Creates a new branch',
              'Deletes files'
            ],
            correctAnswer: 1,
            explanation: 'Git push uploads your local commits to a remote repository like GitHub.'
          }
        ]
      }
    ]
  },
  react: {
    id: 'react',
    title: 'React Development',
    description: 'Components, hooks, props, state management and modern web apps',
    lessons: [
      {
        id: 'react-1',
        title: 'Introduction to React',
        content: `React is a JavaScript library for building user interfaces, especially web applications. It was created by Facebook and is now maintained by Meta and the community.

Key concepts:
• Components - reusable pieces of UI
• JSX - JavaScript syntax extension that looks like HTML
• Props - data passed to components
• State - data that can change over time
• Virtual DOM - React's efficient way of updating the UI

Why use React:
• Component-based architecture
• Reusable code
• Fast rendering with Virtual DOM
• Large ecosystem and community
• Backed by Meta (Facebook)

React applications are built using components, which are like custom HTML elements that can contain their own logic and styling.`,
        codeExample: `import React, { useState } from 'react';

// Functional component with hooks
function Welcome({ name }) {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

// Using the component
function App() {
    return (
        <div>
            <Welcome name="John" />
            <Welcome name="Sarah" />
        </div>
    );
}

export default App;`,
        quiz: [
          {
            id: 'q1',
            question: 'What is JSX?',
            options: [
              'A new programming language',
              'JavaScript syntax extension that looks like HTML',
              'A CSS framework',
              'A database query language'
            ],
            correctAnswer: 1,
            explanation: 'JSX is a JavaScript syntax extension that allows you to write HTML-like code in JavaScript.'
          },
          {
            id: 'q2',
            question: 'What are props in React?',
            options: [
              'Properties passed to components',
              'CSS styles',
              'Event handlers',
              'Database connections'
            ],
            correctAnswer: 0,
            explanation: 'Props are properties (data) passed from parent components to child components.'
          },
          {
            id: 'q3',
            question: 'What hook is used to manage state in functional components?',
            options: ['useEffect', 'useState', 'useContext', 'useReducer'],
            correctAnswer: 1,
            explanation: 'The useState hook is used to add state to functional components.'
          }
        ]
      }
    ]
  },
  cmd: {
    id: 'cmd',
    title: 'Command Line',
    description: 'Terminal basics, CLI tools and developer productivity workflows',
    lessons: [
      {
        id: 'cmd-1',
        title: 'Command Line Basics',
        content: `The command line (also called terminal, console, or shell) is a text-based interface for interacting with your computer. It's an essential tool for developers.

Why learn command line:
• Faster than using graphical interfaces
• Required for many development tools
• Better for automation and scripting
• Universal across different operating systems
• More precise control over your system

Basic concepts:
• Shell - the program that interprets commands
• Directory - same as a folder
• Path - location of files and folders
• Current directory - where you are now
• Home directory - your user folder

The command line shows a prompt where you type commands. After pressing Enter, the command executes and shows results.`,
        codeExample: `# Navigate directories
pwd          # Print current directory
ls           # List files and folders
cd Documents # Change to Documents folder
cd ..        # Go up one level
cd ~         # Go to home directory

# File operations
mkdir newfolder    # Create new directory
touch newfile.txt  # Create new file
cp file1.txt file2.txt  # Copy file
mv oldname.txt newname.txt  # Rename/move file
rm file.txt        # Delete file
rm -r folder       # Delete folder and contents

# View file contents
cat file.txt       # Display entire file
head file.txt      # Show first 10 lines
tail file.txt      # Show last 10 lines`,
        quiz: [
          {
            id: 'q1',
            question: 'What command shows your current directory?',
            options: ['cd', 'ls', 'pwd', 'dir'],
            correctAnswer: 2,
            explanation: 'The "pwd" command (print working directory) shows your current location.'
          },
          {
            id: 'q2',
            question: 'How do you create a new directory?',
            options: ['mkdir', 'newdir', 'createdir', 'makedir'],
            correctAnswer: 0,
            explanation: 'The "mkdir" command creates a new directory (folder).'
          },
          {
            id: 'q3',
            question: 'What does "cd .." do?',
            options: [
              'Goes to home directory',
              'Goes up one directory level',
              'Lists files',
              'Creates a directory'
            ],
            correctAnswer: 1,
            explanation: 'The "cd .." command moves up one directory level to the parent folder.'
          }
        ]
      }
    ]
  },
  algorithms: {
    id: 'algorithms',
    title: 'Algorithms & Logic',
    description: 'Problem-solving, data structures and thinking like a programmer',
    lessons: [
      {
        id: 'algo-1',
        title: 'Introduction to Algorithms',
        content: `An algorithm is a step-by-step procedure for solving a problem or completing a task. In programming, algorithms are the logical instructions that tell the computer what to do.

Key concepts:
• Input - data given to the algorithm
• Output - result produced by the algorithm
• Steps - clear, unambiguous instructions
• Efficiency - how fast and memory-efficient the algorithm is

Why learn algorithms:
• Improve problem-solving skills
• Write more efficient code
• Pass technical interviews
• Understand how software works
• Think like a programmer

Common algorithm types:
• Searching - finding specific data
• Sorting - organizing data in order
• Recursion - functions that call themselves
• Dynamic programming - solving complex problems by breaking them down

Good algorithms are:
• Correct - produce the right answer
• Efficient - use minimal time and memory
• Clear - easy to understand and maintain`,
        codeExample: `// Simple search algorithm
function findNumber(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
            return i; // Return index where found
        }
    }
    return -1; // Not found
}

// Example usage
let myNumbers = [5, 2, 8, 1, 9];
let position = findNumber(myNumbers, 8);
console.log("Number 8 found at position:", position);

// Simple sorting algorithm (bubble sort)
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}`,
        quiz: [
          {
            id: 'q1',
            question: 'What is an algorithm?',
            options: [
              'A programming language',
              'A step-by-step procedure for solving a problem',
              'A type of computer',
              'A software application'
            ],
            correctAnswer: 1,
            explanation: 'An algorithm is a step-by-step procedure or set of instructions for solving a problem.'
          },
          {
            id: 'q2',
            question: 'What makes a good algorithm?',
            options: [
              'Only correctness',
              'Only efficiency',
              'Correctness, efficiency, and clarity',
              'Only clarity'
            ],
            correctAnswer: 2,
            explanation: 'Good algorithms should be correct (produce right answers), efficient (fast and memory-friendly), and clear (easy to understand).'
          },
          {
            id: 'q3',
            question: 'What does a search algorithm do?',
            options: [
              'Organizes data in order',
              'Finds specific data in a collection',
              'Creates new data',
              'Deletes data'
            ],
            correctAnswer: 1,
            explanation: 'A search algorithm finds specific data or elements within a collection or dataset.'
          }
        ]
      }
    ]
  }
};