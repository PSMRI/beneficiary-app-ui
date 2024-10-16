import React, {useRef} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const WebViewSetInputWithJson = ({url, formData}) => {
  const webViewRef = useRef(null);

  // Convert the JSON to a format we can pass into the WebView
  const formDataString = JSON.stringify(formData);

  return (
    <View style={{flex: 1}}>
      <WebView
        ref={webViewRef}
        source={{uri: url}} // URL of the HTML form
        javaScriptEnabled={true}
        injectedJavaScript={`
          (function() {
            const formData = ${formDataString};

            // Iterate through the formData keys
            Object.keys(formData).forEach(key => {
              const inputField = document.querySelector('input[name="' + key + '"]');
            //   if (inputField) {
            //     inputField.value = formData[key]; // Set the value if the field exists
            //     const textElement = document.createElement('p');
            //     textElement.innerHTML = \`Key: \${key}, Value: \${formData[key]}\`;
            //     inputField.parentNode.insertBefore(textElement, inputField.nextSibling);
            //   } else {
            //     // const inputField1 = document.querySelector('input[name="first_name"]')
            //     // const textElement = document.createElement('p');
            //     // textElement.innerHTML = \`Key: \${key}, Value: \${formData[key]}\`;
            //     // inputField1.parentNode.insertBefore(textElement, inputField1.nextSibling);
            //   }
              if (inputField) {
                inputField.value = formData[key]; // Set the value if the field exists
              }
            });
          })();
        `}
      />
    </View>
  );
};

export default WebViewSetInputWithJson;
