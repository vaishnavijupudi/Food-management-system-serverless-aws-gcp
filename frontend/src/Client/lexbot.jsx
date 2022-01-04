import React from 'react';


function lexbot(props){


        (function(d, m){
        var kommunicateSettings = 
            {"appId":"3a1d14f797a6a94a846eda77a50911d5","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});

    return(<div> </div>)

}
export default lexbot;