document.addEventListener("DOMContentLoaded", function () {
    var startCode;
    var finishedCode;
    document.querySelector("#chooseFile").addEventListener("change", getCode);
    document.querySelector(".find_file").addEventListener("click", editCode);

    function getCode(e) {
        var target = e.target;
        var file = target.files[0];
        document.querySelector(".changeFile").classList.add("active-button");
        document.querySelector(".changeFile").classList.remove("button");
        var reader = new FileReader();
        reader.onload = function (e) {
            startCode = e.target.result;
        };
        reader.readAsText(file);
    }
    
    function editCode(e) {
        var target = e.target;
        if (!target.matches(".active-button")) return;
        var patternStr = /((["'`])(?:(?:\\\\)|\\\2|(?!\\\2)\\|(?!\2).|[\n\r])*\2)/;
        var pattern = /((["'`])(?:(?:\\\\)|\\\2|(?!\\\2)\\|(?!\2).|[\n\r])*\2)|\/\*.*\*\/|\/\*(.*[\n\r])*.*\*\/|\/\/.*/g;
        finishedCode = startCode.replace(pattern, replacer);
        document.querySelector(".results .code_line .code").innerHTML = finishedCode;

        function replacer(reg) {
            if (patternStr.test(reg)) {
                return reg;
            }
            return '';
        }
    }
});