function initStreamoidSDK() {
    // step 1: get the necessary settings done by the user

    // if settings done by the user and need to load the widget
    (function(i,s,o,g,r,t,k,a,m){
    i['PiqitObject']=r;i['PiqitGa']=t;i['PiqitToken'] = k;i[r]=i[r]||function() {
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window, document, 'script', 'https://sdk.staging.streamoid.com/webtools/static/js/instashopper_loader.js', 'STREAMOID', 'GA TRACKER-ID', '0a52c62a-5eb6-f71f-161e-704d87084807');
}

initStreamoidSDK();