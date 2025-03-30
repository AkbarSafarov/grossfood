
document.addEventListener("DOMContentLoaded", function () {
    const filterBtnMobile = document.querySelector('.filter_btn_mobile');
    
    if(filterBtnMobile){
        const filterPanel = document.querySelector('.filter_panel');
        const filterClose = filterPanel.querySelector('.back_btn');

        filterBtnMobile.addEventListener('click', function(){
            filterPanel.classList.add('active');
        });

        filterClose.addEventListener('click', function(){
            filterPanel.classList.remove('active');
        });
    }

    const resetBtn = document.querySelector('.reset_btn');

    if(resetBtn) {
        resetBtn.addEventListener('click', function(){
            const form = this.closest('form');

            // Сброс чекбоксов
            form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });

            // Сброс полей ввода
            form.querySelectorAll('input[type="text"]').forEach(input => {
                input.value = '';
                input.dispatchEvent(new Event('input')); // Триггер для обновления связанных данных
            });

            // Сброс noUiSlider, если он есть
            const slider = document.querySelector('.slider-keypress');
            if (slider && slider.noUiSlider) {
                const minVal = parseFloat(document.querySelector('.range_val .min_val').innerText.replace(/\s/g, ''));
                const maxVal = parseFloat(document.querySelector('.range_val .max_val').innerText.replace(/\s/g, ''));
                slider.noUiSlider.set([minVal, maxVal]);
            }
        })
    }

    const buyBtn = document.querySelectorAll('.buy_btn');

    if(buyBtn){
        buyBtn.forEach(btn => {
            btn.addEventListener('click', function(){
                this.parentElement.classList.add('active');
            });
        })
    }

    const filtername = document.querySelectorAll('.filter_name');

    if(filtername){
        filtername.forEach(item => {
            item.addEventListener('click', function() {
                this.parentElement.classList.toggle('opened');
            });
        });
    }

    const sortSelect = document.querySelector('.sorting .select_name');

    if(sortSelect){
        const sortList = document.querySelector('.sorting .select_list');
        sortSelect.addEventListener('click', function(){
            sortList.classList.toggle('opened');
        });

        const sortOptions = sortList.querySelectorAll('.option');

        if(sortOptions) {
            sortOptions.forEach(option => {
                option.addEventListener('click', function(){
                    const text = this.innerText;

                    sortSelect.innerText = text;

                    if(sortList.classList.contains('opened')){
                        sortList.classList.remove('opened');
                    }
                })
            })
        }

        document.addEventListener('click', function (e) {
            if (!sortSelect.contains(e.target) && !sortList.contains(e.target)) {
                if(sortList.classList.contains('opened')){
                    sortList.classList.remove('opened');
                }
            }
        });
    }

    const keypressSlider = document.querySelector(".slider-keypress");

    if (keypressSlider) {

        const input0 = document.querySelector(".input-with-keypress-0");
        const input1 = document.querySelector(".input-with-keypress-1");
        const inputs = [input0, input1];

        const minVal = parseFloat(document.querySelector(".range_val .min_val").innerText.replace(/\s/g, ""));
        const maxVal = parseFloat(document.querySelector(".range_val .max_val").innerText.replace(/\s/g, ""));
        const startVal = parseFloat(input0.getAttribute("data-start").replace(/\s/g, ""));
        const endVal = parseFloat(input1.getAttribute("data-end").replace(/\s/g, ""));

        noUiSlider.create(keypressSlider, {
            start: [startVal, endVal],
            connect: true,
            step: 1,
            range: {
                min: [minVal],
                max: [maxVal]
            },
            tooltips: [true, true], 
            format: {
                to: function(value) {
                    return parseInt(value, 10); 
                },
                from: function(value) {
                    return Number(value);
                }
            }
        });

        keypressSlider.noUiSlider.on("update", function (values, handle) {
            inputs[handle].value = parseInt(values[handle], 10);

            function setSliderHandle(i, value) {
                let r = [null, null];
                r[i] = value;
                keypressSlider.noUiSlider.set(r);
            }

            inputs.forEach(function (input, handle) {
                input.addEventListener("change", function () {
                    setSliderHandle(handle, this.value);
                });

                input.addEventListener("keydown", function (e) {
                    let values = keypressSlider.noUiSlider.get();
                    let value = Number(values[handle]);

                    let steps = keypressSlider.noUiSlider.steps();
                    let step = steps[handle];
                    let position;

                    switch (e.which) {
                        case 13:
                            setSliderHandle(handle, this.value);
                            break;
                        case 38:
                            position = step[1] || 1;
                            setSliderHandle(handle, value + position);
                            break;
                        case 40:
                            position = step[0] || 1;
                            setSliderHandle(handle, value - position);
                            break;
                    }
                });
            });
        });
    }

    const amountBtn = document.querySelectorAll(".amount_block");

    if(amountBtn){
        amountBtn.forEach(block => {
            const minusBtn = block.querySelector(".minus");
            const plusBtn = block.querySelector(".plus");
            const input = block.querySelector("input");

            function updateValue(delta) {
                let value = parseInt(input.value, 10) || 0;
                value = Math.max(0, value + delta); 
                input.value = value;
            }

            minusBtn.addEventListener("click", () => updateValue(-1));
            plusBtn.addEventListener("click", () => updateValue(1));

            input.addEventListener("input", function () {
                input.value = input.value.replace(/\D/g, ""); 
            });

            input.addEventListener("keypress", function (e) {
                if (!/\d/.test(e.key)) {
                    e.preventDefault();
                }
            });

            input.addEventListener("blur", function () {
                if (input.value === "" || isNaN(parseInt(input.value, 10))) {
                    input.value = "0";
                }
            });
        });
    }
})

