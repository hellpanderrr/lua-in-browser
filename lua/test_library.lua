test_package = require("test_package.test_subfolder")
test_utils = require "test_utils"
local export = {}
function export.hello(input)
    value_from_utils = test_utils.value()
    greeting_from_subfolder = test_package.hello()
    return ( input.. "hello from library ".. tostring(value_from_utils) .. greeting_from_subfolder)
end
return export