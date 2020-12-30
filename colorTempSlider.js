<!--div ng-bind-html="msg.payload"></div-->
<script>
    var theScope1 = scope;
    var storedStateColor1 = getLastColor1(theScope1);
    var colorPicker1;
    
    /**
     * initialize iro.js component
     */
    function initIroJs1()
    {
        //wait for iro library to be loaded
        if(typeof(iro) === 'object')
        {
            //and initialize component
            colorPicker1 = new iro.ColorPicker(
                "#color-picker-container1",
                {
                    width: 470,
                    color: "kelvinToRgb("+fixColorString1(storedStateColor1)+")",
                    borderWidth: 1,
                    borderColor: "#fff",
                    layoutDirection: 'vertical',
                    /*
                    handleSvg: '#handle',
                    handleProps: {x: -8, y: -20},
                    */
                    layout: [ {
                        component: iro.ui.Slider,
                        options: {
                            sliderType: 'kelvin',
                            // sliderShape: 'circle',
                            sliderSize: 20,
                            minTemperature:4050,
                            maxTemperature:9000,
                        }
                    },]                    
                }
            );
            
            colorPicker1.on('input:end', onColorChange1);
        }
        else
        {
            setTimeout(function() { initIroJs1(); }, 250);
        }
    }
    
    function onColorChange1()
    {
        theScope1.send({ payload: colorPicker1.color.kelvin});
    }
    
    /**
     * update colorPicker state if msg.payload is received
     * 
     * @param {string} payload - hex color string
     */
    function messageReceived1(payload)
    {
        if(typeof(colorPicker1) === 'object')
        {
            colorPicker1.color.kelvin = fixColorString1(payload);
        }
    }
    
    /**
     * prefix hex color strings with # if not present
     * 
     * @param {string} color - hex color string
     */
    function fixColorString1(color)
    {
        //return color.startsWith('#') ? color : '#' + color;
        return color;
    }
    
    /**
     * checks for stored msg object and returns the last set color, if present
     * 
     * @param {object} theScope
     */
    function getLastColor1(theScope)
    {
        //check if stored state has a msg object
        if(typeof(theScope.msg) === 'object')
        {
            //check if payload is a hex color string
            if(typeof(theScope.msg.payload) === 'string' &&
               theScope.msg.payload.match(/^#?[A-Fa-f0-9]{6}$/))
            {
                return theScope.msg.payload;
            }
        }
        
        return '5000';
    }
    
    theScope1.$watch('msg.payload', messageReceived1); //listen for incoming messages
    initIroJs1();
</script>
<div id="color-picker-container1" ></div>
