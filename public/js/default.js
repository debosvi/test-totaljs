$(document).ready(function() {
    $(document).keypress(function(event) {
        alert('Handle for .keypress() called. - ' + event.charCode);
    });
});
