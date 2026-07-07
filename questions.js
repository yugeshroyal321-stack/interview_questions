// ─── Smart Interview Simulator — Question Bank ───
// Types: "mcq" (multiple choice), "short" (2-mark brief answer), "detailed" (explain in depth)

const QUESTION_BANK = [
  // ═══════════════ PYTHON ═══════════════
  // MCQs
  {topic:"python",type:"mcq",difficulty:"easy",q:"What is the output of: print(type([]))?",
    options:["<class 'list'>","<class 'tuple'>","<class 'dict'>","<class 'array'>"],correct:0},
  {topic:"python",type:"mcq",difficulty:"easy",q:"Which keyword is used to define a function in Python?",
    options:["function","func","def","define"],correct:2},
  {topic:"python",type:"mcq",difficulty:"easy",q:"What will be the output of: print(2 ** 3)?",
    options:["6","8","9","5"],correct:1},
  {topic:"python",type:"mcq",difficulty:"medium",q:"What is the output of: print('hello'[1:3])?",
    options:["'he'","'el'","'ell'","'lo'"],correct:1},
  {topic:"python",type:"mcq",difficulty:"medium",q:"Which of these is NOT a valid Python data type?",
    options:["list","dictionary","array","tuple"],correct:2},
  {topic:"python",type:"mcq",difficulty:"medium",q:"What does the 'self' keyword represent in a Python class?",
    options:["The class itself","The current instance of the class","A global variable","A static method"],correct:1},
  {topic:"python",type:"mcq",difficulty:"hard",q:"What is the output of: print([1,2,3] + [4,5])?",
    options:["[5,7,3]","[1,2,3,4,5]","Error","[1,2,3,[4,5]]"],correct:1},
  {topic:"python",type:"mcq",difficulty:"easy",q:"Which method adds an element to the end of a list?",
    options:["add()","push()","append()","insert()"],correct:2},
  {topic:"python",type:"mcq",difficulty:"medium",q:"What is the purpose of __init__ in Python?",
    options:["To delete an object","To initialize object attributes","To import modules","To create a loop"],correct:1},
  {topic:"python",type:"mcq",difficulty:"hard",q:"Which statement about Python's GIL is correct?",
    options:["It makes Python truly multi-threaded","It prevents multiple threads from executing Python bytecode simultaneously","It only affects I/O operations","It was removed in Python 3"],correct:1},

  // Short Answer (2 marks)
  {topic:"python",type:"short",difficulty:"easy",q:"What is the difference between a list and a tuple in Python?",
    kw:["mutable","immutable","list","tuple","change","modify","brackets","parentheses"]},
  {topic:"python",type:"short",difficulty:"easy",q:"What does the 'pass' statement do in Python?",
    kw:["placeholder","nothing","empty","null operation","skip","block"]},
  {topic:"python",type:"short",difficulty:"medium",q:"What is a lambda function in Python?",
    kw:["anonymous","inline","single expression","lambda","function","short"]},
  {topic:"python",type:"short",difficulty:"medium",q:"What is the difference between '==' and 'is' in Python?",
    kw:["equality","identity","value","reference","object","memory","comparison"]},
  {topic:"python",type:"short",difficulty:"hard",q:"What is a Python decorator? Give a one-line definition.",
    kw:["function","wrapper","modify","behavior","@","higher-order","takes function","returns function"]},

  // Detailed
  {topic:"python",type:"detailed",difficulty:"medium",q:"Explain decorators in Python with an example. How would you write a decorator that logs function calls?",
    kw:["wrapper","function","@","closure","higher-order","logging","args","kwargs","functools","wraps"]},
  {topic:"python",type:"detailed",difficulty:"medium",q:"Explain generators in Python. How do they differ from regular functions, and when would you use them?",
    kw:["yield","lazy","memory","iterator","next","state","generator","iterable","efficient","StopIteration"]},
  {topic:"python",type:"detailed",difficulty:"hard",q:"How does Python's memory management work? Explain reference counting and garbage collection.",
    kw:["reference counting","garbage collection","gc","cycle","memory","allocation","generational","weak reference"]},

  // ═══════════════ JAVASCRIPT ═══════════════
  // MCQs
  {topic:"javascript",type:"mcq",difficulty:"easy",q:"Which company developed JavaScript?",
    options:["Microsoft","Google","Netscape","Apple"],correct:2},
  {topic:"javascript",type:"mcq",difficulty:"easy",q:"What is the output of: typeof null?",
    options:["'null'","'undefined'","'object'","'boolean'"],correct:2},
  {topic:"javascript",type:"mcq",difficulty:"easy",q:"Which method converts a JSON string to a JavaScript object?",
    options:["JSON.stringify()","JSON.parse()","JSON.convert()","JSON.toObject()"],correct:1},
  {topic:"javascript",type:"mcq",difficulty:"medium",q:"What is the output of: console.log(0.1 + 0.2 === 0.3)?",
    options:["true","false","undefined","Error"],correct:1},
  {topic:"javascript",type:"mcq",difficulty:"medium",q:"Which keyword creates a block-scoped variable in JavaScript?",
    options:["var","let","both var and let","None of the above"],correct:1},
  {topic:"javascript",type:"mcq",difficulty:"hard",q:"What does 'use strict' do in JavaScript?",
    options:["Makes code run faster","Enables strict type checking","Prevents undeclared variables and unsafe actions","Enables ES6 features"],correct:2},

  // Short Answer
  {topic:"javascript",type:"short",difficulty:"easy",q:"What is the difference between let, const, and var?",
    kw:["block scope","function scope","hoisting","reassignment","const","let","var"]},
  {topic:"javascript",type:"short",difficulty:"medium",q:"What is a closure in JavaScript?",
    kw:["function","scope","lexical","variable","inner","outer","enclosing","access"]},
  {topic:"javascript",type:"short",difficulty:"medium",q:"What is the difference between == and === in JavaScript?",
    kw:["type coercion","strict","loose","equality","type","value","comparison"]},

  // Detailed
  {topic:"javascript",type:"detailed",difficulty:"medium",q:"Explain the event loop in JavaScript. How does it handle asynchronous operations?",
    kw:["event loop","call stack","callback queue","microtask","macrotask","single-threaded","non-blocking","Web API"]},
  {topic:"javascript",type:"detailed",difficulty:"medium",q:"Explain Promises and async/await in JavaScript. How do they improve asynchronous code?",
    kw:["promise","async","await","then","catch","resolve","reject","asynchronous","callback","pending","fulfilled"]},
  {topic:"javascript",type:"detailed",difficulty:"hard",q:"How would you implement debounce and throttle functions from scratch? Explain the difference.",
    kw:["debounce","throttle","timer","setTimeout","clearTimeout","delay","performance","rate limiting","closure"]},

  // ═══════════════ MACHINE LEARNING ═══════════════
  // MCQs
  {topic:"machine learning",type:"mcq",difficulty:"easy",q:"Which type of learning uses labeled data?",
    options:["Unsupervised learning","Reinforcement learning","Supervised learning","Semi-supervised learning"],correct:2},
  {topic:"machine learning",type:"mcq",difficulty:"easy",q:"Which algorithm is used for classification?",
    options:["Linear Regression","Logistic Regression","K-Means","PCA"],correct:1},
  {topic:"machine learning",type:"mcq",difficulty:"medium",q:"What does the 'F1 Score' represent?",
    options:["Mean of accuracy and recall","Harmonic mean of precision and recall","Sum of precision and recall","Product of precision and recall"],correct:1},
  {topic:"machine learning",type:"mcq",difficulty:"medium",q:"Which technique is used to prevent overfitting?",
    options:["Increasing model complexity","Removing validation data","Regularization (L1/L2)","Using more features"],correct:2},
  {topic:"machine learning",type:"mcq",difficulty:"hard",q:"What is the 'curse of dimensionality'?",
    options:["Too few features","Data becomes sparse as dimensions increase","Too much training data","Models train too fast"],correct:1},
  {topic:"machine learning",type:"mcq",difficulty:"easy",q:"What is the purpose of a train-test split?",
    options:["To speed up training","To evaluate model performance on unseen data","To increase accuracy","To reduce dataset size"],correct:1},

  // Short Answer
  {topic:"machine learning",type:"short",difficulty:"easy",q:"What is overfitting in machine learning?",
    kw:["model","training","performs well","generalizes poorly","new data","memorize","complex","noise"]},
  {topic:"machine learning",type:"short",difficulty:"medium",q:"What is the difference between precision and recall?",
    kw:["precision","recall","true positive","false positive","false negative","relevant","retrieved"]},
  {topic:"machine learning",type:"short",difficulty:"medium",q:"What is cross-validation?",
    kw:["k-fold","train","test","split","evaluate","generalization","multiple","rotation"]},

  // Detailed
  {topic:"machine learning",type:"detailed",difficulty:"medium",q:"Explain the bias-variance tradeoff. How do you find the right balance?",
    kw:["bias","variance","tradeoff","underfitting","overfitting","complexity","error","generalization","model"]},
  {topic:"machine learning",type:"detailed",difficulty:"medium",q:"How does gradient descent work? Compare batch, mini-batch, and stochastic versions.",
    kw:["gradient","descent","learning rate","batch","stochastic","mini-batch","optimization","convergence","loss","update"]},
  {topic:"machine learning",type:"detailed",difficulty:"hard",q:"Explain how attention mechanisms work in transformers.",
    kw:["attention","transformer","self-attention","query","key","value","softmax","multi-head","positional encoding"]},

  // ═══════════════ DSA ═══════════════
  // MCQs
  {topic:"dsa",type:"mcq",difficulty:"easy",q:"What is the time complexity of accessing an element in an array by index?",
    options:["O(n)","O(log n)","O(1)","O(n²)"],correct:2},
  {topic:"dsa",type:"mcq",difficulty:"easy",q:"Which data structure uses LIFO (Last In, First Out)?",
    options:["Queue","Stack","Array","Linked List"],correct:1},
  {topic:"dsa",type:"mcq",difficulty:"medium",q:"What is the worst-case time complexity of QuickSort?",
    options:["O(n log n)","O(n)","O(n²)","O(log n)"],correct:2},
  {topic:"dsa",type:"mcq",difficulty:"medium",q:"Which data structure is best for implementing a priority queue?",
    options:["Array","Stack","Heap","Linked List"],correct:2},
  {topic:"dsa",type:"mcq",difficulty:"hard",q:"What is the space complexity of DFS on a graph with V vertices?",
    options:["O(1)","O(V)","O(V²)","O(E)"],correct:1},

  // Short Answer
  {topic:"dsa",type:"short",difficulty:"easy",q:"What is the difference between an array and a linked list?",
    kw:["contiguous","pointer","access","insertion","deletion","index","O(1)","O(n)","memory","dynamic"]},
  {topic:"dsa",type:"short",difficulty:"medium",q:"What is a hash collision and how is it handled?",
    kw:["hash","collision","chaining","open addressing","same key","bucket","probing","linked list"]},
  {topic:"dsa",type:"short",difficulty:"easy",q:"Explain Big O notation in simple terms.",
    kw:["time complexity","worst case","performance","growth","input size","algorithm","efficiency"]},

  // Detailed
  {topic:"dsa",type:"detailed",difficulty:"medium",q:"Explain the differences between BFS and DFS. When would you use each?",
    kw:["BFS","DFS","breadth-first","depth-first","queue","stack","traversal","graph","tree","shortest path","level"]},
  {topic:"dsa",type:"detailed",difficulty:"hard",q:"Explain dynamic programming. How do you identify DP problems and solve them?",
    kw:["dynamic programming","overlapping subproblems","optimal substructure","memoization","tabulation","recursion","state","transition","bottom-up","top-down"]},

  // ═══════════════ HTML/CSS ═══════════════
  // MCQs
  {topic:"html/css",type:"mcq",difficulty:"easy",q:"Which HTML tag is used to create a hyperlink?",
    options:["<link>","<a>","<href>","<url>"],correct:1},
  {topic:"html/css",type:"mcq",difficulty:"easy",q:"What does CSS stand for?",
    options:["Computer Style Sheets","Creative Style System","Cascading Style Sheets","Colorful Style Sheets"],correct:2},
  {topic:"html/css",type:"mcq",difficulty:"medium",q:"Which CSS property is used to change text color?",
    options:["text-color","font-color","color","foreground-color"],correct:2},
  {topic:"html/css",type:"mcq",difficulty:"medium",q:"What is the default value of the 'position' property in CSS?",
    options:["relative","absolute","fixed","static"],correct:3},
  {topic:"html/css",type:"mcq",difficulty:"easy",q:"Which CSS display value hides an element and removes it from flow?",
    options:["visibility: hidden","display: none","opacity: 0","display: hidden"],correct:1},

  // Short Answer
  {topic:"html/css",type:"short",difficulty:"easy",q:"What is the CSS Box Model?",
    kw:["content","padding","border","margin","width","height","box-sizing","border-box"]},
  {topic:"html/css",type:"short",difficulty:"medium",q:"What is the difference between Flexbox and Grid?",
    kw:["flexbox","grid","one-dimensional","two-dimensional","row","column","layout","responsive"]},
  {topic:"html/css",type:"short",difficulty:"easy",q:"What are semantic HTML elements? Give two examples.",
    kw:["semantic","meaning","header","nav","main","article","section","footer","accessibility","SEO"]},

  // Detailed
  {topic:"html/css",type:"detailed",difficulty:"medium",q:"Explain CSS specificity. How does the browser decide which styles to apply?",
    kw:["specificity","inline","id","class","element","cascade","important","selector","weight","override"]},

  // ═══════════════ REACT ═══════════════
  // MCQs
  {topic:"react",type:"mcq",difficulty:"easy",q:"What is React primarily used for?",
    options:["Backend development","Database management","Building user interfaces","System administration"],correct:2},
  {topic:"react",type:"mcq",difficulty:"easy",q:"What is JSX?",
    options:["A database query","JavaScript XML — syntax extension for JS","A CSS framework","A build tool"],correct:1},
  {topic:"react",type:"mcq",difficulty:"medium",q:"Which hook is used to manage state in functional components?",
    options:["useEffect","useContext","useState","useReducer"],correct:2},
  {topic:"react",type:"mcq",difficulty:"medium",q:"What triggers a re-render in React?",
    options:["Only prop changes","Only state changes","State or prop changes","DOM mutations"],correct:2},
  {topic:"react",type:"mcq",difficulty:"hard",q:"What is the purpose of React.memo()?",
    options:["To store data permanently","To memoize component and prevent unnecessary re-renders","To create memos/notes","To manage routing"],correct:1},

  // Short Answer
  {topic:"react",type:"short",difficulty:"easy",q:"What is the Virtual DOM in React?",
    kw:["virtual","DOM","copy","lightweight","diffing","reconciliation","performance","update","real DOM"]},
  {topic:"react",type:"short",difficulty:"medium",q:"What is prop drilling and how do you avoid it?",
    kw:["prop drilling","context","Context API","state management","passing","deeply nested","Redux","provider"]},

  // Detailed
  {topic:"react",type:"detailed",difficulty:"medium",q:"Explain React hooks: useState and useEffect. Give examples of when to use each.",
    kw:["useState","useEffect","hook","state","side effect","lifecycle","cleanup","dependency","functional","render"]},

  // ═══════════════ SQL ═══════════════
  // MCQs
  {topic:"sql",type:"mcq",difficulty:"easy",q:"Which SQL statement is used to retrieve data from a database?",
    options:["GET","FETCH","SELECT","RETRIEVE"],correct:2},
  {topic:"sql",type:"mcq",difficulty:"easy",q:"Which clause is used to filter rows in SQL?",
    options:["HAVING","WHERE","FILTER","WHEN"],correct:1},
  {topic:"sql",type:"mcq",difficulty:"medium",q:"What is a PRIMARY KEY?",
    options:["A foreign reference","A unique identifier for each row","An index","A constraint that allows NULLs"],correct:1},
  {topic:"sql",type:"mcq",difficulty:"medium",q:"Which JOIN returns all rows from the left table?",
    options:["INNER JOIN","RIGHT JOIN","LEFT JOIN","CROSS JOIN"],correct:2},
  {topic:"sql",type:"mcq",difficulty:"hard",q:"Which normal form eliminates transitive dependencies?",
    options:["1NF","2NF","3NF","BCNF"],correct:2},

  // Short Answer
  {topic:"sql",type:"short",difficulty:"easy",q:"What is the difference between WHERE and HAVING in SQL?",
    kw:["WHERE","HAVING","filter","aggregate","GROUP BY","condition","rows","groups","before","after"]},
  {topic:"sql",type:"short",difficulty:"medium",q:"What is an index in SQL and why is it used?",
    kw:["index","performance","query","search","speed","B-tree","lookup","trade-off","faster"]},

  // Detailed
  {topic:"sql",type:"detailed",difficulty:"medium",q:"Explain normalization (1NF, 2NF, 3NF) with examples.",
    kw:["normalization","1NF","2NF","3NF","redundancy","dependency","functional","primary key","decomposition","anomaly"]},

  // ═══════════════ FLASK ═══════════════
  // MCQs
  {topic:"flask",type:"mcq",difficulty:"easy",q:"Flask is a ___ framework for Python.",
    options:["Full-stack","Micro","Desktop","Mobile"],correct:1},
  {topic:"flask",type:"mcq",difficulty:"medium",q:"Which decorator is used to define a route in Flask?",
    options:["@app.path()","@app.route()","@app.url()","@app.endpoint()"],correct:1},
  {topic:"flask",type:"mcq",difficulty:"medium",q:"What template engine does Flask use by default?",
    options:["Mustache","EJS","Jinja2","Handlebars"],correct:2},

  // Short Answer
  {topic:"flask",type:"short",difficulty:"easy",q:"What is Flask and how does it differ from Django?",
    kw:["Flask","micro","Django","lightweight","routing","template","minimal","extensions","full-stack","batteries"]},
  {topic:"flask",type:"short",difficulty:"medium",q:"What is a Flask Blueprint?",
    kw:["blueprint","modular","organize","routes","large application","register","component","separate"]},

  // Detailed
  {topic:"flask",type:"detailed",difficulty:"hard",q:"How would you design a RESTful API with Flask including authentication and error handling?",
    kw:["REST","API","JWT","authentication","blueprint","error handler","status code","Flask-RESTful","middleware","token"]},

  // ═══════════════ GIT ═══════════════
  // MCQs
  {topic:"git",type:"mcq",difficulty:"easy",q:"Which command creates a new Git repository?",
    options:["git start","git init","git create","git new"],correct:1},
  {topic:"git",type:"mcq",difficulty:"easy",q:"Which command stages all changes for commit?",
    options:["git commit -a","git push .","git add .","git stage all"],correct:2},
  {topic:"git",type:"mcq",difficulty:"medium",q:"What does 'git pull' do?",
    options:["Pushes local changes","Fetches and merges remote changes","Deletes a branch","Creates a tag"],correct:1},
  {topic:"git",type:"mcq",difficulty:"medium",q:"What is a merge conflict?",
    options:["A broken repository","When two branches modify the same lines differently","A failed push","A deleted branch"],correct:1},

  // Short Answer
  {topic:"git",type:"short",difficulty:"easy",q:"What is the difference between git merge and git rebase?",
    kw:["merge","rebase","history","linear","commit","branch","combine","fast-forward","clean"]},
  {topic:"git",type:"short",difficulty:"medium",q:"What is a Git branch and why is it useful?",
    kw:["branch","parallel","development","feature","isolate","main","merge","separate","independent"]},

  // ═══════════════ NODE.JS ═══════════════
  // MCQs
  {topic:"node.js",type:"mcq",difficulty:"easy",q:"Node.js is a runtime built on which engine?",
    options:["SpiderMonkey","V8","Chakra","JavaScriptCore"],correct:1},
  {topic:"node.js",type:"mcq",difficulty:"medium",q:"Which module is used to create an HTTP server in Node.js?",
    options:["fs","path","http","url"],correct:2},
  {topic:"node.js",type:"mcq",difficulty:"medium",q:"What is npm?",
    options:["Node Package Manager","New Programming Module","Node Process Manager","Network Protocol Module"],correct:0},

  // Short Answer
  {topic:"node.js",type:"short",difficulty:"easy",q:"What is Node.js and why is it used for backend development?",
    kw:["Node.js","V8","JavaScript","server","non-blocking","event-driven","npm","runtime","scalable"]},
  {topic:"node.js",type:"short",difficulty:"medium",q:"What is middleware in Express.js?",
    kw:["middleware","Express","request","response","next","chain","function","process","between"]},

  // ═══════════════ JAVA ═══════════════
  // MCQs
  {topic:"java",type:"mcq",difficulty:"easy",q:"Java is a ___ language.",
    options:["Interpreted only","Compiled only","Both compiled and interpreted","Neither"],correct:2},
  {topic:"java",type:"mcq",difficulty:"easy",q:"Which keyword is used to inherit a class in Java?",
    options:["inherits","implements","extends","super"],correct:2},
  {topic:"java",type:"mcq",difficulty:"medium",q:"What is the difference between an interface and an abstract class?",
    options:["No difference","Interface has no constructors, abstract classes can","Interface can have constructors","Abstract classes support multiple inheritance"],correct:1},

  // Short Answer
  {topic:"java",type:"short",difficulty:"easy",q:"What are the four pillars of OOP?",
    kw:["encapsulation","inheritance","polymorphism","abstraction","class","object"]},
  {topic:"java",type:"short",difficulty:"medium",q:"What is the difference between ArrayList and LinkedList in Java?",
    kw:["ArrayList","LinkedList","array","pointer","random access","insertion","performance","dynamic"]},

  // ═══════════════ NLP ═══════════════
  // MCQs
  {topic:"nlp",type:"mcq",difficulty:"easy",q:"What does NLP stand for?",
    options:["New Language Processing","Natural Language Programming","Natural Language Processing","Neural Language Processing"],correct:2},
  {topic:"nlp",type:"mcq",difficulty:"medium",q:"Which technique converts words to numerical vectors?",
    options:["Tokenization","Word Embedding","Stemming","Lemmatization"],correct:1},
  {topic:"nlp",type:"mcq",difficulty:"medium",q:"What is tokenization in NLP?",
    options:["Encrypting text","Splitting text into words/tokens","Translating text","Summarizing text"],correct:1},

  // Short Answer
  {topic:"nlp",type:"short",difficulty:"easy",q:"What is NLP? Name two real-world applications.",
    kw:["natural language processing","text","chatbot","sentiment","translation","search","voice assistant","classification"]},
  {topic:"nlp",type:"short",difficulty:"medium",q:"What is the difference between stemming and lemmatization?",
    kw:["stemming","lemmatization","root","dictionary","word form","crude","accurate","suffix"]},

  // ═══════════════ DEEP LEARNING ═══════════════
  // MCQs
  {topic:"deep learning",type:"mcq",difficulty:"easy",q:"What is the basic unit of a neural network?",
    options:["Node","Neuron","Layer","Weight"],correct:1},
  {topic:"deep learning",type:"mcq",difficulty:"medium",q:"Which activation function is most commonly used in hidden layers of deep networks?",
    options:["Sigmoid","Tanh","ReLU","Softmax"],correct:2},
  {topic:"deep learning",type:"mcq",difficulty:"medium",q:"CNNs are primarily used for what type of data?",
    options:["Tabular data","Image/spatial data","Time series only","Text only"],correct:1},
  {topic:"deep learning",type:"mcq",difficulty:"hard",q:"What problem does batch normalization help solve?",
    options:["Overfitting only","Internal covariate shift","Data augmentation","Feature selection"],correct:1},

  // Short Answer
  {topic:"deep learning",type:"short",difficulty:"easy",q:"What is a neural network? Explain briefly.",
    kw:["neural network","neuron","layer","input","output","hidden","weight","bias","activation","learns"]},
  {topic:"deep learning",type:"short",difficulty:"medium",q:"What is the vanishing gradient problem?",
    kw:["vanishing","gradient","small","deep","layers","sigmoid","training","slow","backpropagation","weights"]},

  // Detailed
  {topic:"deep learning",type:"detailed",difficulty:"medium",q:"Explain the difference between CNNs and RNNs. When would you use each?",
    kw:["CNN","RNN","convolutional","recurrent","image","sequence","filter","kernel","LSTM","GRU","time series","spatial"]},

  // ═══════════════ BEHAVIORAL / GENERAL ═══════════════
  {topic:"general",type:"short",difficulty:"easy",q:"Tell me about a challenging project you worked on recently.",
    kw:["project","challenge","solution","technology","learned","team","problem","outcome","result","approach"]},
  {topic:"general",type:"short",difficulty:"easy",q:"Why do you want to work as a software developer?",
    kw:["passion","technology","problem solving","build","create","impact","career","grow","learn","enjoy"]},
  {topic:"general",type:"detailed",difficulty:"medium",q:"Describe a situation where you had to debug a difficult issue. What was your approach?",
    kw:["debug","issue","logs","reproduce","isolate","root cause","fix","testing","systematic","solution","steps"]},
];

