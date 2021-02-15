/*

    CValidate - Custom Validate

    Add cvalidate-exception="HERE_THE_EXCEPTION". For multiple exceptions,
    split them with a comma
        Exceptions:
            form-exception      >> If input has no form, you can set this exception
            event-exception     >> If you want a custom event, set this as an exception

    For manually JavaScript validate use: CValValidate(element, callback)

    CValValidate($('.example-input'), function(e)
    {
        e.success == true // if element is validated
        e.success == false // if element is not validated / validation error
    });

    To get a custom error code, you can use a parameter in function:

    CValValidate($('.example-input'), function(e)
    {
        console.log(e.error) //e.error returns a custom error code (returns null if success == true)
        e.success == true // if element is validated
        e.success == false // if element is not validated / validation error
    });

    To add a custom class add this to your required input data-cvalidate-class="HERE_THE_CLASSNAME"

*/

$CVal = $; //Initialize jQuery Key >> Change this if collision with another script

function _CValInitialize()
{
    $CVal('input').each(function()
    {
        if(this.hasAttribute('required'))
        {
            $CVal(this).removeAttr('required');
            $CVal(this).data('cval-validate', 'cval');

            if(CValException($CVal(this), 'form-exception') == false)
            {
                CValGetForm($CVal(this)).on('submit', function(e)
                {
                    var event = e;

                    $CVal(this).find('input').each(function()
                    {
                        var customClass = 'cval';
                        if($CVal(this).data('cvalidate-class'))
                        {
                            customClass = $CVal(this).data('cvalidate-class');
                        }

                        $CVal(this).removeClass(customClass);

                        var input = this;

                        CValValidate($CVal(input), function(e)
                        {
                            if(e.success == false)
                            {
                                if(CValException($CVal(input), 'event-exception') == false)
                                {
                                    customClass = 'cval';
                                    if($CVal(input).data('cvalidate-class'))
                                    {
                                        customClass = $CVal(input).data('cvalidate-class');
                                    }

                                    $CVal(input).addClass(customClass);
                                }
                                event.preventDefault();
                            }
                        });
                    });
                });
            }
        }

        if(this.hasAttribute('type'))
        {
            var valType = $CVal(this)[0].type;

            $CVal(this).data('cvalidate-type', valType);

            if(valType == 'email' || valType == 'tel' || valType == 'url')
            {
                $CVal(this).removeAttr('type');
            }
        }
    });
}

function CValGetForm(element)
{
    return $CVal(element).closest("form");
}

function CValException(element, exception)
{
    var exceptionReturn = false;
    
    if (element.data('cvalidate-exception')) 
    {
        element.each(function()
        {
            $CVal(this).data('cvalidate-exception').split(',').each(function()
            {
                if($CVal(this).data('cvalidate-exception').replaceAll(' ', '') == exception)
                {
                    exceptionReturn = true;
                    
                    return false;
                }
            });
        });
    }

    return exceptionReturn;
}

function CValValidate(element, callback)
{
    var validationSuccess = false;
    var valType = element.data('cvalidate-type');
    var errorOutput = '';

    if(valType == 'checkbox')
    {
        if(element[0].checked)
        {
            validationSuccess = true;
        }

        errorOutput = 'CHECKBOX_UNCHECKED';
    }
    else if(valType == 'email')
    {
        var checkMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        validationSuccess = checkMail.test(element.val());

        errorOutput = 'EMAIL_INVALID_FORMAT';

        if(element.val() == '')
        {
            errorOutput = 'TEXT_EMPTY';
        }
    }
    else if(valType == 'file')
    {
        if(element[0].files.length > 0)
        {
            validationSuccess = true;
        }

        errorOutput = 'NO_FILE_SELECTED';
    }
    else if(valType == 'tel')
    {
        var checkTel = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        validationSuccess = checkTel.test(element.val());

        errorOutput = 'TELEPHONE_INVALID_FORMAT';

        if(element.val() == '')
        {
            errorOutput = 'TEXT_EMPTY';
        }
    }
    else if(valType == 'url')
    {
        var checkUrl = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        validationSuccess = checkUrl.test(element.val());

        errorOutput = 'URL_INVALID_FORMAT';

        if(element.val() == '')
        {
            errorOutput = 'TEXT_EMPTY';
        }
    }
    else if(valType == 'image' || valType == 'submit' || valType == 'reset' || valType == 'button')
    {
        validationSuccess = true;
    }
    else
    {
        if(element.val() != '')
        {
            validationSuccess = true;
        }
        
        errorOutput = 'TEXT_EMPTY';
    }

    if(validationSuccess == false)
    {
        callback({ error: errorOutput, success: false });
    }
    else
    {
        callback({ error: null, success: true });
    }
    
    return validationSuccess;
}

_CValInitialize();
