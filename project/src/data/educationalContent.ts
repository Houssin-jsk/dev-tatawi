export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  quiz: QuizQuestion[];
  estimatedTime: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  totalLessons: number;
  estimatedHours: number;
  prerequisites: string[];
  lessons: Lesson[];
}

export const educationalContent: Course[] = [
  {
    id: 'html',
    title: 'HTML Fundamentals',
    description: 'Learn the building blocks of web development - tags, elements, and structure',
    icon: '🏗️',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/20',
    totalLessons: 12,
    estimatedHours: 8,
    prerequisites: [],
    lessons: [
      {
        id: 'html-1',
        title: 'Introduction to HTML',
        difficulty: 'beginner',
        estimatedTime: 30,
        content: `HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements and tags.

HTML elements are the building blocks of HTML pages. An HTML element is defined by a start tag, some content, and an end tag.

Key concepts:
• HTML uses tags to define elements
• Tags are enclosed in angle brackets < >
• Most tags come in pairs (opening and closing)
• HTML documents have a specific structure
• HTML is not a programming language, it's a markup language

HTML tells the browser how to structure the content, while CSS handles the styling and JavaScript adds interactivity.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is my first paragraph.</p>
    <p>HTML is <strong>awesome</strong> and <em>easy to learn</em>!</p>
</body>
</html>`,
        quiz: [
          {
            id: 'html-1-q1',
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
            id: 'html-1-q2',
            question: 'Which tag is used to define the largest heading?',
            options: ['<h6>', '<h1>', '<header>', '<heading>'],
            correctAnswer: 1,
            explanation: 'The <h1> tag defines the largest heading in HTML, with <h6> being the smallest.'
          },
          {
            id: 'html-1-q3',
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
        difficulty: 'beginner',
        estimatedTime: 25,
        content: `Every HTML document follows a basic structure that includes several essential elements. Understanding this structure is crucial for creating valid web pages.

The basic structure includes:
• DOCTYPE declaration - tells the browser which version of HTML to use
• <html> element - the root element that contains all other elements
• <head> element - contains metadata about the document
• <body> element - contains the visible content of the page

The head section typically includes:
• <title> - sets the page title shown in browser tabs
• <meta> tags - provide metadata about the document
• Links to CSS files and other resources

The DOCTYPE declaration must be the very first thing in your HTML document, before the <html> tag.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A sample HTML page">
    <meta name="keywords" content="HTML, web development, tutorial">
    <meta name="author" content="Your Name">
    <title>Document Structure Example</title>
</head>
<body>
    <header>
        <h1>Page Header</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>Main Content</h2>
            <p>This is the main content area.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Your Website</p>
    </footer>
</body>
</html>`,
        quiz: [
          {
            id: 'html-2-q1',
            question: 'What is the purpose of the DOCTYPE declaration?',
            options: [
              'To style the document',
              'To tell the browser which HTML version to use',
              'To add JavaScript functionality',
              'To create a link to another page'
            ],
            correctAnswer: 1,
            explanation: 'The DOCTYPE declaration tells the browser which version of HTML the document is using, ensuring proper rendering.'
          },
          {
            id: 'html-2-q2',
            question: 'Which element contains the visible content of a web page?',
            options: ['<head>', '<html>', '<body>', '<title>'],
            correctAnswer: 2,
            explanation: 'The <body> element contains all the visible content of a web page that users can see and interact with.'
          }
        ]
      },
      {
        id: 'html-3',
        title: 'Text Elements and Formatting',
        difficulty: 'beginner',
        estimatedTime: 35,
        content: `HTML provides various elements for formatting and structuring text content. These elements help create readable and well-organized web pages.

Heading elements (h1-h6):
• Used for titles and section headers
• h1 is the most important, h6 is the least
• Should be used hierarchically
• Important for SEO and accessibility

Text formatting elements:
• <p> - paragraphs for blocks of text
• <br> - line breaks (self-closing)
• <strong> - important text (usually bold)
• <em> - emphasized text (usually italic)
• <mark> - highlighted text
• <small> - smaller text
• <del> - deleted text (strikethrough)
• <ins> - inserted text (underlined)

List elements:
• <ul> - unordered lists (bullets)
• <ol> - ordered lists (numbers)
• <li> - list items
• <dl>, <dt>, <dd> - definition lists`,
        codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>Text Formatting Example</title>
</head>
<body>
    <h1>Main Title</h1>
    <h2>Subtitle</h2>
    <h3>Sub-subtitle</h3>

    <p>This is a <strong>paragraph</strong> with some <em>emphasized text</em>.</p>
    <p>You can also <mark>highlight</mark> important words.</p>
    
    <p>Line breaks can be added<br>like this to create new lines.</p>

    <h3>Unordered List</h3>
    <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
    </ul>

    <h3>Ordered List</h3>
    <ol>
        <li>Step one</li>
        <li>Step two</li>
        <li>Step three</li>
    </ol>

    <h3>Definition List</h3>
    <dl>
        <dt>HTML</dt>
        <dd>HyperText Markup Language</dd>
        <dt>CSS</dt>
        <dd>Cascading Style Sheets</dd>
    </dl>

    <p>This text was <del>deleted</del> and this was <ins>inserted</ins>.</p>
    <p><small>This is smaller text for fine print.</small></p>
</body>
</html>`,
        quiz: [
          {
            id: 'html-3-q1',
            question: 'Which element is used for the most important heading?',
            options: ['<h6>', '<h3>', '<h1>', '<header>'],
            correctAnswer: 2,
            explanation: '<h1> is used for the most important heading, with <h6> being the least important.'
          },
          {
            id: 'html-3-q2',
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
            id: 'html-3-q3',
            question: 'Which element makes text appear bold by default?',
            options: ['<em>', '<i>', '<strong>', '<bold>'],
            correctAnswer: 2,
            explanation: 'The <strong> element makes text appear bold by default and indicates semantic importance.'
          }
        ]
      },
      {
        id: 'html-4',
        title: 'Links and Navigation',
        difficulty: 'beginner',
        estimatedTime: 30,
        content: `Links are fundamental to the web, allowing users to navigate between pages and sections. The anchor element <a> is used to create links.

Types of links:
• External links - to other websites
• Internal links - to other pages on your site
• Anchor links - to sections within the same page
• Email links - to open email client
• Phone links - to dial phone numbers

The href attribute specifies the destination:
• Absolute URLs: https://example.com
• Relative URLs: /page.html or ../folder/page.html
• Anchor links: #section-id
• Email: mailto:email@example.com
• Phone: tel:+1234567890

Link attributes:
• target="_blank" - opens in new tab
• title - tooltip text
• download - forces download
• rel - relationship between pages`,
        codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>Links and Navigation</title>
</head>
<body>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <section id="home">
        <h1>Home Section</h1>
        <p>Welcome to our website!</p>
        
        <!-- External link -->
        <p>Visit <a href="https://www.w3schools.com" target="_blank" rel="noopener">W3Schools</a> for more tutorials.</p>
        
        <!-- Internal link -->
        <p>Check out our <a href="about.html">About page</a>.</p>
        
        <!-- Anchor link -->
        <p><a href="#contact">Jump to Contact section</a></p>
    </section>

    <section id="about">
        <h2>About Section</h2>
        <p>Learn more about us here.</p>
        
        <!-- Download link -->
        <p><a href="resume.pdf" download>Download our brochure</a></p>
    </section>

    <section id="contact">
        <h2>Contact Section</h2>
        <p>Get in touch with us:</p>
        
        <!-- Email link -->
        <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        
        <!-- Phone link -->
        <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
        
        <!-- Back to top -->
        <p><a href="#home">Back to top</a></p>
    </section>
</body>
</html>`,
        quiz: [
          {
            id: 'html-4-q1',
            question: 'Which attribute is used to specify the destination of a link?',
            options: ['src', 'href', 'link', 'url'],
            correctAnswer: 1,
            explanation: 'The href attribute specifies the URL or destination of the link.'
          },
          {
            id: 'html-4-q2',
            question: 'How do you create a link that opens in a new tab?',
            options: [
              'target="_new"',
              'target="_blank"',
              'new="true"',
              'window="new"'
            ],
            correctAnswer: 1,
            explanation: 'The target="_blank" attribute opens the link in a new tab or window.'
          },
          {
            id: 'html-4-q3',
            question: 'What type of link is "#contact"?',
            options: [
              'External link',
              'Internal link',
              'Anchor link',
              'Email link'
            ],
            correctAnswer: 2,
            explanation: 'Links starting with # are anchor links that jump to elements with matching IDs on the same page.'
          }
        ]
      },
      {
        id: 'html-5',
        title: 'Images and Media',
        difficulty: 'beginner',
        estimatedTime: 40,
        content: `Images and media elements make web pages more engaging and informative. HTML provides several elements for embedding different types of media.

The <img> element:
• Self-closing tag
• src attribute - path to image file
• alt attribute - alternative text for accessibility
• width/height attributes - dimensions
• title attribute - tooltip text

Image formats:
• JPEG - photos and complex images
• PNG - images with transparency
• GIF - simple animations
• SVG - scalable vector graphics
• WebP - modern format with better compression

Other media elements:
• <audio> - for sound files
• <video> - for video files
• <iframe> - for embedding external content
• <embed> - for plugins and external applications

Responsive images:
• Use CSS for responsive sizing
• srcset attribute for different screen sizes
• <picture> element for art direction`,
        codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>Images and Media</title>
    <style>
        img {
            max-width: 100%;
            height: auto;
        }
        .gallery {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .gallery img {
            width: 200px;
            height: 150px;
            object-fit: cover;
        }
    </style>
</head>
<body>
    <h1>Images and Media Examples</h1>
    
    <!-- Basic image -->
    <img src="https://via.placeholder.com/400x300" 
         alt="Placeholder image" 
         title="This is a placeholder image">
    
    <!-- Image with specific dimensions -->
    <img src="https://via.placeholder.com/200x150" 
         alt="Small placeholder" 
         width="200" 
         height="150">
    
    <h2>Image Gallery</h2>
    <div class="gallery">
        <img src="https://via.placeholder.com/200x150/ff0000" alt="Red placeholder">
        <img src="https://via.placeholder.com/200x150/00ff00" alt="Green placeholder">
        <img src="https://via.placeholder.com/200x150/0000ff" alt="Blue placeholder">
    </div>
    
    <h2>Audio Example</h2>
    <audio controls>
        <source src="audio.mp3" type="audio/mpeg">
        <source src="audio.ogg" type="audio/ogg">
        Your browser does not support the audio element.
    </audio>
    
    <h2>Video Example</h2>
    <video width="400" height="300" controls>
        <source src="movie.mp4" type="video/mp4">
        <source src="movie.ogg" type="video/ogg">
        Your browser does not support the video tag.
    </video>
    
    <h2>Embedded Content</h2>
    <iframe width="400" height="300" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="YouTube video player" 
            frameborder="0" 
            allowfullscreen>
    </iframe>
</body>
</html>`,
        quiz: [
          {
            id: 'html-5-q1',
            question: 'Which attribute provides alternative text for images?',
            options: ['title', 'alt', 'description', 'text'],
            correctAnswer: 1,
            explanation: 'The alt attribute provides alternative text for images, which is important for accessibility and SEO.'
          },
          {
            id: 'html-5-q2',
            question: 'Which element is used to embed videos in HTML?',
            options: ['<movie>', '<video>', '<media>', '<film>'],
            correctAnswer: 1,
            explanation: 'The <video> element is used to embed video content in HTML pages.'
          },
          {
            id: 'html-5-q3',
            question: 'What does the "controls" attribute do for audio/video elements?',
            options: [
              'Sets the volume',
              'Adds play/pause buttons',
              'Changes the size',
              'Sets the quality'
            ],
            correctAnswer: 1,
            explanation: 'The controls attribute adds play/pause buttons and other media controls to audio and video elements.'
          }
        ]
      }
    ]
  },
  {
    id: 'css',
    title: 'CSS Styling',
    description: 'Master layout, colors, animations and responsive design techniques',
    icon: '🎨',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/20',
    totalLessons: 15,
    estimatedHours: 12,
    prerequisites: ['html'],
    lessons: [
      {
        id: 'css-1',
        title: 'Introduction to CSS',
        difficulty: 'beginner',
        estimatedTime: 35,
        content: `CSS (Cascading Style Sheets) is used to style and layout web pages. It controls how HTML elements are displayed on screen, in print, or in other media.

CSS allows you to:
• Change colors, fonts, and spacing
• Create layouts and position elements
• Add animations and transitions
• Make responsive designs for different devices
• Control the visual presentation of your content

CSS works by selecting HTML elements and applying styles to them. The "cascading" nature means styles can inherit from parent elements and be overridden by more specific rules.

There are three ways to add CSS:
• Inline styles (style attribute) - not recommended
• Internal styles (<style> tag in <head>) - for single pages
• External stylesheets (separate .css file) - best practice

CSS syntax consists of:
• Selector - targets HTML elements
• Property - what you want to change
• Value - how you want to change it`,
        codeExample: `/* External CSS file (styles.css) */

/* Element selector */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
    line-height: 1.6;
}

/* Element selector */
h1 {
    color: #333;
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 20px;
}

/* Element selector */
p {
    color: #666;
    font-size: 16px;
    margin-bottom: 15px;
    text-align: justify;
}

/* Class selector */
.highlight {
    background-color: yellow;
    padding: 5px;
    border-radius: 3px;
}

/* ID selector */
#main-content {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Multiple selectors */
h1, h2, h3 {
    font-family: Georgia, serif;
}

/* Descendant selector */
.highlight strong {
    color: red;
    font-weight: bold;
}`,
        quiz: [
          {
            id: 'css-1-q1',
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
            id: 'css-1-q2',
            question: 'Which is the best way to include CSS for multiple pages?',
            options: [
              'Inline styles',
              'Internal styles',
              'External stylesheet',
              'JavaScript styles'
            ],
            correctAnswer: 2,
            explanation: 'External stylesheets are best for multiple pages as they can be reused, cached, and maintain separation of concerns.'
          },
          {
            id: 'css-1-q3',
            question: 'What does "cascading" mean in CSS?',
            options: [
              'Styles flow like water',
              'Styles inherit and can be overridden by specificity',
              'Styles are applied randomly',
              'Styles only work on certain elements'
            ],
            correctAnswer: 1,
            explanation: 'Cascading means styles inherit from parent elements and more specific rules override general ones based on specificity and source order.'
          }
        ]
      },
      {
        id: 'css-2',
        title: 'CSS Selectors and Specificity',
        difficulty: 'beginner',
        estimatedTime: 45,
        content: `CSS selectors are patterns used to select and style HTML elements. Understanding selectors and specificity is crucial for effective CSS.

Basic selectors:
• Element selector: p, h1, div
• Class selector: .classname
• ID selector: #idname
• Universal selector: *
• Attribute selector: [attribute="value"]

Combinator selectors:
• Descendant: div p (p inside div)
• Child: div > p (direct child)
• Adjacent sibling: h1 + p (p immediately after h1)
• General sibling: h1 ~ p (p after h1 at same level)

Pseudo-classes:
• :hover, :focus, :active
• :first-child, :last-child, :nth-child()
• :not(), :empty, :checked

Pseudo-elements:
• ::before, ::after
• ::first-line, ::first-letter

Specificity hierarchy (highest to lowest):
1. Inline styles (1000)
2. IDs (100)
3. Classes, attributes, pseudo-classes (10)
4. Elements and pseudo-elements (1)`,
        codeExample: `/* CSS Selectors Examples */

/* Element selectors */
h1 { color: blue; }
p { margin: 10px 0; }

/* Class selectors */
.warning { color: red; }
.highlight { background-color: yellow; }

/* ID selectors */
#header { background-color: navy; }
#footer { text-align: center; }

/* Attribute selectors */
input[type="text"] { border: 1px solid #ccc; }
a[href^="https"] { color: green; }
img[alt] { border: 2px solid blue; }

/* Combinator selectors */
nav ul { list-style: none; }          /* Descendant */
nav > ul { margin: 0; }               /* Direct child */
h1 + p { font-weight: bold; }         /* Adjacent sibling */
h1 ~ p { color: gray; }               /* General sibling */

/* Pseudo-classes */
a:hover { text-decoration: underline; }
li:first-child { font-weight: bold; }
tr:nth-child(even) { background-color: #f2f2f2; }
input:focus { outline: 2px solid blue; }

/* Pseudo-elements */
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }
.quote::before { content: """; }
.quote::after { content: """; }

/* Multiple selectors */
h1, h2, h3 { font-family: Arial; }

/* Complex selectors */
.container .card:hover .title {
    color: red;
}

/* Specificity examples */
p { color: black; }              /* Specificity: 1 */
.text { color: blue; }           /* Specificity: 10 */
#content { color: green; }       /* Specificity: 100 */
p.text { color: purple; }        /* Specificity: 11 */
#content p { color: orange; }    /* Specificity: 101 */`,
        quiz: [
          {
            id: 'css-2-q1',
            question: 'Which selector has the highest specificity?',
            options: [
              '.class-name',
              '#id-name',
              'element-name',
              '[attribute="value"]'
            ],
            correctAnswer: 1,
            explanation: 'ID selectors (#id-name) have higher specificity than classes, attributes, or elements.'
          },
          {
            id: 'css-2-q2',
            question: 'What does the selector "div > p" target?',
            options: [
              'All p elements',
              'p elements inside div elements',
              'p elements that are direct children of div',
              'div elements inside p elements'
            ],
            correctAnswer: 2,
            explanation: 'The > combinator selects direct children only, so div > p targets p elements that are immediate children of div elements.'
          },
          {
            id: 'css-2-q3',
            question: 'What is the purpose of pseudo-classes like :hover?',
            options: [
              'To create fake elements',
              'To style elements based on their state',
              'To hide elements',
              'To change element types'
            ],
            correctAnswer: 1,
            explanation: 'Pseudo-classes like :hover style elements based on their state or user interaction, not their position in the HTML.'
          }
        ]
      },
      {
        id: 'css-3',
        title: 'Box Model and Layout',
        difficulty: 'intermediate',
        estimatedTime: 50,
        content: `The CSS box model is fundamental to understanding layout. Every element is a rectangular box with content, padding, border, and margin.

Box model components (from inside out):
• Content - the actual content (text, images)
• Padding - space between content and border
• Border - line around the padding
• Margin - space outside the border

Box-sizing property:
• content-box (default) - width/height applies to content only
• border-box - width/height includes padding and border

Display property values:
• block - takes full width, stacks vertically
• inline - takes only needed width, flows horizontally
• inline-block - hybrid of block and inline
• none - element is not displayed

Position property:
• static (default) - normal document flow
• relative - positioned relative to normal position
• absolute - positioned relative to nearest positioned ancestor
• fixed - positioned relative to viewport
• sticky - switches between relative and fixed

Float property (legacy):
• left, right - element floats to specified side
• none - no floating
• clear - prevents floating elements on specified sides`,
        codeExample: `/* Box Model Examples */

/* Basic box model */
.box {
    width: 300px;
    height: 200px;
    padding: 20px;
    border: 5px solid #333;
    margin: 15px;
    background-color: lightblue;
}

/* Border-box sizing */
.border-box {
    box-sizing: border-box;
    width: 300px; /* Total width including padding and border */
    padding: 20px;
    border: 5px solid red;
}

/* Display examples */
.block-element {
    display: block;
    width: 200px;
    height: 100px;
    background-color: yellow;
    margin: 10px 0;
}

.inline-element {
    display: inline;
    background-color: lightgreen;
    padding: 5px;
    /* width and height ignored for inline elements */
}

.inline-block-element {
    display: inline-block;
    width: 100px;
    height: 50px;
    background-color: orange;
    margin: 5px;
}

/* Position examples */
.relative-parent {
    position: relative;
    width: 400px;
    height: 300px;
    background-color: #f0f0f0;
    border: 2px solid #ccc;
}

.absolute-child {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 100px;
    height: 80px;
    background-color: red;
}

.fixed-element {
    position: fixed;
    top: 10px;
    right: 10px;
    width: 150px;
    height: 50px;
    background-color: navy;
    color: white;
    z-index: 1000;
}

.sticky-header {
    position: sticky;
    top: 0;
    background-color: white;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    z-index: 100;
}

/* Float example (legacy) */
.float-left {
    float: left;
    width: 200px;
    height: 150px;
    background-color: lightcoral;
    margin: 10px;
}

.clearfix::after {
    content: "";
    display: table;
    clear: both;
}`,
        quiz: [
          {
            id: 'css-3-q1',
            question: 'In the CSS box model, what is the order from inside to outside?',
            options: [
              'Content, Border, Padding, Margin',
              'Content, Padding, Border, Margin',
              'Padding, Content, Border, Margin',
              'Margin, Border, Padding, Content'
            ],
            correctAnswer: 1,
            explanation: 'The correct order from inside to outside is: Content, Padding, Border, Margin.'
          },
          {
            id: 'css-3-q2',
            question: 'What does "box-sizing: border-box" do?',
            options: [
              'Removes the border',
              'Makes the border thicker',
              'Includes padding and border in the element\'s total width/height',
              'Only applies to the border'
            ],
            correctAnswer: 2,
            explanation: 'border-box makes the width and height properties include the content, padding, and border, making sizing more predictable.'
          },
          {
            id: 'css-3-q3',
            question: 'Which position value removes an element from the normal document flow?',
            options: [
              'static',
              'relative',
              'absolute',
              'sticky'
            ],
            correctAnswer: 2,
            explanation: 'position: absolute removes the element from the normal document flow and positions it relative to its nearest positioned ancestor.'
          }
        ]
      }
    ]
  },
  {
    id: 'javascript',
    title: 'JavaScript Programming',
    description: 'Variables, functions, DOM manipulation and interactive web experiences',
    icon: '⚡',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/20',
    totalLessons: 18,
    estimatedHours: 15,
    prerequisites: ['html'],
    lessons: [
      {
        id: 'js-1',
        title: 'JavaScript Fundamentals',
        difficulty: 'beginner',
        estimatedTime: 40,
        content: `JavaScript is a programming language that makes web pages interactive. It can change HTML content, modify CSS styles, validate forms, and respond to user events.

Key concepts:
• Variables - store data values
• Functions - reusable blocks of code
• Events - user interactions like clicks
• DOM - Document Object Model for manipulating HTML
• Objects - collections of properties and methods

JavaScript can be added to HTML in several ways:
• Inline event handlers (not recommended)
• <script> tags in HTML
• External .js files (best practice)

Variables in JavaScript:
• let - for variables that can change (block-scoped)
• const - for constants that don't change (block-scoped)
• var - older way (function-scoped, avoid in modern code)

Data types:
• Primitive: string, number, boolean, undefined, null, symbol
• Non-primitive: object, array, function

JavaScript is case-sensitive and uses camelCase naming convention.`,
        codeExample: `// Variables and data types
let userName = "John Doe";
const age = 25;
let isStudent = true;
let score; // undefined
let data = null;

// Numbers
let price = 19.99;
let quantity = 5;
let total = price * quantity;

// Strings
let firstName = "John";
let lastName = 'Doe';
let fullName = firstName + " " + lastName;
let greeting = \`Hello, \${fullName}!\`; // Template literal

// Booleans
let isLoggedIn = false;
let hasPermission = true;

// Arrays
let colors = ["red", "green", "blue"];
let numbers = [1, 2, 3, 4, 5];
let mixedArray = ["text", 42, true, null];

// Objects
let person = {
    name: "Alice",
    age: 30,
    city: "New York",
    isEmployed: true
};

// Functions
function greetUser(name) {
    return "Hello, " + name + "!";
}

// Arrow function (ES6)
const addNumbers = (a, b) => {
    return a + b;
};

// Function usage
console.log(greetUser("Bob"));
console.log(addNumbers(5, 3));

// Accessing object properties
console.log(person.name);
console.log(person["age"]);

// Array methods
colors.push("yellow");
console.log(colors.length);
console.log(colors[0]);`,
        quiz: [
          {
            id: 'js-1-q1',
            question: 'Which keyword is used to declare a constant in JavaScript?',
            options: ['var', 'let', 'const', 'constant'],
            correctAnswer: 2,
            explanation: 'The "const" keyword is used to declare constants that cannot be reassigned after declaration.'
          },
          {
            id: 'js-1-q2',
            question: 'What is the correct way to create a template literal?',
            options: [
              '"Hello " + name',
              "'Hello ' + name",
              '`Hello ${name}`',
              'template("Hello", name)'
            ],
            correctAnswer: 2,
            explanation: 'Template literals use backticks (`) and ${} syntax for variable interpolation.'
          },
          {
            id: 'js-1-q3',
            question: 'Which of these is NOT a primitive data type in JavaScript?',
            options: ['string', 'number', 'array', 'boolean'],
            correctAnswer: 2,
            explanation: 'Array is not a primitive data type; it\'s an object. Primitive types include string, number, boolean, undefined, null, and symbol.'
          }
        ]
      },
      {
        id: 'js-2',
        title: 'DOM Manipulation',
        difficulty: 'intermediate',
        estimatedTime: 45,
        content: `The Document Object Model (DOM) represents the HTML document as a tree of objects that JavaScript can manipulate. DOM manipulation allows you to dynamically change content, structure, and styling.

Key DOM concepts:
• Document - represents the entire HTML document
• Elements - HTML tags as objects
• Nodes - everything in the DOM (elements, text, comments)
• Properties - attributes and content of elements
• Methods - functions to interact with elements

Selecting elements:
• getElementById() - select by ID
• getElementsByClassName() - select by class name
• getElementsByTagName() - select by tag name
• querySelector() - select first match using CSS selector
• querySelectorAll() - select all matches using CSS selector

Modifying elements:
• innerHTML - get/set HTML content
• textContent - get/set text content
• setAttribute() - set attributes
• style property - modify CSS styles
• classList - add/remove/toggle CSS classes

Creating and removing elements:
• createElement() - create new elements
• appendChild() - add child elements
• removeChild() - remove child elements
• remove() - remove element directly`,
        codeExample: `// Selecting elements
const titleElement = document.getElementById("main-title");
const buttons = document.getElementsByClassName("btn");
const paragraphs = document.getElementsByTagName("p");
const firstButton = document.querySelector(".btn");
const allButtons = document.querySelectorAll(".btn");

// Modifying content
titleElement.innerHTML = "<strong>New Title</strong>";
titleElement.textContent = "Plain Text Title";

// Modifying attributes
const image = document.querySelector("img");
image.setAttribute("src", "new-image.jpg");
image.setAttribute("alt", "New image description");

// Modifying styles
titleElement.style.color = "blue";
titleElement.style.fontSize = "24px";
titleElement.style.backgroundColor = "#f0f0f0";

// Working with classes
const element = document.querySelector(".my-element");
element.classList.add("active");
element.classList.remove("inactive");
element.classList.toggle("highlighted");
element.classList.contains("active"); // returns true/false

// Creating new elements
const newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph";
newParagraph.className = "dynamic-content";

// Adding elements to the DOM
const container = document.getElementById("content");
container.appendChild(newParagraph);

// Creating more complex elements
const newDiv = document.createElement("div");
newDiv.innerHTML = \`
    <h3>Dynamic Content</h3>
    <p>This was created with JavaScript</p>
    <button onclick="alert('Hello!')">Click me</button>
\`;
container.appendChild(newDiv);

// Removing elements
const elementToRemove = document.querySelector(".remove-me");
elementToRemove.remove(); // Modern way
// or
// elementToRemove.parentNode.removeChild(elementToRemove); // Older way

// Event handling
document.getElementById("my-button").addEventListener("click", function() {
    alert("Button was clicked!");
});

// Multiple event listeners
const button = document.querySelector("#action-btn");
button.addEventListener("click", handleClick);
button.addEventListener("mouseover", handleHover);

function handleClick() {
    console.log("Button clicked");
}

function handleHover() {
    console.log("Button hovered");
}`,
        quiz: [
          {
            id: 'js-2-q1',
            question: 'What does DOM stand for?',
            options: [
              'Document Object Model',
              'Data Object Management',
              'Dynamic Object Method',
              'Document Oriented Model'
            ],
            correctAnswer: 0,
            explanation: 'DOM stands for Document Object Model, which represents the HTML document structure as objects that JavaScript can manipulate.'
          },
          {
            id: 'js-2-q2',
            question: 'Which method selects the first element matching a CSS selector?',
            options: [
              'getElementById()',
              'getElementsByClassName()',
              'querySelector()',
              'querySelectorAll()'
            ],
            correctAnswer: 2,
            explanation: 'querySelector() selects the first element that matches the specified CSS selector.'
          },
          {
            id: 'js-2-q3',
            question: 'What is the difference between innerHTML and textContent?',
            options: [
              'They are the same',
              'innerHTML includes HTML tags, textContent is plain text only',
              'textContent includes HTML tags, innerHTML is plain text only',
              'innerHTML is faster than textContent'
            ],
            correctAnswer: 1,
            explanation: 'innerHTML gets/sets HTML content including tags, while textContent gets/sets only the text content without HTML tags.'
          }
        ]
      }
    ]
  },
  {
    id: 'git',
    title: 'Git Version Control',
    description: 'Version control, commits, branches and collaboration workflows',
    icon: '🔀',
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/20',
    totalLessons: 10,
    estimatedHours: 8,
    prerequisites: ['cmd'],
    lessons: [
      {
        id: 'git-1',
        title: 'Introduction to Git and Version Control',
        difficulty: 'beginner',
        estimatedTime: 35,
        content: `Git is a distributed version control system that tracks changes in your code over time. It allows you to save different versions of your project, collaborate with other developers, and manage code history effectively.

Key concepts:
• Repository (repo) - a project folder tracked by Git
• Commit - a saved snapshot of your code at a specific point
• Branch - a separate line of development
• Merge - combining changes from different branches
• Remote - a version of your repository hosted elsewhere (like GitHub)

Why use Git:
• Track changes and history of your code
• Collaborate with team members safely
• Backup your code in multiple locations
• Experiment with new features without breaking main code
• Revert to previous versions if something goes wrong
• See exactly what changed between versions

Git vs GitHub:
• Git - the version control system (software)
• GitHub - a hosting service for Git repositories (website)

Basic Git workflow:
1. Initialize a repository (git init)
2. Add files to staging area (git add)
3. Commit changes with a message (git commit)
4. Push to remote repository (git push)`,
        codeExample: `# Check if Git is installed
git --version

# Configure Git (do this once)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize a new Git repository
git init

# Check the status of your repository
git status

# Add files to staging area
git add filename.txt        # Add specific file
git add .                   # Add all files in current directory
git add *.js               # Add all JavaScript files

# Commit changes with a descriptive message
git commit -m "Add initial project files"
git commit -m "Fix login bug"
git commit -m "Update user interface design"

# View commit history
git log
git log --oneline          # Compact view
git log --graph           # Visual representation

# Check differences
git diff                  # See unstaged changes
git diff --staged        # See staged changes
git diff HEAD~1          # Compare with previous commit

# Connect to remote repository (GitHub)
git remote add origin https://github.com/username/repository.git

# Push changes to remote repository
git push origin main
git push -u origin main   # Set upstream for future pushes

# Clone an existing repository
git clone https://github.com/username/repository.git

# Pull latest changes from remote
git pull origin main`,
        quiz: [
          {
            id: 'git-1-q1',
            question: 'What is a Git repository?',
            options: [
              'A website for storing code',
              'A project folder tracked by Git version control',
              'A type of file format',
              'A programming language'
            ],
            correctAnswer: 1,
            explanation: 'A Git repository is a project folder that is tracked by Git version control system, containing all files and their history.'
          },
          {
            id: 'git-1-q2',
            question: 'What command is used to save changes in Git?',
            options: ['git save', 'git commit', 'git push', 'git store'],
            correctAnswer: 1,
            explanation: 'The "git commit" command saves changes to the repository with a descriptive message about what was changed.'
          },
          {
            id: 'git-1-q3',
            question: 'What is the difference between Git and GitHub?',
            options: [
              'They are the same thing',
              'Git is the version control system, GitHub is a hosting service',
              'GitHub is the version control system, Git is a hosting service',
              'Git is for individuals, GitHub is for teams'
            ],
            correctAnswer: 1,
            explanation: 'Git is the version control system software, while GitHub is a web-based hosting service for Git repositories.'
          }
        ]
      }
    ]
  },
  {
    id: 'react',
    title: 'React Development',
    description: 'Components, hooks, props, state management and modern web apps',
    icon: '⚛️',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/20',
    totalLessons: 16,
    estimatedHours: 20,
    prerequisites: ['javascript'],
    lessons: [
      {
        id: 'react-1',
        title: 'Introduction to React',
        difficulty: 'intermediate',
        estimatedTime: 45,
        content: `React is a JavaScript library for building user interfaces, especially web applications. It was created by Facebook (now Meta) and is now maintained by Meta and the open-source community.

Key concepts:
• Components - reusable pieces of UI that return JSX
• JSX - JavaScript syntax extension that looks like HTML
• Props - data passed from parent to child components
• State - data that can change over time within a component
• Virtual DOM - React's efficient way of updating the UI

Why use React:
• Component-based architecture promotes reusability
• Virtual DOM provides better performance
• Large ecosystem and community support
• Backed by Meta with regular updates
• Great developer tools and debugging support
• Unidirectional data flow makes apps predictable

React vs Vanilla JavaScript:
• React provides structure and organization
• Components make code more maintainable
• State management is built-in
• Better handling of complex UIs
• Automatic re-rendering when data changes

Modern React uses:
• Functional components (preferred over class components)
• Hooks for state and lifecycle management
• ES6+ features like arrow functions and destructuring`,
        codeExample: `// Basic React component (functional)
import React, { useState } from 'react';

// Simple component with props
function Welcome({ name, age }) {
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>You are {age} years old.</p>
        </div>
    );
}

// Component with state using useState hook
function Counter() {
    const [count, setCount] = useState(0);
    
    const increment = () => {
        setCount(count + 1);
    };
    
    const decrement = () => {
        setCount(count - 1);
    };
    
    const reset = () => {
        setCount(0);
    };
    
    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

// Component with multiple state variables
function UserProfile() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: 0
    });
    
    const [isEditing, setIsEditing] = useState(false);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };
    
    return (
        <div>
            {isEditing ? (
                <form>
                    <input
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <input
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <input
                        name="age"
                        type="number"
                        value={user.age}
                        onChange={handleInputChange}
                        placeholder="Age"
                    />
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Save
                    </button>
                </form>
            ) : (
                <div>
                    <h3>{user.name}</h3>
                    <p>Email: {user.email}</p>
                    <p>Age: {user.age}</p>
                    <button onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
}

// Main App component using other components
function App() {
    return (
        <div>
            <Welcome name="John" age={25} />
            <Welcome name="Sarah" age={30} />
            <Counter />
            <UserProfile />
        </div>
    );
}

export default App;`,
        quiz: [
          {
            id: 'react-1-q1',
            question: 'What is JSX?',
            options: [
              'A new programming language',
              'JavaScript syntax extension that looks like HTML',
              'A CSS framework for React',
              'A database query language'
            ],
            correctAnswer: 1,
            explanation: 'JSX is a JavaScript syntax extension that allows you to write HTML-like code in JavaScript, making React components more readable.'
          },
          {
            id: 'react-1-q2',
            question: 'What are props in React?',
            options: [
              'Properties passed from parent to child components',
              'CSS styles for components',
              'Event handlers for user interactions',
              'Database connections'
            ],
            correctAnswer: 0,
            explanation: 'Props are properties (data) passed from parent components to child components, allowing data to flow down the component tree.'
          },
          {
            id: 'react-1-q3',
            question: 'What hook is used to manage state in functional components?',
            options: ['useEffect', 'useState', 'useContext', 'useReducer'],
            correctAnswer: 1,
            explanation: 'The useState hook is used to add state to functional components, returning the current state value and a function to update it.'
          }
        ]
      }
    ]
  },
  {
    id: 'cmd',
    title: 'Command Line Interface',
    description: 'Terminal basics, CLI tools and developer productivity workflows',
    icon: '💻',
    color: 'text-green-500',
    bgColor: 'bg-green-500/20',
    totalLessons: 8,
    estimatedHours: 6,
    prerequisites: [],
    lessons: [
      {
        id: 'cmd-1',
        title: 'Command Line Basics',
        difficulty: 'beginner',
        estimatedTime: 40,
        content: `The command line (also called terminal, console, or shell) is a text-based interface for interacting with your computer. It's an essential tool for developers that provides more power and efficiency than graphical interfaces.

Why learn command line:
• Faster than using graphical interfaces for many tasks
• Required for many development tools and frameworks
• Better for automation and scripting
• Universal across different operating systems
• More precise control over your system
• Essential for server management and deployment

Basic concepts:
• Shell - the program that interprets and executes commands
• Terminal - the application that provides access to the shell
• Directory - same as a folder in graphical interfaces
• Path - location of files and folders in the file system
• Current directory - the folder you're currently "in"
• Home directory - your user's personal folder
• Root directory - the top-level directory of the file system

Common shells:
• Bash (Linux/Mac default)
• Zsh (Mac default in newer versions)
• PowerShell (Windows)
• Command Prompt (Windows)

The command line shows a prompt where you type commands. After pressing Enter, the command executes and shows results or output.`,
        codeExample: `# Navigation commands
pwd                    # Print current directory (where am I?)
ls                     # List files and folders (Mac/Linux)
dir                    # List files and folders (Windows)
ls -la                 # List with details and hidden files
ls -l                  # List with details
ls *.txt               # List only .txt files

cd Documents           # Change to Documents folder
cd ..                  # Go up one directory level
cd ../..               # Go up two directory levels
cd ~                   # Go to home directory
cd /                   # Go to root directory (Mac/Linux)
cd C:\\                 # Go to C: drive root (Windows)

# File and directory operations
mkdir newfolder        # Create new directory
mkdir -p path/to/folder # Create nested directories
touch newfile.txt      # Create new empty file (Mac/Linux)
echo. > newfile.txt    # Create new empty file (Windows)

cp file1.txt file2.txt           # Copy file (Mac/Linux)
copy file1.txt file2.txt         # Copy file (Windows)
cp -r folder1 folder2            # Copy directory recursively
mv oldname.txt newname.txt       # Rename/move file (Mac/Linux)
move oldname.txt newname.txt     # Rename/move file (Windows)

rm file.txt            # Delete file (Mac/Linux)
del file.txt           # Delete file (Windows)
rm -r folder           # Delete folder and contents (Mac/Linux)
rmdir /s folder        # Delete folder and contents (Windows)

# Viewing file contents
cat file.txt           # Display entire file (Mac/Linux)
type file.txt          # Display entire file (Windows)
head file.txt          # Show first 10 lines (Mac/Linux)
tail file.txt          # Show last 10 lines (Mac/Linux)
less file.txt          # View file page by page (Mac/Linux)
more file.txt          # View file page by page (Windows)

# Getting help
man ls                 # Manual for ls command (Mac/Linux)
ls --help              # Help for ls command (Linux)
help dir               # Help for dir command (Windows)

# System information
whoami                 # Current username
date                   # Current date and time
ps                     # Running processes (Mac/Linux)
tasklist               # Running processes (Windows)`,
        quiz: [
          {
            id: 'cmd-1-q1',
            question: 'What command shows your current directory?',
            options: ['cd', 'ls', 'pwd', 'dir'],
            correctAnswer: 2,
            explanation: 'The "pwd" command (print working directory) shows your current location in the file system.'
          },
          {
            id: 'cmd-1-q2',
            question: 'How do you create a new directory from the command line?',
            options: ['mkdir', 'newdir', 'createdir', 'makedir'],
            correctAnswer: 0,
            explanation: 'The "mkdir" command creates a new directory (folder) with the specified name.'
          },
          {
            id: 'cmd-1-q3',
            question: 'What does "cd .." do?',
            options: [
              'Goes to home directory',
              'Goes up one directory level',
              'Lists files in current directory',
              'Creates a new directory'
            ],
            correctAnswer: 1,
            explanation: 'The "cd .." command moves up one directory level to the parent folder.'
          }
        ]
      }
    ]
  },
  {
    id: 'algorithms',
    title: 'Algorithms & Data Structures',
    description: 'Problem-solving, data structures and computational thinking',
    icon: '🧠',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/20',
    totalLessons: 14,
    estimatedHours: 18,
    prerequisites: ['javascript'],
    lessons: [
      {
        id: 'algo-1',
        title: 'Introduction to Algorithms',
        difficulty: 'intermediate',
        estimatedTime: 50,
        content: `An algorithm is a step-by-step procedure for solving a problem or completing a task. In programming, algorithms are the logical instructions that tell the computer what to do to achieve a desired outcome.

Key concepts:
• Input - data given to the algorithm
• Output - result produced by the algorithm
• Steps - clear, unambiguous instructions
• Efficiency - how fast and memory-efficient the algorithm is
• Correctness - algorithm produces the right answer for all valid inputs

Why learn algorithms:
• Improve problem-solving skills
• Write more efficient and optimized code
• Pass technical interviews at tech companies
• Understand how software and systems work internally
• Think like a programmer and break down complex problems
• Build better software architecture

Algorithm characteristics:
• Finiteness - must terminate after finite steps
• Definiteness - each step must be clearly defined
• Input - zero or more inputs
• Output - one or more outputs
• Effectiveness - steps must be basic enough to be carried out

Common algorithm types:
• Searching - finding specific data in a collection
• Sorting - organizing data in a particular order
• Graph algorithms - working with networks and relationships
• Dynamic programming - solving complex problems by breaking them down
• Greedy algorithms - making locally optimal choices
• Divide and conquer - breaking problems into smaller subproblems

Algorithm analysis:
• Time complexity - how execution time grows with input size
• Space complexity - how memory usage grows with input size
• Big O notation - mathematical way to describe algorithm efficiency`,
        codeExample: `// Linear Search Algorithm
// Time Complexity: O(n), Space Complexity: O(1)
function linearSearch(array, target) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) {
            return i; // Return index where found
        }
    }
    return -1; // Not found
}

// Example usage
let numbers = [5, 2, 8, 1, 9, 3];
let position = linearSearch(numbers, 8);
console.log("Number 8 found at position:", position); // Output: 2

// Binary Search Algorithm (requires sorted array)
// Time Complexity: O(log n), Space Complexity: O(1)
function binarySearch(sortedArray, target) {
    let left = 0;
    let right = sortedArray.length - 1;
    
    while (left <= right) {
        let middle = Math.floor((left + right) / 2);
        
        if (sortedArray[middle] === target) {
            return middle;
        } else if (sortedArray[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    
    return -1; // Not found
}

// Example usage
let sortedNumbers = [1, 2, 3, 5, 8, 9];
let binaryPosition = binarySearch(sortedNumbers, 5);
console.log("Number 5 found at position:", binaryPosition); // Output: 3

// Bubble Sort Algorithm
// Time Complexity: O(n²), Space Complexity: O(1)
function bubbleSort(array) {
    let n = array.length;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap elements
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is sorted
        if (!swapped) break;
    }
    
    return array;
}

// Example usage
let unsortedArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", unsortedArray);
let sortedArray = bubbleSort([...unsortedArray]); // Use spread to avoid modifying original
console.log("Sorted array:", sortedArray);

// Finding Maximum Element
// Time Complexity: O(n), Space Complexity: O(1)
function findMaximum(array) {
    if (array.length === 0) return null;
    
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}

// Factorial Algorithm (Recursive)
// Time Complexity: O(n), Space Complexity: O(n)
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Factorial Algorithm (Iterative)
// Time Complexity: O(n), Space Complexity: O(1)
function factorialIterative(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log("5! =", factorial(5)); // Output: 120`,
        quiz: [
          {
            id: 'algo-1-q1',
            question: 'What is an algorithm?',
            options: [
              'A programming language',
              'A step-by-step procedure for solving a problem',
              'A type of computer hardware',
              'A software application'
            ],
            correctAnswer: 1,
            explanation: 'An algorithm is a step-by-step procedure or set of instructions for solving a problem or completing a task.'
          },
          {
            id: 'algo-1-q2',
            question: 'What makes a good algorithm?',
            options: [
              'Only correctness',
              'Only efficiency',
              'Correctness, efficiency, and clarity',
              'Only speed'
            ],
            correctAnswer: 2,
            explanation: 'Good algorithms should be correct (produce right answers), efficient (use minimal time and memory), and clear (easy to understand and maintain).'
          },
          {
            id: 'algo-1-q3',
            question: 'What is the time complexity of linear search?',
            options: [
              'O(1)',
              'O(log n)',
              'O(n)',
              'O(n²)'
            ],
            correctAnswer: 2,
            explanation: 'Linear search has O(n) time complexity because in the worst case, it needs to check every element in the array once.'
          }
        ]
      }
    ]
  }
];

// Export utility functions for working with the data
export const getCourseById = (id: string): Course | undefined => {
  return educationalContent.find(course => course.id === id);
};

export const getLessonById = (courseId: string, lessonId: string): Lesson | undefined => {
  const course = getCourseById(courseId);
  return course?.lessons.find(lesson => lesson.id === lessonId);
};

export const getTotalLessons = (): number => {
  return educationalContent.reduce((total, course) => total + course.lessons.length, 0);
};

export const getTotalEstimatedHours = (): number => {
  return educationalContent.reduce((total, course) => total + course.estimatedHours, 0);
};

export const getCoursesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): Course[] => {
  return educationalContent.filter(course => 
    course.lessons.some(lesson => lesson.difficulty === difficulty)
  );
};

export const searchLessons = (query: string): Lesson[] => {
  const results: Lesson[] = [];
  educationalContent.forEach(course => {
    course.lessons.forEach(lesson => {
      if (lesson.title.toLowerCase().includes(query.toLowerCase()) ||
          lesson.content.toLowerCase().includes(query.toLowerCase())) {
        results.push(lesson);
      }
    });
  });
  return results;
};