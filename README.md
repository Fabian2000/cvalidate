# cvalidate
A JavaScript plugin that can be used completely without any other JavaScript code, but also can get extended by own code

##jQuery is required (tested with jQuery-3.5.1)

##The default requirement attribute alerts are annoying?
cvalidate is a Custom Validator that valdates all your inputs and it automatically replaces the require attribute.

##How to use it with only HTML?
```html
<form>
  <input class="checkbox" required type="checkbox"><br><br>
  <input class="email" required type="email"><br><br>
  <input class="tel" required type="tel"><br><br>
  <input class="url" required type="url"><br><br>
  <button>Send</button>
</form>

<script src="jQuery3.5.1.min.js"></script>
<script src="cvalidate.js"></script>
```

##How to use custom classes instead of the default cval class?
Add the data attribue data-cvalidate-class="HERE_YOUR_CLASS_NAME"

##I get problems because it searches a form-tag, but I want just the input without form
You can set exceptions to fix problems like that ... Just add the exceptions per data attribute.
Multiple exceptions can be written with a comma.
This Exceptions exist:
  - form-exception      >> If input has no form, you can set this exception
  - event-exception     >> If you want a custom event, set this as an exception

##How can I build the validator into my own script?
If some features are missing, you can build your own script. To do that, you can use different functions:

```js
CValException(element, exception); // This checks, if an exception is given or not. It returns true or false

CValGetForm(element); // This searches the closest form to an input element

CValValidate($('.example-input'), function(e)
{
    console.log(e.error) //e.error returns a custom error code (returns null if success == true)
    e.success == true // if element is validated
    e.success == false // if element is not validated / validation error
});
```

##Which error codes could get returned by CValValidate(...)?
Error Codes:
- TEXT_EMPTY
- CHECKBOX_UNCHECKED
- EMAIL_INVALID_FORMAT
- NO_FILE_SELECTED
- TELEPHONE_INVALID_FORMAT
- URL_INVALID_FORMAT
- null

If you find a problem or you have any question, feel free to contact me:
Contact only on Discord: Fabian#3563 (Don't message me for fun!)
