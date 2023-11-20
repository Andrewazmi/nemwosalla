import MobileMenu from 'mmenu-light';
import Swal from 'sweetalert2';
import Anime from './partials/anime';
import initTootTip from './partials/tooltip';
import AppHelpers from "./app-helpers";

class App extends AppHelpers {
  constructor() {
    super();
    window.app = this;
  }

  loadTheApp() {
    this.productBelongThree();
    this.navLinks();
    this.prodBelongToCat();
    this.productCategory();
    this.map();
    this.getAllCategory();
    this.elanSldier();
    this.commonThings();
    this.removeElan();
    this.initiateNotifier();
    this.initiateMobileMenu();
    this.toggleHeaderMenuBtn();
    if (header_is_sticky) {
      this.initiateStickyMenu();
    }
    this.initAddToCart();
    this.initiateAdAlert();
    this.initiateDropdowns();
    this.initiateModals();
    this.initiateCollapse();
    initTootTip();
    this.loadModalImgOnclick();

    salla.comment.event.onAdded(() => window.location.reload());

    this.status = 'ready';
    document.dispatchEvent(new CustomEvent('theme::ready'));
    this.log('Theme Loaded 🎉');
  }

  log(message) {
    salla.log(`ThemeApp(Raed)::${message}`);
    return this;
  }




  // nav link 
  navLinks() {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }
    const linkDesign = document.getElementsByClassName("navlink-design")

