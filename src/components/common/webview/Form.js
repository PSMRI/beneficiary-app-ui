import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import Button from '../button/Button';

const WebViewFormSubmitWithRedirect = ({url, formData, setPageContent}) => {
  const webViewRef = useRef(null);
  const formDataString = JSON.stringify(formData);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const handleFormSubmit = () => {
    // Inject JavaScript to submit the form in the WebView
    const jsCode = `
      const form = document.querySelector('form'); 
      if (form) {
        form.submit();
      }
    `;
    webViewRef.current.injectJavaScript(jsCode);
    setIsFormSubmit(true);
  };

  const handleNavigationChange = navState => {
    // Check if navigation is complete (new page loaded after redirect)
    if (!navState.loading) {
      // Inject JavaScript to get the page content
      const jsCode = `
        (function() {
          const bodyText = document.body.innerText || document.body.textContent;
          window.ReactNativeWebView.postMessage(bodyText);
        })();
      `;
      webViewRef.current.injectJavaScript(jsCode);
    }
  };

  const handleWebViewMessage = event => {
    // Capture the page text sent from the WebView
    if (isFormSubmit) {
      setPageContent(event.nativeEvent.data);
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        ref={webViewRef}
        source={{uri: url}} // The form page URL
        javaScriptEnabled={true}
        injectedJavaScript={`
        (function() {
          const submitButton = document.querySelector('button[type="submit"]');
          if (submitButton) {
            submitButton.style.display = 'none';
          }
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
        onNavigationStateChange={handleNavigationChange}
        onMessage={handleWebViewMessage}
      />
      <Button
        style={{
          backgroundColor: '#fff',
        }}
        label="Submit Form"
        handleClick={handleFormSubmit}
      />
    </View>
  );
};

export default WebViewFormSubmitWithRedirect;
