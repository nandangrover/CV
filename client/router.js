// Application div
const appDiv = "app";
// Both set of different routes and template generation functions
let routes = {};
let templates = {};
// Register a template (this is to mimic a template engine)
let template = (name, templateFunction) => {
  return templates[name] = templateFunction;
};

// Register the templates.
template('defaultCV', () => {
  scriptLoader('core/defaultCV.js');
});

// Register the templates.
template('editorResume', () => {
  scriptLoader('core/resumeEditor.js');
});
// Define the routes. Each route is described with a route path & a template to render
// when entering that path. A template can be a string (file name), or a function that
// will directly create the DOM objects.
let route = (path, template) => {
  if (typeof template == "function") {
    return routes[path] = template;
  }
  else if (typeof template == "string") {
    return routes[path] = templates[template];
  }
  else {
    return;
  }
};

// Define the mappings route->template.
route('/', 'defaultCV');
route('/secretEditor', 'editorResume');


// Give the correspondent route (template) or fail
let resolveRoute = (route) => {
  try {
   return routes[route];
  } catch (error) {
      throw new Error("The route is not defined");
  }
};

const scriptLoader = path => {
  const script = document.createElement('script');
  script.setAttribute('type', 'module');
  script.onload = () => {
    console.log('Script Loaded')
  };
  script.src = path;
  document.head.appendChild(script)
};
// The actual router, get the current URL and generate the corresponding template
let router = (evt) => {
  const url = window.location.pathname || "/";
  const routeResolved = resolveRoute(url);
  
  routeResolved();
};
// For first load or when routes are changed in browser url box.
window.addEventListener('load', router);
window.addEventListener('hashchange', router);