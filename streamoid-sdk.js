function initStreamoidSDK() {
    var streamoidProductData = {};
    // step 1: get the necessary settings done by the user

    // if settings done by the user and need to load the widget
    var shopName = "codecrux";
    (function(i,s,o,g,r,t,k,a,m){
    i['PiqitObject']=r;i['PiqitGa']=t;i['PiqitToken'] = k;i[r]=i[r]||function() {
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window, document, 'script', 'https://sdk.staging.streamoid.com/webtools/static/js/instashopper_loader.js', 'STREAMOID', 'GA TRACKER-ID', '0a52c62a-5eb6-f71f-161e-704d87084807');

    // track pages, button clicks
    handleStreamoidTracking();

    function handleStreamoidTracking() {
        console.log("handleStreamoidTracking:start");
        // find if the param is present
        // if present, add a propery to the cart
        var pathname = window.location.pathname
        if(pathname.indexOf('/products/') !== -1) {
            // on products page
            var params = (new URL(document.location)).searchParams;
            let streamoidTrack = params.get('s_strack'); // some key to identify if customer was redirected to the product page
            if(streamoidTrack) {
                window.localStorage._s_track = "_s_track";
                getProductDetails();
            }
        } else if(pathname.indexOf('/thank_you') !== -1) {
            // thank you page
            sendStreamoidTrackingDetails();
            window.localStorage._s_track = null;
        } else if(pathname.indexOf('/pages/insta-shopper') !== -1) {
            // custom page
            sendStreamoidTrackingDetails();
        }
    }

    function getProductDetails() {
        fetch(location.protocol + "//" + location.host + location.pathname + ".js")
            .then(async (product) => {
                product = await product.json();
                // var product_id = product.id;
                // var price = product.price / 100;
                streamoidProductData = product || {};
                handleStreamoidProductPageTracker();
            })
            .catch((err) => console.log({ err }));
    }


    function handleStreamoidProductPageTracker() {
        sendStreamoidTrackingDetails('product_page_view');

        var productPageForm = document.querySelector('form[action="/cart/add"]');
        if(productPageForm) {
            // add a hidden input field to the form; this will help tracking the sales
            productPageForm.insertAdjacentHTML('afterbegin', '<input type="hidden" name="_s_track" value="1" />');

            // track the add to cart button click
            var streamoidAddToCartButton = productPageForm.querySelector("[name=add]");
            if(!streamoidAddToCartButton) {
                streamoidAddToCartButton = productPageForm.querySelector("button[type=submit]");
            }

            if(streamoidAddToCartButton) {
                streamoidAddToCartButton.addEventListener(
                    "click",
                    function (event) {
                        sendStreamoidTrackingDetails('atc_click');
                    },
                    false
                );
            }
        } else {
            console.log("product page form not found, please contact the developer");
        }
    }

    function sendStreamoidTrackingDetails(eventType, data) {
        console.log("sending tracking details...");
    }
}

initStreamoidSDK();
