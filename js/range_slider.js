"use strict";

$(function() {

    const keypressSlider = document.querySelector(".slider-keypress");

    if(!keypressSlider) return;

    const input0 = document.querySelector(".input-with-keypress-0");
    const input1 = document.querySelector(".input-with-keypress-1");
    const inputs = [input0, input1];
    const minVal = parseFloat(document.querySelector(".range_val .min_val").innerText.replace(/\s/g, ''));
    const maxVal = parseFloat(document.querySelector(".range_val .max_val").innerText.replace(/\s/g, ''));
    const startVal = parseFloat(input0.getAttribute('data-start').replace(/\s/g, ''))
    const endVal = parseFloat(input1.getAttribute('data-end').replace(/\s/g, ''))

    noUiSlider.create(keypressSlider, {
        start: [startVal, endVal],
        connect: true,
        step: 1,
        range: {
            min: [minVal],
            max: [maxVal]
        }
    });

    keypressSlider.noUiSlider.on("update", function(values, handle) {
        inputs[handle].value = parseInt(values[handle], 10);

        function setSliderHandle(i, value) {
            var r = [null, null];
            r[i] = value;
            keypressSlider.noUiSlider.set(r);
        }

        inputs.forEach(function(input, handle) {
            input.addEventListener("change", function() {
                setSliderHandle(handle, this.value);
            });

            input.addEventListener("keydown", function(e) {
                var values = keypressSlider.noUiSlider.get();
                var value = Number(values[handle]);

                var steps = keypressSlider.noUiSlider.steps();

                var step = steps[handle];

                var position;

                switch (e.which) {
                    case 13:
                        setSliderHandle(handle, this.value);
                        break;

                    case 38:

                        position = step[1];


                        if (position === false) {
                            position = 1;
                        }


                        if (position !== null) {
                            setSliderHandle(handle, value + position);
                        }

                        break;

                    case 40:
                        position = step[0];

                        if (position === false) {
                            position = 1;
                        }

                        if (position !== null) {
                            setSliderHandle(handle, value - position);
                        }

                        break;
                }
            });
        });
    });
})