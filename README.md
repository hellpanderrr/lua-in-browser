# lua-in-browser
# How to use Lua in browser with wasmoon

## Quick way (using my pre-built wasmoon_min.js)

**TL;DR**: Clone the repo, put your lua code in `init` function inside `html/main.html` and you are good to go. All `test*` files and folders are for demonstration purproses only and can be removed.
    
Minimal version of `wasmoon.js` is built from the following code:

```js
const {LuaFactory} = require('wasmoon')
const factory = new LuaFactory()
export {factory}
```
It loads factory into a global variable `lb`. 

Having `wasmoon.js` loaded as a script in HTML, you then need to create Lua engine

```js 
const factory = await lb.factory
const lua = await factory.createEngine()
```
and you can run Lua using `doString` method:

```js
 await lua.doString('return ("hello from lua")')
 ```


`lua.global.get` and `lua.global.set` allow two-way binding of values and functions between Lua and JS:

```js
>>> await lua.doString(`function sum(x,y) return x+y end`)
>>> sum = lua.global.get("sum")
>>> sum(1,5) 
6
```

```js
>>> function multiply(x,y) {return x*y}
>>> lua.global.set('multiply', multiply)
>>> await lua.doString(`return multiply(2,8)`)
16
```

To use an external file, you need to mount it:

```js
factory.mountFile(path, content)
```

Using fetch, we can transform it into an AJAX request:

```js
lua.global.set('fetch', (url) => fetch(url));

async function mountFile(file_path, lua_path) {
    const fileContent = await fetch(file_path).then(data => data.text())
    await factory.mountFile(lua_path, fileContent)
}
```

Now we can `require` files from our server:

```js 
await mountFile('../any/long/path/to/file.lua', 'test.lua')
await lua.doString('require("test")')
```

So as to not needing to mount all the modules in advance we can replace the default `require` function (note `fetch` that we set earlier):

```lua
function require(path)
  print('required '..path,'from:', debug.getinfo(2).name)
  local resp = fetch(string.format('/lua/%s.lua',path)):await()
  local text = resp:text():await()
  local module = load(text)()
  print('loaded '..path)
  return module
end
```
An extended version of this function is located inside `html\main.html`. It is cached (with `memoize`) and can handle dot-separated package paths, e.g. `require ("package.subpackage.module")`



---

## Build your own wasmoon.js with webpack


1. Install node
2. `cd build`
3. `npm install wasmoon`
4. Set up paths in `webpack.config.js`
5. `npx webpack`

Now you should have your `wasmoon.js` in the output folder

    
    