// Skill keywords mapped to detection patterns
const SKILL_DETECTION = {
  "python":["python","django","flask","fastapi","pandas","numpy","scipy","matplotlib","pip"],
  "javascript":["javascript","js","es6","typescript","node","npm","webpack"],
  "react":["react","redux","next.js","nextjs","jsx","component","hooks","gatsby","vite"],
  "html/css":["html","css","sass","scss","tailwind","bootstrap","responsive","flexbox","grid","frontend"],
  "machine learning":["machine learning","ml","scikit","sklearn","classification","regression","neural","model","training","prediction"],
  "deep learning":["deep learning","tensorflow","keras","pytorch","cnn","rnn","lstm","neural network","transformer"],
  "nlp":["nlp","natural language","spacy","nltk","text","tokenization","bert","gpt","language model","sentiment"],
  "dsa":["data structure","algorithm","dsa","array","linked list","tree","graph","sorting","searching","dynamic programming","leetcode"],
  "sql":["sql","mysql","postgresql","database","query","nosql","mongodb","sqlite","orm"],
  "flask":["flask","jinja","werkzeug","blueprint","flask-sqlalchemy"],
  "node.js":["node.js","nodejs","express","npm","api","server","backend","rest","middleware"],
  "java":["java","spring","jvm","maven","oop","hibernate","junit"],
  "git":["git","github","version control","repository","branch","merge","ci/cd"]
};

const DOMAIN_DETECTION = [
  {domain:"AI/ML",keywords:["ai","ml","machine learning","deep learning","nlp","natural language","tensorflow","keras","pytorch","neural","model","prediction","data science"]},
  {domain:"Full Stack",keywords:["full stack","fullstack","frontend","backend","react","node","express","api","database","mern","mean"]},
  {domain:"Frontend",keywords:["frontend","front-end","react","vue","angular","html","css","ui","ux","responsive","component"]},
  {domain:"Backend",keywords:["backend","back-end","server","api","database","node","express","django","flask","spring","rest"]},
  {domain:"DSA/Algorithms",keywords:["dsa","algorithm","data structure","competitive programming","leetcode","codeforces","sorting","graph"]}
];
