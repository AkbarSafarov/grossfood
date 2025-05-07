document.addEventListener("DOMContentLoaded", function () {

	const prosuctImage = document.querySelector('.product_image');

	if(prosuctImage){
		lightGallery(prosuctImage, {
	        animateThumb: false,
	        zoomFromOrigin: false,
	        allowMediaOverlap: true,
	        toggleThumb: false,
	        selector: 'a'
	    });
	}

	const btnFavorites = document.querySelector('.btn_favorites');

	if(btnFavorites) {
		btnFavorites.addEventListener('click', function(){
			this.classList.toggle('active');
		})
	}


	const tabWrap = document.querySelector('.tabs_block_wr');

	if(tabWrap) {
		const tabLinks = document.querySelectorAll(".tabs_title li a");
		const tabItems = document.querySelectorAll(".tab_item");

		tabLinks.forEach(link => {
			link.addEventListener("click", function (e) {
			  	e.preventDefault();

			  	document.querySelectorAll(".tabs_title li").forEach(li => li.classList.remove("active"));

			  	tabItems.forEach(tab => tab.classList.remove("active"));

			  	this.parentElement.classList.add("active");

				const targetId = this.getAttribute("href").substring(1);
				const targetTab = document.getElementById(targetId);
				
				if (targetTab) {
				    targetTab.classList.add("active");
				}	
			});
		});
	}


	const similarSlider = document.querySelector('.slider_similar');

    if(similarSlider){
        const swiperSimilar = new Swiper(".slider_similar .swiper", {
            loop: false,
            slidesPerView: 4,
            spaceBetween: 24,
            lazy: true,
            navigation: {
                nextEl: ".slider_similar .arrow_next",
                prevEl: ".slider_similar .arrow_prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 14,
                    loop: true,
                },
                768: {
                    slidesPerView: 'auto',
                    loop: true,
                },
                1100: {
                    slidesPerView: 4
                }
            }
        });
    }


	const salesSlider = document.querySelector('.slider_sales');

    if(salesSlider){
        const swiperSales = new Swiper(".slider_sales .swiper", {
            loop: false,
            slidesPerView: 4,
            spaceBetween: 24,
            lazy: true,
            navigation: {
                nextEl: ".slider_sales .arrow_next",
                prevEl: ".slider_sales .arrow_prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 14,
                    loop: true,
                },
                768: {
                    slidesPerView: 'auto',
                    loop: true,
                },
                1100: {
                    slidesPerView: 4
                }
            }
        });
    }
});