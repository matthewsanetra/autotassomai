# autotassomai
A simple [Tampermonkey](https://tampermonkey.net/) script that uses an oversight in the quiz website my school sets homeworks on.

# This has been patched in a redesign of their interface
_In the event that anyone modifies this to work, I am not liable for any damages caused to the users, or the website. I have released this once this has been patched and it is available under the [GNU GPLv3 License](LICENSE), which enforces that I can not be held accountable by any means_

## How this used to work
When they request a quiz from their `/quiz/` endpoint, in the array of questions, answer0 was always the correct one.<br>
They scrambled the choices client-side... _\*Sigh\*_

This script intercepted their AJAX request by hooking the javascript function (with [xhook](https://github.com/jpillora/xhook)) and passing the JSON to a function that finds the correct answer in the HTML and clicks it. It skips questions that use MathJAX by simply reloading.

Sorry for the spaghetti code as I haven't used JavaScript in a long time and I only had to since I couldn't get a proxy working to use Selenium Webdriver.