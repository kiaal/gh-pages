/* ----------------------------------
   DeviceDriverKeyboard.js

   Requires deviceDriver.js

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

DeviceDriverKeyboard.prototype = new DeviceDriver;  // "Inherit" from prototype DeviceDriver in deviceDriver.js.

function DeviceDriverKeyboard()                     // Add or override specific attributes and method pointers.
{
    // "subclass"-specific attributes.
    // this.buffer = "";    // TODO: Do we need this?
    // Override the base method pointers.
    this.driverEntry = krnKbdDriverEntry;
    this.isr = krnKbdDispatchKeyPress;
    // "Constructor" code.
}

function krnKbdDriverEntry()
{
    // Initialization routine for this, the kernel-mode Keyboard Device Driver.
    this.status = "loaded";
    // More?
}

function krnKbdDispatchKeyPress(params)
{
    // Parse the params.    TODO: Check that they are valid and osTrapError if not.
    var keyCode = params[0];
    var isShifted = params[1];
    krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
    var chr = "";
    // Check to see if we even want to deal with the key that was pressed.
    if ( ((keyCode >= 65) && (keyCode <= 90)) ||   // A..Z
         ((keyCode >= 97) && (keyCode <= 123)) )   // a..z
    {
        // Determine the character we want to display.
        // Assume it's lowercase...
        chr = String.fromCharCode(keyCode + 32);
        // ... then check the shift key and re-adjust if necessary.
        if (isShifted)
        {
            chr = String.fromCharCode(keyCode);
        }
        // TODO: Check for caps-lock and handle as shifted if so.
        _KernelInputQueue.enqueue(chr);
    }
    else if (keyCode == 38)
    {
    	chr = String.fromCharCode(keyCode);
		_KernelInputQueue.enqueue(chr);
    }
	//backspace
	else if (keyCode == 8)
	{
		chr = String.fromCharCode(keyCode);
		_KernelInputQueue.enqueue(chr);
	}
	//for . and >
	else if (keyCode==190)
	{
		chr = String.fromCharCode(44);

		if (isShifted)
		{
		chr = String.fromCharCode(62);
		}
		_KernelInputQueue.enqueue(chr);
	}
	else if (keyCode==191)
		{
			chr = String.fromCharCode(47);

			if (isShifted)
			{
			chr = String.fromCharCode(63);
			}
			_KernelInputQueue.enqueue(chr);
	}
	else if (keyCode==59)
			{
				chr = String.fromCharCode(59);

				if (isShifted)
				{
				chr = String.fromCharCode(58);
				}
				_KernelInputQueue.enqueue(chr);
	}
	else if (keyCode==222)
			{
				chr = String.fromCharCode(39);

				if (isShifted)
				{
				chr = String.fromCharCode(34);
				}
				_KernelInputQueue.enqueue(chr);
	}
	else if (keyCode==192)
				{
					chr = String.fromCharCode(96);

					if (isShifted)
					{
					chr = String.fromCharCode(126);
					}
					_KernelInputQueue.enqueue(chr);
	}
	else if (keyCode==188)
	{
		chr = String.fromCharCode(keyCode-144);
		if (isShifted)
		{
				chr = String.fromCharCode(keyCode-128);
		}
		_KernelInputQueue.enqueue(chr);
	}
	else if (keyCode==16){
		//do a dance
	}
    else if ( ((keyCode >= 48) && (keyCode <= 57)) ||   // digits
               (keyCode == 32)                     ||   // space
               (keyCode == 13) )                        // enter
    {

		chr = String.fromCharCode(keyCode);

		//for ! # $ %
		if ((isShifted) && ((keyCode==49)||(keyCode==51)||(keyCode==52)||(keyCode==53)))
		{
			chr = String.fromCharCode(keyCode-16);
		}
		//for @
		if ((isShifted) && (keyCode==50))
		{
			chr = String.fromCharCode(keyCode+14);
		}

		//for ^
		if ((isShifted) && (keyCode==54))
		{
			chr = String.fromCharCode(keyCode+40);
		}
		//for &
		if ((isShifted) && (keyCode==55))
		{
			chr = String.fromCharCode(keyCode-17);
		}
		//for *
		if ((isShifted) && (keyCode==56))
		{
			chr = String.fromCharCode(keyCode-14);
		}
		// (
		if ((isShifted) && (keyCode==57))
		{
			chr = String.fromCharCode(keyCode-17);
		}
		// )
		if ((isShifted) && (keyCode==48))
		{
			chr = String.fromCharCode(keyCode-7);
		}
		_KernelInputQueue.enqueue(chr);
    }
    else{
		krnTrapError();
	}
}