    for (let i = 0; i < linkDesign.length; i++) {

      const id = getRandomIntInclusive(100000, 900000)

      const child = linkDesign[i].children[0].children

      const any = child.length
      for (let j = 0; j < any; j++) {
        child[j].className = `${id}-nav hidden`
      }
      linkDesign[i].children[1].setAttribute("id", `${id}-category`)
      linkDesign[i].children[2].setAttribute("id", `${id}-product`)


      const listProduct1 = document.getElementById(`${id}-product`)
      const navLinks1 = document.getElementsByClassName(`${id}-nav`)
      const listCategory1 = document.getElementById(`${id}-category`)



      for (let i = 0; i < navLinks1.length; i++) {
        const category = navLinks1[i].innerText




        salla.product.categories(category).then((response) => {
          const data = `
                  <div class="navLink-show cursor-pointer font-bold" onclick="getlistProduct(${category} , this , ${id})">
                    ${response.data.name}
                  </div>
                  `
          listCategory1.innerHTML += data

        });
      }
      const data = `<salla-products-slider
                source="categories"
              source-value=[${navLinks1[0].innerText}]
              </salla-product-slider>`

      listProduct1.innerHTML = data
    }

  }

  async productBelongThree() {
    const section = document.getElementsByClassName("category-three")

    for (let i = 0; i < section.length; i++) {
      const categoryId = section[i]?.children[1]?.innerText
      const insert = section[i]?.children[2]
      const queryParams = {
        source: "categories",
        source_value: [categoryId],
      };

      await salla.product
        .fetch(queryParams)
        .then((response) => {
          const products = response.data.slice(0, 5);
          const data = `
        <div>
        <div class="px-3 lg:px-0 grid flex-1 gap-4 lg:grid-cols-2 sm:gap-8">
          <div id="product-${products[0].id
            }" class="product-entry product-entry--full-image overflow-hidden" style="border-radius : 40px ; height : 580px">
            <a href="${products[0].url
            }" class="relative w-full h-full overflow-hidden rounded-md hover:opacity-90" >
              <img class=" w-full h-full lazy loaded" src="${products[0].image.url
            }" data-src="https://cdn.salla.sa/gzRDg/SPa3pW2JutxuRHUTAtxjtCewpWd5HrYELAV0XX9G.jpg" alt="حقيبة دافل فاشيتا صحارى" loading="lazy" data-ll-status="loaded">
            </a>
            <a href="${products[0].url
            }" class="absolute top-0 bottom-0 left-0 right-0 transition-opacity duration-700  rounded-2xl" ></a>
            <div class="absolute  w-full h-full flex justify-center items-end ">
              <div class="flex  flex-col  justify-center items-center mb-10">
  
                <h1 class="  text-sm font-bold leading-6 text-black product-entry__title">
                  <a  href="${products[0].url}" style=" color : black ; font-size : 22px">${products[0].name}</a>
                </h1>
                <div >
                ${products[0].sale_price ? `<h4>${this.getPriceFormat(products[0].sale_price)}</h4> <span>${this.getPriceFormat(this.product?.regular_price)}</span>` : `<h4>${this.getPriceFormat(products[0].price)}</h4> `

            }

          
                
              </div>
              </div>
              <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[1].id
            })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[1].id})" data-title="عرض سريع" data-product-id="${products[1].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[1].id
            }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            </div>
          </div>

          <div class="grid gap-4 sm:gap-8 relative  " style=" grid-template-columns: repeat(2, 1fr)  ">
          
          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4" style=" border-radius : 40px ; background-color : #EAE9E9">
            <div style="height : 180px ; width: 70%" >
              <a class="block sm:h-32 sm:w-24" href="${products[1].id}">
                <img class=" w-full h-full lazy loaded" src="${products[1].image.url
            }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="حقيبة يد كبيرة" loading="lazy" data-ll-status="loaded">
              </a>
            </div>
            <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[1].id
            })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[1].id})" data-title="عرض سريع" data-product-id="${products[1].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[1].id
            }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
              <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
                <a href="${products[1].id}">${products[1].name}</a>
              </h3>
              <div class="w-full  flex justify-center items-center">
                <h4 class="text-sm font-bold text-store-text-secondary ${products[1].discount_ends ? "text-red-400" : ""
            }">${this.getPriceFormat(products[1].price)} </h4>
                
                  <span class="text-sm line-through text-store-text-secondary">${products[1].discount_ends
              ? products[1].discount_ends + products[1].currency
              : ""
            }</span>
                  
              </div>
              
              
            </div>
          </div>




          
          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4" style=" border-radius : 40px ; background-color : #EAE9E9">
            <div style="height : 180px ; width: 70%" >
              <a class="block sm:h-32 sm:w-24" href="${products[2].id}">
                <img class=" w-full h-full lazy loaded" src="${products[2].image.url
            }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="حقيبة يد كبيرة" loading="lazy" data-ll-status="loaded">
              </a>
            </div>
            <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[2].id
            })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[2].id})" data-title="عرض سريع" data-product-id="${products[2].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[2].id
            }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
              <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
                <a href="${products[2].id}">${products[2].name}</a>
              </h3>
              <div class="w-full  flex justify-center items-center">
                <h4 class="text-sm font-bold text-store-text-secondary ${products[2].discount_ends ? "text-red-400" : ""
            }">${this.getPriceFormat(products[2].price)} </h4>
                
                  <span class="text-sm line-through text-store-text-secondary">${products[2].discount_ends
              ? products[2].discount_ends + products[2].currency
              : ""
            }</span>
                  
              </div>
              
              
            </div>
          </div>




          
          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4" style=" border-radius : 40px ; background-color : #EAE9E9">
            <div style="height : 180px ; width: 70%" >
              <a class="block sm:h-32 sm:w-24" href="${products[3].id}">
                <img class=" w-full h-full lazy loaded" src="${products[3].image.url
            }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="حقيبة يد كبيرة" loading="lazy" data-ll-status="loaded">
              </a>
            </div>
            <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[3].id
            })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[3].id})" data-title="عرض سريع" data-product-id="${products[3].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[3].id
            }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
              <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
                <a href="${products[3].id}">${products[3].name}</a>
              </h3>
              <div class="w-full  flex justify-center items-center">
                <h4 class="text-sm font-bold text-store-text-secondary ${products[3].discount_ends ? "text-red-400" : ""
            }">${this.getPriceFormat(products[3].price)} </h4>
                
                  <span class="text-sm line-through text-store-text-secondary">${products[3].discount_ends
              ? products[3].discount_ends + products[3].currency
              : ""
            }</span>
                  
              </div>
              
              
            </div>
          </div>



          
          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4" style=" border-radius : 40px ; background-color : #EAE9E9">
            <div class="flex items-center justify-center" style="width: 70%;" >
              <a class="block sm:h-32 sm:w-24" href="${products[4].id}">
                <img class=" w-full h-full lazy loaded" src="${products[4].image.url
            }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="حقيبة يد كبيرة" loading="lazy" data-ll-status="loaded">
              </a>
            </div>
            <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[4].id
            })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[4].id})" data-title="عرض سريع" data-product-id="${products[4].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[4].id
            }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
              <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
                <a href="${products[4].id}">${products[1].name}</a>
              </h3>
              <div class="w-full  flex justify-center items-center">
                <h4 class="text-sm font-bold text-store-text-secondary ${products[4].discount_ends ? "text-red-400" : ""
            }">${this.getPriceFormat(products[4].price)} </h4>
                
                  <span class="text-sm line-through text-store-text-secondary">${products[4].discount_ends
              ? products[4].discount_ends + products[4].currency
              : ""
            }</span>
                  
              </div>
              
              
            </div>
          </div>
        
          </div>
          
        
      </div>
        
        `
          insert.innerHTML += data;
        }).catch((error) => {
          console.error(error);
        });

    }

  }


  // design 2 get all product belong to category 
  prodBelongToCat() {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }
    // const categories = document.getElementsByClassName("category-value-new");
    const newDesignProduct = document.getElementsByClassName("new-design-product")
    for (let i = 0; i < newDesignProduct.length; i++) {

      const id = getRandomIntInclusive(100000, 900000)
      newDesignProduct[i].children[1].setAttribute("id", id)
      const insert = document.getElementById(id)
      const lop = newDesignProduct[i]?.children[0]?.children
      console.log(newDesignProduct[i]?.children[0]?.children[0], newDesignProduct[i]?.children[0]?.children[1])

      for (let j = 0; j < 2; j++) {
        const categoryId = newDesignProduct[i]?.children[0]?.children[j]?.innerText;
        console.log({ categoryId }, { j })
        let name = ""
        salla.product
          .categories(categoryId)
          .then((response) => {
            name = response.data.name;
          });

        const queryParams = {
          source: "categories",
          source_value: [categoryId],
        };

        // Call the fetch method
        salla.product
          .fetch(queryParams)
          .then((response) => {
            const products = response.data.slice(0, 3);

            const data = `
        <div>
        <div class="mb-4">
          <div>
            <h2 class=" mb-10 text-base font-bold leading-tight text-center text-store-text-primary lg:text-xl">أحدث ${name}</h2>
            
          </div>
        </div>
        <div class="px-3 lg:px-0 grid flex-1 gap-4 lg:grid-cols-2 sm:gap-8">
          <div id="product-${products[0].id
              }" class="product-entry product-entry--full-image overflow-hidden" style="border-radius : 40px">
            <a href="${products[0].url
              }" class="relative w-full h-full overflow-hidden rounded-md hover:opacity-90" >
              <img class="object-cover w-full h-full lazy loaded" src="${products[0].image.url
              }" data-src="https://cdn.salla.sa/gzRDg/SPa3pW2JutxuRHUTAtxjtCewpWd5HrYELAV0XX9G.jpg" alt="حقيبة دافل فاشيتا صحارى" loading="lazy" data-ll-status="loaded">
            </a>
            <a href="${products[0].url
              }" class="absolute top-0 bottom-0 left-0 right-0 transition-opacity duration-700  rounded-2xl" ></a>
            <div class="absolute  w-full h-full flex justify-center items-center">
              <div class="flex items-baseline justify-center">
  
                <h3 class="mb-2 text-sm font-bold leading-6 text-white product-entry__title">
                  <a href="${products[0].url}" style="background-color : #404553 ; padding: 10px 15px; border-radius : 20px">تسوق الان</a>
                </h3>
              </div>
            </div>
          </div>
         
          <div class="grid gap-4 sm:gap-8 relative  " style="padding : 2rem 1px ">
          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4" style=" border-radius : 40px ; background-color : #EAE9E9">
            <div class="flex items-center justify-center" style="  width: 70%" >
              <a class="block sm:h-32 sm:w-24" href="${products[1].id}">
                <img class=" w-full h-full lazy loaded" src="${products[1].image.url
              }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="حقيبة يد كبيرة" loading="lazy" data-ll-status="loaded">
              </a>
            </div>
            <div class="flex flex-col items-center justify-center  mt-auto absolute" style=" top: 18px ; right:7px">
            
            <div class="wishlist" data-title="إضافة للسلة">
            <salla-button onclick="salla.wishlist.toggle(${products[1].id
              })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
              <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
              </svg>
            </salla-button>
          </div>
          
                  <div class="quickview-btn eye-icon" onclick="clickModal(${products[1].id})" data-title="عرض سريع" data-product-id="${products[1].id}">
                      <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                      <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
                      </svg>

                      </salla-button>
                  </div>
                <div class="addToCart" data-title="إضافة للسلة">
                  <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[1].id
              }" product-status="sale" fill="outline" product-type="product">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                  <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
                </svg>
                  </salla-add-product-button>
                </div>
              </div>
            <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
              <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
                <a href="${products[1].id}">${products[1].name}</a>
              </h3>
              <div class="w-full  flex justify-center items-center">
                <h4 class="text-sm font-bold text-store-text-secondary ${products[1].discount_ends ? "text-red-400" : ""
              }">${this.getPriceFormat(products[1].price)} </h4>
                
                  <span class="text-sm line-through text-store-text-secondary">${products[1].discount_ends
                ? products[1].discount_ends + products[1].currency
                : ""
              }</span>
                  
              </div>
              
              
            </div>
          </div>
          <div  class="product-entry product-entry--minimal flex flex-col items-center justify-center overflow-hidden p-4" style=" border-radius : 40px ; background-color : #EAE9E9">
          <div class="flex items-center justify-center" style="  width: 70%" >
            <a class="block sm:h-32 sm:w-24" href="${products[2].id}">
              <img class=" w-full h-full lazy loaded" src="${products[2].image.url
              }" data-src="https://cdn.salla.sa/gzRDg/F3jJv4Iu3qhNIq6cTJ0wlGTA2YuwgJlngtGFDo2p.jpg" alt="حقيبة يد كبيرة" loading="lazy" data-ll-status="loaded">
            </a>
          </div>
          <div class="flex flex-col items-center justify-center mt-auto absolute" style=" top: 18px ; right:7px">
          
          <div class="wishlist" data-title="إضافة للسلة">
          <salla-button onclick="salla.wishlist.toggle(${products[2].id
              })" shape="icon" fill="outline" color="primary" aria-label="wishlist button" class=" s-button-wrap hydrated">
            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="48" viewBox="0 0 47 48" fill="none">
            <path d="M23.1506 42.4608L20.3714 39.8758C10.5006 30.7304 3.98389 24.6987 3.98389 17.2962C3.98389 11.2646 8.62222 6.52539 14.5256 6.52539C17.8606 6.52539 21.0614 8.11164 23.1506 10.6183C25.2397 8.11164 28.4406 6.52539 31.7756 6.52539C37.6789 6.52539 42.3172 11.2646 42.3172 17.2962C42.3172 24.6987 35.8006 30.7304 25.9297 39.8954L23.1506 42.4608Z" fill="#212121"/>
            </svg>
          </salla-button>
        </div>
        
        <div class="quickview-btn eye-icon" onclick="clickModal(${products[2].id})" data-title="عرض سريع" data-product-id="${products[2].id}">
        <salla-button  fill="outline"  class="s-button-wrap hydrated " shape="btn" color="primary" size="medium" width="normal">

        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
        <path d="M21.6507 8.90039C12.6924 8.90039 5.04197 14.6021 1.94238 22.6504C5.04197 30.6987 12.6924 36.4004 21.6507 36.4004C30.6091 36.4004 38.2595 30.6987 41.3591 22.6504C38.2595 14.6021 30.6091 8.90039 21.6507 8.90039ZM21.6507 31.8171C16.7057 31.8171 12.6924 27.7104 12.6924 22.6504C12.6924 17.5904 16.7057 13.4837 21.6507 13.4837C26.5957 13.4837 30.6091 17.5904 30.6091 22.6504C30.6091 27.7104 26.5957 31.8171 21.6507 31.8171ZM21.6507 17.1504C18.6765 17.1504 16.2757 19.6071 16.2757 22.6504C16.2757 25.6937 18.6765 28.1504 21.6507 28.1504C24.6249 28.1504 27.0257 25.6937 27.0257 22.6504C27.0257 19.6071 24.6249 17.1504 21.6507 17.1504Z" fill="#212121"/>
        </svg>

        </salla-button>
    </div>
              <div class="addToCart" data-title="إضافة للسلة">
                <salla-add-product-button shape="icon" class="addToCart__btn hydrated" product-id="${products[2].id
              }" product-status="sale" fill="outline" product-type="product">
                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="59" viewBox="0 0 65 59" fill="none">
                <path d="M31.7114 29.1459H34.7285V24.3429H39.2541V21.1409H34.7285V16.3379H31.7114V21.1409H27.1858V24.3429H31.7114V29.1459ZM25.6772 43.5548C24.0178 43.5548 22.6752 44.9957 22.6752 46.7568C22.6752 48.5179 24.0178 49.9588 25.6772 49.9588C27.3366 49.9588 28.6943 48.5179 28.6943 46.7568C28.6943 44.9957 27.3366 43.5548 25.6772 43.5548ZM40.7626 43.5548C39.1032 43.5548 37.7606 44.9957 37.7606 46.7568C37.7606 48.5179 39.1032 49.9588 40.7626 49.9588C42.422 49.9588 43.7797 48.5179 43.7797 46.7568C43.7797 44.9957 42.422 43.5548 40.7626 43.5548ZM27.3366 35.5499H38.5753C39.7067 35.5499 40.7023 34.8934 41.2152 33.9008L47.0382 22.6778L44.4133 21.1409L38.5753 32.3479H27.9853L21.5589 17.9389H16.626V21.1409H19.6431L25.0738 33.2924L23.0373 37.1989C21.936 39.3442 23.3842 41.9538 25.6772 41.9538H43.7797V38.7518H25.6772L27.3366 35.5499Z" fill="black"/>
              </svg>
                </salla-add-product-button>
              </div>
            </div>
          <div class="flex flex-col flex-1 p-2 overflow-hidden product-entry__content justify-center items-center">
            <h3 class="product-entry__title leading-6 mb-1.5 max-w-full">
              <a href="${products[2].id}">${products[2].name}</a>
            </h3>
            <div class="w-full  flex justify-center items-center">
              <h4 class="text-sm font-bold text-store-text-secondary ${products[2].discount_ends ? "text-red-400" : ""
              }">${this.getPriceFormat(products[2].price)} </h4>
              
                <span class="text-sm line-through text-store-text-secondary">${products[2].discount_ends
                ? products[2].discount_ends + products[2].currency
                : ""
              }</span>
                
            </div>
            
            
          </div>
        </div>
          </div>
        </div>
      </div>
      `;

            insert.innerHTML += data;
          })
          .catch((error) => {
            console.error(error);
          });
      }

    }


  }


  //map

  getPriceFormat(price) {
    if (!price || price == 0) {
      return salla.config.get('store.settings.product.show_price_as_dash') ? '-' : '';
    }

    return salla.money(price);
  }


  map() {
    const insertMap = document.getElementById("map-content");
    const map = document.getElementById("map-new");
    const encodedString = map?.innerText

    const container = document.createElement('div');
    container.innerHTML = encodedString;

    const iframeElement = container.firstChild.textContent;

    const data = `
${iframeElement}
`
    if (insertMap) {
      insertMap.innerHTML = data
    }


  }

  // all product belong category
  async productCategory() {
    const more = document.getElementsByClassName("category-1")
    const categoryId = document.getElementById("category-id-product")?.innerText
    const insertElement = document.getElementById("all-pro-by-cat")
    for (let l = 0; l < more.length; l++) {
      const url = await salla.product
        .categories(categoryId)
        .then((response) => {
          return response.data.url;
        });
      more[l].children[2].setAttribute("href", url)

    }
    if (categoryId) {
      salla.product.fetch({
        source: "categories",
        source_value: [categoryId],
      }).then((response) => {


        const numberOfProductShow = response.data.length > 8 ? response.data.length.slice(0, 8) : response.data.length
        for (let i = 0; i < response.data.length; i++) {
          const product = response.data[i]
          // console.log({product})
          const data = `

						
						<a class=" flex flex-col justify-center items-center api-set-category" data-emergence="hidden" href="${product.url}">
                <img class=" rounded bg-cover"  src="${product.image.url}" alt="${product.image.alt}" style="width:200px ; height : 200px"/>
          
						
							<div class="flex flex-col items-center justify-center">
							<p class="category-name opacity-80">${product.name}</p>
              <div class="flex justify-center items-center">
              <h4 style="font-weight : 800" >${this.getPriceFormat(product.price)}</h4>
							
							
							</div>
              </div>
		</a>
    `
          insertElement.innerHTML += data

        }

      });
    }



  }




  // elan 
  removeElan() {
    const removeElanBtn = document.getElementById("remove-elan");
    if (removeElanBtn) {
      removeElanBtn.addEventListener("click", () => {
        document.getElementById("elan-bannle").remove()
      })
    }
  }


  //fetch category
  getAllCategory() {
    const categories = document.getElementsByClassName("category-value");
    const names = document.getElementsByClassName("category-name");
    const anchors = document.getElementsByClassName("api-set-category");
    const image = document.getElementsByClassName("image-catetgory")
    if (categories) {
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i].innerText;
        const name = names[i];
        const anchor = anchors[i];
        const img = image[i]
        salla.product.categories(category).then((response) => {
          console.log(response)
          if (name) name.innerText = response.data.name;
          anchor.href = response.data.url;
          // img.setAttribute("src" , response.data.image)
        });
      }
    }

  }


  //elan slider 
  elanSldier() {
    const btnShow = document.getElementById("btn-open")
    const showSlider = document.getElementById("animated-ads")
    if (btnShow) {
      btnShow.addEventListener("click", () => {
        showSlider.classList.toggle("show")
      })
    }
  }

  loadModalImgOnclick() {
    document.querySelectorAll('.load-img-onclick').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        let modal = document.querySelector('#' + link.dataset.modalId),
          img = modal.querySelector('img'),
          imgSrc = img.dataset.src;
        modal.open();

        if (img.classList.contains('loaded')) return;

        img.src = imgSrc;
        img.classList.add('loaded');
      })
    })
  }

  commonThings() {
    this.cleanContentArticles('.content-entry');
  }

  cleanContentArticles(elementsSelector) {
    let articleElements = document.querySelectorAll(elementsSelector);

    if (articleElements.length) {
      articleElements.forEach(article => {
        article.innerHTML = article.innerHTML.replace(/\&nbsp;/g, ' ')
      })
    }
  }

  copyToClipboard(event) {
    event.preventDefault();
    let aux = document.createElement("input"),
      btn = event.currentTarget;
    aux.setAttribute("value", btn.dataset.content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    this.toggleElementClassIf(btn, 'copied', 'code-to-copy', () => true);
    setTimeout(() => {
      this.toggleElementClassIf(btn, 'code-to-copy', 'copied', () => true)
    }, 1000);
  }

  initiateNotifier() {
    salla.notify.setNotifier(function (message, type, data) {
      if (typeof message == 'object') {
        return Swal.fire(message).then(type);
      }

      return Swal.mixin({
        toast: true,
        position: salla.config.get('theme.is_rtl') ? 'top-start' : 'top-end',
        showConfirmButton: false,
        timer: 3500,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }).fire({
        icon: type,
        title: message,
        showCloseButton: true,
        timerProgressBar: true
      })
    });
  }

  initiateMobileMenu() {
    let menu = this.element("#mobile-menu");
    //in landing menu will not be their
    if (!menu) {
      return;
    }
    menu = new MobileMenu(menu, "(max-width: 1024px)", "( slidingSubmenus: false)");
    salla.lang.onLoaded(() => {
      menu.navigation({ title: salla.lang.get('blocks.header.main_menu') });
    });
    const drawer = menu.offcanvas({ position: salla.config.get('theme.is_rtl') ? "right" : 'left' });

    this.onClick("a[href='#mobile-menu']", event => {
      document.body.classList.add('menu-opened');
      event.preventDefault() || drawer.close() || drawer.open()
    });
    this.onClick(".close-mobile-menu", event => {
      document.body.classList.remove('menu-opened');
      event.preventDefault() || drawer.close()
    });
  }

  initiateStickyMenu() {
    let header = this.element('#mainnav'),
      height = this.element('#mainnav .inner')?.clientHeight;
    //when it's landing page, there is no header
    if (!header) {
      return;
    }

    window.addEventListener('load', () => setTimeout(() => this.setHeaderHeight(), 500))
    window.addEventListener('resize', () => this.setHeaderHeight())

    window.addEventListener('scroll', () => {
      window.scrollY >= header.offsetTop + height ? header.classList.add('fixed-pinned', 'animated') : header.classList.remove('fixed-pinned');
      window.scrollY >= 200 ? header.classList.add('fixed-header') : header.classList.remove('fixed-header', 'animated');
    }, { passive: true });
  }

  setHeaderHeight() {
    let height = this.element('#mainnav .inner').clientHeight,
      header = this.element('#mainnav');
    header.style.height = height + 'px';
  }

  /**
   * Because salla caches the response, it's important to keep the alert disabled if the visitor closed it.
   * by store the status of the ad in local storage `salla.storage.set(...)`
   */
  initiateAdAlert() {
    let ad = this.element(".salla-advertisement");

    if (!ad) {
      return;
    }

    if (!salla.storage.get('statusAd-' + ad.dataset.id)) {
      ad.classList.remove('hidden');
    }

    this.onClick('.ad-close', function (event) {
      event.preventDefault();
      salla.storage.set('statusAd-' + ad.dataset.id, 'dismissed');

      anime({
        targets: '.salla-advertisement',
        opacity: [1, 0],
        duration: 300,
        height: [ad.clientHeight, 0],
        easing: 'easeInOutQuad',
      });
    });
  }

  initiateDropdowns() {
    this.onClick('.dropdown__trigger', ({ target: btn }) => {
      btn.parentElement.classList.toggle('is-opened');
      document.body.classList.toggle('dropdown--is-opened');
      // Click Outside || Click on close btn
      window.addEventListener('click', ({ target: element }) => {
        if (!element.closest('.dropdown__menu') && element !== btn || element.classList.contains('dropdown__close')) {
          btn.parentElement.classList.remove('is-opened');
          document.body.classList.remove('dropdown--is-opened');
        }
      });
    });
  }

  initiateModals() {
    this.onClick('[data-modal-trigger]', e => {
      let id = '#' + e.target.dataset.modalTrigger;
      this.removeClass(id, 'hidden');
      setTimeout(() => this.toggleModal(id, true)); //small amont of time to running toggle After adding hidden
    });
    salla.event.document.onClick("[data-close-modal]", e => this.toggleModal('#' + e.target.dataset.closeModal, false));
  }

  toggleModal(id, isOpen) {
    this.toggleClassIf(`${id} .s-salla-modal-overlay`, 'ease-out duration-300 opacity-100', 'opacity-0', () => isOpen)
      .toggleClassIf(`${id} .s-salla-modal-body`,
        'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100', //add these classes
        'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95', //remove these classes
        () => isOpen)
      .toggleElementClassIf(document.body, 'modal-is-open', 'modal-is-closed', () => isOpen);
    if (!isOpen) {
      setTimeout(() => this.addClass(id, 'hidden'), 350);
    }
  }

  initiateCollapse() {
    document.querySelectorAll('.btn--collapse')
      .forEach((trigger) => {
        const content = document.querySelector('#' + trigger.dataset.show);
        const state = { isOpen: false }

        const onOpen = () => anime({
          targets: content,
          duration: 225,
          height: content.scrollHeight,
          opacity: [0, 1],
          easing: 'easeOutQuart',
        });

        const onClose = () => anime({
          targets: content,
          duration: 225,
          height: 0,
          opacity: [1, 0],
          easing: 'easeOutQuart',
        })

        const toggleState = (isOpen) => {
          state.isOpen = !isOpen
          this.toggleElementClassIf(content, 'is-closed', 'is-opened', () => isOpen);
        }

        trigger.addEventListener('click', () => {
          const { isOpen } = state
          toggleState(isOpen)
          isOpen ? onClose() : onOpen();
        })
      });
  }


  /**
   * Workaround for seeking to simplify & clean, There are three ways to use this method:
   * 1- direct call: `this.anime('.my-selector')` - will use default values
   * 2- direct call with overriding defaults: `this.anime('.my-selector', {duration:3000})`
   * 3- return object to play it letter: `this.anime('.my-selector', false).duration(3000).play()` - will not play animation unless calling play method.
   * @param {string|HTMLElement} selector
   * @param {object|undefined|null|null} options - in case there is need to set attributes one by one set it `false`;
   * @return {Anime|*}
   */
  anime(selector, options = null) {
    let anime = new Anime(selector, options);
    return options === false ? anime : anime.play();
  }

  /**
   * These actions are responsible for pressing "add to cart" button,
   * they can be from any page, especially when mega-menu is enabled
   */
  initAddToCart() {
    salla.cart.event.onUpdated(summary => {
      document.querySelectorAll('[data-cart-total]').forEach(el => el.innerText = salla.money(summary.total));
      document.querySelectorAll('[data-cart-count]').forEach(el => el.innerText = salla.helpers.number(summary.count));
    });

    salla.cart.event.onItemAdded((response, prodId) => {
      app.element('salla-cart-summary').animateToCart(app.element(`#product-${prodId} img`));
    });
  }


  toggleHeaderMenuBtn() {
    // const menuComp = document.getElementById('mobile-menu').children[0];
    // const headerBtn = document.getElementById('header-menu-extra-elements');
    // const menuEls = document.getElementById('mobile-menu').children[0].children;

    // let currentSize = window.innerWidth;
    // let shownElementsNum = _getCurrentShowElements(currentSize);
    // let shownEls = _sliceHeaderMenuElements(shownElementsNum, menuEls)

    // if (shownEls[0]) {
    //   menuComp.replaceChildren(shownEls[0])
    // }
  }


  // _getCurrentShowElements(width = 1025) {
  //   const WINDOW_ACTION_SIZES = {
  //     x: { size: 1040, shownElements: 9 },
  //     x2: { size: 1100, shownElements: 9 },
  //     x3: { size: 1160, shownElements: 10 },
  //     x4: { size: 1220, shownElements: 10 },
  //     x5: { size: 1280, shownElements: 11 },
  //     x6: { size: 1330, shownElements: 11 },
  //     x7: { size: 1390, shownElements: 12 },
  //   };

  //   for (const sizeKey in WINDOW_ACTION_SIZES) {
  //     const isWidthMatched = WINDOW_ACTION_SIZES[sizeKey].size === width;

  //     if (isWidthMatched) return WINDOW_ACTION_SIZES[sizeKey].shownElements;
  //   }

  //   return 0;
  // }

  // _sliceHeaderMenuElements(size = 0, menuEls = []) {
  //   return new Array.from(menuEls).slice(0, size);
  // }

}

salla.onReady(() => (new App).loadTheApp());